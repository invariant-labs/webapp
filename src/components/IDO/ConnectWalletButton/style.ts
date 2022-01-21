import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    width:"368px",
    height: "44px",
    borderRadius: "16px",
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    background: "linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 80%)",
  
    padding: '10px 14px',
    '&:hover': {
      boxShadow: "0px 0px 16px rgba(239, 132, 245, 0.35)",
      background: "linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)"
    }
  },
  disabled: {
    background: `${colors.invariant.componentOut3} !important`,
    color: `${colors.invariant.background2} !important`
  }
}))

export default useStyles
