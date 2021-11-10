import { Grid, Typography } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import React, { useState, useRef } from 'react'
import PositionSettings from '../Modals/PositionSettings/PositionSettings'
import DepositSelector from './DepositSelector/DepositSelector'
import RangeSelector from './RangeSelector/RangeSelector'
import settingsIcon from '@static/svg/settings_ic.svg'
import useStyles from './style'
import { SwapToken } from '../Swap/Swap'
import { printBN } from '@consts/utils'

export interface INewPosition {
  tokens: SwapToken[]
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  addLiquidityHandler: (
    token1: PublicKey,
    token2: PublicKey,
    token1Amount: number,
    token2Amount: number,
    leftTickIndex: number,
    rightTickIndex: number,
    feeTier: number,
    slippageTolerance: number
  ) => void
  onChangePositionTokens: (token1Index: number | null, token2index: number | null) => void
  isCurrentPoolExisting: boolean
  calcCurrentPoolProportion: (
    leftRangeTickIndex: number,
    rightRangeTickIndex: number
  ) => number
}

export const INewPosition: React.FC<INewPosition> = ({
  tokens,
  data,
  midPriceIndex,
  addLiquidityHandler,
  onChangePositionTokens,
  isCurrentPoolExisting,
  calcCurrentPoolProportion
}) => {
  const classes = useStyles()

  const settingsRef = useRef<HTMLDivElement>(null)

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1)
  const [feeTier, setFeeTier] = useState<number>(0.05)

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [token1Index, setToken1Index] = useState<number | null>(null)
  const [token2Index, setToken2Index] = useState<number | null>(null)

  const setInputBlockerInfo = (isIndexNull: boolean, isSingleAsset: boolean) => {
    if (isIndexNull) {
      return 'Select token.'
    }

    if (isSingleAsset) {
      return 'Current price outside range. Single-asset deposit only.'
    }

    return ''
  }

  const setRangeBlockerInfo = () => {
    if (token1Index === null || token2Index === null) {
      return 'Select tokens to set price range.'
    }

    if (!isCurrentPoolExisting) {
      return 'Pool is not existing.'
    }

    return ''
  }

  const noRangePlaceholderProps = {
    data: Array(10).fill(1).map((_e, index) => ({ x: index, y: index })),
    midPriceIndex: 5,
    tokenFromSymbol: 'ABC',
    tokenToSymbol: 'XYZ'
  }

  return (
    <Grid container className={classes.wrapper}>
      <Grid container className={classes.top} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography className={classes.title}>Add new liquidity position</Typography>

        <Grid
          className={classes.settings}
          ref={settingsRef}
          onClick={() => { setSettingsOpen(true) }}
          container
          item
          alignItems='center'
        >
          <img className={classes.settingsIcon} src={settingsIcon} />
          <Typography className={classes.settingsText}>Position settings</Typography>
        </Grid>
      </Grid>

      <Grid container direction='row' justifyContent='space-between'>
        <DepositSelector
          tokens={tokens}
          setPositionTokens={(index1, index2) => {
            setToken1Index(index1)
            setToken2Index(index2)
            onChangePositionTokens(index1, index2)
          }}
          setFeeValue={setFeeTier}
          token1Max={token1Index !== null ? +printBN(tokens[token1Index].balance, tokens[token1Index].decimal) : 0}
          token2Max={token2Index !== null ? +printBN(tokens[token2Index].balance, tokens[token2Index].decimal) : 0}
          onAddLiquidity={
            (token1Amount, token2Amount) => {
              if (token1Index !== null && token2Index !== null) {
                addLiquidityHandler(
                  tokens[token1Index].assetAddress,
                  tokens[token2Index].assetAddress,
                  token1Amount,
                  token2Amount,
                  leftRange,
                  rightRange,
                  feeTier,
                  slippageTolerance
                )
              }
            }
          }
          token1InputState={{
            blocked: token1Index === null || rightRange < midPriceIndex,
            blockerInfo: setInputBlockerInfo(token1Index === null, rightRange < midPriceIndex)
          }}
          token2InputState={{
            blocked: token2Index === null || leftRange > midPriceIndex,
            blockerInfo: setInputBlockerInfo(token2Index === null, leftRange > midPriceIndex)
          }}
          calcCurrentPoolProportion={calcCurrentPoolProportion}
          leftRangeTickIndex={leftRange}
          rightRangeTickIndex={rightRange}
        />

        <RangeSelector
          onChangeRange={
            (left, right) => {
              setLeftRange(left)
              setRightRange(right)
            }
          }
          blocked={token1Index === null || token2Index === null || !isCurrentPoolExisting}
          blockerInfo={setRangeBlockerInfo()}
          {
          ...(
            token1Index === null || token2Index === null || !isCurrentPoolExisting
              ? noRangePlaceholderProps
              : {
                data,
                midPriceIndex,
                tokenFromSymbol: tokens[token1Index].symbol,
                tokenToSymbol: tokens[token2Index].symbol
              }
          )
          }
        />
      </Grid>

      <PositionSettings
        open={settingsOpen}
        anchorEl={settingsRef.current}
        handleClose={() => { setSettingsOpen(false) }}
        slippageTolerance={slippageTolerance}
        onChangeSlippageTolerance={setSlippageTolerance}
        autoSetSlippageTolerance={() => { setSlippageTolerance(1) }}
      />
    </Grid>
  )
}

export default INewPosition
