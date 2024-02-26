import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography, colors } from '@static/theme'

const flexItems = {
  display: 'flex',
  alignItems: 'center'
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 20
  },
  liquidotyPositionBox: {
    ...flexItems,
    justifyContent: 'flex-start',
    width: '55%'
  },
  liquidotyPositionText: {
    color: colors.white.main
  },
  liquidottPositionNumber: {
    backgroundColor: colors.invariant.light,
    width: 30,
    height: 30,
    borderRadius: '100%',
    ...flexItems,
    color: colors.white.main,
    marginLeft: 5,
    justifyContent: 'center',
    ...typography.body3
  },
  actionItems: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  },
  optionToggleButton: {
    backgroundColor: colors.invariant.light,
    width: 90,
    ...flexItems,
    justifyContent: 'center',
    borderRadius: 15,
    padding: 2,
    height: 40,
    ...typography.caption1,
    textTransform: 'capitalize'
  },
  optionBox: {
    position: 'absolute',
    top: 185,
    left: 10,
    width: 132,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.invariant.component,
    padding: 10,
    borderRadius: 15,
    gap: 4
  },
  buttonSetItemPage: {
    width: '40px',
    textAlign: 'left',
    padding: '3px 0 3px 10px',
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: 5
  },
  positionContainer: {
    display: 'grid',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '5px',
    alignItems: 'center',
    backgroundColor: colors.invariant.component,
    borderRadius: 20,
    padding: 12,
    marginTop: 15,
    alignContent: 'center',

    [theme.breakpoints.up(900)]: {
      gridTemplateRows: 1,
      gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr 1fr',
      height: '50px'
    }
  },
  tokenSwapDisplay: {
    ...flexItems,
    justifyContent: 'space-between'
  },
  swapOptionDisplay: {
    ...flexItems,
    gridRow: 1,
    gridColumn: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.up(900)]: {
      gridColumn: 1,
      gridRow: 1
    }
  },
  backgroundCircle: {
    background: 'radial-gradient(#9AC8E9,#5B8DC8)',
    width: 35,
    height: 35,
    borderRadius: '100%'
  },
  horizonIconSwap: {
    color: colors.white.main
  },
  titleCurrency: {
    color: colors.white.main,
    textTransform: 'uppercase',
    gridRow: 1,
    gridColumn: '2 / span 2',
    textAlign: 'center',
    fontSize: '25px',
    [theme.breakpoints.up(900)]: {
      gridColumn: 2,
      gridRow: 1
    }
  },
  poolFeeDisplay: {
    gridRow: 1,
    gridColumn: 4,
    justifyContent: 'flex-end',
    display: 'flex',
    [theme.breakpoints.up(900)]: {
      gridColumn: 3,
      gridRow: 1
    }
  },
  iconJupiter: {
    marginRight: 5
  },
  containerInfoFee: {
    width: 50,
    padding: 6,
    borderRadius: 10
  },
  feeText: {
    ...typography.caption3
  },
  valueDisplayBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
  },
  exchangeRateValue: {
    gridRow: 2,
    gridColumn: '1 / span 2',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    padding: 5,
    [theme.breakpoints.up(900)]: {
      gridColumn: 4,
      gridRow: 1
    }
  },
  exchangeRateValueText: {
    color: colors.invariant.textGrey,
    ...typography.caption2
  },
  valueDisplayBox: {
    gridRow: 2,
    gridColumn: '3 / span 2',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    padding: 5,
    [theme.breakpoints.up(900)]: {
      gridColumn: 6,
      gridRow: 1
    }
  },
  valueText: {
    color: colors.invariant.textGrey,
    ...typography.caption2
  },
  greenText: {
    color: colors.invariant.green,
    textTransform: 'uppercase',
    ...typography.caption2
  },
  minMaxValueBox: {
    gridRow: 3,
    gridColumn: '1 / span 4',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingInline: 10,
    [theme.breakpoints.up(900)]: {
      gridColumn: 5,
      gridRow: 1,
      marginTop: 0
    }
  },
  valueBox: {
    width: '60%'
  },
  interactiveUIBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '40%'
  },
  inputContainer: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 5,
    width: '100%',
    padding: '3px 0 3px 10px'
  },
  inputStyles: {
    backgroundColor: colors.invariant.black,
    border: `1px solid ${colors.invariant.component}`,
    padding: 10,
    height: 40,
    borderRadius: 10,
    color: colors.invariant.light,
    width: '55%'
  },
  addPositionButton: {
    background: colors.invariant.pinkLinearGradient,
    height: 40,
    borderRadius: 13,
    ...typography.caption3,
    display: 'flex',
    alignItems: 'center'
  },
  noPositionOpenedbox: {
    display: 'grid',
    placeItems: 'center',
    padding: 50
  },
  noPositionOpenedText: {
    color: colors.white.main
  }
}))

export default useStyles
