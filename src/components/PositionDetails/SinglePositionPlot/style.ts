import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 18,
    borderRadius: 24
  },
  header: {
    ...newTypography.heading4,
    color: '#FFFFFF',
    paddingBottom: 30
  },
  plotWrapper: {
    paddingBottom: 39
  },
  minMaxInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    paddingBottom: 16,

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: '8px'
    }
  },
  currentPriceContainer: {
    backgroundColor: '#111931',
    borderRadius: 11
  },
  currentPriceLabel: {
    backgroundColor: colors.invariant.light,
    color: '#A9B6BF',
    textAlign: 'center',
    borderRadius: '11px!important',
    '& p': {
      ...newTypography.body2,
      textTransform: 'uppercase',
      lineHeight: '35px'
    }
  },
  currentPriceAmonut: {
    backgroundColor: '#111931',
    textAlign: 'center',
    borderRadius: '11px!important',
    '& span': {
      color: colors.invariant.text,
      ...newTypography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: '#A9B6BF',
      ...newTypography.body1
    }
  },
  plot: {
    width: '100%',
    height: 295,
    backgroundColor: colors.invariant.component,
    borderRadius: 10,

    '& .zoomBtns': {
      top: -12,
      right: 0
    },

    [theme.breakpoints.down('xs')]: {
      height: 253
    }
  }

}))

export default useStyles
