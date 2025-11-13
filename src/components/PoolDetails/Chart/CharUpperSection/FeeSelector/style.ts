import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    background: colors.invariant.component,
    width: 200,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 10
  },
  paper: {
    background: 'transparent',
    borderRadius: '16px',
    boxSizing: 'border-box',
    marginTop: '8px',
    boxShadow: `0px 2px 8px ${colors.invariant.black}`
  },
  selected: {
    color: colors.invariant.text,
    display: 'flex',
    width: 132,
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${colors.invariant.light}`,
    borderRadius: 11,
    height: 44,

    [theme.breakpoints.down(1200)]: {
      height: 40
    }
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderBottom: `1px solid ${colors.invariant.light}`,
    paddingBottom: 8
  },
  selectedText: {
    ...typography.body1,
    marginRight: 8
  },
  option: {
    padding: '10px 14px',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 0.2s ease',
    background: colors.invariant.newDark,
    borderRadius: 11,

    '&:hover': {
      background: colors.invariant.light,
      cursor: 'pointer'
    }
  },
  optionText: {
    color: colors.invariant.text,
    ...typography.caption1
  },
  tvlText: {
    color: colors.invariant.text,
    ...typography.caption4
  },
  active: {
    backgroundImage: `linear-gradient( #3A466B, #3A466B), linear-gradient(0deg, #EF84F5  , #2EE09A)`,

    '&:hover': {
      backgroundImage: `linear-gradient( #2A365C, #2A365C), linear-gradient(0deg, #EF84F5  , #2EE09A)`
    }
  },
  disabled: {
    cursor: 'not-allowed',
    background: colors.invariant.component,
    filter: 'brightness(0.85)',
    '& p': {
      color: colors.invariant.textGrey
    },

    '&:hover': {
      background: colors.invariant.component,
      filter: 'brightness(0.85)',
      cursor: 'not-allowed'
    }
  },
  bestSelect: {
    border: `2px solid ${colors.invariant.green}`,

    '& *': {
      color: colors.invariant.green
    }
  },
  promotedSelect: {
    color: colors.invariant.pink,
    borderRadius: 11,
    border: '2px solid transparent',
    backgroundImage: `linear-gradient(${colors.invariant.component},${colors.invariant.component}), linear-gradient(0deg, #EF84F5  , #2EE09A)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    '&:hover': {
      color: colors.invariant.pink,
      backgroundImage:
        'linear-gradient(#2A365C, #2A365C),  linear-gradient(0deg, #EF84F5  , #2EE09A)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    },
    '&.Mui-selected': {
      backgroundImage:
        'linear-gradient(#2A365C, #2A365C),  linear-gradient(0deg, #EF84F5  , #2EE09A)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }
  },
  promoted: {
    color: colors.invariant.pink,
    borderRadius: 10,
    border: '2px solid transparent',
    backgroundImage: `linear-gradient(${colors.invariant.newDark},${colors.invariant.newDark}),linear-gradient(0deg, #EF84F5  , #2EE09A)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    '&:hover': {
      color: colors.invariant.pink,
      backgroundImage:
        'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #EF84F5  , #2EE09A)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    },
    '&.Mui-selected': {
      backgroundImage:
        'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #EF84F5  , #2EE09A)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }
  },
  best: {
    color: colors.invariant.green,
    border: `2px solid ${colors.invariant.green}`,
    borderRadius: 10,
    '&:hover': {
      color: colors.invariant.green
    }
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > :first-of-type': {
      color: colors.invariant.textGrey,
      ...typography.body2
    },
    '& > :nth-of-type(2)': {
      color: colors.invariant.text,
      ...typography.body1
    }
  }
}))

export default useStyles
