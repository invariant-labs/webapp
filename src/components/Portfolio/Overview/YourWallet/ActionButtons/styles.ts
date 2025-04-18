import { makeStyles } from 'tss-react/mui'
import { colors } from '@static/theme'
export const useStyles = makeStyles()(() => ({
  actionIcon: {
    height: 32,
    background: 'none',
    width: 32,
    padding: 0,
    margin: 0,
    border: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: colors.invariant.black,
    textTransform: 'none',
    transition: 'filter 0.3s linear',
    '&:hover': {
      filter: 'brightness(1.2)',
      cursor: 'pointer',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  }
}))
