import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

export const useMobileSkeletonStyle = makeStyles()(() => ({
  container: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  chartContainer: {
    height: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  skeletonSegment: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  tokenLabelContainer: {
    height: '161px',
    marginTop: theme.spacing(2)
  },
  tokenTextSkeleton: {
    marginBottom: theme.spacing(2),
    width: '60px',
    height: '24px'
  },
  tokensHeaderLabel: {
    ...typography.body2,
    fontWeight: 600,
    color: colors.invariant.textGrey
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
    marginBottom: theme.spacing(1)
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
