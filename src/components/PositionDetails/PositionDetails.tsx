import SinglePositionInfo from '@components/PositionDetails/SinglePositionInfo/SinglePositionInfo'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import { addressToTicker, parseFeeToPathFee } from '@consts/uiUtils'
import { TokenPriceData, printBN } from '@consts/utils'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import { PlotTickData } from '@reducers/positions'
import { PublicKey } from '@solana/web3.js'
import backIcon from '@static/svg/back-arrow.svg'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ILiquidityToken } from './SinglePositionInfo/consts'
import SinglePositionPlot from './SinglePositionPlot/SinglePositionPlot'
import useStyles from './style'
import MarketIdLabel from '@components/NewPosition/MarketIdLabel/MarketIdLabel'
import { Color } from '@material-ui/lab'
import { REFRESHER_INTERVAL } from '@consts/static'
import Refresher from '@components/Refresher/Refresher'

interface IProps {
  tokenXAddress: PublicKey
  tokenYAddress: PublicKey
  poolAddress: PublicKey
  copyPoolAddressHandler: (message: string, variant: Color) => void
  detailsData: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  currentPrice: number
  tokenX: ILiquidityToken
  tokenXPriceData?: TokenPriceData
  tokenY: ILiquidityToken
  tokenYPriceData?: TokenPriceData
  onClickClaimFee: () => void
  closePosition: (claimFarmRewards?: boolean) => void
  ticksLoading: boolean
  tickSpacing: number
  fee: Decimal
  min: number
  max: number
  initialIsDiscreteValue: boolean
  onDiscreteChange: (val: boolean) => void
  showFeesLoader?: boolean
  isBalanceLoading?: boolean
  hasTicksError?: boolean
  reloadHandler: () => void
  plotVolumeRange?: {
    min: number
    max: number
  }
  userHasStakes?: boolean
  globalPrice?: number
  setXToY: (val: boolean) => void
  xToY: boolean
  handleRefresh: () => void
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
  initialIsDiscreteValue,
  onDiscreteChange,
  showFeesLoader = false,
  isBalanceLoading = false,
  hasTicksError,
  reloadHandler,
  plotVolumeRange,
  userHasStakes = false,
  globalPrice,
  setXToY,
  xToY,
  handleRefresh
}) => {
  const classes = useStyles()
  const history = useHistory()

  const [refresherTime, setRefresherTime] = useState<number>(REFRESHER_INTERVAL)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refresherTime > 0) {
        setRefresherTime(refresherTime - 1)
      } else {
        handleRefresh()
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

  return (
    <Grid container className={classes.wrapperContainer} wrap='nowrap'>
      <Grid className={classes.positionDetails} container item direction='column'>
        <Grid className={classes.backContainer} container>
          <Link to='/pool' style={{ textDecoration: 'none' }}>
            <Grid className={classes.back} container item alignItems='center'>
              <img className={classes.backIcon} src={backIcon} />
              <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
            </Grid>
          </Link>
          <Refresher
            currentIndex={refresherTime}
            maxIndex={REFRESHER_INTERVAL}
            onClick={() => {
              handleRefresh()
              setRefresherTime(REFRESHER_INTERVAL)
            }}
          />
        </Grid>
        <SinglePositionInfo
          fee={+printBN(fee.v, DECIMAL - 2)}
          onClickClaimFee={onClickClaimFee}
          closePosition={closePosition}
          tokenX={tokenX}
          tokenXPriceData={tokenXPriceData}
          tokenY={tokenY}
          tokenYPriceData={tokenYPriceData}
          xToY={xToY}
          swapHandler={() => setXToY(!xToY)}
          showFeesLoader={showFeesLoader}
          userHasStakes={userHasStakes}
          isBalanceLoading={isBalanceLoading}
        />
      </Grid>

      <Grid
        container
        item
        direction='column'
        alignItems='center'
        className={classes.right}
        wrap='nowrap'>
        <Grid
          container
          item
          direction='row'
          alignItems='center'
          style={{ paddingLeft: 20, flexDirection: 'row-reverse' }}
          className={classes.rightSubHeader}
          wrap='nowrap'>
          <Hidden xsDown>
            <Button
              className={classes.button}
              variant='contained'
              onClick={() => {
                const parsedFee = parseFeeToPathFee(fee.v)
                const address1 = addressToTicker(tokenXAddress.toString())
                const address2 = addressToTicker(tokenYAddress.toString())

                history.push(`/newPosition/${address1}/${address2}/${parsedFee}`)
              }}>
              <span className={classes.buttonText}>+ Add Liquidity</span>
            </Button>
          </Hidden>
          <MarketIdLabel
            marketId={poolAddress.toString()}
            displayLength={9}
            copyPoolAddressHandler={copyPoolAddressHandler}
            style={{ paddingTop: '6px' }}
          />
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
          initialIsDiscreteValue={initialIsDiscreteValue}
          onDiscreteChange={onDiscreteChange}
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
        />
      </Grid>
    </Grid>
  )
}

export default PositionDetails
