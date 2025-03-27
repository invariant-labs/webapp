import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapperContainer: {
    width: 1004,
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'nowrap',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  positionDetails: {
    width: 517,
    marginRight: 24,
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },

    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },
  right: {
    width: 517,
    flexDirection: 'column',
    alignItems: 'flex-end',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  back: {
    height: 40,
    alignItems: 'center',
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(2)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: 'rgba(169, 182, 191, 1)',
    WebkitPaddingBefore: '2px',
    ...typography.body2
  },
  button: {
    color: colors.invariant.black,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 14,
    height: 40,
    width: 130,
    paddingRight: 9,
    paddingLeft: 9,
    letterSpacing: -0.03,
    transition: '300ms',
    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`,
      '@media (hover: none)': {
        background: colors.invariant.pinkLinearGradientOpacity,
        boxShadow: 'none'
      }
    }
  },
  buttonStartIcon: {
    marginRight: 0
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  backContainer: {
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  positionPlotWrapper: {
    width: '100%',
    marginTop: 30,

    [theme.breakpoints.down('md')]: {
      marginTop: 0
    }
  },
  marketIdWithRefresher: {
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'space-between'
    }
  },
  marketIDWrapper: {
    display: 'flex',
    padding: '8px 8px  0 0px',
    height: '24px',
    minWidth: '290px'
  },
  newTab: {
    width: 14,
    height: 14,
    transform: 'translateY(-2px)'
  },
  refreshWrapper: {
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  rightHeaderWrapper: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginTop: '22px',
    flexWrap: 'nowrap',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0
    }
  },
  link: {
    maxHeight: 14,
    height: 14,
    width: 14,

    '&:hover': {
      filter: 'brightness(1.2)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  }
}))
