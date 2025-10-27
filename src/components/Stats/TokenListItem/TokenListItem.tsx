import { useMemo } from 'react'
import { colors, theme } from '@static/theme'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { useStyles } from './style'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithSuffix, shortenAddress } from '@utils/utils'
import { Intervals, ITEMS_PER_PAGE, NetworkType, SortTypeTokenList } from '@store/consts/static'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { VariantType } from 'notistack'
import { newTabBtnIcon, star, starFill, unknownTokenIcon, warningIcon } from '@static/icons'
import { mapIntervalToString } from '@utils/uiUtils'

interface IProps {
  displayType: string
  itemNumber?: number
  icon?: string
  name?: string
  symbol?: string
  price?: number
  // priceChange?: number
  volume?: number
  TVL?: number
  sortType?: SortTypeTokenList
  onSort?: (type: SortTypeTokenList) => void
  address?: string
  isUnknown?: boolean
  network?: NetworkType
  copyAddressHandler?: (message: string, variant: VariantType) => void
  interval?: Intervals
  isFavourite?: boolean
  switchFavouriteTokens?: (tokenAddress: string) => void
}

const TokenListItem: React.FC<IProps> = ({
  displayType,
  itemNumber = 0,
  icon = 'BTCIcon',
  name = 'Bitcoin',
  symbol = 'BTCIcon',
  price = 0,
  // priceChange = 0,
  volume = 0,
  TVL = 0,
  sortType,
  onSort,
  address,
  isUnknown,
  network,
  copyAddressHandler,
  interval = Intervals.Daily,
  isFavourite = false,
  switchFavouriteTokens
}) => {
  const { classes } = useStyles()
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
  const shouldShowText = !isSm
  const intervalSuffix = mapIntervalToString(interval)
  return (
    <Grid className={classes.wrapper}>
      {displayType === 'tokens' ? (
        <Grid
          container
          classes={{ container: classes.container, root: classes.tokenList }}
          sx={{
            borderBottom:
              itemNumber !== 0 && itemNumber % ITEMS_PER_PAGE
                ? `1px solid ${colors.invariant.light}`
                : `2px solid ${colors.invariant.light}`
          }}>
          <Box className={classes.tokenIndexContainer}>
            {!isMd && (
              <Box className={classes.tokenIndex}>
                <Typography>{itemNumber}</Typography>
              </Box>
            )}
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
          </Box>{' '}
          <Grid className={classes.tokenName}>
            <Box display='flex' position='relative'>
              <img
                className={classes.tokenIcon}
                src={icon}
                alt='Token icon'
                onError={e => {
                  e.currentTarget.src = unknownTokenIcon
                }}
              />
              {isUnknown && <img className={classes.warningIcon} src={warningIcon} />}
            </Box>
            {shouldShowText && (
              <Typography>
                {isXs ? shortenAddress(symbol) : name.length < 25 ? name : name.slice(0, 40)}
                {!isXs && name.length < 25 && (
                  <span className={classes.tokenSymbol}>{` (${shortenAddress(symbol)})`}</span>
                )}
              </Typography>
            )}
            <TooltipHover title='Copy token address'>
              <FileCopyOutlinedIcon
                onClick={copyToClipboard}
                classes={{ root: classes.clipboardIcon }}
              />
            </TooltipHover>
          </Grid>
          <Typography>{`~$${formatNumberWithSuffix(price)}`}</Typography>
          {/* {!hideName && (
            <Typography style={{ color: isNegative ? colors.invariant.Error : colors.green.main }}>
              {isNegative ? `${priceChange.toFixed(2)}%` : `+${priceChange.toFixed(2)}%`}
            </Typography>
          )} */}
          <Typography>{`$${formatNumberWithSuffix(volume)}`}</Typography>
          <Typography>{`$${formatNumberWithSuffix(TVL)}`}</Typography>
          {!isSm && (
            <Box className={classes.action}>
              <TooltipHover title='Open in explorer'>
                <button
                  className={classes.actionButton}
                  onClick={() =>
                    window.open(
                      `https://solscan.io/token/${address}${networkUrl}`,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }>
                  <img width={32} height={32} src={newTabBtnIcon} alt={'Exchange'} />
                </button>
              </TooltipHover>
            </Box>
          )}
        </Grid>
      ) : (
        <Grid
          container
          style={{ color: colors.invariant.textGrey, fontWeight: 400 }}
          sx={{
            borderBottom:
              itemNumber !== 0 && itemNumber % 10
                ? `1px solid ${colors.invariant.light}`
                : `2px solid ${colors.invariant.light}`
          }}
          classes={{ container: classes.container, root: classes.header }}>
          <Typography style={{ lineHeight: '12px' }}>
            N<sup>o</sup>
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortTypeTokenList.NAME_ASC) {
                onSort?.(SortTypeTokenList.NAME_DESC)
              } else {
                onSort?.(SortTypeTokenList.NAME_ASC)
              }
            }}>
            Token
            {sortType === SortTypeTokenList.NAME_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortTypeTokenList.NAME_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortTypeTokenList.PRICE_ASC) {
                onSort?.(SortTypeTokenList.PRICE_DESC)
              } else {
                onSort?.(SortTypeTokenList.PRICE_ASC)
              }
            }}>
            Price
            {sortType === SortTypeTokenList.PRICE_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortTypeTokenList.PRICE_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          {/* {!hideName && (
            <Typography
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (sortType === SortTypeTokenList.CHANGE_ASC) {
                  onSort?.(SortTypeTokenList.CHANGE_DESC)
                } else {
                  onSort?.(SortTypeTokenList.CHANGE_ASC)
                }
              }}>
              Price change
              {sortType === SortTypeTokenList.CHANGE_ASC ? (
                <ArrowDropUpIcon className={classes.icon} />
              ) : sortType === SortTypeTokenList.CHANGE_DESC ? (
                <ArrowDropDownIcon className={classes.icon} />
              ) : null}
            </Typography>
          )} */}
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortTypeTokenList.VOLUME_DESC) {
                onSort?.(SortTypeTokenList.VOLUME_ASC)
              } else {
                onSort?.(SortTypeTokenList.VOLUME_DESC)
              }
            }}>
            Volume {intervalSuffix}
            {sortType === SortTypeTokenList.VOLUME_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortTypeTokenList.VOLUME_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortTypeTokenList.TVL_DESC) {
                onSort?.(SortTypeTokenList.TVL_ASC)
              } else {
                onSort?.(SortTypeTokenList.TVL_DESC)
              }
            }}>
            TVL
            {sortType === SortTypeTokenList.TVL_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortTypeTokenList.TVL_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          {!isSm && <Typography align='right'>Action</Typography>}
        </Grid>
      )}
    </Grid>
  )
}
export default TokenListItem
