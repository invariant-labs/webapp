import React, { useMemo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useStyles } from './../styles'
import { SwapToken } from '@store/selectors/solanaWallet'
import icons from '@static/icons'
import { formatNumber } from '@utils/utils'
import { VariantType } from 'notistack'
import { NetworkType } from '@store/consts/static'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'

interface IProps {
  token: SwapToken | null
  network: NetworkType
  tokenPrice?: number
  copyTokenAddressHandler: (message: string, variant: VariantType) => void
}

const SingleToken: React.FC<IProps> = ({ token, network, tokenPrice, copyTokenAddressHandler }) => {
  const { classes } = useStyles({ isToken: !!token })

  const copyToClipboard = () => {
    if (!token) return
    navigator.clipboard
      .writeText(token.assetAddress.toString())
      .then(() => {
        copyTokenAddressHandler('Address copied to Clipboard', 'success')
      })
      .catch(() => {
        copyTokenAddressHandler('Failed to copy address to Clipboard', 'error')
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

  return (
    <Grid className={classes.token}>
      <Grid container direction='row' justifyContent='flex-start' alignItems='center' wrap='nowrap'>
        {token?.logoURI ? (
          <Box className={classes.imageContainer}>
            <img
              className={classes.tokenIcon}
              src={token.logoURI}
              loading='lazy'
              alt={token.name + 'logo'}
            />
            {token.isUnknown && <img className={classes.warningIcon} src={icons.warningIcon} />}
          </Box>
        ) : (
          <img className={classes.tokenIcon} src={icons.selectToken} alt={'Select token'} />
        )}

        <Grid>
          <Grid container direction='row' alignItems='center' gap='6px' wrap='nowrap' pr={1}>
            <Typography className={classes.tokenName}>
              {token?.symbol ? token.symbol : 'Select a token'}{' '}
            </Typography>

            {token && (
              <TooltipHover text='Token details'>
                <a
                  href={`https://eclipsescan.xyz/token/${token.assetAddress.toString()}${networkUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={event => {
                    event.stopPropagation()
                  }}
                  className={classes.link}>
                  <img width={8} height={8} src={icons.newTab} alt={'Token address'} />
                </a>
              </TooltipHover>
            )}
          </Grid>
          <Typography className={classes.tokenDescription}>
            {token?.name ? token.name : '--'}
          </Typography>
        </Grid>
      </Grid>

      <Grid className={classes.rightItems}>
        <Typography className={classes.price}>
          {token ? (tokenPrice ? '$' + formatNumber(tokenPrice) : 'No data') : '--'}
        </Typography>
        <TooltipHover text='Copy'>
          <Grid className={classes.tokenAddress} onClick={copyToClipboard}>
            <Typography>
              {token
                ? token.assetAddress.toString().slice(0, 4) +
                  '...' +
                  token.assetAddress.toString().slice(-5, -1)
                : '--'}
            </Typography>
            <img
              width={8}
              height={8}
              src={icons.copyAddress}
              alt={'Copy address'}
              className={classes.clipboardIcon}
            />
          </Grid>
        </TooltipHover>
      </Grid>
    </Grid>
  )
}

export default SingleToken
