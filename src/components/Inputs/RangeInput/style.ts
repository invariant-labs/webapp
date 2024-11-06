import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  data: {
    height: 36,
    paddingInline: 8,
    flexWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

    [theme.breakpoints.down('md')]: {
      height: 36
    }
  },
  label: {
    color: colors.white.main,
    whiteSpace: 'nowrap',
    marginRight: 16,
    ...typography.body1,

    [theme.breakpoints.down('md')]: {
      ...typography.body1
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption3
    }
  },
  tokens: {
    color: colors.invariant.lightHover,
    ...typography.body2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('md')]: {
      marginInline: 'auto',
      ...typography.body2
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption3
    }
  },
  controls: {
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 10,
    '& input.Mui-disabled': {
      WebkitTextFillColor: colors.white.main + '!important'
    }
  },
  button: {
    minWidth: 36,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(46,224,154,0.8)',
    padding: 0,
    zIndex: 1,

    '&:hover': {
      backgroundColor: colors.invariant.green,
      boxShadow: `0 0 10px ${colors.invariant.green}`,
      '@media (hover: none)': {
        background: ' rgba(46, 224, 154, 0.8)',
        boxShadow: 'none'
      }
    }
  },
  buttonIcon: {
    width: 22,
    height: 'auto',
    fill: colors.invariant.dark
  },
  value: {
    color: colors.white.main,
    ...typography.body3,
    lineHeight: 24,
    backgroundColor: colors.invariant.componentBcg,
    height: 36,
    paddingInline: 5,
    borderRadius: 10,
    flex: '1 1 0%',

    '& input': {
      textAlign: 'center'
    },

    '& input:disabled': {
      color: colors.white.main
    },

    [theme.breakpoints.down('md')]: {
      height: 36
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    }
  },
  diffWrapper: {
    borderRadius: 11,
    height: 36,
    backgroundColor: colors.invariant.black
  },
  diffLabelWrapper: {
    borderRadius: 11,
    height: 36,
    flex: '0 0 auto',
    backgroundColor: colors.invariant.light,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 6
  },
  diffLabel: {
    ...typography.caption2,
    color: colors.invariant.text,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  diff: {
    ...typography.body1,
    padding: 3,
    borderRadius: 5,
    marginInline: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }
  }
}))

export default useStyles
