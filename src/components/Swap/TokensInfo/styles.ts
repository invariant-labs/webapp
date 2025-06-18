import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useWrapperStyles = makeStyles()(theme => ({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px 0px 24px 0px',
    borderRadius: 16,
    border: `1px solid ${colors.invariant.light}`,
    padding: '8px 12px',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: '0px'
    }
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.invariant.light,
    margin: '0 24px',
    [theme.breakpoints.down('sm')]: {
      height: 1,
      width: '100%',
      margin: '8px 0'
    }
  }
}))

export const useStyles = makeStyles<{ isToken: boolean }>()((_theme, { isToken }) => ({
  token: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%'
  },
  imageContainer: {
    minWidth: 30,
    maxWidth: 30,
    height: 30,
    marginRight: 8,
    position: 'relative'
  },
  tokenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'nowrap',
    paddingRight: theme.spacing(1)
  },
  tokenInner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  tokenIcon: {
    minWidth: 30,
    maxWidth: 30,
    height: 30,
    marginRight: 8,
    borderRadius: '50%'
  },
  warningIcon: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: -6,
    right: -6
  },
  tokenName: {
    color: colors.white.main,
    ...typography.body1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tokenAddress: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 4,
    padding: '2px 4px',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    columnGap: 4,
    cursor: isToken ? 'pointer' : 'default',
    transition: '300ms',
    '&:hover': {
      filter: isToken ? 'brightness(1.2)' : 'none',
      '@media (hover: none)': {
        filter: 'none'
      }
    },

    '& p': {
      color: colors.invariant.textGrey,
      ...typography.caption4,
      whiteSpace: 'nowrap'
    }
  },
  tokenDescription: {
    color: colors.invariant.textGrey,
    ...typography.caption4,
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 24
  },
  price: {
    color: colors.invariant.text,
    ...typography.body1,
    whiteSpace: 'nowrap'
  },
  rightItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  clipboardIcon: {
    display: 'inline-block',
    height: 10,
    color: colors.invariant.textGrey
  },
  link: {
    maxHeight: 8,

    '& img': {
      height: 8,
      width: 8,
      transform: 'translateY(-12px)'
    },
    '&:hover': {
      filter: 'brightness(1.2)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  }
}))
