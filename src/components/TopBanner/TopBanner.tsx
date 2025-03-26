import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import icons from '@static/icons'
import { theme } from '@static/theme'
import useStyles from './styles'

interface INormalBannerProps {
  onClose: () => void
  isHiding: boolean
}

export const TopBanner = ({ onClose, isHiding }: INormalBannerProps) => {
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const { classes } = useStyles({ isHiding })

  const airdrop = <Box component='img' src={icons.airdrop} className={classes.airdrop} />

  const text = (
    <span>
      Invariant Points are live on Eclipse! Check it out
      <span
        className={classes.textLink}
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
        className={classes.closeIcon}
        alt='Close'
      />
    </Box>
  )

  return (
    <>
      {!isSmallDevice && (
        <Box className={classes.topBanner}>
          <Box className={classes.innerBox}>
            <Grid display='flex' justifyContent='center' alignItems='center' width='100%' mr={3}>
              {airdrop}
              <Box className={classes.textBox}>{text}</Box>
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
