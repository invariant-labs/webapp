import Footer from '@components/Footer/Footer'
import FooterNavbar from '@components/FooterNavbar/FooterNavbar'
import { useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import React from 'react'

export const FooterWrapper: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down(1200))
  return (
    <>
      <Footer />
      {isMobile && <FooterNavbar />}
    </>
  )
}

export default FooterWrapper
