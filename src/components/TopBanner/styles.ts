import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const bannerHeight = 'fit-content'

const useStyles = makeStyles<{ isHiding: boolean }>()((theme, { isHiding }) => {
  return {
    background: {
      opacity: 0.7,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      background: colors.invariant.black
    },
    labelText: {
      fontSize: '14px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '16px'
      }
    },
    gridWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginRight: theme.spacing(3)
    },
    innerWrapper: {
      display: 'flex',
      alignItems: 'center',
      transform: isHiding ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.3s ease-in-out',
      position: 'relative',
      gap: '12px'
    },
    airdrop: {
      width: '24px',
      height: '24px',
      minWidth: '24px',
      objectFit: 'contain',
      marginRight: '12px'
    },
    close: {
      cursor: 'pointer',
      width: '11px',
      height: '11px',
      minWidth: '11px',
      [theme.breakpoints.down('sm')]: {
        width: '16px',
        height: '16px',
        minWidth: '16px'
      }
    },
    largeWrapper: {
      position: 'relative',
      background: colors.invariant.light,
      padding: isHiding ? '0px 0px' : '12px 16px',
      [theme.breakpoints.up('sm')]: {
        padding: isHiding ? '0px 0px' : '10px 25px'
      },
      width: '100%',
      maxWidth: '100%',
      height: isHiding ? '0px' : bannerHeight,
      display: 'flex',
      ...typography.body1,
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      color: colors.invariant.text,
      margin: isHiding ? '0' : undefined,
      overflow: 'hidden',
      opacity: isHiding ? 0 : 1,
      transition: 'all 0.3s ease-in-out',
      willChange: 'height, padding, margin'
    },
    text: {
      color: colors.invariant.pink,
      textDecoration: 'underline',
      marginLeft: '6px',
      cursor: 'pointer',
      ...typography.body1
    },
    container: {
      width: '100%',
      maxWidth: 512,
      position: 'fixed',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      left: '50%',
      zIndex: 1000
    },
    modal: {
      marginInline: 16,
      background: colors.invariant.component,
      padding: 24,
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      ...typography.body1,
      color: colors.invariant.text
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }
})

export default useStyles
