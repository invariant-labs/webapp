import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((_theme: Theme) => ({
  container: {
    marginTop: '16px'
  },
  scrollContainer: {
    width: '97%',
    marginTop: '8px',
    marginLeft: '0 !important',
    '&::-webkit-scrollbar': {
      padding: '4px',
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
    paddingLeft: '0 !important',
    display: 'flex',
    paddingRight: '10px',
    maxHeight: '32px',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'space-between'
    },
    justifyContent: 'flex-start'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '24px',
    height: '24px',
    borderRadius: '100%'
  },
  valueText: {
    ...typography.heading4,
    color: colors.invariant.text,
    textAlign: 'right'
  }
}))
