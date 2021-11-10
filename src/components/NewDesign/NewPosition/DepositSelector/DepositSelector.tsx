import DepositAmountInput from '@components/NewDesign/Inputs/DepositAmountInput/DepositAmountInput'
import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import useStyles from './style'

export interface InputState {
  blocked: boolean
  blockerInfo?: string
}

export interface IDepositSelector {
  tokens: Array<{ symbol: string, name: string, icon: string }>
  setPositionTokens: (token1Index: number | null, token2index: number | null) => void
  setFeeValue: (value: number) => void
  onAddLiquidity: (token1Deposit: number, token2Deposit: number) => void
  token1Max: number
  token2Max: number
  token1InputState: InputState
  token2InputState: InputState
  calcCurrentPoolProportion: (
    leftRangeTickIndex: number,
    rightRangeTickIndex: number
  ) => number
  leftRangeTickIndex: number,
  rightRangeTickIndex: number
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  tokens,
  setPositionTokens,
  setFeeValue,
  onAddLiquidity,
  token1Max,
  token2Max,
  token1InputState,
  token2InputState,
  calcCurrentPoolProportion,
  leftRangeTickIndex,
  rightRangeTickIndex
}) => {
  const classes = useStyles()

  const [token1Index, setToken1Index] = useState<number | null>(null)
  const [token2Index, setToken2Index] = useState<number | null>(null)

  const [token1Deposit, setToken1Deposit] = useState<string>('')
  const [token2Deposit, setToken2Deposit] = useState<string>('')

  useEffect(() => {
    if (!token1InputState.blocked && !token2InputState.blocked) {
      if (+token1Deposit !== 0) {
        setToken2Deposit((+token1Deposit * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex)).toString())
      } else if (+token2Deposit !== 0) {
        setToken1Deposit((+token2Deposit * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex)).toString())
      }
    }
  }, [leftRangeTickIndex, rightRangeTickIndex])

  return (
    <Grid container direction='column' className={classes.wrapper}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>
      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 8 }}>
        <Grid container className={classes.selects} direction='row' justifyContent='space-between'>
          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token 01</Typography>
          </Grid>

          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token 02</Typography>
          </Grid>
        </Grid>

        <Typography className={classes.inputLabel}>Fee</Typography>
        <FeeSwitch
          setFeeValue={setFeeValue}
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <Typography className={classes.inputLabel}>Pair token 01 amount</Typography>
        <DepositAmountInput
          currency={token1Index !== null ? tokens[token1Index].symbol : null}
          currencyIconSrc={token1Index !== null ? tokens[token1Index].icon : undefined}
          value={token1Deposit}
          setValue={(value) => {
            setToken1Deposit(value)
            setToken2Deposit((+value * calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex)).toString())
          }}
          placeholder='0.0'
          onMaxClick={() => { setToken1Deposit(token1Max.toString()) }}
          style={{
            marginBottom: 8
          }}
          {...token1InputState}
        />

        <Typography className={classes.inputLabel}>Pair token 02 amount</Typography>
        <DepositAmountInput
          currency={token2Index !== null ? tokens[token2Index].symbol : null}
          currencyIconSrc={token2Index !== null ? tokens[token2Index].icon : undefined}
          value={token2Deposit}
          setValue={(value) => {
            setToken2Deposit(value)
            setToken1Deposit((+value / calcCurrentPoolProportion(leftRangeTickIndex, rightRangeTickIndex)).toString())
          }}
          placeholder='0.0'
          onMaxClick={() => { setToken2Deposit(token2Max.toString()) }}
          {...token2InputState}
        />
      </Grid>

      <Button
        className={classes.addButton}
        onClick={() => { onAddLiquidity(+token1Deposit, +token2Deposit) }}
      >
        Add Liquidity
      </Button>
    </Grid>
  )
}

export default DepositSelector
