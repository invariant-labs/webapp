import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.newDark,
    padding: 12,
    borderRadius: 12
  },
  tokenName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.invariant.light,
    borderRadius: 12,
    padding: '8px 12px',
    gap: 8,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-3%'
  },
  icon: {
    borderRadius: '100%',
    height: 20,
    width: 20
  },
  separator: {
    borderBottom: `1px solid ${colors.invariant.light}`,
    width: '100%',
    margin: '12px 0'
  },
  addressIcon: {
    display: 'flex',
    alignItems: 'center',
    height: 20,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export default useStyles
