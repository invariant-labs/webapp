import { typography, colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  outerWrapper: {
    paddingInline: 24,
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      paddingInline: 8
    }
  },
  wrapper: {
    maxWidth: 1210,
    margin: 'auto',
    minHeight: '100%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.invariant.text,
    border: `1px solid ${colors.invariant.light}`,
    padding: '48px 24px ',
    borderRadius: 24,
    boxShadow: `0px 13px 39px 14px rgba(58, 70, 107, 0.4)`,
    marginBottom: 48
  },
  title: {
    ...typography.heading1,
    marginBottom: 16,
    color: colors.invariant.green,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      ...typography.heading2
    }
  },
  lastUpdate: {
    ...typography.body2,
    textAlign: 'center',
    marginBottom: 32,
    [theme.breakpoints.down('md')]: {
      ...typography.caption2
    }
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  tldr: {
    fontStyle: 'italic'
  },
  subTitle: {
    ...typography.heading3,
    [theme.breakpoints.down('md')]: {
      ...typography.heading4
    }
  },
  paragraph: {
    ...typography.body3,
    [theme.breakpoints.down('md')]: {
      ...typography.body2
    }
  },
  accent: {},
  list: {},
  mail: {
    color: colors.invariant.text,
    cursor: 'pointer'
  }
}))

export default useStyles
