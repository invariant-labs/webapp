import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import icons from '@static/icons'
import { colors, theme, typography } from '@static/theme'
import useStyles from './styles'

interface INormalBannerProps {
  onClose: () => void
  isHiding: boolean
}

export const TopBanner = ({ onClose, isHiding }: INormalBannerProps) => {
  const bannerHeight = 'fit-content'
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

  const { classes } = useStyles()

  const airdrop = (
    <Box
      component='img'
      src={icons.airdrop}
      sx={{
        width: '24px',
        height: '24px',
        minWidth: '24px',
        objectFit: 'contain',
        marginRight: '12px'
      }}
    />
  )

  const text = (
    <span>
      Invariant Points are live on Eclipse! Check it out
      <span
        style={{
          color: colors.invariant.pink,
          textDecoration: 'underline',
          marginLeft: '6px',
          cursor: 'pointer',
          ...typography.body1
        }}
        onClick={() => {
          window.open('https://eclipse.invariant.app/points', '_blank')

          if (isSmallDevice) {
            onClose()
          }
        }}>
        here!
      </span>
    </span>
  )

  const close = (
    <Box onClick={onClose}>
      <Box
        component='img'
        src={isSmallDevice ? icons.closeSmallGreenIcon : icons.closeSmallIcon}
        sx={{
          cursor: 'pointer',
          width: { xs: '16px', sm: '11px' },
          height: { xs: '16px', sm: '11px' },
          minWidth: { xs: '16px', sm: '11px' }
        }}
        alt='Close'
      />
    </Box>
  )

  return (
    <>
      {!isSmallDevice && (
        <Box
          sx={{
            position: 'relative',
            background: colors.invariant.light,
            padding: isHiding ? '0px 0px' : { xs: '12px 16px', sm: '10px 25px' },
            width: '100%',
            maxWidth: '100%',
            height: isHiding ? '0px' : bannerHeight,
            display: 'flex',
            ...typography.body1,
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            color: colors.invariant.text,
            margin: isHiding ? '0' : undefined,
            overflow: 'hidden',
            opacity: isHiding ? 0 : 1,
            transition: 'all 0.3s ease-in-out',
            willChange: 'height,padding,margin'
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              transform: isHiding ? 'translateY(-100%)' : 'translateY(0)',
              transition: 'transform 0.3s ease-in-out',
              position: 'relative',
              gap: '12px'
            }}>
            <Grid display='flex' justifyContent='center' alignItems='center' width='100%' mr={3}>
              {airdrop}
              <Box
                sx={{
                  fontSize: { xs: '14px', sm: '16px' }
                }}>
                {text}
              </Box>
            </Grid>
          </Box>
          {close}
        </Box>
      )}
      {isSmallDevice && (
        <>
          <Box className={classes.background} onClick={onClose}></Box>
          <Box className={classes.container}>
            <Box className={classes.modal}>
              <Box className={classes.header}>
                {airdrop}
                <Typography>Announcement</Typography>
                {close}
              </Box>
              {text}
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
