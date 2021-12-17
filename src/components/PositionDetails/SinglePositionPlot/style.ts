import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 18,
    borderRadius: 10
  },
  header: {
    ...typography.body1,
    color: colors.white.main,
    paddingBottom: 14
  },
  plotWrapper: {
    paddingBottom: 25
  },
  minMaxInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    paddingBottom: 25,

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: '8px'
    }
  },
  currentPriceLabel: {
    backgroundColor: colors.invariant.componentOut3,
    color: colors.invariant.lightInfoText,
    textAlign: 'center',
    '& p': {
      ...typography.body1,
      textTransform: 'uppercase',
      lineHeight: '35px'
    }
  },
  currentPriceAmonut: {
    backgroundColor: colors.invariant.componentOut2,
    textAlign: 'center',
    '& span': {
      color: colors.white.main,
      ...typography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: colors.invariant.lightInfoText,
      ...typography.body1
    }
  },
  plot: {
    width: '100%',
    height: 207,
    backgroundColor: colors.invariant.componentIn2,
    borderRadius: 10,

    '& .zoomBtns': {
      top: 10,
      right: 10
    },

    [theme.breakpoints.down('xs')]: {
      height: 253
    }
  }
}))

export default useStyles
