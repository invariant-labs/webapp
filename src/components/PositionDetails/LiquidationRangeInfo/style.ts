import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  infoTypeLabel: {
    textTransform: 'uppercase',
    color: colors.invariant.lightGrey,
    ...typography.body2,
    lineHeight: '35px',
    [theme.breakpoints.down('lg')]: {
      ...typography.caption4,
      lineHeight: '35px'
    },
    [theme.breakpoints.down('md')]: {
      ...typography.body2,
      lineHeight: '35px'
    }
  },
  infoTypeSwap: {
    display: 'flex',
    backgroundColor: colors.invariant.dark,
    borderRadius: 13,
    lineHeight: '20px',
    alignItems: 'center'
  },
  infoType: {
    backgroundColor: colors.invariant.light,
    borderRadius: 13,
    textAlign: 'center',
    marginRight: 6,
    width: 61,
    padding: 2,
    [theme.breakpoints.down('lg')]: {
      marginRight: 0
    }
  },
  infoSwap: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    width: '100%',
    padding: '0 4px',
    textWrap: 'nowrap'
  },
  infoAmount: {
    color: colors.invariant.text,
    paddingRight: 8,
    ...typography.body1,
    lineHeight: '35px',

    [theme.breakpoints.only('md')]: {
      ...typography.body2,
      lineHeight: '35px'
    }
  },
  infoSwapToken: {
    color: colors.invariant.lightGrey,
    ...typography.body1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '35px',
    [theme.breakpoints.down('lg')]: {
      ...typography.caption3,
      lineHeight: '35px'
    },
    [theme.breakpoints.down('md')]: {
      ...typography.caption1,
      lineHeight: '35px'
    }
  }
}))

export default useStyles
