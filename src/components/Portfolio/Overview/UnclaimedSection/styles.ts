import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 251
  },
  unclaimedSection: {
    display: 'flex',

    flexDirection: 'column',
    gap: '16px',
    minHeight: '32px',
    [theme.breakpoints.down(850)]: {
      maxHeight: '58px',
      gap: '8px'
    },

    [theme.breakpoints.up(850)]: {
      height: '57.5px',
      padding: '0px 24px 0px 24px',
      borderTop: `1px solid  ${colors.invariant.light}`,
      borderBottom: `1px solid  ${colors.invariant.light}`,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },

  titleRow: {
    height: 28,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'space-between',

    [theme.breakpoints.up(850)]: {
      gap: 'auto',
      flex: 1
    }
  },

  unclaimedTitle: {
    ...typography.heading4,
    fontSize: 18,
    color: colors.invariant.textGrey,
    [theme.breakpoints.down(850)]: {
      fontSize: 16
    }
  },

  unclaimedAmount: {
    ...typography.heading4,
    fontSize: 18,
    color: colors.invariant.text,
    [theme.breakpoints.down(850)]: {
      fontSize: 16
    }
  }
}))
