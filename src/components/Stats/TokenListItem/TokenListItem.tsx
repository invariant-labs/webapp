import { useEffect, useMemo, useState } from 'react'
import { theme } from '@static/theme'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useStyles } from './style'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithSuffix, shortenAddress } from '@utils/utils'
import { Intervals, NetworkType } from '@store/consts/static'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { VariantType } from 'notistack'
import {
  copyAddressIcon,
  newTabBtnIcon,
  star,
  starFill,
  unknownTokenIcon,
  warningIcon
} from '@static/icons'
import { mapIntervalToString } from '@utils/uiUtils'
import BoxValue from '../ListItem/BoxValue/BoxValue'
import ItemValue from '../ListItem/ItemValue/ItemValue'

interface IProps {
  itemNumber?: number
  icon?: string
  name?: string
  symbol?: string
  price?: number
  // priceChange?: number
  volume?: number
  TVL?: number
  address?: string
  isUnknown?: boolean
  network?: NetworkType
  copyAddressHandler?: (message: string, variant: VariantType) => void
  interval?: Intervals
  isFavourite?: boolean
  switchFavouriteTokens?: (tokenAddress: string) => void
}

const TokenListItem: React.FC<IProps> = ({
  itemNumber = 0,
  icon = 'BTCIcon',
  name = 'Bitcoin',
  symbol = 'BTCIcon',
  price = 0,
  // priceChange = 0,
  volume = 0,
  TVL = 0,
  address,
  isUnknown,
  network,
  copyAddressHandler,
  interval = Intervals.Daily,
  isFavourite = false,
  switchFavouriteTokens
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const { classes } = useStyles({ showInfo })
  // const isNegative = priceChange < 0

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  const networkUrl = useMemo(() => {
    switch (network) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return ''
    }
  }, [network])

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
  const intervalSuffix = mapIntervalToString(interval)

  useEffect(() => {
    if (!isMd) {
      setShowInfo(false)
    }
  }, [isMd])

  useEffect(() => {
    setShowInfo(false)
  }, [itemNumber])
  return (
    <Grid
      container
      classes={{ container: classes.container }}
      onClick={e => {
        e.stopPropagation()

        if (isMd) setShowInfo(prev => !prev)
      }}>
      <Grid container className={classes.mainContent}>
        <ItemValue
          style={{ flexShrink: 1, flexBasis: '300px', minWidth: 40, marginRight: '4px' }}
          title={'Token'}
          value={
            icon === '/src/static/svg/unknownToken.svg' && isSm ? (
              <Typography>{symbol}</Typography>
            ) : (
              <Grid display='flex' alignItems='center' gap={1}>
                {!isMd && (
                  <img
                    className={classes.favouriteButton}
                    src={isFavourite ? starFill : star}
                    onClick={e => {
                      if (address && switchFavouriteTokens) {
                        switchFavouriteTokens(address)
                      }

                      e.stopPropagation()
                    }}
                  />
                )}
                <Grid className={classes.imageContainer}>
                  <img
                    className={classes.tokenIcon}
                    src={icon}
                    alt='Token icon'
                    onError={e => {
                      e.currentTarget.src = unknownTokenIcon
                    }}
                  />
                  {isUnknown && (
                    <img className={classes.warningIcon} src={warningIcon} alt='Warning' />
                  )}
                </Grid>
                {
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                    {!isXs &&
                      (isSm ? shortenAddress(symbol) : name.length < 25 ? name : name.slice(0, 40))}
                    {!isSm && name.length < 25 && (
                      <span className={classes.tokenSymbol}>{` (${shortenAddress(symbol)})`}</span>
                    )}
                  </Typography>
                }

                {!isMd && (
                  <TooltipHover title='Copy pool address'>
                    <FileCopyOutlinedIcon
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        copyToClipboard()
                      }}
                      classes={{ root: classes.clipboardIcon }}
                    />
                  </TooltipHover>
                )}
              </Grid>
            )
          }
        />

        <ItemValue
          style={{ flexBasis: 110 }}
          minWidth={80}
          title={'Price'}
          value={`$${formatNumberWithSuffix(price)}`}
        />

        <ItemValue
          style={{ flexBasis: 110 }}
          minWidth={80}
          title={`Volume ${intervalSuffix}`}
          value={`$${formatNumberWithSuffix(volume)}`}
        />

        <ItemValue
          style={{ flexBasis: 100, flexGrow: isMd ? 0 : undefined }}
          minWidth={80}
          title={`TVL ${intervalSuffix}`}
          value={`$${formatNumberWithSuffix(TVL)}`}
        />

        {!isMd && (
          <ItemValue
            minWidth={60}
            style={{ flexGrow: 0 }}
            title='Action'
            value={
              <Box className={classes.action}>
                <TooltipHover title='Open in explorer'>
                  <button
                    className={classes.actionButton}
                    onClick={() =>
                      window.open(
                        `https://solscan.io/account/${address}${networkUrl}`,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }>
                    <img width={32} height={32} src={newTabBtnIcon} alt={'Exchange'} />
                  </button>
                </TooltipHover>
              </Box>
            }
          />
        )}

        {isMd && (
          <ArrowDropDownIcon preserveAspectRatio='none' className={classes.extendedRowIcon} />
        )}
      </Grid>
      {isMd && (
        <Grid gap={'12px'} display='flex' container flexDirection='column'>
          <Box className={classes.info}>
            <Grid container gap={'8px'} overflow={'hidden'}>
              <BoxValue
                title={isXs ? undefined : 'Favourite'}
                icon={isFavourite ? starFill : star}
                onClick={() => {
                  if (address && switchFavouriteTokens) {
                    switchFavouriteTokens(address)
                  }
                }}
              />
              <BoxValue
                title='View'
                icon={newTabBtnIcon}
                onClick={() =>
                  window.open(
                    `https://solscan.io/account/${address}${networkUrl}`,
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              />

              <BoxValue
                title={isSm ? 'Copy' : 'Copy address'}
                onClick={copyToClipboard}
                icon={copyAddressIcon}
                smallerIcon
              />
            </Grid>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
export default TokenListItem
