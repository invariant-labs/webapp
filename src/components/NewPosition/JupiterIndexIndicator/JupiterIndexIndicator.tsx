import { useEffect, useState } from 'react'
import JupiterIcon from '@static/svg/JupiterIcon.svg'
import { jupiterIndicatorStyles } from './style.ts'

interface IndicatorProps {
  marketId: string
}

interface ApiElementProps {
  pubkey: string
  executable: boolean
  lamports: number
  owner: string
  params: Object
  rentEpoch: number
  space: number
}

export const JupiterIndexIndicator = ({ marketId }: IndicatorProps) => {
  const [isIndexed, setIsIndexed] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleConn = async () => {
    try {
      const response = await fetch('https://cache.jup.ag/markets?v=3')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      const connection = data.some((el: ApiElementProps) => el.pubkey === marketId)
      setIsIndexed(connection)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data. Please try again later.')
    }
  }

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      void handleConn()
    }
    return () => {
      isMounted = false
    }
  }, [marketId])

  return (
    <>
      {!error && isIndexed && (
        <figure style={jupiterIndicatorStyles.container}>
          <img
            src={JupiterIcon}
            style={jupiterIndicatorStyles.image}
            aria-label='Indexed by Jupiter'
            title='Jupiter Icon'
            alt='Indexed by Jupiter'
          />
          <figcaption style={jupiterIndicatorStyles.caption}>Indexed by Jupiter</figcaption>
        </figure>
      )}
    </>
  )
}
