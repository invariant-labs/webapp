import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PriceRangePlot from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import { nearestPriceIndex } from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import useStyles from './style'

export interface IRangeSelector {
  data: PlotTickData[]
  midPriceIndex: number
  tokenFromSymbol: string
  tokenToSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  blocked?: boolean
  blockerInfo?: string
  onZoomOutOfData: (min: number, max: number) => void
  ticksLoading: boolean
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPriceIndex,
  tokenFromSymbol,
  tokenToSymbol,
  onChangeRange,
  blocked = false,
  blockerInfo,
  onZoomOutOfData,
  ticksLoading
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - (diff / 4)
    const newMax = plotMax + (diff / 4)
    setPlotMin(newMin)
    setPlotMax(newMax)
    if (newMin < data[0].x || newMax > data[data.length - 1].x) {
      onZoomOutOfData(newMin, newMax)
    }
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin + (diff / 6)
    const newMax = plotMax - (diff / 6)

    if (Math.abs(nearestPriceIndex(newMin, data) - nearestPriceIndex(newMax, data)) >= 4) {
      setPlotMin(newMin)
      setPlotMax(newMax)
    }
  }

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInput(data[left].x.toString())
    setRightInput(data[right].x.toString())

    onChangeRange(left, right)
  }

  const resetPlot = () => {
    const initSideDist = Math.min(
      data[midPriceIndex].x - data[Math.max(midPriceIndex - 15, 0)].x,
      data[Math.min(midPriceIndex + 15, data.length - 1)].x - data[midPriceIndex].x
    )

    changeRangeHandler(
      Math.max(midPriceIndex - 10, 0),
      Math.min(midPriceIndex + 10, data.length - 1)
    )
    setPlotMin(data[midPriceIndex].x - initSideDist)
    setPlotMax(data[midPriceIndex].x + initSideDist)
  }

  useEffect(() => {
    if (ticksLoading) {
      resetPlot()
    }
  }, [ticksLoading])

  return (
    <Grid container className={classes.wrapper}>
      <Typography className={classes.header}>Price range</Typography>
      <Grid container className={classes.innerWrapper}>
        <PriceRangePlot
          className={classes.plot}
          data={data}
          onChangeRange={changeRangeHandler}
          leftRangeIndex={leftRange}
          rightRangeIndex={rightRange}
          midPriceIndex={midPriceIndex}
          plotMin={plotMin}
          plotMax={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
        />
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
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
              changeRangeHandler(Math.min(rightRange - 1, leftRange + 1), rightRange)
            }}
            onBlur={() => {
              changeRangeHandler(Math.min(rightRange - 1, nearestPriceIndex(+leftInput, data)), rightRange)
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
              changeRangeHandler(leftRange, Math.max(leftRange + 1, rightRange - 1))
            }}
            increaseValue={() => {
              changeRangeHandler(leftRange, Math.min(data.length - 1, rightRange + 1))
            }}
            onBlur={() => {
              changeRangeHandler(leftRange, Math.max(leftRange + 1, nearestPriceIndex(+rightInput, data)))
            }}
          />
        </Grid>
        <Grid container className={classes.buttons}>
          <Button
            className={classes.button}
            onClick={resetPlot}
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

        {
          blocked && (
            <>
              <Grid className={classes.blocker} />
              <Grid container className={classes.blockedInfoWrapper} justifyContent='center' alignItems='center'>
                <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
              </Grid>
            </>
          )
        }
      </Grid>
    </Grid>
  )
}

export default RangeSelector
