import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.invariant.componentOut4,
    padding: 24,
    borderRadius: 10,
    width: 519
  },
  header: {
    ...typography.body1,
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
      ...typography.body1,
      textTransform: 'uppercase',
      lineHeight: '35px'
    }
  },
  currentPriceAmonut: {
    backgroundColor: colors.invariant.componentOut2,
    textAlign: 'center',
    '& span': {
      color: '#FFFFFF',
      ...typography.body1,
      lineHeight: '35px',
      paddingRight: 5
    },
    '& p': {
      color: colors.invariant.lightInfoText,
      ...typography.body1,
    }
  }
}))

export default useStyles
