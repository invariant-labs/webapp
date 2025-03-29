import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useLabelStyles = makeStyles()(() => {
  return {
    marketId: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '-0.03px',
      textAlign: 'right',
      color: `${colors.invariant.textGrey} !important`,
      paddingRight: 7,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap'
    },
    clipboardIcon: {
      width: 18,
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(1.4)',
        '@media (hover: none)': {
          filter: 'brightness(1)'
        }
      }
    }
  }
})
