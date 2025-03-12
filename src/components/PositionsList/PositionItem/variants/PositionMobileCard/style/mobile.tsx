import { Theme } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useMobileStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: 16,
    height: '290px',
    marginTop: '16px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      padding: 8
    },
    background: colors.invariant.component,
    borderRadius: 24,
    '&:not(:last-child)': {
      marginBottom: 20
    },
    '&:hover': {
      background: `${colors.invariant.component}B0`
    }
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '8px',
    alignItems: 'center'
  },
  minMax: {
    background: colors.invariant.light,
    borderRadius: 11,
    height: 36,
    paddingInline: 10,
    width: '100%',
    marginRight: 0,
    marginTop: '8px'
  },
  button: {
    minWidth: '36px',
    width: '36px',
    height: '36px',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #2EE09A 0%, #21A47C 100%)',
    borderRadius: '16px',
    color: colors.invariant.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(180deg, #3FF2AB 0%, #25B487 100%)',
      boxShadow: '0 4px 15px rgba(46, 224, 154, 0.35)'
    }
  },

  mdInfo: {
    flexWrap: 'wrap',
    width: '100%'
  },
  mdTop: {
    justifyContent: 'space-between',
    width: '100%'
  },
  iconsAndNames: {
    display: 'flex'
  }
}))
