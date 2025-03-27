import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.invariant.component,
      width: 310,
      borderRadius: 20,
      marginTop: 8,
      padding: 8
    },
    list: {
      alignContent: 'space-around',
      flexDirection: 'column',
      borderRadius: 5,
      marginTop: 7
    },
    labelWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    listItem: {
      color: colors.invariant.textGrey,
      background: colors.invariant.component,
      borderRadius: 11,
      padding: '6px 7px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: colors.invariant.light,
        color: colors.white.main,
        '@media (hover: none)': {
          color: colors.invariant.textGrey,
          background: colors.invariant.component
        }
      },
      '&first-of-type': {
        marginBottom: '4px'
      },
      '&:not(:first-of-type)': {
        margin: '4px 0'
      },
      '&:last-child': {
        marginTop: '4px'
      }
    },
    title: {
      ...typography.body1,
      margin: 10
    },
    dotIcon: {
      width: 12,
      marginLeft: 8,
      color: colors.invariant.green,
      visibility: 'hidden'
    },
    name: {
      textTransform: 'capitalize',
      ...typography.body2,
      paddingTop: '1px'
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    icon: {
      float: 'left',
      marginRight: 8,
      opacity: 1
    },
    active: {
      '& *': {
        opacity: 1,
        visibility: 'visible'
      }
    },
    activeBackground: {
      background: colors.invariant.light,
      color: colors.white.main
    },
    lowerRow: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginTop: 8,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      marginBottom: 10,
      backgroundColor: colors.invariant.newDark,
      borderRadius: 16
    },
    input: {
      backgroundColor: colors.invariant.newDark,
      width: '100%',
      height: 40,
      color: colors.white.main,
      padding: '8px 0',
      borderRadius: 16,
      ...typography.body2,
      marginRight: 6,
      '&::disabled': {
        color: colors.invariant.light,
        ...typography.body2
      },
      '&::placeholder': {
        color: colors.invariant.light,
        ...typography.body2
      },
      '&:focus': {
        outline: 'none'
      }
    },
    activePlaceholder: {
      '&:placeholder': {
        color: colors.invariant.light
      }
    },
    innerInput: {
      padding: '8px 10px',
      '&::disabled': {
        color: colors.invariant.light,
        ...typography.body2
      },
      '&::placeholder': {
        color: colors.invariant.light,
        ...typography.body2
      },
      '&:focus': {
        outline: 'none'
      }
    },
    add: {
      minWidth: 50,
      height: 30,
      background: colors.invariant.greenLinearGradient,
      ...typography.body2,
      color: colors.invariant.black,
      textTransform: 'none',
      borderRadius: 9,
      marginRight: 8,

      '&:disabled': {
        background: colors.invariant.light,
        color: colors.invariant.black
      }
    },
    applied: {
      background: colors.invariant.light,
      color: colors.invariant.text,
      padding: '6px 12px',
      '&:hover': {
        background: colors.invariant.light,
        color: colors.invariant.text,
        cursor: 'default'
      }
    },
    warningIcon: {
      height: 16,
      marginRight: 4
    },
    warningText: {
      ...typography.caption2,
      color: colors.invariant.yellow
    },
    recommendedText: {
      ...typography.caption3,
      color: colors.white.main
    },
    warningContainer: {
      padding: '0 8px',
      display: 'flex'
    },
    rpcContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }
})

export default useStyles
