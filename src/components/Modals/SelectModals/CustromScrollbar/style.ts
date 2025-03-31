import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    hideScroll: {
      '& > *:first-of-type': {
        overflow: 'auto !important'
      },
      overflow: 'visible !important'
    },

    scrollbarThumb: {
      backgroundColor: colors.invariant.pink + '!important',
      borderRadius: 10,
      width: 5
    },
    scrollbarTrack: {
      background: '#111931',
      borderRadius: 10,
      height: '98%',
      margin: 5,
      width: 5,
      transform: 'translateX(20px)'
    },
    scrollbarView: {
      padding: 0 + '!important',
      width: 'calc(100% + 50px)'
    }
  }
})

export default useStyles
