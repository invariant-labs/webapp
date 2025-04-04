import MarketIdLabel from '@components/NewPosition/MarketIdLabel/MarketIdLabel'
import SinglePositionInfo from '@components/PositionDetails/SinglePositionInfo/SinglePositionInfo'
import SinglePositionPlot from '@components/PositionDetails/SinglePositionPlot/SinglePositionPlot'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import Refresher from '@components/Refresher/Refresher'
import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { NetworkType, REFRESHER_INTERVAL } from '@store/consts/static'
import { PlotTickData } from '@store/reducers/positions'
import { VariantType } from 'notistack'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ILiquidityToken } from './SinglePositionInfo/consts'
import { useStyles } from './style'
import { TokenPriceData } from '@store/consts/types'
import { addressToTicker, initialXtoY, parseFeeToPathFee, printBN, ROUTES } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import icons from '@static/icons'
interface IProps {
  tokenXAddress: PublicKey
  tokenYAddress: PublicKey
  poolAddress: PublicKey
  copyPoolAddressHandler: (message: string, variant: VariantType) => void
  detailsData: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  currentPrice: number
  tokenX: ILiquidityToken
  tokenY: ILiquidityToken
  tokenXPriceData?: TokenPriceData
  tokenYPriceData?: TokenPriceData
  onClickClaimFee: () => void
  closePosition: (claimFarmRewards?: boolean) => void
  ticksLoading: boolean
  tickSpacing: number
  fee: Decimal
  min: number
  max: number
  showFeesLoader?: boolean
  hasTicksError?: boolean
  reloadHandler: () => void
  plotVolumeRange?: {
    min: number
    max: number
  }
  globalPrice?: number
  setXToY: (val: boolean) => void
  onRefresh: () => void
  xToY: boolean
  isBalanceLoading: boolean
  network: NetworkType
}

const PositionDetails: React.FC<IProps> = ({
  tokenXAddress,
  tokenYAddress,
  poolAddress,
  copyPoolAddressHandler,
  detailsData,
  leftRange,
  rightRange,
  midPrice,
  currentPrice,
  tokenY,
  tokenX,
  tokenXPriceData,
  tokenYPriceData,
  onClickClaimFee,
  closePosition,
  ticksLoading,
  tickSpacing,
  fee,
  min,
  max,
  showFeesLoader = false,
  hasTicksError,
  reloadHandler,
  plotVolumeRange,
  onRefresh,
  isBalanceLoading,
  globalPrice,
  setXToY,
  xToY,
  network
}) => {
  const { classes } = useStyles()

  const navigate = useNavigate()

  const [refresherTime, setRefresherTime] = useState<number>(REFRESHER_INTERVAL)

  const isActive = midPrice.x >= min && midPrice.x <= max

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refresherTime > 0) {
        setRefresherTime(refresherTime - 1)
      } else {
        onRefresh()
        setRefresherTime(REFRESHER_INTERVAL)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [refresherTime])

  const memoizedLeftRange = React.useMemo(
    () => (xToY ? leftRange : { ...rightRange, x: 1 / rightRange.x }),
    [leftRange, xToY]
  )
  const memoizedRightRange = React.useMemo(
    () => (xToY ? rightRange : { ...leftRange, x: 1 / leftRange.x }),
    [rightRange, xToY]
  )

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
    <Grid container className={classes.wrapperContainer}>
      <Grid className={classes.positionDetails} container item>
        <Grid className={classes.backContainer} container>
          <Link to={ROUTES.PORTFOLIO} style={{ textDecoration: 'none' }}>
            <Grid className={classes.back} container item>
              <img className={classes.backIcon} src={icons.backIcon} alt='Back' />
              <Typography className={classes.backText}>Positions</Typography>
            </Grid>
          </Link>
          <Grid container className={classes.marketIdWithRefresher}>
            <Hidden mdUp>
              <MarketIdLabel
                marketId={poolAddress.toString()}
                displayLength={5}
                copyPoolAddressHandler={copyPoolAddressHandler}
                style={{ paddingRight: 8 }}
              />
              {poolAddress.toString() && (
                <TooltipHover text='Open pool in explorer'>
                  <Grid height={'24px'} mr={'12px'}>
                    <a
                      href={`https://solscan.io/account/${poolAddress.toString()}${networkUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={event => {
                        event.stopPropagation()
                      }}
                      className={classes.link}>
                      <img width={14} height={14} src={icons.newTab} alt={'Token address'} />
                    </a>
                  </Grid>
                </TooltipHover>
              )}
              <Grid flex={1} justifyItems={'flex-end'}>
                <TooltipHover text='Refresh'>
                  <Refresher
                    currentIndex={refresherTime}
                    maxIndex={REFRESHER_INTERVAL}
                    onClick={() => {
                      onRefresh()
                      setRefresherTime(REFRESHER_INTERVAL)
                    }}
                  />
                </TooltipHover>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <SinglePositionInfo
          fee={+printBN(fee.v, DECIMAL - 2)}
          onClickClaimFee={onClickClaimFee}
          closePosition={closePosition}
          tokenX={tokenX}
          tokenY={tokenY}
          tokenXPriceData={tokenXPriceData}
          tokenYPriceData={tokenYPriceData}
          xToY={xToY}
          swapHandler={() => setXToY(!xToY)}
          showFeesLoader={showFeesLoader}
          isBalanceLoading={isBalanceLoading}
          isActive={isActive}
          network={network}
        />
      </Grid>

      <Grid container item className={classes.right}>
        <Grid className={classes.positionPlotWrapper}>
          <Grid container item className={classes.rightHeaderWrapper}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                className={classes.button}
                variant='contained'
                onClick={() => {
                  const parsedFee = parseFeeToPathFee(fee.v)
                  const address1 = addressToTicker(network, tokenXAddress.toString())
                  const address2 = addressToTicker(network, tokenYAddress.toString())

                  const isXtoY = initialXtoY(
                    tokenXAddress.toString() ?? '',
                    tokenYAddress.toString() ?? ''
                  )

                  const tokenA = isXtoY ? address1 : address2
                  const tokenB = isXtoY ? address2 : address1

                  navigate(ROUTES.getNewPositionRoute(tokenA, tokenB, parsedFee))
                }}>
                <span className={classes.buttonText}>+ Add Position</span>
              </Button>
            </Box>
            <Hidden mdDown>
              <TooltipHover text='Refresh'>
                <Grid className={classes.refreshWrapper}>
                  <Refresher
                    currentIndex={refresherTime}
                    maxIndex={REFRESHER_INTERVAL}
                    onClick={() => {
                      onRefresh()
                      setRefresherTime(REFRESHER_INTERVAL)
                    }}
                  />
                </Grid>
              </TooltipHover>
              <Grid className={classes.marketIDWrapper}>
                <MarketIdLabel
                  marketId={poolAddress.toString()}
                  displayLength={5}
                  copyPoolAddressHandler={copyPoolAddressHandler}
                />
                {poolAddress.toString() && (
                  <TooltipHover text='Open pool in explorer'>
                    <Grid mr={'12px'}>
                      <a
                        href={`https://solscan.io/account/${poolAddress.toString()}${networkUrl}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={event => {
                          event.stopPropagation()
                        }}
                        className={classes.link}>
                        <img className={classes.newTab} src={icons.newTab} alt={'Token address'} />
                      </a>
                    </Grid>
                  </TooltipHover>
                )}
              </Grid>
            </Hidden>
          </Grid>
          <SinglePositionPlot
            data={
              detailsData.length
                ? xToY
                  ? detailsData
                  : detailsData.map(tick => ({ ...tick, x: 1 / tick.x })).reverse()
                : Array(100)
                    .fill(1)
                    .map((_e, index) => ({ x: index, y: index, index }))
            }
            leftRange={memoizedLeftRange}
            rightRange={memoizedRightRange}
            midPrice={{
              ...midPrice,
              x: midPrice.x ** (xToY ? 1 : -1)
            }}
            currentPrice={currentPrice ** (xToY ? 1 : -1)}
            tokenY={tokenY}
            tokenX={tokenX}
            ticksLoading={ticksLoading}
            tickSpacing={tickSpacing}
            min={xToY ? min : 1 / max}
            max={xToY ? max : 1 / min}
            xToY={xToY}
            hasTicksError={hasTicksError}
            reloadHandler={reloadHandler}
            volumeRange={
              xToY
                ? plotVolumeRange
                : {
                    min: 1 / (plotVolumeRange?.max ?? 1),
                    max: 1 / (plotVolumeRange?.min ?? 1)
                  }
            }
            globalPrice={globalPrice}
            tokenAPriceData={xToY ? tokenXPriceData : tokenYPriceData}
            tokenBPriceData={xToY ? tokenYPriceData : tokenXPriceData}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PositionDetails
