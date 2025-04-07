import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    height: '100%',
    maxWidth: '100%',
    position: 'relative',
    '& g > text': {
      stroke: 'none',
      fill: '#A9B6BF!important',
      fontFamily: 'Mukta!important',

      [theme.breakpoints.down('md')]: {
        fontSize: '8px!important'
      }
    }
  },
  zoomIcon: {
    width: 18,
    height: 'auto',
    fill: '#111931',

    [theme.breakpoints.down('md')]: {
      width: 22
    }
  },
  zoomButtonsWrapper: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    right: 8,
    height: 64,
    zIndex: 10,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      maxWidth: 92,
      gap: 10,
      height: 40
    }
  },
  loadingText: {
    fill: colors.invariant.black,
    ...typography.heading4
  },
  errorWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto'
  },
  errorText: {
    color: colors.white.main,
    ...typography.heading4
  },
  reloadButton: {
    width: 130,
    height: 40,
    borderRadius: 14,
    background: colors.invariant.pinkLinearGradientOpacity,
    color: colors.invariant.dark,
    ...typography.body1,
    marginTop: 24,
    textTransform: 'none',

    '&:hover': {
      background: colors.invariant.pinkLinearGradient
    }
  },
  cover: {
    width: 'calc(100% + 10px)',
    height: 'calc(100% + 10px)',
    background: '#01051499',
    position: 'absolute',
    zIndex: 11,
    borderRadius: 10,
    backdropFilter: 'blur(16px)'
  },
  loader: {
    height: 100,
    width: 100,
    margin: 'auto'
  }
}))

export default useStyles
