import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '370px',
    position: 'absolute',
    zIndex: 14
  },
  root: {
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    width: '100%',
    height: '100%'
  },
  img: {
    paddingBottom: 25
  },
  blur: {
    width: '100%',
    height: '370px',
    backgroundColor: 'rgba(12, 11, 13, 0.8)',
    filter: 'blur(4px) brightness(0.4)',
    position: 'absolute',
    zIndex: 13
  },
  desc: {
    ...newTypography.body2,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightHover
  },
  button: {
    height: 40,
    width: 200,
    marginTop: 20,
    color: colors.invariant.componentBcg,
    ...newTypography.body1,
    textTransform: 'none',
    borderRadius: 14,
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',

    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
      boxShadow: `0 0 5px ${colors.invariant.pink}`
    }
  }
}))

export default useStyles
