import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 20,
    padding: '6px 12px 6px 12px',
    ...typography.heading2,
    display: 'grid',
    gridTemplateAreas: `
    "select select select select"
    "balance balance percentages percentages"
    `,
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: `
    "select select select select"
    "balance balance balance percentages"
    `
    },

    '& $input': {
      color: colors.white.main,
      position: 'relative',
      top: 1,
      textAlign: 'end',
      ...typography.heading2
    },

    '& $input::placeholder': {
      color: colors.invariant.light
    },

    [theme.breakpoints.down('xs')]: {
      '& $input': {}
    }
},

inputBox: {
  position: 'relative',
  backgroundColor: colors.invariant.component,
  borderRadius: 24,

  [theme.breakpoints.down('sm')]: {
    minWidth: 0
  }
},

inputSectionContainer: {
  gridColumn: '1/-1',
  display: 'flex',
  paddingBottom: 6,
  marginBottom: 6,
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('xs')]: {
    marginBottom: 0
  }
},

coin: {
  width: 'fit-content',
  height: 36,
  minWidth: 85,
  backgroundColor: colors.invariant.light,
  padding: '6px 12px 6px 12px',
  flexShrink: 0,
  borderRadius: 11,

  [theme.breakpoints.down('sm')]: {
    minWidth: 85,
    height: 36
  }
},

inputButton: {
  color: colors.invariant.componentBcg,
  ...typography.tiny2,
  letterSpacing: '-0.03em',
  borderRadius: 4,
  textTransform: 'none',
  marginLeft: 4,
  background: ' rgba(46, 224, 154, 0.8)',
  width: 26,
  minWidth: 26,
  height: 14,

  '&:hover': {
    background: 'none',
    backgroundColor: colors.invariant.green,
    boxShadow: '0px 0px 20px -10px white'
  },
  [theme.breakpoints.down('sm')]: {
    width: 26,
    minWidth: 26,
    height: 14,
    marginTop: 2
  }
},

inputHeader: {
  margin: '24px 0 24px 0',
  color: colors.invariant.text,
  ...typography.heading4
},

coinIcon: {
  background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
  marginRight: 8,
  borderRadius: '100%',
  minWidth: 20,
  height: 20
},

coinSymbol: {
  ...typography.body3,
  color: colors.white.main
},

noCoinText: {
  color: colors.white.main,
  ...typography.body3
},

result: {
  height: 17,
  gridArea: 'balance'
},

balance: {
  display: 'flex',
  flexWrap: 'nowrap',
  letterSpacing: '-0.03em',
  ...typography.caption2,
  color: colors.invariant.lightHover,

  '&:hover': {
    color: colors.white.main
  }
},

inputButtonNotActive: {
  backgroundColor: colors.invariant.light,
  '&:hover': {
    backgroundColor: colors.invariant.light,
    cursor: 'default'
  }
},

percent: {
    gridArea: 'percentages',
    justifyContent: 'end',
    height: 17
  },

percentage: {
    color: colors.invariant.Error,
    ...typography.tiny1,
    letterSpacing: '-0.03em',
    backgroundColor: 'rgba(251, 85, 95, 0.2)',
    textAlign: 'center',
    marginRight: 3,
    height: 16,
    lineHeight: '16px',
    borderRadius: 5,
    width: 39
  },
}))

export default useStyles

