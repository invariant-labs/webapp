import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: colors.invariant.component,
    padding: 16,
    width: 508
  },

  header: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 12
  },
  positionInfo: {
    flexWrap: 'nowrap',
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: 16,
    padding: '12px 16px',
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  leftSide: {
    marginRight: 8,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: 8
    }
  },
  rightSide: {
    '& $row': {
      justifyContent: 'flex-end',

      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start'
      }
    }
  },
  row: {
    '&:not(:last-child)': {
      marginBottom: 8
    }
  },
  label: {
    marginRight: 5,
    ...typography.body2,
    color: colors.invariant.textGrey,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexShrink: 0
  },
  value: {
    ...typography.body1,
    color: colors.white.main,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  tokenImg: {
    minWidth: 20,
    minHeight: 20,
    objectFit: 'cover',
    marginRight: 10,
    borderRadius: '100%'
  },

  claimRewards: {
    width: 115,
    letterSpacing: '-0.03em',
    height: 40,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    background: colors.invariant.greenLinearGradientOpacity,
    color: colors.black.full,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3,
      minWidth: 105
    },
    '&:hover': {
      background: colors.invariant.greenLinearGradient,
      boxShadow: '0px 0px 8px rgba(46, 224, 154, 0.35)'
    }
  },
  tokenArea: {
    backgroundColor: colors.invariant.newDark,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    width: 353,
    height: 40,
    justifyContent: 'flex-start',
    marginRight: 8
  },
  token: {
    backgroundColor: colors.invariant.light,
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    padding: '3px 12px',

    [theme.breakpoints.down('xs')]: {
      borderRadius: 12
    }
  },
  tokenName: {
    color: colors.white.main,
    ...typography.heading4,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center'
  },
  tokenValue: {
    ...typography.heading4,
    color: colors.white.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px'
  },

  tokenContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  profit: {
    ...typography.caption2,
    color: colors.invariant.textGrey,
    marginBottom: 4
  }
}))

export default useStyles
