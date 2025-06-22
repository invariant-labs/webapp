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
export const useMobileSkeletonStyle = makeStyles()(() => ({
  container: {
    width: '100%'
  },
  chartContainer: {
    height: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: '28px'
  },
  skeletonSegment: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  tokenLabelContainer: {
    height: '137px',
    marginTop: theme.spacing(2)
  },
  tokenTextSkeleton: {
    marginBottom: '11px',
    width: '60px',
    height: '24px',
    ...typography.body2,
    color: colors.invariant.textGrey,
    fontWeight: 600
  },
  gridContainer: {
    marginTop: theme.spacing(1),
    width: '100% !important',
    maxHeight: '120px',
    marginLeft: '0 !important',
    overflowY: 'auto',
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
  gridItem: {
    paddingLeft: '0 !important',
    marginLeft: '0 !important',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1)
  },
  logoSkeleton: {
    width: '24px',
    height: '24px',
    borderRadius: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  tokenSymbolSkeleton: {
    width: '40px',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  valueSkeleton: {
    width: '100%',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: '8px'
  }
}))
