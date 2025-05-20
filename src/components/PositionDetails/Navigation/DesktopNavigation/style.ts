import { Theme } from '@emotion/react'
import { colors, theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ direction: 'left' | 'right'; disabled?: boolean }>()(
  (_theme: Theme, { direction, disabled = false }) => ({
    wrapper: {
      position: 'absolute',
      top: '50%',
      transform: direction === 'left' ? 'scale(-1)' : 'none',
      left: direction === 'left' ? -88 : undefined,
      right: direction === 'right' ? -88 : undefined
    },
    iconContainer: {
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: 'fit-content',
      [theme.breakpoints.down('lg')]: {
        marginRight: 12
      }
    },
    icon: {
      width: 24,
      borderRadius: '100%',
      [theme.breakpoints.down('sm')]: {
        width: 28
      }
    },
    arrow: {
      color: disabled ? colors.invariant.light : colors.invariant.green,
      zIndex: 2,
      cursor: disabled ? 'auto' : 'pointer',
      overflow: 'visible',
      top: '50%',
      padding: 16,

      '& path': {
        transition: 'filter 0.3s'
      },
      '&:hover': {
        '& path': {
          filter: disabled ? 'none' : 'drop-shadow(0px 0px 6px rgba(46, 224, 154, 0.8))'
        }
      }
    }
  })
)
