import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 1122,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  header: {
    paddingBottom: 28
  },
  title: {
    color: colors.invariant.text,
    ...newTypography.heading4,
    fontWeight: 700
  },
  button: {
    color: '#111931',
    ...newTypography.body1,
    textTransform: 'none',
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',
    borderRadius: 14,
    height: 40,
    width: 130,
    paddingInline: 0,

    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%);',
      boxShadow: `0 0 16px ${colors.invariant.pink}`
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  noPositionsText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.white.main
  },
  list: {
    position: 'relative'
  },
  itemLink: {
    textDecoration: 'none',

    '&:not(:last-child)': {
      display: 'block',
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 16
      }
    }
  }
}))

export default useStyles
