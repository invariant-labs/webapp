import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 18,
    borderRadius: 24
  },
  header: {
    ...typography.heading4,
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
    color: colors.invariant.lightGrey,
    textAlign: 'center',
    borderRadius: '11px!important',
    '& p': {
      ...typography.body2,
      textTransform: 'uppercase',
      lineHeight: '35px',
      [theme.breakpoints.only('md')]: {
        ...typography.caption2,
        lineHeight: '35px'
      }
    }
  },
  currentPriceAmonut: {
    backgroundColor: colors.invariant.dark,
    textAlign: 'center',
    borderRadius: '11px!important',
    '& span': {
      color: colors.invariant.text,
      ...typography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: '#A9B6BF',
      ...typography.body1,
      [theme.breakpoints.only('md')]: {
        ...typography.caption1,
        lineHeight: '35px'
      }
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
