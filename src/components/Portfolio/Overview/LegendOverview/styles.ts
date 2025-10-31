import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  container: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: '',
    width: '100%',
    flexShrink: 1
  },
  scrollContainer: {
    boxSizing: 'border-box',
    maxWidth: 400,
    flexShrink: 1,
    alignSelf: 'flex-end',
    width: '100%',
    marginRight: 10,
    marginTop: '8px',
    marginLeft: '0 !important',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: colors.invariant.componentDark
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.invariant.pink,
      borderRadius: '4px'
    }
  },
  tokenHeaderLabel: {
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  tokenRow: {
    paddingTop: '6px !important',
    paddingBottom: '6px !important',
    marginRight: 10,
    display: 'flex',
    paddingRight: '10px',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between'
    },
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
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  logo: {
    width: '25px',
    height: '25px',
    borderRadius: '100%'
  },
  valueText: {
    ...typography.heading4,
    color: colors.invariant.text,
    textAlign: 'right'
  },
  warningIcon: {
    width: 12,
    position: 'absolute',
    bottom: -3,
    left: 16
  }
}))
