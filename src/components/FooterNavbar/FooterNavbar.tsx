import { Box, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { colors } from '@static/theme'
import useStyles from './style'
import { liquidityIcon, statsIcon, swapArrowsIcon, walletIcon } from '@static/icons'

export const FooterNavbar = () => {
  const links = [
    {
      label: 'Swap',
      icon: swapArrowsIcon,
      url: 'exchange',
      width: 33
    },
    {
      label: 'Liquidity',
      icon: liquidityIcon,
      url: 'liquidity',
      width: 20
    },
    {
      label: 'Portfolio',
      icon: walletIcon,
      url: 'portfolio',
      width: 26
    },

    {
      label: 'Stats',
      icon: statsIcon,
      url: 'statistics',
      width: 30
    }
  ]

  const location = useLocation()
  const landing = location.pathname.substring(1)

  const { classes } = useStyles()
  const [activePath, setActive] = useState('exchange')

  useEffect(() => {
    setActive(landing)
  }, [landing])

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    liquidity: [/^liquidity\/*/],
    exchange: [/^exchange\/*/],
    portfolio: [/^portfolio\/*/, /^newPosition\/*/, /^position\/*/]
  }

  const [display, setDisplay] = useState(true)

  useEffect(() => {
    const resizeHandler = () => {
      if (window.visualViewport?.height)
        setDisplay(window.innerHeight < window.visualViewport?.height * 1.1)
    }

    window.visualViewport!.addEventListener('resize', resizeHandler)

    return () => window.visualViewport!.addEventListener('resize', resizeHandler)
  }, [])

  return (
    <Box
      component='footer'
      className={classes.navbar}
      style={{ display: display ? 'flex' : 'none' }}>
      {links.map(link => {
        const active =
          link.url === activePath ||
          (!!otherRoutesToHighlight[link.url] &&
            otherRoutesToHighlight[link.url].some(pathRegex => pathRegex.test(activePath)))

        return (
          <Link
            key={`path-${link.url}`}
            to={`/${link.url}`}
            className={classes.navbox}
            style={{
              background: active ? colors.invariant.light : ''
            }}
            onClick={e => {
              if (link.url === 'exchange' && activePath.startsWith('exchange')) {
                e.preventDefault()
                return
              }
              setActive(link.url)
            }}>
            {active && <Box className={classes.activeBox} />}
            <img
              src={link.icon}
              width={link.width}
              style={
                active
                  ? { filter: 'brightness(0) saturate(100%) invert(100%)' }
                  : { filter: 'brightness(0) saturate(100%) invert(45%)' }
              }
              className={classes.navImg}
              alt={link.label}
            />
            <Typography
              sx={active ? { color: colors.white.main } : { color: colors.invariant.textGrey }}>
              {link.label}
            </Typography>
          </Link>
        )
      })}
    </Box>
  )
}

export default FooterNavbar
