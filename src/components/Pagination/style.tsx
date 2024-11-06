import { Theme } from '@mui/material/styles/createTheme'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: 1122,
    display: 'flex',
    maxWidth: '100%',

    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    '& .MuiPagination-ul': {
      flexWrap: 'nowrap',
      margin: '10px 0 10px'
    },

    '& .MuiPaginationItem-icon': {
      color: colors.black.full
    },

    '& .MuiPaginationItem-page': {
      ...typography.heading4,

      color: colors.invariant.light,
      '&:hover': {
        color: colors.invariant.lightGrey,
        '@media (hover: none)': {
          color: colors.invariant.light
        }
      }
    },

    '& .MuiPaginationItem-page:hover': {
      color: colors.invariant.textGrey
    },

    '& .MuiPaginationItem-ellipsis': {
      color: colors.invariant.light
    },

    '& .Mui-selected': {
      color: colors.invariant.green
    },
    '& .Mui-selected:hover': {
      color: `${colors.invariant.green} !important`
    },

    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'transparent',
      '&:hover': {
        color: colors.invariant.green
      }
    },
    '& li:first-of-type button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      opacity: 0.8
    },
    '& li:first-of-type button:hover': {
      opacity: 1
    },

    '& li:last-child button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      opacity: 0.8
    },

    '& li:last-child button:hover': {
      opacity: 1
    },

    '& svg': {
      transform: 'scale(2.2)'
    }
  }
}))
