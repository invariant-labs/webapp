import React, { useMemo } from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import { SwapToken } from '@store/selectors/solanaWallet'
import { formatNumberWithoutSuffix, formatNumberWithSuffix } from '@utils/utils'
import { colors, typography } from '@static/theme'
import useStyles from './style'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { CopyIcon } from '@static/componentIcon/CopyIcon'
import { NewTabIcon } from '@static/componentIcon/NewTabIcon'
import { VariantType } from 'notistack'
import { NetworkType } from '@store/consts/static'

export interface IProps {
  token: SwapToken
  copyAddressHandler: (message: string, variant: VariantType) => void
  network: NetworkType
  amount?: number
  price: number
  isPoolDataLoading: boolean
}

export const TokenInfo: React.FC<IProps> = ({
  token,
  copyAddressHandler,
  network,
  amount,
  price,
  isPoolDataLoading
}) => {
  const { classes } = useStyles()
  const address = token?.assetAddress.toString() || ''

  const copyToClipboard = () => {
    if (!address || !copyAddressHandler) {
      return
    }
    navigator.clipboard
      .writeText(address)
      .then(() => {
        copyAddressHandler('Token address copied to Clipboard', 'success')
      })
      .catch(() => {
        copyAddressHandler('Failed to copy token address to Clipboard', 'error')
      })
  }

  const networkUrl = useMemo(() => {
    switch (network) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return '?cluster=testnet'
    }
  }, [network])

  return token ? (
    <Box className={classes.wrapper}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center' gap={'12px'}>
          <Box className={classes.tokenName}>
            <img className={classes.icon} src={token.logoURI} alt={token.symbol} />
            <Typography color={colors.invariant.text} style={typography.body2}>
              {token.symbol}
            </Typography>
          </Box>
          <Typography color={colors.invariant.textGrey} style={typography.body1}>
            Value
          </Typography>
        </Box>
        {isPoolDataLoading ? (
          <Skeleton variant='rounded' height={32} width={110} />
        ) : (
          amount && (
            <Typography color={colors.invariant.text} style={typography.heading2}>
              ${formatNumberWithSuffix(amount * price)}
            </Typography>
          )
        )}
      </Box>
      <Box className={classes.separator} />
      <Box display='flex' flexDirection='column' justifyContent='center' gap='8px'>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography color={colors.invariant.textGrey} style={typography.body1}>
            Token address
          </Typography>
          {isPoolDataLoading ? (
            <Skeleton variant='rounded' height={20} width={100} />
          ) : (
            <Box display='flex' alignItems='center' gap={'8px'}>
              <TooltipHover title='Copy'>
                <Box
                  display='flex'
                  alignItems='center'
                  gap='3px'
                  className={classes.addressIcon}
                  onClick={copyToClipboard}>
                  <Typography
                    style={{ textDecoration: 'underline', ...typography.body2 }}
                    color={colors.invariant.text}
                    height={'20px'}>
                    {address.slice(0, 4)}...{address.slice(address.length - 4, address.length)}
                  </Typography>
                  <CopyIcon color={colors.invariant.text} height={14} />
                </Box>
              </TooltipHover>
              <TooltipHover title='Open pool in explorer'>
                <a
                  href={`https://solscan.io/account/${address}${networkUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={event => {
                    event.stopPropagation()
                  }}
                  className={classes.addressIcon}>
                  <NewTabIcon color={colors.invariant.text} width={12} height={12} />
                </a>
              </TooltipHover>
            </Box>
          )}
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography color={colors.invariant.textGrey} style={typography.body1}>
            Amount
          </Typography>
          {isPoolDataLoading ? (
            <Skeleton variant='rounded' height={20} width={60} />
          ) : (
            <Typography color={colors.invariant.text} style={typography.body2}>
              {formatNumberWithoutSuffix(amount ?? 0)}
            </Typography>
          )}
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography color={colors.invariant.textGrey} style={typography.body1}>
            Price
          </Typography>
          {isPoolDataLoading ? (
            <Skeleton variant='rounded' height={20} width={60} />
          ) : (
            <Typography color={colors.invariant.text} style={typography.body2}>
              ${formatNumberWithoutSuffix(price ?? 0)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    <Skeleton
      variant='rounded'
      height={76}
      width={'100%'}
      animation='wave'
      sx={{ borderRadius: '8px' }}
    />
  )
}

export default TokenInfo
