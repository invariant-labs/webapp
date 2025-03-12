import { useState, useEffect } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    const userAgent = navigator.userAgent
    return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)
  })

  useEffect(() => {
    const handleScreenModeChange = () => {
      const userAgent = navigator.userAgent
      setIsMobile(/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent))
    }

    window.addEventListener('resize', handleScreenModeChange)
    window.addEventListener('orientationchange', handleScreenModeChange)

    return () => {
      window.removeEventListener('resize', handleScreenModeChange)
      window.removeEventListener('orientationchange', handleScreenModeChange)
    }
  }, [])

  return isMobile
}

export default useIsMobile
