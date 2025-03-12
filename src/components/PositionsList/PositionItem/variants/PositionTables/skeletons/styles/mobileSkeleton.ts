import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
export const useMobileSkeletonStyles = makeStyles()(() => ({
  card: {
    height: '290px',
    [theme.breakpoints.between('sm', 'lg')]: {
      padding: '16px',
      paddingTop: '16px'
    },
    padding: '8px',
    background: colors.invariant.component,
    borderRadius: '24px',
    '&:first-child': {
      marginTop: '16px'
    },
    marginBottom: '16px'
  },

  mobileCardSkeletonHeader: {
    display: 'flex',
    alignItems: 'center',
    height: '36px'
  },
  basicSkeleton: {
    borderRadius: '10px',
    margin: '0 auto'
  },
  circularSkeleton: {
    width: '28px',
    height: '28px',
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '40px',
      height: '40px'
    }
  },
  circularSkeletonSmall: {
    width: '24px',
    height: '24px',
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '30px',
      height: '30px'
    }
  },

  tokenIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  chartContainer: {
    width: '80%',
    margin: '0 auto'
  }
}))
