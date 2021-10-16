import AmountInput from '@components/Inputs/AmountInput/AmountInput'
import SelectPair from '@components/Inputs/SelectPair/SelectPair'
import RangeSetter from '@components/RangeSetter/RangeSetter'
import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useStyles from './style'

export interface PairData {
  token1Symbol: string
  token2Symbol: string
  decimalX: number
  decimalY: number
  ticks: Array<{ x: number; y: number }>
  midPriceIndex: number
}

export interface INewPosition {
  pairs: PairData[]
  onAddPosition: (
    pairIndex: number,
    token1Amount: number,
    token2Amount: number,
    leftRangeTickIndex: number,
    rightRangeTickIndex: number
  ) => void
  calcProportion: (
    pairIndex: number,
    leftRangeTickIndex: number,
    rightRangeTickIndex: number
  ) => number
}

export const NewPosition: React.FC<INewPosition> = ({ pairs, onAddPosition, calcProportion }) => {
  const classes = useStyles()

  const [pairIndex, setPairIndex] = useState(0)
  const [input1Value, setInput1Value] = useState('')
  const [input2Value, setInput2Value] = useState('')
  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  useEffect(() => {
    if (leftRange > pairs[pairIndex].midPriceIndex) {
      setInput2Value('')
    }
  }, [leftRange])

  useEffect(() => {
    if (rightRange < pairs[pairIndex].midPriceIndex) {
      setInput1Value('')
    }
  }, [rightRange])

  return (
    <Grid className={classes.wrapper}>
      <Grid className={classes.left} container direction='column'>
        <Typography className={classes.heading}>Select Pair</Typography>

        <Grid container direction='row' justifyContent='space-between' className={classes.selects}>
          <SelectPair
            current={{
              symbol1: pairs[pairIndex].token1Symbol,
              symbol2: pairs[pairIndex].token2Symbol
            }}
            pairs={pairs.map(pair => ({ symbol1: pair.token1Symbol, symbol2: pair.token2Symbol }))}
            name='Select pair'
            onSelect={index => setPairIndex(index)}
            centered={true}
          />
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          className={classes.feeContainer}>
          <Grid>
            <Typography className={classes.feeText}>Fee:</Typography>
            <Typography className={classes.feeDesc}>The % you will earn in fees.</Typography>
          </Grid>

          <Typography className={classes.feeText}>0.04%</Typography>
        </Grid>

        <Typography className={classes.heading}>Deposit Amounts</Typography>

        {rightRange < pairs[pairIndex].midPriceIndex ? (
          <Grid
            container
            className={classes.inputPlaceholder}
            style={{ marginBlock: 16 }}
            alignItems='center'
            justifyContent='center'>
            <Typography className={classes.inputPlaceholderText}>
              The market price is outside your specified price range. Single-asset deposit only.
            </Typography>
          </Grid>
        ) : (
          <AmountInput
            style={{ marginBlock: 16 }}
            placeholder={'0.0'}
            currency={pairs[pairIndex].token1Symbol}
            value={input1Value}
            setValue={value => {
              setInput1Value(value)
              if (leftRange <= pairs[pairIndex].midPriceIndex) {
                setInput2Value(
                  (+value * calcProportion(pairIndex, leftRange, rightRange)).toString()
                )
              }
            }}
          />
        )}

        {leftRange > pairs[pairIndex].midPriceIndex ? (
          <Grid
            container
            className={classes.inputPlaceholder}
            style={{ marginBottom: 32 }}
            alignItems='center'
            justifyContent='center'>
            <Typography className={classes.inputPlaceholderText}>
              The market price is outside your specified price range. Single-asset deposit only.
            </Typography>
          </Grid>
        ) : (
          <AmountInput
            style={{ marginBottom: 32 }}
            placeholder={'0.0'}
            currency={pairs[pairIndex].token2Symbol}
            value={input2Value}
            setValue={value => {
              setInput2Value(value)
              if (rightRange >= pairs[pairIndex].midPriceIndex) {
                setInput1Value(
                  (+value / calcProportion(pairIndex, leftRange, rightRange)).toString()
                )
              }
            }}
          />
        )}

        <Button
          className={classes.addPosition}
          // disableRipple
          onClick={() => {
            onAddPosition(pairIndex, +input1Value, +input2Value, leftRange, rightRange)
          }}>
          Add position
        </Button>

        {leftRange > pairs[pairIndex].midPriceIndex ||
        rightRange < pairs[pairIndex].midPriceIndex ? (
          <Grid container className={classes.warning} style={{ marginTop: 32 }}>
            <Typography className={classes.warningText}>
              Your position will not earn fees or be used in trades until the market price moves
              into your range.
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      <RangeSetter
        isSol={pairs[pairIndex].token2Symbol === 'WSOL' || pairs[pairIndex].token1Symbol === 'WSOL'}
        data={
          pairs[pairIndex].ticks
        }
        midPriceIndex={pairs[pairIndex].midPriceIndex}
        tokenFromSymbol={pairs[pairIndex].token1Symbol}
        tokenToSymbol={pairs[pairIndex].token2Symbol}
        onChangeRange={(left, right) => {
          if (
            rightRange < pairs[pairIndex].midPriceIndex &&
            right >= pairs[pairIndex].midPriceIndex
          ) {
            setInput1Value(
              (+input2Value / calcProportion(pairIndex, leftRange, rightRange)).toString()
            )
          } else if (left <= pairs[pairIndex].midPriceIndex) {
            setInput2Value(
              (+input1Value * calcProportion(pairIndex, leftRange, rightRange)).toString()
            )
          }
          setLeftRange(left)
          setRightRange(right)
        }}
      />
    </Grid>
  )
}

export default NewPosition
