import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import DepositSelector from './DepositSelector/DepositSelector'
import RangeSelector from './RangeSelector/RangeSelector'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { printBN, printBNtoBN } from '@consts/utils'
import { PublicKey } from '@solana/web3.js'
import { PlotTickData } from '@reducers/positions'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Link } from 'react-router-dom'
import backIcon from '@static/svg/back-arrow.svg'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import useStyles from './style'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'

export interface INewPosition {
  tokens: SwapToken[]
  tokensB: SwapToken[]
  data: PlotTickData[]
  midPrice: TickPlotPositionData
  addLiquidityHandler: (leftTickIndex: number, rightTickIndex: number) => void
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
  onZoomOut: (min: number, max: number) => void
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
  progress: ProgressState
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
}

export const NewPosition: React.FC<INewPosition> = ({
  tokens,
  tokensB,
  data,
  midPrice,
  addLiquidityHandler,
  onChangePositionTokens,
  isCurrentPoolExisting,
  calcAmount,
  feeTiers,
  ticksLoading,
  onZoomOut,
  showNoConnected,
  noConnectedBlockerProps,
  progress,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)

  const [tokenADeposit, setTokenADeposit] = useState<string>('')
  const [tokenBDeposit, setTokenBDeposit] = useState<string>('')

  const setRangeBlockerInfo = () => {
    if (tokenAIndex === null || tokenBIndex === null) {
      return 'Select tokens to set price range.'
    }

    if (!isCurrentPoolExisting) {
      return 'Pool does not exist'
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

    return printBN(result, tokens[printIndex].decimal)
  }

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Link to='/pool' style={{ textDecoration: 'none' }}>
        <Grid className={classes.back} container item alignItems='center'>
          <img className={classes.backIcon} src={backIcon} />
          <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
        </Grid>
      </Link>

      <Typography className={classes.title}>Add new liquidity position</Typography>

      <Grid container className={classes.row}>
        {showNoConnected && <NoConnected {...noConnectedBlockerProps} />}
        <DepositSelector
          className={classes.deposit}
          tokens={tokens}
          tokensB={tokensB}
          setPositionTokens={(index1, index2, fee) => {
            setTokenAIndex(index1)
            setTokenBIndex(index2)
            onChangePositionTokens(index1, index2, fee)
          }}
          onAddLiquidity={() => {
            if (tokenAIndex !== null && tokenBIndex !== null) {
              addLiquidityHandler(leftRange, rightRange)
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
                  printBNtoBN(value, tokens[tokenAIndex].decimal),
                  leftRange,
                  rightRange,
                  true
                )
              )
            },
            blocked:
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              (isXtoY ? rightRange <= midPrice.index : rightRange > midPrice.index),
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenAIndex !== null ? tokens[tokenAIndex].decimal : 0
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
                  printBNtoBN(value, tokens[tokenBIndex].decimal),
                  leftRange,
                  rightRange,
                  false
                )
              )
            },
            blocked:
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              (isXtoY ? leftRange > midPrice.index : leftRange <= midPrice.index),
            blockerInfo: 'Range only for single-asset deposit.',
            decimalsLimit: tokenBIndex !== null ? tokens[tokenBIndex].decimal : 0
          }}
          feeTiers={feeTiers}
          isCurrentPoolExisting={isCurrentPoolExisting}
          progress={progress}
        />

        <RangeSelector
          onChangeRange={(left, right) => {
            setLeftRange(left)
            setRightRange(right)

            if (
              tokenAIndex !== null &&
              (isXtoY ? right > midPrice.index : right < midPrice.index)
            ) {
              const amount = getOtherTokenAmount(
                printBNtoBN(tokenADeposit, tokens[tokenAIndex].decimal),
                left,
                right,
                true
              )

              if (tokenBIndex !== null && +tokenADeposit !== 0) {
                setTokenBDeposit(amount)

                return
              }
            }

            if (tokenBIndex !== null && (isXtoY ? left < midPrice.index : left > midPrice.index)) {
              const amount = getOtherTokenAmount(
                printBNtoBN(tokenBDeposit, tokens[tokenBIndex].decimal),
                left,
                right,
                false
              )

              if (tokenAIndex !== null && +tokenBDeposit !== 0) {
                setTokenADeposit(amount)
              }
            }
          }}
          blocked={
            tokenAIndex === null ||
            tokenBIndex === null ||
            !isCurrentPoolExisting ||
            data.length === 0
          }
          blockerInfo={setRangeBlockerInfo()}
          {...(tokenAIndex === null ||
          tokenBIndex === null ||
          !isCurrentPoolExisting ||
          data.length === 0
            ? noRangePlaceholderProps
            : {
                data,
                midPrice,
                tokenASymbol: tokens[tokenAIndex].symbol,
                tokenBSymbol: tokens[tokenBIndex].symbol
              })}
          onZoomOut={onZoomOut}
          ticksLoading={ticksLoading}
          isXtoY={isXtoY}
          tickSpacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
        />
      </Grid>
    </Grid>
  )
}

export default NewPosition
