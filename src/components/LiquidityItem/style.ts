import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.componentOut1,
    borderRadius: '10px',
    padding: '15px 17px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  iconsGrid: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '40px'
  },
  arrowIcon: {
    width: '25px'
  },
  namesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    '& #pause': {
      padding: ' 0px 3px'
    }
  },
  name: {
    ...typography.heading1,
    color: colors.white.main
  },
  leftGrid: {
    display: 'flex',
    flexDirection: 'row'
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '3px 0',
    alignItems: 'center'
  },
  text: {
    ...typography.body1,
    color: colors.invariant.lightInfoText,
    backgroundColor: colors.invariant.componentOut2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    maxHeight: 35,
    padding: '4px 0 3px 0'
  },
  feeText: {
    width: 110,
    maxWidth: 110
  },
  minText: {
    width: 175,
    maxWidth: 175
  },
  maxText: {
    width: 175,
    maxWidth: 175
  },

  activeText: {
    width: '100px',
    paddingLeft: 0,
    paddingRight: 0
  },

  rangeGrid: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10
  },
  closedText: {
    width: '100px',
    paddingRight: 0
  },
  greenArea: {
    backgroundColor: colors.invariant.accent2,
    minWidth: '60px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 35,
    padding: '3px 0'
  },
  greenTextArea: {
    color: colors.invariant.componentOut2,
    ...typography.body1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    WebkitPaddingBefore: '2px'
  },

  iconText: {
    paddingRight: 10,
    width: 19,
    height: 19
  }
}))
export default useStyles
