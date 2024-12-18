import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    color: colors.invariant.text,
    ...typography.heading4,
    fontWeight: 700
  },
  cardsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '24px 0px',
    flexWrap: 'nowrap',
    borderRadius: 32,
    background: colors.invariant.component
  },
  slider: {
    minWidth: '100%',
    '& .slick-track': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center'
    },
    height: 344
  },
  dots: {
    position: 'absolute',
    bottom: -54,
    overflow: 'visible',
    zIndex: 10,

    '& li.slick-active button::before': {},
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
