import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

export const useStyles = makeStyles()(() => ({
  container: {
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center'
  },
  tooltip: {
    color: colors.invariant.text,
    width: '150px',
    background: colors.invariant.componentDark,
    borderRadius: 12
  },
  chartContainer: {
    height: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: '12px'
  },
  tokenSection: {
    marginTop: theme.spacing(2)
  },
  tokenTitle: {
    ...typography.body2,
    fontWeight: 600,
    color: colors.invariant.textGrey,
    marginBottom: theme.spacing(2)
  },
  tokenGrid: {
    marginTop: theme.spacing(1),
    marginLeft: '0 !important',
    overflowY: 'auto',
    height: 96,
    paddingRight: '8px',
    marginRight: '-4px',
    marginBottom: '5px',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: colors.invariant.newDark
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.invariant.pink,
      borderRadius: '4px'
    }
  },
  tokenGridItem: {
    paddingLeft: '0',
    marginLeft: '0',
    display: 'flex',
    height: '24px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  tokenLogoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tokenLogo: {
    width: '24px',
    height: '24px',
    borderRadius: '100%'
  },
  tokenSymbol: {
    marginLeft: '8px',
    ...typography.heading4
  },
  tokenValue: {
    ...typography.heading4,
    color: colors.invariant.text,
    textAlign: 'right',
    paddingLeft: '8px'
  }
}))
