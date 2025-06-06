import { useState, useEffect } from 'react'

const useIsMobile = (onlyMobileDevices?: boolean) => {
  const [isMobile, setIsMobile] = useState(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileUA = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)
    const isTouchDevice = navigator.maxTouchPoints > 1

    return onlyMobileDevices ? isMobileUA && isTouchDevice : isMobileUA
  })

  useEffect(() => {
    if (onlyMobileDevices) return

    const handleScreenModeChange = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      setIsMobile(/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent))
    }

    window.addEventListener('resize', handleScreenModeChange)
    window.addEventListener('orientationchange', handleScreenModeChange)
    return () => {
      window.removeEventListener('resize', handleScreenModeChange)
      window.removeEventListener('orientationchange', handleScreenModeChange)
    }
  }, [onlyMobileDevices])

  return isMobile
}
export default useIsMobile
