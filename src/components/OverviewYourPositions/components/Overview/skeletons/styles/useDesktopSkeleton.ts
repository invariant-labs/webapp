import { makeStyles } from 'tss-react/mui'
import { colors, typography, theme } from '@static/theme'

export const useDesktopSkeleton = makeStyles()(() => ({
  container: {
    marginTop: theme.spacing(2)
  },
  tokenText: {
    ...typography.body2,
    color: colors.invariant.textGrey
  },
  gridContainer: {
    minHeight: '120px',
    overflowY: 'auto',
    marginLeft: '0 !important',
    marginTop: '8px',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.invariant.pink,
      borderRadius: '4px'
    }
  },
  gridItem: {
    paddingLeft: '0 !important',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'space-between'
    }
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  circularSkeleton: {
    backgroundColor: colors.invariant.light
  },
  textSkeleton: {
    backgroundColor: colors.invariant.light,
    ...typography.heading4
  },
  valueContainer: {
    marginLeft: '8px',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))
