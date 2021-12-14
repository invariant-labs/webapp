import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.invariant.componentOut1,
    borderRadius: 10,
    padding: 20,

    '&:not(:last-child)': {
      marginBottom: 20
    },

    '&:hover': {
      background: colors.invariant.componentOut4
    },

    [theme.breakpoints.down('md')]: {
      padding: 16
    }
  },
  icons: {
    marginRight: 20,
    width: 'fit-content',

    [theme.breakpoints.down('md')]: {
      marginRight: 12
    }
  },
  tokenIcon: {
    width: 40,

    [theme.breakpoints.down('md')]: {
      width: 33
    }
  },
  arrows: {
    width: 25,

    [theme.breakpoints.down('md')]: {
      width: 20
    }
  },
  names: {
    marginRight: 20,
    ...typography.heading1,
    color: colors.white.main,
    lineHeight: '40px',

    [theme.breakpoints.down('md')]: {
      ...typography.heading3,
      lineHeight: '33px'
    }
  },
  infoText: {
    ...typography.body1,
    color: colors.invariant.lightInfoText,
    whiteSpace: 'nowrap'
  },
  greenText: {
    ...typography.body1,
    color: colors.invariant.accent2,
    whiteSpace: 'nowrap'
  },
  liquidity: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    width: 170,
    marginRight: 8
  },
  fee: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    width: 90,
    marginRight: 8
  },
  infoCenter: {
    flex: '1 1 0%'
  },
  minMax: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    width: 331,
    paddingInline: 10,
    marginRight: 8,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  value: {
    background: colors.invariant.componentOut2,
    borderRadius: 5,
    height: 35,
    width: 164,
    paddingInline: 12
  },
  mdInfo: {
    width: 'fit-content',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
      marginTop: 16,
      width: '100%'
    },

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      marginTop: 18
    }
  }
}))

export default useStyles
