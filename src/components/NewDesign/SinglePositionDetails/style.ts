import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
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
  text: {
    ...newTypography.body1,
    color: colors.invariant.lightInfoText,
    backgroundColor: colors.invariant.componentOut2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    maxHeight: 35,
    padding: '4px 16px 3px 16px'
  },
  rangeGrid: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '3px'
  },
  feeText: {
    minWidth: '110px'
  },
  closedText: {
    width: '100px',
    paddingRight: 0
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
    ...newTypography.heading1,
    color: colors.white.main
  },
  bottomGrid: {
    background: colors.invariant.componentOut4,
    marginTop: 20,
    padding: 24,
    borderRadius: '10px'
  },
  iconSmall: {
    width: '16px'
  },
  boxInfo: {
    color: colors.invariant.componentIn2,
    borderRadius: '8px'
  },
  title: {
    ...newTypography.body1,
    color: colors.white.main
  },
  titleValue: {
    ...newTypography.heading3,
    color: colors.white.main
  },
  tokenGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tokenArea: {
    backgroundColor: colors.invariant.componentOut2,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row'
  },
  token: {
    backgroundColor: colors.invariant.componentOut3,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row'
  },
  tokenName: {
    color: colors.invariant.lightInfoText
  },
  tokenValue: {
    color: colors.white.main
  }
}))

export default useStyles
