import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    color: colors.invariant.text,
    ...typography.heading4,
    fontWeight: 700
  },
  cardsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 51px 24px 51px',
    flexWrap: 'nowrap',
    borderRadius: 24,
    background: colors.invariant.component,

    [theme.breakpoints.down('sm')]: {
      padding: '0 10px 24px 10px'
    }
  },
  slider: {
    minWidth: '100%',
    '& .slick-track': {
      paddingTop: 30,
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center'
    },

    '& .slick-arrow': {
      height: '40px',
      [theme.breakpoints.down('sm')]: {
        height: '30px'
      }
    },
    '& .slick-arrow::before': {
      fontSize: '40px',
      color: colors.invariant.textGrey,
      transition: 'color 0.3s ease',
      [theme.breakpoints.down('sm')]: {
        fontSize: '34px'
      }
    },
    '& .slick-arrow:hover::before': {
      color: colors.invariant.text
    },
    '& .slick-arrow:focus::before, & .slick-arrow:active::before': {
      color: colors.invariant.textGrey
    },
    '@media (hover: hover)': {
      '& .slick-arrow:hover::before': {
        color: colors.invariant.text
      }
    },
    '& .slick-prev': {
      left: -38,
      [theme.breakpoints.down('lg')]: {
        left: -40
      },
      [theme.breakpoints.down('sm')]: {
        left: -4,
        zIndex: 3
      }
    },
    '& .slick-next': {
      right: -18,
      [theme.breakpoints.down('lg')]: {
        right: -20
      },
      [theme.breakpoints.down('sm')]: {
        right: 9,
        zIndex: 3
      }
    }
  },
  dots: {
    position: 'absolute',
    bottom: -54,
    overflow: 'visible',
    zIndex: 10,

    '& li': {
      borderRadius: '50%',
      height: 12,
      width: 12,
      margin: '0 8px',
      background: colors.invariant.newDark,
      border: `2px solid transparent`,
      transition: 'all 0.3s ease',
      position: 'relative',
      '&.slick-active': {
        background: colors.invariant.newDark,
        border: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: '50%',
          background: `linear-gradient(to bottom, ${colors.invariant.green}, ${colors.invariant.pink})`,
          zIndex: -1
        }
      },
      '&': {
        background: colors.invariant.newDark,
        border: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: '50%',
          background: colors.invariant.component,
          zIndex: -1
        }
      },
      '& button': {
        opacity: 0,
        height: '100%',
        width: '100%',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
      },
      '& button::before': {
        content: '""'
      }
    }
  }
}))
