import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    borderRadius: 10,
    width: 519
  },
  header: {
    ...newTypography.body1,
    color: '#FFFFFF',
    paddingBottom: 14
  },
  plotWrapper: {
    paddingBottom: 25
  },
  minMaxInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    paddingBottom: 25
  },
  currentPriceLabel: {
    backgroundColor: colors.invariant.componentOut3,
    color: colors.invariant.lightInfoText,
    textAlign: 'center',
    '& p' : {
      ...newTypography.body1,
      textTransform: 'uppercase',
      lineHeight: '35px'
    }
  },
  currentPriceAmonut: {
    backgroundColor: colors.invariant.componentOut2,
    textAlign: 'center',
    '& span': {
      color: '#FFFFFF',
      ...newTypography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: colors.invariant.lightInfoText,
      ...newTypography.body1,
    }
  }
}))

export default useStyles
