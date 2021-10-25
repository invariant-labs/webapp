import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.component,
    borderRadius: '10px',
    padding: '20px 17px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  iconsGrid: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {},
  namesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    '& #pauza': {
      padding: ' 0px 3px'
    }
  },
  name: {
    ...typography.heading2,
    color: '#FFFFFF'
  },
  leftGrid: {
    display: 'flex',
    flexDirection: 'row'
  },
  pauseIcon: {
    color: '#FFFFFF'
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '3px 0'
  },
  text: {
    fontSize: 16,
    lineHeight: '28px',
    fontWeight: 600,
    color: '#7F768F',
    backgroundColor: '#34303B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px'
  },

  rangeGrid: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10,
    '& #fee': {
      minWidth: '110px'
    },
    '& #min': {
      minWidth: '175px'
    },
    '& #max': {
      minWidth: '175px'
    }
  },
  button: {
    backgroundColor: '#9DD46D',
    color: '#34303B',
    fontSize: 16,
    lineHeight: '28px',
    fontWeight: 600,
    '&[id=active]': {
      textTransform: 'none'
    },
    '&[id=closed]': {
      backgroundColor: '#34303B',
      color: '#7F768F',
      textTransform: 'none'
    }
  }
}))
export default useStyles
