import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: '#3A466B',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    padding: 12
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '28px',
    color: '#fff'
  },
  titleEmpty: {
    color: 'rgba(255, 255, 255, 0.36)'
  },
  subtitle: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2EE09A'
  },
  currencyIcon: {
    minWidth: 28,
    height: 28,
    margin: '0 auto 0 12px',
    borderRadius: '100%'
  },
  currencyIconSmall: {
    minWidth: 18,
    height: 18,
    margin: '0 0 0 8px',
    borderRadius: '100%'
  },
  currencyIconGradient: {
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
    width: 28,
    height: 28,
    borderRadius: '50%',
    margin: '0 auto 0 12px'
  },
  currencyIconGradientSmall: {
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
    minWidth: 18,
    height: 18,
    borderRadius: '50%',
    margin: '0 0 0 8px'
  }
}))

export default useStyles
