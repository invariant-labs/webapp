import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    headerButton: {
      background: 'transparent',
      color: colors.white.main,
      paddingInline: 12,
      borderRadius: 12,
      textTransform: 'none',
      ...typography.body1,
      height: 32,
      transition: '300ms',
      boxShadow: 'none',
      '&:hover': {
        background: colors.invariant.light,
        '@media (hover: none)': {
          background: 'transparent'
        }
      },

      '&:active': {
        '& #downIcon': {
          transform: 'rotateX(180deg)'
        }
      },
      [theme.breakpoints.down('sm')]: {
        paddingInline: 6
      }
    },
    labelWrapper: {
      color: colors.invariant.textGrey,
      ...typography.caption4,
      marginTop: '4px',
      textAlign: 'left'
    },
    tileWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    },
    label: {
      WebkitPaddingBefore: '2px'
    },
    headerButtonConnect: {
      background: colors.invariant.pinkLinearGradientOpacity,
      color: colors.invariant.newDark,
      paddingInline: 12,
      borderRadius: 14,
      textTransform: 'none',
      ...typography.body1,
      height: 40,
      minWidth: 130,
      transition: '300ms',

      [theme.breakpoints.down('xs')]: {
        minWidth: 100,
        width: 130
      },

      '&:hover': {
        boxShadow: `0 0 15px ${colors.invariant.light}`,
        backgroundColor: colors.invariant.light,
        '@media (hover: none)': {
          background: colors.invariant.pinkLinearGradientOpacity,
          boxShadow: 'none'
        }
      }
    },
    headerButtonConnected: {
      background: colors.invariant.light,
      color: colors.white.main,
      paddingInline: 12,
      borderRadius: 14,
      textTransform: 'none',
      ...typography.body1,
      height: 40,

      '&:hover': {
        background: colors.blue.deep,
        '@media (hover: none)': {
          background: colors.invariant.light
        }
      }
    },
    headerButtonTextEllipsis: {
      textTransform: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...typography.body1,
      whiteSpace: 'nowrap'
    },
    disabled: {
      opacity: 0.5
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    startIcon: {
      marginLeft: 0,
      marginBottom: 3
    },
    endIcon: {
      minWidth: 20,
      marginTop: 2
    },
    innerEndIcon: {
      marginLeft: 0,
      marginBottom: 3
    },
    warningIcon: {
      height: 16,
      marginRight: 4
    },
    pointsHeaderButton: {
      textTransform: 'none',
      boxSizing: 'border-box',
      minWidth: '10px',
      height: '40px',
      background: colors.invariant.newDark,
      boxShadow: '0px 0px 5px 5px #2A365C',
      borderRadius: '14px',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '-0.03em',
      textWrap: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '12px',
      marginRight: '12px',
      border: '2px solid transparent',
      backgroundImage: 'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #2EE09A, #EF84F5)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      color: colors.invariant.text,
      transition: '300ms',

      [theme.breakpoints.down('sm')]: {
        padding: '0px 2px'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        padding: '0px 20px'
      }
    }
  }
})

export default useStyles
