import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import Slippage from '@components/Modals/Slippage/Slippage'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import { ALL_FEE_TIERS_DATA, BestTier } from '@consts/static'
import { addressToTicker, blurContent, parseFeeToPathFee, unblurContent } from '@consts/uiUtils'
import {
  TokenPriceData,
  PositionTokenBlock,
  calcPrice,
  determinePositionTokenBlock,
  printBN,
  printBNtoBN,
  trimLeadingZeros
} from '@consts/utils'
import { MIN_TICK } from '@invariant-labs/sdk'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import { Button, Grid, Typography } from '@material-ui/core'
import { Color } from '@material-ui/lab'
import { BN } from '@project-serum/anchor'
import { PlotTickData } from '@reducers/positions'
import { SwapToken } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import backIcon from '@static/svg/back-arrow.svg'
import settingIcon from '@static/svg/settings.svg'
import { History } from 'history'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConcentrationTypeSwitch from './ConcentrationTypeSwitch/ConcentrationTypeSwitch'
import DepositSelector from './DepositSelector/DepositSelector'
import MarketIdLabel from './MarketIdLabel/MarketIdLabel'
import PoolInit from './PoolInit/PoolInit'
import RangeSelector from './RangeSelector/RangeSelector'
import useStyles from './style'

export interface INewPosition {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  history: History<unknown>
  poolAddress: string
  calculatePoolAddress: () => Promise<string>
  copyPoolAddressHandler: (message: string, variant: Color) => void
  tokens: Record<string, SwapToken>
  data: PlotTickData[]
  midPrice: TickPlotPositionData
  setMidPrice: (mid: TickPlotPositionData) => void
  addLiquidityHandler: (
    leftTickIndex: number,
    rightTickIndex: number,
    xAmount: number,
    yAmount: number,
    slippage: Decimal
  ) => void
  onChangePositionTokens: (
    tokenA: PublicKey | null,
    tokenB: PublicKey | null,
    feeTierIndex: number
  ) => void
  isCurrentPoolExisting: boolean
  calcAmount: (
    amount: BN,
    leftRangeTickIndex: number,
    rightRangeTickIndex: number,
    tokenAddress: PublicKey
  ) => BN
  feeTiers: Array<{
    feeValue: number
  }>
  ticksLoading: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
  progress: ProgressState
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
  isWaitingForNewPool: boolean
  poolIndex: number | null
  currentPairReversed: boolean | null
  bestTiers: BestTier[]
  initialIsDiscreteValue: boolean
  onDiscreteChange: (val: boolean) => void
  currentPriceSqrt: BN
  canCreateNewPool: boolean
  canCreateNewPosition: boolean
  handleAddToken: (address: string) => void
  commonTokens: PublicKey[]
  initialIsConcentratedValue: boolean
  onIsConcentratedChange: (val: boolean) => void
  initialHideUnknownTokensValue: boolean
  onHideUnknownTokensChange: (val: boolean) => void
  tokenAPriceData?: TokenPriceData
  tokenBPriceData?: TokenPriceData
  priceALoading?: boolean
  priceBLoading?: boolean
  hasTicksError?: boolean
  reloadHandler: () => void
  plotVolumeRange?: {
    min: number
    max: number
  }
  currentFeeIndex: number
  onSlippageChange: (slippage: string) => void
  initialSlippage: string
}

export const NewPosition: React.FC<INewPosition> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  history,
  poolAddress,
  calculatePoolAddress,
  copyPoolAddressHandler,
  tokens,
  data,
  midPrice,
  setMidPrice,
  addLiquidityHandler,
  onChangePositionTokens,
  isCurrentPoolExisting,
  calcAmount,
  feeTiers,
  ticksLoading,
  showNoConnected,
  noConnectedBlockerProps,
  progress,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing,
  isWaitingForNewPool,
  poolIndex,
  currentPairReversed,
  bestTiers,
  initialIsDiscreteValue,
  onDiscreteChange,
  currentPriceSqrt,
  canCreateNewPool,
  canCreateNewPosition,
  handleAddToken,
  commonTokens,
  initialIsConcentratedValue,
  onIsConcentratedChange,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange,
  tokenAPriceData,
  tokenBPriceData,
  priceALoading,
  priceBLoading,
  hasTicksError,
  reloadHandler,
  plotVolumeRange,
  currentFeeIndex,
  onSlippageChange,
  initialSlippage
}) => {
  const classes = useStyles()

  const [isConcentrated, setIsConcentrated] = useState(initialIsConcentratedValue)

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [tokenA, setTokenA] = useState<PublicKey | null>(null)
  const [tokenB, setTokenB] = useState<PublicKey | null>(null)

  const [tokenADeposit, setTokenADeposit] = useState<string>('')
  const [tokenBDeposit, setTokenBDeposit] = useState<string>('')

  const [address, setAddress] = useState<string>(poolAddress)
  const [settings, setSettings] = React.useState<boolean>(false)
  const [slippTolerance, setSlippTolerance] = React.useState<string>(initialSlippage)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const setRangeBlockerInfo = () => {
    if (tokenA === null || tokenB === null) {
      return 'Select tokens to set price range.'
    }

    if (tokenA.equals(tokenB)) {
      return "Token A can't be the same as token B"
    }

    if (isWaitingForNewPool) {
      return 'Loading pool info...'
    }

    return ''
  }

  const noRangePlaceholderProps = {
    data: Array(100)
      .fill(1)
      .map((_e, index) => ({ x: index, y: index, index })),
    midPrice: {
      x: 50,
      index: 50
    },
    tokenASymbol: 'ABC',
    tokenBSymbol: 'XYZ'
  }

  const getOtherTokenAmount = (amount: BN, left: number, right: number, byFirst: boolean) => {
    const printAddress = byFirst ? tokenB : tokenA
    const calcAddress = byFirst ? tokenA : tokenB
    if (printAddress === null || calcAddress === null) {
      return '0.0'
    }

    const result = calcAmount(amount, left, right, calcAddress)

    return trimLeadingZeros(printBN(result, tokens[printAddress.toString()].decimals))
  }

  const onChangeRange = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    if (positionOpeningMethod === 'range') {
      const { leftInRange, rightInRange } = getTicksInsideRange(left, right, isXtoY)
      leftRange = leftInRange
      rightRange = rightInRange
    } else {
      leftRange = left
      rightRange = right
    }

    setLeftRange(leftRange)
    setRightRange(rightRange)

    if (tokenA !== null && (isXtoY ? rightRange > midPrice.index : rightRange < midPrice.index)) {
      const deposit = tokenADeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenA.toString()].decimals),
        leftRange,
        rightRange,
        true
      )

      if (tokenB !== null && +deposit !== 0) {
        setTokenADeposit(deposit)
        setTokenBDeposit(amount)

        return
      }
    }

    if (tokenB !== null && (isXtoY ? leftRange < midPrice.index : leftRange > midPrice.index)) {
      const deposit = tokenBDeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenB.toString()].decimals),
        leftRange,
        rightRange,
        false
      )

      if (tokenA !== null && +deposit !== 0) {
        setTokenBDeposit(deposit)
        setTokenADeposit(amount)
      }
    }
  }

  const onChangeMidPrice = (mid: number) => {
    setMidPrice({
      index: mid,
      x: calcPrice(mid, isXtoY, xDecimal, yDecimal)
    })

    if (tokenA !== null && (isXtoY ? rightRange > mid : rightRange < mid)) {
      const deposit = tokenADeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenA.toString()].decimals),
        leftRange,
        rightRange,
        true
      )

      if (tokenB !== null && +deposit !== 0) {
        setTokenADeposit(deposit)
        setTokenBDeposit(amount)

        return
      }
    }

    if (tokenB !== null && (isXtoY ? leftRange < mid : leftRange > mid)) {
      const deposit = tokenBDeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenB.toString()].decimals),
        leftRange,
        rightRange,
        false
      )

      if (tokenA !== null && +deposit !== 0) {
        setTokenBDeposit(deposit)
        setTokenADeposit(amount)
      }
    }
  }
  const bestTierIndex =
    tokenA === null || tokenB === null
      ? undefined
      : bestTiers.find(
          tier =>
            (tier.tokenX.equals(tokenA) && tier.tokenY.equals(tokenB)) ||
            (tier.tokenX.equals(tokenB) && tier.tokenY.equals(tokenA))
        )?.bestTierIndex ?? undefined

  useEffect(() => {
    if (!ticksLoading && !isConcentrated) {
      onChangeRange(leftRange, rightRange)
    }
  }, [midPrice.index])

  useEffect(() => {
    const configurePoolAddress = async () => {
      const configuredAddress = poolAddress === '' ? await calculatePoolAddress() : poolAddress
      setAddress(configuredAddress)
    }
    void configurePoolAddress()
  }, [initialTokenFrom, initialTokenTo, initialFee])

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setSettings(true)
  }

  const handleCloseSettings = () => {
    unblurContent()
    setSettings(false)
  }

  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
    onSlippageChange(slippage)
  }

  const updatePath = (address1: PublicKey | null, address2: PublicKey | null, fee: number) => {
    const parsedFee = parseFeeToPathFee(+ALL_FEE_TIERS_DATA[fee].tier.fee)

    if (address1 != null && address2 != null) {
      const part1 = addressToTicker(tokens[address1.toString()].assetAddress.toString())
      const part2 = addressToTicker(tokens[address2.toString()].assetAddress.toString())
      history.replace(`/newPosition/${part1}/${part2}/${parsedFee}`)
    } else if (address1 != null) {
      const part = addressToTicker(tokens[address1.toString()].assetAddress.toString())
      history.replace(`/newPosition/${part}/${parsedFee}`)
    } else if (address2 != null) {
      const part = addressToTicker(tokens[address2.toString()].assetAddress.toString())
      history.replace(`/newPosition/${part}/${parsedFee}`)
    } else if (fee != null) {
      history.replace(`/newPosition/${parsedFee}`)
    }
  }

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Link to='/pool' style={{ textDecoration: 'none', maxWidth: 'fit-content' }}>
        <Grid className={classes.back} container item alignItems='center'>
          <img className={classes.backIcon} src={backIcon} />
          <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
        </Grid>
      </Link>

      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}>Add new liquidity position</Typography>
        <Grid container item alignItems='center' className={classes.options}>
          {address !== '' ? (
            <MarketIdLabel
              displayLength={9}
              marketId={address}
              copyPoolAddressHandler={copyPoolAddressHandler}
            />
          ) : null}
          <ConcentrationTypeSwitch
            onSwitch={val => {
              setIsConcentrated(val)
              onIsConcentratedChange(val)
            }}
            initialValue={initialIsConcentratedValue ? 0 : 1}
            className={classes.switch}
            style={{
              opacity: poolIndex !== null ? 1 : 0
            }}
            disabled={poolIndex === null}
          />
          <Button onClick={handleClickSettings} className={classes.settingsIconBtn} disableRipple>
            <img src={settingIcon} className={classes.settingsIcon} />
          </Button>
        </Grid>
      </Grid>

      <Slippage
        open={settings}
        setSlippage={setSlippage}
        handleClose={handleCloseSettings}
        anchorEl={anchorEl}
        defaultSlippage={'1'}
        initialSlippage={initialSlippage}
        infoText='Slippage tolerance is a pricing difference between the price at the confirmation time and the actual price of the transaction users are willing to accept when initializing position.'
        headerText='Position Transaction Settings'
      />

      <Grid container className={classes.row} alignItems='stretch'>
        {showNoConnected && <NoConnected {...noConnectedBlockerProps} />}
        <DepositSelector
          initialTokenFrom={initialTokenFrom}
          initialTokenTo={initialTokenTo}
          initialFee={initialFee}
          className={classes.deposit}
          tokens={tokens}
          setPositionTokens={(address1, address2, fee) => {
            setTokenA(address1)
            setTokenB(address2)
            onChangePositionTokens(address1, address2, fee)

            updatePath(address1, address2, fee)
          }}
          onAddLiquidity={() => {
            if (tokenA !== null && tokenB !== null) {
              addLiquidityHandler(
                leftRange,
                rightRange,
                isXtoY
                  ? +tokenADeposit * 10 ** tokens[tokenA.toString()].decimals
                  : +tokenBDeposit * 10 ** tokens[tokenB.toString()].decimals,
                isXtoY
                  ? +tokenBDeposit * 10 ** tokens[tokenB.toString()].decimals
                  : +tokenADeposit * 10 ** tokens[tokenA.toString()].decimals,
                { v: fromFee(new BN(Number(+slippTolerance * 1000))) }
              )
            }
          }}
          tokenAInputState={{
            value: tokenADeposit,
            setValue: value => {
              if (tokenA === null) {
                return
              }
              setTokenADeposit(value)
              setTokenBDeposit(
                getOtherTokenAmount(
                  printBNtoBN(value, tokens[tokenA.toString()].decimals),
                  leftRange,
                  rightRange,
                  true
                )
              )
            },
            blocked:
              tokenA !== null &&
              tokenB !== null &&
              !isWaitingForNewPool &&
              determinePositionTokenBlock(
                currentPriceSqrt,
                Math.min(leftRange, rightRange),
                Math.max(leftRange, rightRange),
                isXtoY
              ) === PositionTokenBlock.A,
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenA !== null ? tokens[tokenA.toString()].decimals : 0
          }}
          tokenBInputState={{
            value: tokenBDeposit,
            setValue: value => {
              if (tokenB === null) {
                return
              }
              setTokenBDeposit(value)
              setTokenADeposit(
                getOtherTokenAmount(
                  printBNtoBN(value, tokens[tokenB.toString()].decimals),
                  leftRange,
                  rightRange,
                  false
                )
              )
            },
            blocked:
              tokenA !== null &&
              tokenB !== null &&
              !isWaitingForNewPool &&
              determinePositionTokenBlock(
                currentPriceSqrt,
                Math.min(leftRange, rightRange),
                Math.max(leftRange, rightRange),
                isXtoY
              ) === PositionTokenBlock.B,
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenB !== null ? tokens[tokenB.toString()].decimals : 0
          }}
          feeTiers={feeTiers.map(tier => tier.feeValue)}
          progress={progress}
          onReverseTokens={() => {
            if (tokenA === null || tokenB === null) {
              return
            }

            const pom = tokenA
            setTokenA(tokenB)
            setTokenB(pom)
            onChangePositionTokens(tokenB, tokenA, currentFeeIndex)

            updatePath(tokenB, tokenA, currentFeeIndex)
          }}
          poolIndex={poolIndex}
          bestTierIndex={bestTierIndex}
          canCreateNewPool={canCreateNewPool}
          canCreateNewPosition={canCreateNewPosition}
          handleAddToken={handleAddToken}
          commonTokens={commonTokens}
          initialHideUnknownTokensValue={initialHideUnknownTokensValue}
          onHideUnknownTokensChange={onHideUnknownTokensChange}
          priceA={tokenAPriceData?.price}
          priceB={tokenBPriceData?.price}
          priceALoading={priceALoading}
          priceBLoading={priceBLoading}
          feeTierIndex={currentFeeIndex}
        />

        {isCurrentPoolExisting ||
        tokenA === null ||
        tokenB === null ||
        tokenA.equals(tokenB) ||
        isWaitingForNewPool ? (
          <RangeSelector
            poolIndex={poolIndex}
            onChangeRange={onChangeRange}
            blocked={
              tokenA === null ||
              tokenB === null ||
              tokenA.equals(tokenB) ||
              data.length === 0 ||
              isWaitingForNewPool
            }
            blockerInfo={setRangeBlockerInfo()}
            {...(tokenA === null ||
            tokenB === null ||
            !isCurrentPoolExisting ||
            data.length === 0 ||
            isWaitingForNewPool
              ? noRangePlaceholderProps
              : {
                  data,
                  midPrice,
                  globalPrice,
                  tokenASymbol: tokens[tokenA.toString()].symbol,
                  tokenBSymbol: tokens[tokenB.toString()].symbol
                })}
            ticksLoading={ticksLoading}
            isXtoY={isXtoY}
            tickSpacing={tickSpacing}
            xDecimal={xDecimal}
            yDecimal={yDecimal}
            currentPairReversed={currentPairReversed}
            initialIsDiscreteValue={initialIsDiscreteValue}
            onDiscreteChange={onDiscreteChange}
            isConcentrated={isConcentrated}
            hasTicksError={hasTicksError}
            reloadHandler={reloadHandler}
            volumeRange={plotVolumeRange}
          />
        ) : (
          <PoolInit
            onChangeRange={onChangeRange}
            isXtoY={isXtoY}
            tickSpacing={tickSpacing}
            xDecimal={xDecimal}
            yDecimal={yDecimal}
            tokenASymbol={tokenA !== null ? tokens[tokenA.toString()].symbol : 'ABC'}
            tokenBSymbol={tokenB !== null ? tokens[tokenB.toString()].symbol : 'XYZ'}
            midPrice={midPrice.index}
            onChangeMidPrice={onChangeMidPrice}
            currentPairReversed={currentPairReversed}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default NewPosition
