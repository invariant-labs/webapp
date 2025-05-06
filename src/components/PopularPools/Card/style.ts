import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: { width: '226px' },
  container: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    padding: '20px',
    alignItems: 'center',
    flexDirection: 'column'
  },
  skeletonRect: {
    width: 220,
    height: 344,
    opacity: 0.7,
    borderRadius: 24
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 36,
    marginBottom: '16px'
  },
  swapIcon: { height: 15, margin: '10.5px 6px' },
  iconContainer: {
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    position: 'relative'
  },
  tokenIcon: {
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    borderRadius: '50%'
  },
  warningIcon: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: -6,
    right: -6
  },
  symbolsContainer: {
    color: colors.invariant.text,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
    ...typography.heading4,
    marginBottom: '12px',
    fontSize: 28
  },
  back: {
    alignItems: 'center',
    width: 'fit-content',
    transition: 'filter 300ms',
    padding: '6px',

    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(2)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  backWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    flexWrap: 'nowrap'
  },
  backIcon: {
    marginRight: 6
  },
  backText: {
    color: colors.invariant.text,
    WebkitPaddingBefore: '2px',
    ...typography.tiny2,
    fontSize: 16
  },
  button: {
    color: colors.invariant.black,
    ...typography.caption3,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 8,
    height: 32,
    width: 105,
    paddingRight: 9,
    paddingLeft: 9,
    letterSpacing: -0.03,
    fontSize: 16,
    transition: '300ms',

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`,
      '@media (hover: none)': {
        background: colors.invariant.pinkLinearGradientOpacity,
        boxShadow: 'none'
      }
    }
  }
}))
