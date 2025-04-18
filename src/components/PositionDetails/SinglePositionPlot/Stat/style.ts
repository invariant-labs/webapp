import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

type Props = {
  isHorizontal: boolean
}

export const useStyles = makeStyles<Props>()((_theme, { isHorizontal }) => ({
  container: {
    width: '100%',
    background: colors.invariant.newDark,
    borderRadius: 12,
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column'
  },
  name: {
    height: 40,
    color: colors.invariant.textGrey,
    background: colors.invariant.light,
    borderRadius: 12,
    ...typography.body2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isHorizontal ? '0 14px' : 0
  },
  value: {
    flexGrow: 1,
    height: 40,
    color: colors.invariant.textGrey,
    ...typography.body1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  skeleton: {
    alignSelf: 'center',
    margin: 'auto',
    width: 100,
    height: 27
  }
}))
