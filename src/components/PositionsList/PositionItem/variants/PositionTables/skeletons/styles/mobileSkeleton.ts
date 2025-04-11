import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
export const useMobileSkeletonStyles = makeStyles()(() => ({
  card: {
    height: '253px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      height: '265px'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      padding: '16px',
      paddingTop: '16px'
    },
    padding: '8px',
    background: colors.invariant.component,
    borderRadius: '24px',
    '&:first-of-type': {
      marginTop: '16px'
    },
    marginBottom: '16px'
  },
  skeletonText: {
    width: 120,
    height: 24,
    marginLeft: '8px'
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  skeleton36x100: {
    width: '100%',
    height: 36,
    borderRadius: '10px',
    margin: '0 auto'
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px'
  },
  tokenIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  chartContainer: {
    width: '80%',
    margin: '0 auto',
    justifyContent: 'center'
  },
  skeleton36x36: {
    width: 32,
    height: 32,
    marginLeft: '16px',
    borderRadius: '12px'
  },
  skeleton40x100: {
    width: '100%',
    height: 40,
    borderRadius: '12px',
    marginTop: '18px'
  }
}))
