import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    paddingTop: 18,
    borderRadius: 10,
    width: 519
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
    paddingBottom: 25
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
    width: 471,
    height: 207,
    backgroundColor: colors.invariant.componentIn2,
    borderRadius: 10,

    '& .zoomBtns': {
      top: 15,
      right: 15
    }
  }
}))

export default useStyles
