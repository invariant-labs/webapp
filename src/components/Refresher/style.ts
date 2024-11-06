import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  ring: {
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(1.25)',
      '@media (hover: none)': {
        filter: 'none'
      }
    }
  },
  innerCircle: {
    transition: '0.35s stroke-dashoffset',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%'
  }
}))
