import { makeStyles } from '@material-ui/core/styles'
import { colors, theme } from '@static/theme'

const useStyles = makeStyles(() => ({
  icon: {
    maxHeight: '100%',
    scale: '1.5',
    marginRight: 40
  },
  jupiterTooltip: {
    color: '#A9B6BF',
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    maxWidth: 376,
    boxSizing: 'border-box',

    [theme.breakpoints.down('xs')]: {
      maxWidth: 360
    }
  },
  jupiterTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: 24
  },
  jupiterStatus: {
    marginBottom: 16,
    color: '#fff'
  },
  jupiterDesc: {
    marginBottom: 16,
    fontWeight: 400
  },
  jupiterRequirements: {
    listStyleType: 'disc',
    paddingLeft: 32
  },
  jupiterRequirement: {
    display: 'list-item',
    paddingLeft: 0,
    '&::marker': {
      fontSize: 12
    }
  },
  metaplexLink: {
    display: 'inline',
    color: '#EF84F5'
  }
}))

export default useStyles
