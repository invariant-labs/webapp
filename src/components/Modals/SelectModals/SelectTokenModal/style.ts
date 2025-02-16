import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    popover: {
      marginTop: 'max(calc(50vh - 350px), 0px)',
      marginLeft: 'calc(50vw - 251px)',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        marginLeft: 'auto',
        justifyContent: 'center'
      }
    },
    container: {
      overflow: 'hidden',
      padding: 24,
      backgroundColor: colors.invariant.component,
      borderRadius: 20,
      width: 500,
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100vw',
        padding: '20px 16px'
      },
      '.MuiFormControlLabel-label': {
        color: colors.invariant.lightGrey,
        transform: 'translateY(1.5px)'
      },
      '& .MuiCheckbox-root': {
        color: colors.invariant.lightGrey
      },
      '& .MuiCheckbox-root.Mui-checked': {
        color: colors.green.button
      }
    },
    selectTokenHeader: {
      width: '100%',
      paddingBottom: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& h1': {
        ...typography.heading4
      }
    },
    inputControl: {
      width: '100%',
      position: 'relative'
    },
    selectTokenClose: {
      minWidth: 0,
      height: 20,
      '&:after': {
        content: '"\u2715"',
        fontSize: 22,
        position: 'absolute',
        color: 'white',
        top: '50%',
        right: '0%',
        transform: 'translateY(-50%)'
      }
    },
    selectTokenInput: {
      backgroundColor: colors.invariant.newDark,
      width: '100%',
      ...typography.body3,
      position: 'relative',
      color: 'white',
      border: `1px solid ${colors.invariant.newDark}`,
      borderColor: colors.invariant.newDark,
      borderRadius: 15,
      padding: '13px 44px 13px 10px !important',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: 32,

      '&::placeholder': {
        color: colors.invariant.light,
        ...typography.body3
      },
      '&:focus': {
        outline: 'none'
      }
    },
    inputIcon: {
      position: 'absolute',
      width: 24,
      height: 26,
      right: '12px',
      top: '14px'
    },
    commonTokensHeader: {
      ...typography.body2
    },
    commonTokensList: {
      display: 'flex',
      flexFlow: 'row wrap'
    },

    commonTokenItem: {
      minWidth: 'auto',
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      background: colors.invariant.newDark,
      borderRadius: 12,
      padding: '8px 12px',
      marginRight: 6,
      marginBottom: 8,
      '& p': {
        ...typography.body3,
        fontWeight: 400
      },

      '&:hover': {
        background: colors.invariant.light,
        '@media (hover: none)': {
          background: colors.invariant.newDark
        }
      }
    },
    commonTokenIcon: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      marginRight: 8
    },
    tokenList: {
      background: colors.invariant.component,
      borderTop: `1px solid ${colors.invariant.light}`,
      width: 451,
      height: 400,
      paddingTop: 8,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width: 501
      }
    },

    tokenContainer: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 'min-content'
    },

    tokenItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4,
      borderRadius: 24,
      cursor: 'pointer',
      padding: '0 16px ',

      '& > p': {
        whiteSpace: 'nowrap'
      },

      '&:hover': {
        background: colors.invariant.light,
        borderRadius: 24
      }
    },
    tokenName: {
      color: colors.white.main,
      ...typography.heading4
    },
    tokenAddress: {
      backgroundColor: colors.invariant.newDark,
      borderRadius: 4,
      padding: '2px 4px',
      width: 'min-content',
      height: 'min-content',
      '& a': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        textDecoration: 'none',

        '&:hover': {
          filter: 'brightness(1.2)',
          '@media (hover: none)': {
            filter: 'none'
          }
        },
        '& p': {
          color: colors.invariant.lightGrey,
          ...typography.caption4,
          letterSpacing: '0.03em'
        }
      }
    },
    tokenDescrpiption: {
      color: colors.invariant.textGrey,
      ...typography.caption2,
      lineHeight: '16px',
      whiteSpace: 'nowrap'
    },
    tokenBalanceStatus: {
      color: colors.invariant.textGrey,
      maxHeight: 40,
      '& p': {
        ...typography.body2
      },

      '& p:last-child': {
        color: colors.invariant.text
      }
    },

    tokenIcon: {
      minWidth: 30,
      maxWidth: 30,
      height: 30,
      marginRight: 16,
      borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(216, 255, 181, 0.5)'
    },
    tokenBalance: {
      ...typography.body2,
      color: colors.invariant.textGrey,
      whiteSpace: 'nowrap'
    },
    searchIcon: {
      color: colors.invariant.light
    },

    hideScroll: {
      '& > *:first-of-type': {
        overflow: 'auto !important'
      },
      overflow: 'visible !important'
    },

    scrollbarThumb: {
      backgroundColor: colors.invariant.pink + '!important',
      borderRadius: 10,
      width: 5
    },
    scrollbarTrack: {
      background: '#111931',
      borderRadius: 10,
      height: '98%',
      margin: 5,
      width: 5,
      transform: 'translateX(20px)'
    },
    scrollbarView: {
      padding: 0 + '!important',
      width: 'calc(100% + 50px)'
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none',
      maxWidth: 500,
      maxHeight: '100vh',
      '&::-webkit-scrollbar': {
        width: 6,
        background: colors.invariant.component
      },
      '&::-webkit-scrollbar-thumb': {
        background: colors.invariant.light,
        borderRadius: 6
      }
    },
    clearIcon: {
      minWidth: 12,
      height: 12,
      marginLeft: 8,
      cursor: 'pointer'
    },
    dualIcon: {
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content'
    },
    secondIcon: {
      marginLeft: -15,
      marginRight: 14
    },
    button: {
      ...typography.body2,
      padding: 0,
      textTransform: 'none',
      boxShadow: 'none',
      borderRadius: 5,
      backgroundColor: colors.invariant.component,
      color: colors.invariant.textGrey,
      height: 26,
      width: '100%',
      textAlign: 'center',
      marginTop: 4,
      '&:hover': {
        backgroundColor: colors.invariant.light,
        boxShadow: 'none',
        color: colors.white.main,
        '@media (hover: none)': {
          backgroundColor: colors.invariant.component,
          color: colors.invariant.textGrey
        }
      },
      '&:hover span': {
        color: colors.white.main
      }
    },
    filterList: {
      borderRadius: 5,
      background: colors.invariant.component,
      minWidth: 100,
      height: 102,
      padding: 4
    },
    filterListText: {
      borderRadius: 5,
      background: colors.invariant.component,
      minWidth: 115,
      height: 102,
      padding: 4
    },
    filterItem: {
      margin: '2px 0',
      borderRadius: 5,
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        background: colors.invariant.component
      }
    },
    filterItemText: {
      margin: '2px 0',
      borderRadius: 5,
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        background: colors.invariant.light
      }
    },
    filterNameText: {
      position: 'absolute',
      left: 6,
      color: colors.invariant.textGrey,
      ...typography.body2
    },
    filterName: {
      color: colors.invariant.textGrey,
      position: 'absolute',
      left: 28,
      ...typography.body2
    },
    filterIcon: {
      width: 10,
      height: 10,
      position: 'absolute',
      left: 5,
      top: 8
    },
    popoverSort: {
      background: 'transparent',
      boxShadow: 'none',
      minWidth: 102,
      position: 'absolute'
    },
    topRow: {
      marginBottom: 20
    },
    addIcon: {
      marginLeft: 10,
      cursor: 'pointer',
      fontSize: 28
    },
    noTokenFoundPlaceholder: {
      ...typography.body2,
      fontWeight: 500,
      lineHeight: '20px',
      color: colors.invariant.lightHover
    },
    addTokenButton: {
      height: 40,
      width: 200,
      marginTop: 20,
      color: colors.invariant.componentBcg,
      ...typography.body1,
      textTransform: 'none',
      borderRadius: 14,
      background: colors.invariant.pinkLinearGradientOpacity,

      '&:hover': {
        background: colors.invariant.pinkLinearGradient,
        boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)',
        '@media (hover: none)': {
          background: colors.invariant.pinkLinearGradientOpacity,
          boxShadow: 'none'
        }
      }
    },
    noTokenFoundContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 32
    },
    img: {
      paddingBottom: 25
    }
  }
})

export default useStyles
