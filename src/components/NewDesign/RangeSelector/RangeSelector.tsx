import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PriceRangePlot from '@components/NewDesign/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/NewDesign/RangeInput/RangeInput'
import useStyles from './style'

export interface IRangeSelector {
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  tokenFromSymbol: string
  tokenToSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPriceIndex,
  tokenFromSymbol,
  tokenToSymbol,
  onChangeRange
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInput(data[left].x.toString())
    setRightInput(data[right].x.toString())

    onChangeRange(left, right)
  }

  useEffect(() => {
    changeRangeHandler(
      midPriceIndex / 2,
      Math.min(3 * midPriceIndex / 2, data.length - 1)
    )
  }, [data])

  const nearestPriceIndex = (price: number) => {
    let nearest = 0

    for (let i = 1; i < data.length; i++) {
      if (Math.abs(data[i].x - price) < Math.abs(data[nearest].x - price)) {
        nearest = i
      }
    }

    return nearest
  }

  return (
    <Grid container className={classes.wrapper}>
      <Typography className={classes.header}>Price range</Typography>
      <Grid container className={classes.innerWrapper}>
        <PriceRangePlot
          className={classes.plot}
          data={data}
          currentIndex={midPriceIndex}
          onChangeRange={changeRangeHandler}
          leftRangeIndex={leftRange}
          rightRangeIndex={rightRange}
        />
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container direction='row' justifyContent='space-between' className={classes.inputs}>
          <RangeInput
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenFromSymbol}
            tokenToSymbol={tokenToSymbol}
            currentValue={leftInput}
            setValue={setLeftInput}
            decreaseValue={() => {
              changeRangeHandler(Math.max(0, leftRange - 1), rightRange)
            }}
            increaseValue={() => {
              changeRangeHandler(Math.min(data.length - 1, leftRange + 1), rightRange)
            }}
            onBlur={() => {
              changeRangeHandler(nearestPriceIndex(+leftInput), rightRange)
            }}
          />
          <RangeInput
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenFromSymbol}
            tokenToSymbol={tokenToSymbol}
            currentValue={rightInput}
            setValue={setRightInput}
            decreaseValue={() => {
              changeRangeHandler(leftRange, Math.max(0, rightRange - 1))
            }}
            increaseValue={() => {
              changeRangeHandler(leftRange, Math.min(data.length - 1, rightRange + 1))
            }}
            onBlur={() => {
              changeRangeHandler(leftRange, nearestPriceIndex(+rightInput))
            }}
          />
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Button
            className={classes.button}
            onClick={() => {
              changeRangeHandler(
                midPriceIndex / 2,
                Math.min(3 * midPriceIndex / 2, data.length - 1)
              )
            }}
          >
            Reset range
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              changeRangeHandler(
                0,
                data.length - 1
              )
            }}
          >
            Set full range
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RangeSelector
