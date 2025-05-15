import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{
  isMobile: boolean
  borderTop: boolean
}>()((_theme, { isMobile, borderTop }) => ({
  labelText: {
    position: isMobile ? 'relative' : 'absolute',
    ...(isMobile ? {} : { right: 24 }),
    color: colors.invariant.textGrey,
    whiteSpace: 'nowrap',
    textAlign: isMobile ? 'center' : 'right'
  },
  pagination: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderTop: `${borderTop ? 1 : 0}px solid ${colors.invariant.light}`,
    padding: '20px 24px 10px 24px',
    maxWidth: '100%',
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    [theme.breakpoints.down('lg')]: {
      padding: '20px 12px',
      flexDirection: 'column'
    }
  }
}))

export default useStyles
