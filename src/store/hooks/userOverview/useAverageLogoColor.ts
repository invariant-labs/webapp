import { ensureError } from '@utils/utils'
import { useCallback } from 'react'

export interface TokenColorOverride {
  token: string
  color: string
}

export const useAverageLogoColor = () => {
  interface RGBColor {
    r: number
    g: number
    b: number
  }

  const tokenColorOverrides: TokenColorOverride[] = [{ token: 'SOL', color: '#9945FF' }]

  const defaultTokenColors: Record<string, string> = {
    SOL: '#9945FF',
    DEFAULT: '#7C7C7C'
  }

  const getTokenColor = (
    token: string,
    logoColor: string | undefined,
    overrides: TokenColorOverride[]
  ): string => {
    const override = overrides.find(item => item.token === token)
    if (override) return override.color

    if (logoColor) return logoColor

    return defaultTokenColors[token] || defaultTokenColors.DEFAULT
  }

  const rgbToHex = ({ r, g, b }: RGBColor): string => {
    const componentToHex = (c: number): string => {
      const hex = Math.round(c).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
  }

  const hexToRgb = (hex: string): RGBColor | null => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return res
      ? {
          r: parseInt(res[1], 16),
          g: parseInt(res[2], 16),
          b: parseInt(res[3], 16)
        }
      : null
  }

  const relativeLuminance = ({ r, g, b }: RGBColor): number =>
    (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  const isDark = (rgb: RGBColor): boolean => relativeLuminance(rgb) < 0.4

  const lightenColor = (hex: string, factor): string => {
    const rgb = hexToRgb(hex)
    if (!rgb) return hex
    const lighten = (c: number) => Math.min(255, c + (255 - c) * factor)
    return rgbToHex({ r: lighten(rgb.r), g: lighten(rgb.g), b: lighten(rgb.b) })
  }

  const calculateAverageColor = (imageData: Uint8ClampedArray): string => {
    let totalR = 0
    let totalG = 0
    let totalB = 0
    let totalPixels = 0

    for (let i = 0; i < imageData.length; i += 4) {
      const alpha = imageData[i + 3]
      if (alpha === 0) continue

      const alphaMultiplier = alpha / 255
      totalR += imageData[i] * alphaMultiplier
      totalG += imageData[i + 1] * alphaMultiplier
      totalB += imageData[i + 2] * alphaMultiplier
      totalPixels++
    }

    if (totalPixels === 0) return defaultTokenColors.DEFAULT

    const averageColor: RGBColor = {
      r: totalR / totalPixels,
      g: totalG / totalPixels,
      b: totalB / totalPixels
    }

    const hex = rgbToHex(averageColor)

    return isDark(averageColor) ? lightenColor(hex, 0.3) : hex
  }

  const getCorrectImageUrl = (url: string): string => {
    if (url.includes('github.com') && url.includes('/blob/master/')) {
      return url
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/master/', '/master/')
    }

    if (url.includes('statics.solscan.io')) {
      const ref = new URL(url).searchParams.get('ref')
      if (ref) {
        try {
          const decodedRef = Buffer.from(ref, 'hex').toString()
          return decodedRef
        } catch (e) {
          console.warn('Failed to decode Solscan URL:', ensureError(e))
        }
      }
    }

    return url
  }

  const loadImageWithFallback = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'

      img.onload = () => resolve(img)
      img.onerror = () => {
        const retryImg = new Image()
        retryImg.onload = () => resolve(retryImg)
        retryImg.onerror = () => reject(new Error('Failed to load image'))
        retryImg.src = url
      }

      img.src = getCorrectImageUrl(url)
    })

  const getAverageColor = useCallback((logoUrl: string, token: string): Promise<string> => {
    const override = tokenColorOverrides.find(item => item.token === token)
    if (override) return Promise.resolve(override.color)

    return new Promise(resolve => {
      const timeoutDuration = 5000
      const timeoutId = setTimeout(() => {
        resolve(getTokenColor(token, undefined, tokenColorOverrides))
      }, timeoutDuration)

      loadImageWithFallback(logoUrl)
        .then(img => {
          clearTimeout(timeoutId)

          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            resolve(getTokenColor(token, undefined, tokenColorOverrides))
            return
          }

          canvas.width = img.width
          canvas.height = img.height

          try {
            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
            const averageColor = calculateAverageColor(imageData)
            resolve(averageColor)
          } catch (e) {
            console.log(ensureError(e))

            const tempDiv = document.createElement('div')
            tempDiv.style.position = 'absolute'
            tempDiv.style.visibility = 'hidden'
            tempDiv.appendChild(img)
            document.body.appendChild(tempDiv)

            const computedColor = window.getComputedStyle(img).backgroundColor
            document.body.removeChild(tempDiv)

            if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') {
              resolve(computedColor)
            } else {
              resolve(getTokenColor(token, undefined, tokenColorOverrides))
            }
          }
        })
        .catch(() => resolve(getTokenColor(token, undefined, tokenColorOverrides)))
    })
  }, [])

  return { tokenColorOverrides, getAverageColor, getTokenColor }
}
