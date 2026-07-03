import React, { useEffect, useMemo, useState } from 'react'
import { theme } from '@static/theme'
import { useStyles } from './style'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useLocation, useNavigate } from 'react-router-dom'
import { disabledPools, Intervals, NetworkType } from '@store/consts/static'
import {
  addressToTicker,
  calculateAPYAndAPR,
  initialXtoY,
  parseFeeToPathFee,
  ROUTES,
  shortenAddress
} from '@utils/utils'
import { useDispatch } from 'react-redux'
import { actions } from '@store/reducers/navigation'
import { formatNumberWithSuffix } from '@utils/utils'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { VariantType } from 'notistack'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { convertAPYValue, mapIntervalToString } from '@utils/uiUtils'
import {
  copyAddressIcon,
  horizontalSwapIcon,
  newTabBtnIcon,
  plusDisabled,
  plusIcon,
  poolStatsBtnIcon,
  star,
  starFill,
  unknownTokenIcon,
  warningIcon
} from '@static/icons'
import BoxValue from '../ListItem/BoxValue/BoxValue'
import ItemValue from '../ListItem/ItemValue/ItemValue'

interface IProps {
  TVL?: number
  volume?: number
  fee?: number
  symbolFrom?: string
  symbolTo?: string
  iconFrom?: string
  iconTo?: string
  addressFrom?: string
  addressTo?: string
  network: NetworkType
  apy?: number
  apyData?: {
    fees: number
  }
  isUnknownFrom?: boolean
  isUnknownTo?: boolean
  poolAddress?: string
  copyAddressHandler?: (message: string, variant: VariantType) => void
  showAPY: boolean
  itemNumber?: number
  interval?: Intervals
  isFavourite?: boolean
  switchFavouritePool?: (poolAddress: string) => void
}

const PoolListItem: React.FC<IProps> = ({
  fee = 0,
  volume = 0,
  TVL = 0,
  symbolFrom,
  symbolTo,
  iconFrom,
  iconTo,

  addressFrom,
  addressTo,
  network,
  apy = 0,
  isUnknownFrom,
  isUnknownTo,
  poolAddress,
  copyAddressHandler,
  showAPY,
  itemNumber = 0,
  interval = Intervals.Daily,
  isFavourite,
  switchFavouritePool
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const { classes, cx } = useStyles({ showInfo })
  const intervalSuffix = mapIntervalToString(interval)
  const navigate = useNavigate()

  const isTablet = useMediaQuery(theme.breakpoints.down(1200))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isSmd = useMediaQuery(theme.breakpoints.down('md'))
  const hideInterval = useMediaQuery(theme.breakpoints.between(600, 650))
  const isMd = useMediaQuery(theme.breakpoints.down(1160))
  const dispatch = useDispatch()
  const location = useLocation()
  const isXtoY = initialXtoY(addressFrom ?? '', addressTo ?? '')
  const handleOpenPoolDetails = () => {
    const address1 = addressToTicker(network, tokenAData.address ?? '')
    const address2 = addressToTicker(network, tokenBData.address ?? '')
    const parsedFee = parseFeeToPathFee(Math.round(fee * 10 ** (DECIMAL - 2)))
    const isXtoY = initialXtoY(tokenAData.address ?? '', tokenBData.address ?? '')

    const tokenA = isXtoY ? address1 : address2
    const tokenB = isXtoY ? address2 : address1

    dispatch(actions.setNavigation({ address: location.pathname }))

    navigate(ROUTES.getPoolDetailsRoute(tokenA, tokenB, parsedFee), { state: { referer: 'stats' } })
  }

  const tokenAData = isXtoY
    ? {
        symbol: symbolFrom,
        icon: iconFrom,
        address: addressFrom,
        isUnknown: isUnknownFrom
      }
    : {
        symbol: symbolTo,
        icon: iconTo,
        address: addressTo,
        isUnknown: isUnknownTo
      }

  const tokenBData = isXtoY
    ? {
        symbol: symbolTo,
        icon: iconTo,
        address: addressTo,
        isUnknown: isUnknownTo
      }
    : {
        symbol: symbolFrom,
        icon: iconFrom,
        address: addressFrom,
        isUnknown: isUnknownFrom
      }
  const isDisabled = useMemo(() => {
    if (tokenAData.address === null || tokenBData.address === null) return []

    return disabledPools
      .filter(
        pool =>
          (pool.tokenX.toString() === tokenAData.address &&
            pool.tokenY.toString() === tokenBData.address) ||
          (pool.tokenX.toString() === tokenBData.address &&
            pool.tokenY.toString() === tokenAData.address)
      )
      .flatMap(p => p.feeTiers)
  }, [tokenAData.address, tokenBData.address, disabledPools]).includes(fee.toString())
  const handleOpenPosition = () => {
    const tokenA = addressToTicker(network, tokenAData.address ?? '')
    const tokenB = addressToTicker(network, tokenBData.address ?? '')
    dispatch(actions.setNavigation({ address: location.pathname }))
    navigate(
      ROUTES.getNewPositionRoute(
        tokenA,
        tokenB,
        parseFeeToPathFee(Math.round(fee * 10 ** (DECIMAL - 2)))
      ),
      { state: { referer: 'stats' } }
    )
  }

  const handleOpenSwap = () => {
    navigate(
      ROUTES.getExchangeRoute(
        addressToTicker(network, tokenAData.address ?? ''),
        addressToTicker(network, tokenBData.address ?? '')
      ),
      { state: { referer: 'stats' } }
    )
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
        return ''
    }
  }, [network])

  const copyToClipboard = () => {
    if (!poolAddress || !copyAddressHandler) {
      return
    }
    navigator.clipboard
      .writeText(poolAddress)
      .then(() => {
        copyAddressHandler('Market ID copied to Clipboard', 'success')
      })
      .catch(() => {
        copyAddressHandler('Failed to copy Market ID to Clipboard', 'error')
      })
  }

  const { convertedApy, convertedApr } = calculateAPYAndAPR(apy, poolAddress, volume, fee, TVL)

  useEffect(() => {
    if (!isTablet) {
      setShowInfo(false)
    }
  }, [isTablet])

  useEffect(() => {
    setShowInfo(false)
  }, [itemNumber])

  return (
    <Grid
      onClick={e => {
        e.stopPropagation()

        if (isTablet) {
          window.requestAnimationFrame(() => setShowInfo(prev => !prev))
        }
      }}
      container
      classes={{
        container: cx(classes.container)
      }}>
      <Grid container className={classes.mainContent}>
        <ItemValue
          title='Pool'
          style={{ flexShrink: 1, flexBasis: '300px', minWidth: 80 }}
          value={
            <Grid display='flex' alignItems='center' gap={1}>
              {!isSm && (
                <img
                  className={classes.favouriteButton}
                  src={isFavourite ? starFill : star}
                  onClick={e => {
                    if (poolAddress && switchFavouritePool) {
                      switchFavouritePool(poolAddress)
                    }

                    e.stopPropagation()
                  }}
                />
              )}
              <Grid className={classes.symbolsWrapper}>
                <Grid className={classes.imageWrapper}>
                  <img
                    className={classes.tokenIcon}
                    src={tokenAData.icon}
                    alt='Token from'
                    onError={e => {
                      e.currentTarget.src = unknownTokenIcon
                    }}
                  />
                  {tokenAData.isUnknown && tokenAData.icon !== '/unknownToken.svg' && (
                    <img className={classes.warningIcon} src={warningIcon} />
                  )}
                </Grid>

                <Grid className={classes.imageToWrapper}>
                  <img
                    className={classes.tokenIcon}
                    src={tokenBData.icon}
                    alt='Token from'
                    onError={e => {
                      e.currentTarget.src = unknownTokenIcon
                    }}
                  />

                  {tokenBData.isUnknown && tokenBData.icon !== '/unknownToken.svg' && (
                    <img className={classes.warningIcon} src={warningIcon} />
                  )}
                </Grid>
              </Grid>
              {!hideInterval && !isSm && (
                <Typography className={classes.poolAddress}>
                  {shortenAddress(tokenAData.symbol ?? '')}/
                  {shortenAddress(tokenBData.symbol ?? '')}
                </Typography>
              )}

              {!isSm && (
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
          }
        />

        <ItemValue minWidth={60} title='Fee' value={fee + '%'} />

        {!isSmd && (
          <ItemValue
            minWidth={125}
            title={
              <Box>
                <Typography className={classes.apyLabel}>
                  APY
                  <Typography className={classes.aprLabel} component='span'>
                    APR
                  </Typography>
                </Typography>
              </Box>
            }
            value={
              showAPY ? (
                <Box>
                  <Typography className={classes.apyValue}>
                    {convertAPYValue(convertedApy, 'APY')}
                    <Typography className={classes.aprValue} component='span'>
                      {convertAPYValue(convertedApr, 'APR')}
                    </Typography>
                  </Typography>
                </Box>
              ) : (
                '-'
              )
            }
          />
        )}
        <ItemValue
          minWidth={110}
          title={`Volume ${intervalSuffix}`}
          value={`$${formatNumberWithSuffix(volume)}`}
        />

        <ItemValue
          minWidth={90}
          title={`TVL ${intervalSuffix}`}
          value={`$${formatNumberWithSuffix(TVL)}`}
          style={{ flexGrow: isSmd ? 0 : 1 }}
        />

        {!isSmd && (
          <ItemValue
            minWidth={80}
            style={{ flexGrow: isTablet ? 0 : 1 }}
            title={`Fees ${intervalSuffix}`}
            value={`$${formatNumberWithSuffix((fee * 0.01 * volume).toFixed(2))}`}
          />
        )}
        {!isTablet && (
          <ItemValue
            minWidth={152}
            style={{ flexGrow: 0 }}
            title='Action'
            value={
              <Box className={classes.action}>
                <TooltipHover title='Pool details'>
                  <button className={classes.actionButton} onClick={handleOpenPoolDetails}>
                    <img width={32} height={32} src={poolStatsBtnIcon} alt={'Pool details'} />
                  </button>
                </TooltipHover>
                <TooltipHover title='Exchange'>
                  <button className={classes.actionButton} onClick={handleOpenSwap}>
                    <img width={28} src={horizontalSwapIcon} alt={'Exchange'} />
                  </button>
                </TooltipHover>

                <TooltipHover title={isDisabled ? 'Pool disabled' : 'Add position'}>
                  <button
                    disabled={isDisabled}
                    style={isDisabled ? { cursor: 'not-allowed' } : {}}
                    className={classes.actionButton}
                    onClick={e => {
                      e.stopPropagation()
                      handleOpenPosition()
                    }}>
                    <img
                      width={32}
                      height={32}
                      style={isDisabled ? { opacity: 0.6 } : {}}
                      src={isDisabled ? plusDisabled : plusIcon}
                      alt={'Open'}
                    />
                  </button>
                </TooltipHover>

                <TooltipHover title='Open in explorer'>
                  <button
                    className={classes.actionButton}
                    onClick={e => {
                      e.stopPropagation()
                      window.open(
                        `https://solscan.io/account/${poolAddress}${networkUrl}`,

                        '_blank',
                        'noopener,noreferrer'
                      )
                    }}>
                    <img width={32} height={32} src={newTabBtnIcon} alt={'Explorer'} />
                  </button>
                </TooltipHover>
              </Box>
            }
          />
        )}

        {isTablet && (
          <ArrowDropDownIcon preserveAspectRatio='none' className={classes.extendedRowIcon} />
        )}
      </Grid>
      {isSmd && (
        <Grid container display='flex' alignItems='center' justifyContent='space-around'>
          {/* {isSm && ( 
            <ItemValue
              minWidth={80}
              style={{ flexGrow: isSmd ? 0 : 1 }}
              title={'Tokens'}
              value={
                shortenAddress(tokenAData.symbol ?? '') +
                '/' +
                shortenAddress(tokenBData.symbol ?? '')
              }
            />
          )} */}
          <ItemValue
            minWidth={80}
            style={{ flexGrow: isSmd ? 0 : 1 }}
            title={'APY'}
            value={convertAPYValue(convertedApy, 'APY')}
          />
          <ItemValue
            minWidth={80}
            style={{ flexGrow: isSmd ? 0 : 1 }}
            title={'APR'}
            value={convertAPYValue(convertedApr, 'APR')}
          />
          <ItemValue
            minWidth={80}
            style={{ flexGrow: isTablet ? 0 : 1 }}
            title={`Fees ${intervalSuffix}`}
            value={`$${formatNumberWithSuffix((fee * 0.01 * volume).toFixed(2))}`}
          />
        </Grid>
      )}
      {isTablet && (
        <Grid gap={'12px'} display='flex' container flexDirection='column'>
          <Box className={classes.info}>
            <Grid container gap={'8px'} overflow={'hidden'}>
              {isMdUp && (
                <BoxValue
                  title='Pool details'
                  icon={poolStatsBtnIcon}
                  onClick={handleOpenPoolDetails}
                />
              )}

              <BoxValue title='Exchange' icon={horizontalSwapIcon} onClick={handleOpenSwap} />
              <BoxValue
                title={
                  isDisabled ? (isSm ? 'Disabled' : 'Pool disabled') : isSm ? 'Add' : 'Add position'
                }
                onClick={!isDisabled ? handleOpenPosition : undefined}
                isDisabled={isDisabled}
                icon={isDisabled ? plusDisabled : plusIcon}
              />

              {isMdUp && (
                <BoxValue
                  title='View'
                  icon={newTabBtnIcon}
                  onClick={() => {
                    window.open(
                      `https://solscan.io/account/${poolAddress}${networkUrl}`,

                      '_blank',
                      'noopener,noreferrer'
                    )
                  }}
                />
              )}
              {isSm && (
                <BoxValue
                  title={isSm ? 'Copy' : 'Copy address'}
                  onClick={copyToClipboard}
                  isDisabled={isDisabled}
                  icon={copyAddressIcon}
                  smallerIcon
                />
              )}
            </Grid>
          </Box>
          {isMd && (
            <Box className={classes.info}>
              <Grid container gap={'8px'} overflow={'hidden'}>
                {isSm && (
                  <BoxValue
                    title={isSm ? undefined : 'Favourite'}
                    icon={isFavourite ? starFill : star}
                    onClick={() => {
                      if (poolAddress && switchFavouritePool) {
                        switchFavouritePool(poolAddress)
                      }
                    }}
                  />
                )}

                <BoxValue
                  title={isSm ? 'Details' : 'Pool details'}
                  icon={poolStatsBtnIcon}
                  onClick={handleOpenPoolDetails}
                />
                <BoxValue
                  title='View'
                  icon={newTabBtnIcon}
                  onClick={() => {
                    window.open(
                      `https://solscan.io/account/${poolAddress}${networkUrl}`,

                      '_blank',
                      'noopener,noreferrer'
                    )
                  }}
                />
              </Grid>
            </Box>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default PoolListItem
