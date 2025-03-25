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

  const airdrop = <Box component='img' className={classes.airdrop} src={icons.airdrop} />

  const text = (
    <span>
      Invariant Points are live on Eclipse! Check it out
      <span
        className={classes.text}
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
        className={classes.close}
        alt='Close'
      />
    </Box>
  )

  return (
    <>
      {!isSmallDevice && (
        <Box>
          <Box className={classes.innerWrapper}>
            <Grid className={classes.gridWrapper}>
              {airdrop}
              <Box className={classes.labelText}>{text}</Box>
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
