import { Button, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DepositSelector from './DepositSelector/DepositSelector'
import RangeSelector from './RangeSelector/RangeSelector'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { calcPrice, printBN, printBNtoBN, trimLeadingZeros } from '@consts/utils'
import { PublicKey } from '@solana/web3.js'
import { PlotTickData } from '@reducers/positions'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Link } from 'react-router-dom'
import settingIcon from '@static/svg/settings.svg'
import backIcon from '@static/svg/back-arrow.svg'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import PoolInit from './PoolInit/PoolInit'
import { BestTier } from '@consts/static'
import { blurContent, unblurContent } from '@consts/uiUtils'
import Slippage from '@components/Modals/Slippage/Slippage'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import useStyles from './style'

export interface INewPosition {
  tokens: SwapToken[]
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
    tokenAIndex: number | null,
    tokenBindex: number | null,
    feeTierIndex: number
  ) => void
  isCurrentPoolExisting: boolean
  calcAmount: (
    amount: BN,
    leftRangeTickIndex: number,
    rightRangeTickIndex: number,
    tokenAddress: PublicKey
  ) => BN
  feeTiers: number[]
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
}

export const NewPosition: React.FC<INewPosition> = ({
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
  onDiscreteChange
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)
  const [fee, setFee] = useState<number>(0)

  const [tokenADeposit, setTokenADeposit] = useState<string>('')
  const [tokenBDeposit, setTokenBDeposit] = useState<string>('')

  const [settings, setSettings] = React.useState<boolean>(false)
  const [slippTolerance, setSlippTolerance] = React.useState<string>('1')
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const setRangeBlockerInfo = () => {
    if (tokenAIndex === null || tokenBIndex === null) {
      return 'Select tokens to set price range.'
    }

    if (tokenAIndex === tokenBIndex) {
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
    const printIndex = byFirst ? tokenBIndex : tokenAIndex
    const calcIndex = byFirst ? tokenAIndex : tokenBIndex
    if (printIndex === null || calcIndex === null) {
      return '0.0'
    }

    const result = calcAmount(amount, left, right, tokens[calcIndex].assetAddress)

    return trimLeadingZeros(printBN(result, tokens[printIndex].decimals))
  }

  const onChangeRange = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    if (tokenAIndex !== null && (isXtoY ? right > midPrice.index : right < midPrice.index)) {
      const deposit = tokenADeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenAIndex].decimals),
        left,
        right,
        true
      )

      if (tokenBIndex !== null && +deposit !== 0) {
        setTokenADeposit(deposit)
        setTokenBDeposit(amount)

        return
      }
    }

    if (tokenBIndex !== null && (isXtoY ? left < midPrice.index : left > midPrice.index)) {
      const deposit = tokenBDeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenBIndex].decimals),
        left,
        right,
        false
      )

      if (tokenAIndex !== null && +deposit !== 0) {
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

    if (tokenAIndex !== null && (isXtoY ? rightRange > mid : rightRange < mid)) {
      const deposit = tokenADeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenAIndex].decimals),
        leftRange,
        rightRange,
        true
      )

      if (tokenBIndex !== null && +deposit !== 0) {
        setTokenADeposit(deposit)
        setTokenBDeposit(amount)

        return
      }
    }

    if (tokenBIndex !== null && (isXtoY ? leftRange < mid : leftRange > mid)) {
      const deposit = tokenBDeposit
      const amount = getOtherTokenAmount(
        printBNtoBN(deposit, tokens[tokenBIndex].decimals),
        leftRange,
        rightRange,
        false
      )

      if (tokenAIndex !== null && +deposit !== 0) {
        setTokenBDeposit(deposit)
        setTokenADeposit(amount)
      }
    }
  }
  const bestTierIndex =
    tokenAIndex === null || tokenBIndex === null
      ? undefined
      : bestTiers.find(
          tier =>
            (tier.tokenX.equals(tokens[tokenAIndex].assetAddress) &&
              tier.tokenY.equals(tokens[tokenBIndex].assetAddress)) ||
            (tier.tokenX.equals(tokens[tokenBIndex].assetAddress) &&
              tier.tokenY.equals(tokens[tokenAIndex].assetAddress))
        )?.bestTierIndex ?? undefined

  useEffect(() => {
    if (!ticksLoading) {
      onChangeRange(leftRange, rightRange)
    }
  }, [midPrice.index])

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
  }

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Link to='/pool' style={{ textDecoration: 'none' }}>
        <Grid className={classes.back} container item alignItems='center'>
          <img className={classes.backIcon} src={backIcon} />
          <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
        </Grid>
      </Link>

      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}>Add new liquidity position</Typography>
        <Button onClick={handleClickSettings} className={classes.settingsIconBtn} disableRipple>
          <img src={settingIcon} className={classes.settingsIcon} />
        </Button>
      </Grid>

      <Slippage
        open={settings}
        setSlippage={setSlippage}
        handleClose={handleCloseSettings}
        anchorEl={anchorEl}
        defaultSlippage={'1'}
        infoText='Slippage tolerance is a pricing difference between the price at the confirmation time and the actual price of the transaction users are willing to accept when initializing position.'
        headerText='Position Transaction Settings'
      />

      <Grid container className={classes.row} alignItems='stretch'>
        {showNoConnected && <NoConnected {...noConnectedBlockerProps} />}
        <DepositSelector
          className={classes.deposit}
          tokens={tokens}
          setPositionTokens={(index1, index2, fee) => {
            setTokenAIndex(index1)
            setTokenBIndex(index2)
            setFee(fee)
            onChangePositionTokens(index1, index2, fee)
          }}
          onAddLiquidity={() => {
            if (tokenAIndex !== null && tokenBIndex !== null) {
              addLiquidityHandler(
                leftRange,
                rightRange,
                isXtoY
                  ? +tokenADeposit * 10 ** tokens[tokenAIndex].decimals
                  : +tokenBDeposit * 10 ** tokens[tokenBIndex].decimals,
                isXtoY
                  ? +tokenBDeposit * 10 ** tokens[tokenBIndex].decimals
                  : +tokenADeposit * 10 ** tokens[tokenAIndex].decimals,
                { v: fromFee(new BN(Number(+slippTolerance * 1000))) }
              )
            }
          }}
          tokenAInputState={{
            value: tokenADeposit,
            setValue: value => {
              if (tokenAIndex === null) {
                return
              }
              setTokenADeposit(value)
              setTokenBDeposit(
                getOtherTokenAmount(
                  printBNtoBN(value, tokens[tokenAIndex].decimals),
                  leftRange,
                  rightRange,
                  true
                )
              )
            },
            blocked:
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              !isWaitingForNewPool &&
              (isXtoY
                ? rightRange < midPrice.index && !(leftRange > midPrice.index)
                : rightRange > midPrice.index && !(leftRange < midPrice.index)),
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenAIndex !== null ? tokens[tokenAIndex].decimals : 0
          }}
          tokenBInputState={{
            value: tokenBDeposit,
            setValue: value => {
              if (tokenBIndex === null) {
                return
              }
              setTokenBDeposit(value)
              setTokenADeposit(
                getOtherTokenAmount(
                  printBNtoBN(value, tokens[tokenBIndex].decimals),
                  leftRange,
                  rightRange,
                  false
                )
              )
            },
            blocked:
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              !isWaitingForNewPool &&
              (isXtoY
                ? leftRange > midPrice.index && !(rightRange < midPrice.index)
                : leftRange < midPrice.index && !(rightRange > midPrice.index)),
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenBIndex !== null ? tokens[tokenBIndex].decimals : 0
          }}
          feeTiers={feeTiers}
          progress={progress}
          onReverseTokens={() => {
            if (tokenAIndex === null || tokenBIndex === null) {
              return
            }

            const pom = tokenAIndex
            setTokenAIndex(tokenBIndex)
            setTokenBIndex(pom)
            onChangePositionTokens(tokenBIndex, tokenAIndex, fee)
          }}
          poolIndex={poolIndex}
          bestTierIndex={bestTierIndex}
        />

        {isCurrentPoolExisting ||
        tokenAIndex === null ||
        tokenBIndex === null ||
        tokenAIndex === tokenBIndex ||
        isWaitingForNewPool ? (
          <RangeSelector
            onChangeRange={onChangeRange}
            blocked={
              tokenAIndex === null ||
              tokenBIndex === null ||
              tokenAIndex === tokenBIndex ||
              data.length === 0 ||
              isWaitingForNewPool
            }
            blockerInfo={setRangeBlockerInfo()}
            {...(tokenAIndex === null ||
            tokenBIndex === null ||
            !isCurrentPoolExisting ||
            data.length === 0 ||
            isWaitingForNewPool
              ? noRangePlaceholderProps
              : {
                  data,
                  midPrice,
                  tokenASymbol: tokens[tokenAIndex].symbol,
                  tokenBSymbol: tokens[tokenBIndex].symbol
                })}
            ticksLoading={ticksLoading}
            isXtoY={isXtoY}
            tickSpacing={tickSpacing}
            xDecimal={xDecimal}
            yDecimal={yDecimal}
            currentPairReversed={currentPairReversed}
            initialIsDiscreteValue={initialIsDiscreteValue}
            onDiscreteChange={onDiscreteChange}
          />
        ) : (
          <PoolInit
            onChangeRange={onChangeRange}
            isXtoY={isXtoY}
            tickSpacing={tickSpacing}
            xDecimal={xDecimal}
            yDecimal={yDecimal}
            tokenASymbol={tokenAIndex !== null ? tokens[tokenAIndex].symbol : 'ABC'}
            tokenBSymbol={tokenBIndex !== null ? tokens[tokenBIndex].symbol : 'XYZ'}
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
