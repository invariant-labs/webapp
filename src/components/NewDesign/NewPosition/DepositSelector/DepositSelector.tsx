import DepositAmountInput from '@components/NewDesign/Inputs/DepositAmountInput/DepositAmountInput'
import Select from '@components/NewDesign/Inputs/Select/Select'
import { SwapToken } from '@components/NewDesign/Swap/Swap'
import { printBNtoBN } from '@consts/utils'
import { Button, Grid, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import React, { useState, useEffect } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import useStyles from './style'

export interface InputState {
  blocked: boolean
  blockerInfo?: string
}

export interface IDepositSelector {
  tokens: SwapToken[]
  setPositionTokens: (token1Index: number | null, token2index: number | null, feeTierIndex: number) => void
  onAddLiquidity: (token1Deposit: BN, token2Deposit: BN) => void
  token1Max: number
  token2Max: number
  token1InputState: InputState
  token2InputState: InputState
  calcCurrentPoolProportion: (
    leftRangeTickIndex: number,
    rightRangeTickIndex: number,
    byX: boolean
  ) => number
  leftRangeTickIndex: number
  rightRangeTickIndex: number
  feeTiers: number[]
  isCurrentPoolExisting: boolean
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  tokens,
  setPositionTokens,
  onAddLiquidity,
  token1Max,
  token2Max,
  token1InputState,
  token2InputState,
  calcCurrentPoolProportion,
  leftRangeTickIndex,
  rightRangeTickIndex,
  feeTiers,
  isCurrentPoolExisting
}) => {
  const classes = useStyles()

  const [token1Index, setToken1Index] = useState<number | null>(null)
  const [token2Index, setToken2Index] = useState<number | null>(null)
  const [feeTierIndex, setFeeTierIndex] = useState<number>(0)

  const [token1Deposit, setToken1Deposit] = useState<string>('')
  const [token2Deposit, setToken2Deposit] = useState<string>('')

  const getButtonMessage = () => {
    if (token1Index === null || token2Index === null) {
      return 'Select tokens'
    }

    if (!isCurrentPoolExisting) {
      return 'Pool is not existent'
    }

    if (printBNtoBN(token1Deposit, tokens[token1Index].decimal).gt(tokens[token1Index].balance)) {
      return 'You don\'t have enough token 01'
    }

    if (printBNtoBN(token2Deposit, tokens[token2Index].decimal).gt(tokens[token2Index].balance)) {
      return 'You don\'t have enough token 02'
    }

    return 'Add Liquidity'
  }

  useEffect(() => {
    if (!token1InputState.blocked && !token2InputState.blocked) {
      if (+token1Deposit !== 0) {
        setToken2Deposit((+token1Deposit * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, true)).toString())
      } else if (+token2Deposit !== 0) {
        setToken1Deposit((+token2Deposit * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, false)).toString())
      }
    }
  }, [leftRangeTickIndex, rightRangeTickIndex, calcCurrentPoolProportion, token1Index, token2Index])

  return (
    <Grid container direction='column' className={classes.wrapper}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>
      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 8 }}>
        <Grid container className={classes.selects} direction='row' justifyContent='space-between'>
          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token 01</Typography>
            <Select
              tokens={tokens}
              current={token1Index !== null ? tokens[token1Index] : null}
              onSelect={(name) => {
                const index = tokens.findIndex((e) => e.symbol === name)
                setToken1Index(index)
                setPositionTokens(index, token2Index, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>

          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token 02</Typography>
            <Select
              tokens={tokens}
              current={token2Index !== null ? tokens[token2Index] : null}
              onSelect={(name) => {
                const index = tokens.findIndex((e) => e.symbol === name)
                setToken2Index(index)
                setPositionTokens(token1Index, index, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>
        </Grid>

        <Typography className={classes.inputLabel}>Fee</Typography>
        <FeeSwitch
          onSelect={(fee) => {
            setFeeTierIndex(fee)
            setPositionTokens(token1Index, token2Index, fee)
          }}
          feeTiers={feeTiers}
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <Typography className={classes.inputLabel}>Pair token 01 amount</Typography>
        <DepositAmountInput
          currency={token1Index !== null ? tokens[token1Index].symbol : null}
          currencyIconSrc={token1Index !== null ? tokens[token1Index].logoURI : undefined}
          value={token1Deposit}
          setValue={(value) => {
            setToken1Deposit(value)
            setToken2Deposit((+value * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, true)).toString())
          }}
          placeholder='0.0'
          onMaxClick={() => {
            setToken1Deposit(token1Max.toString())
            setToken2Deposit((token1Max * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, true)).toString())
          }}
          style={{
            marginBottom: 8
          }}
          {...token1InputState}
        />

        <Typography className={classes.inputLabel}>Pair token 02 amount</Typography>
        <DepositAmountInput
          currency={token2Index !== null ? tokens[token2Index].symbol : null}
          currencyIconSrc={token2Index !== null ? tokens[token2Index].logoURI : undefined}
          value={token2Deposit}
          setValue={(value) => {
            setToken2Deposit(value)
            setToken1Deposit((+value / calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, false)).toString())
          }}
          placeholder='0.0'
          onMaxClick={() => {
            setToken2Deposit(token2Max.toString())
            setToken1Deposit((token2Max / calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex, false)).toString())
          }}
          {...token2InputState}
        />
      </Grid>

      <Button
        className={classes.addButton}
        onClick={() => {
          if (token1Index === null || token2Index === null) {
            return
          }

          onAddLiquidity(printBNtoBN(token1Deposit, tokens[token1Index].decimal), printBNtoBN(token2Deposit, tokens[token2Index].decimal))
        }}
        disabled={getButtonMessage() !== 'Add Liquidity'}
      >
        {getButtonMessage()}
      </Button>
    </Grid>
  )
}

export default DepositSelector
