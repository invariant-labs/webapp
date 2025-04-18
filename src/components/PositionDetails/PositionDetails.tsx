import SinglePositionInfo from '@components/PositionDetails/SinglePositionInfo/SinglePositionInfo'
import SinglePositionPlot from '@components/PositionDetails/SinglePositionPlot/SinglePositionPlot'
import { TickPlotPositionData } from '@common/PriceRangePlot/PriceRangePlot'
import { Box, useMediaQuery } from '@mui/material'
import {
  NetworkType,
  REFRESHER_INTERVAL,
  WSOL_CLOSE_POSITION_LAMPORTS_DEV,
  WSOL_CLOSE_POSITION_LAMPORTS_MAIN
} from '@store/consts/static'
import { PlotTickData } from '@store/reducers/positions'
import { VariantType } from 'notistack'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
import { ILiquidityToken, TokenPriceData } from '@store/consts/types'
import { addressToTicker, initialXtoY, parseFeeToPathFee, printBN, ROUTES } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { DECIMAL, getMaxTick, getMinTick } from '@invariant-labs/sdk/lib/utils'
import { PositionHeader } from './PositionHeader/PositionHeader'
import { PoolDetails } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { BN } from '@project-serum/anchor'
import { theme } from '@static/theme'
import { Information } from '@common/Information/Information'
import { eyeYellowIcon } from '@static/icons'
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
  showPositionLoader?: boolean
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
  network: NetworkType
  poolDetails: PoolDetails | null
  onGoBackClick: () => void
  showPoolDetailsLoader: boolean
  solBalance: BN
  isPreview: boolean
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
  showFeesLoader,
  showPositionLoader = false,
  hasTicksError,
  reloadHandler,
  plotVolumeRange,
  onRefresh,
  globalPrice,
  setXToY,
  xToY,
  network,
  onGoBackClick,
  poolDetails,
  showPoolDetailsLoader,
  solBalance,
  isPreview
}) => {
  const { classes } = useStyles()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const navigate = useNavigate()

  const [refresherTime, setRefresherTime] = useState<number>(REFRESHER_INTERVAL)

  const [showPreviewInfo, setShowPreviewInfo] = useState(false)
  const [connectWalletDelay, setConnectWalletDelay] = useState(false)

  const isActive = midPrice.x >= min && midPrice.x <= max

  const canClosePosition = useMemo(() => {
    if (network === NetworkType.Mainnet) {
      return solBalance.gte(WSOL_CLOSE_POSITION_LAMPORTS_MAIN)
    } else {
      return solBalance.gte(WSOL_CLOSE_POSITION_LAMPORTS_DEV)
    }
  }, [network, solBalance])

  const isFullRange = useMemo(
    () =>
      leftRange.index === getMinTick(tickSpacing) && rightRange.index === getMaxTick(tickSpacing),
    [tickSpacing, leftRange, rightRange]
  )

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConnectWalletDelay(true)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (isPreview && connectWalletDelay) {
      setShowPreviewInfo(true)
    } else {
      setShowPreviewInfo(false)
    }
  }, [isPreview, connectWalletDelay])

  return (
    <>
      <Information mb={3} transitionTimeout={300} shouldOpen={showPreviewInfo}>
        <Box className={classes.information}>
          <img src={eyeYellowIcon} alt='Eye' style={{ minWidth: 24 }} />
          {isSm
            ? `Viewing someone else's position. Wallet actions unavailable.`
            : `You are currently watching someone else's position. Connect your wallet or go to
              portfolio to see your positions.`}
        </Box>
      </Information>
      <Box className={classes.mainContainer}>
        <PositionHeader
          tokenA={
            xToY
              ? { icon: tokenX.icon, ticker: tokenY.name }
              : { icon: tokenY.icon, ticker: tokenX.name }
          }
          tokenB={
            xToY
              ? { icon: tokenY.icon, ticker: tokenX.name }
              : { icon: tokenX.icon, ticker: tokenY.name }
          }
          fee={+printBN(fee.v, DECIMAL - 2)}
          poolAddress={poolAddress.toString()}
          networkUrl={networkUrl}
          isActive={isActive}
          canClosePosition={canClosePosition}
          hasFees={tokenX.claimValue + tokenY.claimValue > 0}
          onReverseTokensClick={() => setXToY(!xToY)}
          onClosePositionClick={() => {
            closePosition()
          }}
          onAddPositionClick={() => {
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
          }}
          onRefreshClick={() => onRefresh()}
          onGoBackClick={() => onGoBackClick()}
          copyPoolAddressHandler={copyPoolAddressHandler}
          isPreview={showPreviewInfo}
        />
        <Box className={classes.container}>
          <Box className={classes.leftSide}>
            <SinglePositionInfo
              onClickClaimFee={onClickClaimFee}
              tokenX={tokenX}
              tokenY={tokenY}
              tokenXPriceData={tokenXPriceData}
              tokenYPriceData={tokenYPriceData}
              xToY={xToY}
              showFeesLoader={showFeesLoader}
              showPositionLoader={showPositionLoader}
              poolDetails={poolDetails}
              showPoolDetailsLoader={showPoolDetailsLoader}
              poolAddress={poolAddress}
              isPreview={showPreviewInfo}
            />
          </Box>
          <Box className={classes.rightSide}>
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
              leftRange={xToY ? leftRange : { ...rightRange, x: 1 / rightRange.x }}
              rightRange={xToY ? rightRange : { ...leftRange, x: 1 / leftRange.x }}
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
              isFullRange={isFullRange}
              globalPrice={globalPrice}
              tokenAPriceData={xToY ? tokenXPriceData : tokenYPriceData}
              tokenBPriceData={xToY ? tokenYPriceData : tokenXPriceData}
              volumeRange={
                xToY
                  ? plotVolumeRange
                  : {
                      min: 1 / (plotVolumeRange?.max ?? 1),
                      max: 1 / (plotVolumeRange?.min ?? 1)
                    }
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PositionDetails
