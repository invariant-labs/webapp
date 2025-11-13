import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

export const useStyles = makeStyles()(() => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    padding: 8,
    [theme.breakpoints.down(850)]: {
      padding: 0
    }
  },
  tooltip: {
    color: colors.invariant.text,
    width: '150px',
    background: colors.invariant.componentDark,
    borderRadius: 12
  },
  warningIcon: {
    width: 12,
    position: 'absolute',
    bottom: -2,
    right: -6
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
    marginBottom: theme.spacing(1)
  },
  tokenGrid: {
    marginTop: theme.spacing(1),
    marginLeft: '0 !important',
    overflowY: 'auto',
    height: 110,
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
    padding: 6,
    marginLeft: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:nth-child(1)': {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12
    },
    '&:nth-child(odd)': {
      backgroundColor: '#11193199'
    },
    '&:nth-child(even)': {
      backgroundColor: '#1119314D'
    },
    '&:last-child': {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderBottom: `0px ${colors.invariant.light} solid`
    },
    borderBottom: `1px ${colors.invariant.light} solid`
  },
  tokenLogoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tokenLogo: {
    width: '24px',
    height: '24px',
    borderRadius: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '22px',
      height: '22px'
    }
  },
  tokenSymbol: {
    marginLeft: '8px',
    ...typography.heading4,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  tokenValue: {
    ...typography.heading4,
    color: colors.invariant.text,
    textAlign: 'right',
    paddingLeft: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  }
}))
