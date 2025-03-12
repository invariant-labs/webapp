import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((_theme: Theme) => ({
  boxChip: {
    display: 'flex',
    padding: '2px 4px 2px 4px',
    borderRadius: 8,
    gap: 8,
    margin: 4,
    height: 26,
    maxHeight: 26,
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.invariant.component
  },
  avatarChip: {
    width: 14,
    height: 14,
    borderRadius: '50%'
  },
  typographyChip: {
    ...typography.body2,
    color: colors.invariant.text
  },
  closeIcon: {
    cursor: 'pointer',
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
      opacity: 0.7
    }
  },

  tokenContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px 8px 12px',
    borderRadius: 24,
    marginRight: 4,
    border: `1px solid ${colors.invariant.component}`,
    transition: '300ms',
    '&:hover': {
      background: colors.invariant.light,
      '@media (hover: none)': {
        background: colors.invariant.component
      }
    }
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },

  tokenData: {
    display: 'flex',
    flexDirection: 'column'
  },

  symbolAndAddress: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    minWidth: 0
  },

  tokenLabel: {
    whiteSpace: 'nowrap',
    flexShrink: 0,
    ...typography.heading4
  },

  tokenAddress: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    padding: '2px 4px',
    gap: 6,
    flexShrink: 1,
    minWidth: 0,
    whiteSpace: 'nowrap'
  },

  truncatedAddress: {
    ...typography.caption4,
    color: colors.invariant.textGrey,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 80
  },

  addressLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    gap: 6
  },

  newTabIcon: {
    flexShrink: 0,
    width: 8,
    height: 8
  },

  tokenName: {
    color: colors.invariant.textGrey,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  searchResultIcon: {
    flexShrink: 0,
    marginRight: 8,
    borderRadius: '50%'
  },

  tokenBalanceStatus: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    color: colors.invariant.textGrey,
    '& p': {
      ...typography.caption2
    }
  },
  fixedList: {
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      background: 'none !important',
      '&:hover': {
        background: colors.invariant.component,

        '@media (hover: none)': {
          background: colors.invariant.component
        }
      },
      '& > div': {
        borderRadius: '24px',
        border: `1px solid ${colors.invariant.light}`,
        backgroundColor: colors.invariant.componentBcg,

        '&:hover': {
          backgroundColor: colors.invariant.component,
          '@media (hover: none)': {
            backgroundColor: colors.invariant.componentBcg
          }
        }
      }
    },
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: colors.invariant.newDark,
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.invariant.pink,
      borderRadius: '3px'
    }
  }
}))
export default useStyles
