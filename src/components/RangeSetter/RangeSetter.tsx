import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import TicksPlot from '@components/TicksPlot/TicksPlot'
import PriceControl from '@components/PriceControl/PriceControl'
import useStyles from './style'

export interface IRangeSetter {
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  isSol: boolean
  tokenFromSymbol: string
  tokenToSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
}

export const RangeSetter: React.FC<IRangeSetter> = ({
  // data,
  // midPriceIndex,
  isSol,
  tokenFromSymbol,
  tokenToSymbol,
  onChangeRange
}) => {
  const classes = useStyles()

  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(isSol ? 300 : 100)

  const [leftRange, setLeftRange] = useState(80)
  const [rightRange, setRightRange] = useState(200)

  const ticksToData = () => {
    const ticks = isSol ? [
      { index: 90, delta: 10 },
      { index: 110, delta: 30 },
      { index: 160, delta: 60 },
      { index: 170, delta: 20 },
      { index: 210, delta: -20 },
      { index: 220, delta: -10 },
      { index: 230, delta: -30 },
      { index: 260, delta: -20 },
      { index: 280, delta: -40 }
    ] : [
      { index: 90, delta: 2 },
      { index: 110, delta: 2 },
      { index: 160, delta: 3 },
      { index: 190, delta: 30 },
      { index: 210, delta: -26 },
      { index: 220, delta: -4 },
      { index: 230, delta: -3 },
      { index: 260, delta: -2 },
      { index: 280, delta: -2 }
    ]
    const fields: Array<{ x: number; y: number }> = []

    let currentLiquidity = isSol ? 10 : 2
    for (let i = 0; i < 10000; i += 1) {
      if (ticks.length > 0 && i > ticks[0].index) {
        currentLiquidity += ticks[0].delta
        ticks.shift()
      }

      fields.push({ x: i, y: currentLiquidity })
    }

    return fields
  }

  const currentIndex = 200
  const midPriceIndex = currentIndex
  const data = ticksToData()
  const sliced = data.slice(Math.max(0, midPriceIndex - 150), Math.min(data.length - 1, midPriceIndex + 150))

  // useEffect(() => {
  //   const min = Math.max(0, midPriceIndex - 1000)
  //   const max = Math.min(data.length - 1, midPriceIndex + 1000)
  //   setMinRange(min)
  //   setMaxRange(max)

  //   setLeftRange(Math.floor(((max - min) / 4)) + min)
  //   setRightRange(Math.floor(((max - min) / 4 * 3)) + min)
  // }, [data])

  useEffect(() => {
    onChangeRange(leftRange, rightRange)
  }, [leftRange, rightRange])

  return (
    <Grid className={classes.wrapper} container direction='column' alignItems='center'>
      <Typography className={classes.title}>Set Price Range</Typography>
      <Typography className={classes.current}><b>Current Price: {data[midPriceIndex].x}</b> {tokenToSymbol} per {tokenFromSymbol}</Typography>
      <TicksPlot
        className={classes.plot}
        data={sliced}
        leftRangeIndex={leftRange - minRange}
        rightRangeIndex={rightRange - minRange}
        currentIndex={150}
        xStep={isSol ? 25 : 0}
        onChangeRange={(left, right) => {
          setLeftRange(left + minRange)
          setRightRange(right + minRange)
        }}
      />
      <Grid className={classes.controls} container justifyContent='space-between'>
        <PriceControl
          className={classes.control}
          label='Min Price'
          tokenFromSymbol={tokenFromSymbol}
          tokenToSymbol={tokenToSymbol}
          currentValue={data[leftRange].x}
          decreaseValue={() => {
            if (leftRange > minRange) {
              setLeftRange(leftRange - 1)
            }
          }}
          increaseValue={() => {
            if (leftRange < rightRange - 1) {
              setLeftRange(leftRange + 1)
            }
          }}
        />
        <PriceControl
          className={classes.control}
          label='Max Price'
          tokenFromSymbol={tokenFromSymbol}
          tokenToSymbol={tokenToSymbol}
          currentValue={data[rightRange].x}
          decreaseValue={() => {
            if (rightRange > leftRange + 1) {
              setRightRange(rightRange - 1)
            }
          }}
          increaseValue={() => {
            if (rightRange < maxRange) {
              setRightRange(rightRange + 1)
            }
          }}
        />
      </Grid>
      <Button
        className={classes.fullRange}
        disableRipple
        onClick={() => {
          setLeftRange(minRange)
          setRightRange(maxRange)
        }}
      >
        Full range
      </Button>
    </Grid>
  )
}

export default RangeSetter
