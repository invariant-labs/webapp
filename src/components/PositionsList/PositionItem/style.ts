import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.invariant.component,
    borderRadius: 24,
    padding: 20,
    flexWrap: 'nowrap',

    '&:not(:last-child)': {
      marginBottom: 20
    },

    '&:hover': {
      background: `${colors.invariant.component}B0`
    },

    [theme.breakpoints.down('md')]: {
      padding: 16,
      flexWrap: 'wrap'
    }
  },
  icons: {
    marginRight: 12,
    width: 'fit-content',

    [theme.breakpoints.down('md')]: {
      marginRight: 12
    }
  },
  tokenIcon: {
    width: 40,
    borderRadius: '100%',

    [theme.breakpoints.down('md')]: {
      width: 33
    },

    [theme.breakpoints.down('xs')]: {
      width: 25
    }
  },
  arrows: {
    width: 36,
    marginLeft: 4,
    marginRight: 4,

    [theme.breakpoints.down('md')]: {
      width: 30
    },

    [theme.breakpoints.down('xs')]: {
      width: 24
    },

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  names: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ...typography.heading2,
    color: colors.invariant.text,
    lineHeight: '40px',
    whiteSpace: 'nowrap',
    width: 180,
    [theme.breakpoints.down('lg')]: {
      ...typography.heading2
    },
    [theme.breakpoints.down('md')]: {
      lineHeight: '32 px',
      width: 'unset'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.heading3,
      lineHeight: '25px'
    }
  },
  infoText: {
    ...typography.body1,
    color: colors.invariant.lightGrey,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  greenText: {
    ...typography.body1,
    color: colors.invariant.green,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  liquidity: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 170,
    marginRight: 8,
    lineHeight: 20,
    [theme.breakpoints.down('md')]: {
      flex: '1 1 0%'
    }
  },
  fee: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 90,
    marginRight: 8,

    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  infoCenter: {
    flex: '1 1 0%'
  },
  minMax: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 320,
    paddingInline: 10,
    marginRight: 8,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
      marginTop: 8
    }
  },
  value: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    width: 160,
    paddingInline: 12,

    [theme.breakpoints.down('xs')]: {
      width: 144,
      paddingInline: 6
    }
  },
  mdInfo: {
    width: 'fit-content',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
      marginTop: 16,
      width: '100%'
    },

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  mdTop: {
    width: 'fit-content',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-between'
    }
  },
  iconsAndNames: {
    width: 'fit-content'
  },
  label: {
    marginRight: 2
  }
}))

export default useStyles
