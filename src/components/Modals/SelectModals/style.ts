import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  popover: {
    marginTop: 'calc(50vh - 258px)',
    marginLeft: 'calc(50vw - 231px)'
  },
  root: {
    background: colors.navy.component,
    width: 456,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 3,
    paddingInline: 15,
    paddingBlock: 20
  },
  tokenList: {
    borderRadius: 10,
    background: colors.navy.dark,
    height: 376,
    padding: 5,
    overflowY: 'hidden',
    width: 'calc(100% - 10px)'
  },
  tokenItem: {
    margin: 5,
    marginBottom: 14,
    borderRadius: 10,
    width: 392,
    height: 62,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  tokenName: {
    color: colors.navy.veryLightGrey,
    ...typography.heading3
  },
  tokenData: {
    position: 'relative',
    top: -2
  },
  tokenDescrpiption: {
    color: colors.navy.grey,
    ...typography.body4,
    position: 'relative',
    top: -4,
    whiteSpace: 'nowrap'
  },
  tokenIcon: {
    width: 48,
    height: 48,
    marginLeft: 6,
    marginRight: 14
  },
  tokenBalance: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    whiteSpace: 'nowrap'
  },
  searchIcon: {
    color: colors.navy.grey,
    margin: 8
  },
  searchInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    height: 46,
    paddingLeft: 16,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    ...typography.body2
  },
  hideScroll: {
    '& > *:first-child': {
      paddingRight: '20px'
    }
  },
  scrollbarThumb: {
    background: colors.green.main,
    borderRadius: 10,
    width: 9
  },
  scrollbarTrack: {
    background: colors.navy.navButton,
    borderRadius: 10,
    height: '96%',
    margin: 5,
    float: 'right',
    width: 9
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 456
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
  }
}))

export default useStyles
