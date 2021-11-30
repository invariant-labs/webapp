import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PriceRangePlot from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import useStyles from './style'
import { nearestPriceIndex } from '@consts/utils'
import { PlotTickData } from '@reducers/positions'

export interface IRangeSelector {
  data: PlotTickData[]
  midPriceIndex: number
  tokenFromSymbol: string
  tokenToSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  blocked?: boolean
  blockerInfo?: string
  onZoomOutOfData: (min: number, max: number) => void
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPriceIndex,
  tokenFromSymbol,
  tokenToSymbol,
  onChangeRange,
  blocked = false,
  blockerInfo,
  onZoomOutOfData
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [leftRangeCompareIndex, setLeftRangeCompareIndex] = useState(0)
  const [rightRangeCompareIndex, setRightRangeCompareIndex] = useState(0)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const [plotMin, setPlotMin] = useState(Math.max(midPriceIndex - 15, 0))
  const [plotMax, setPlotMax] = useState(Math.min(midPriceIndex + 15, data.length - 1))

  const [waiting, setWaiting] = useState(false)

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
    if (data.length >= 2 && diff >= data[1].x - data[0].x) {
      setPlotMin(plotMin + (diff / 6))
      setPlotMax(plotMax - (diff / 6))
    }
  }

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftRangeCompareIndex(data[left].index)
    setRightRangeCompareIndex(data[right].index)

    setLeftInput(data[left].x.toString())
    setRightInput(data[right].x.toString())

    onChangeRange(left, right)
  }

  const resetPlot = () => {
    changeRangeHandler(
      Math.max(midPriceIndex - 10, 0),
      Math.min(midPriceIndex + 10, data.length - 1)
    )
    setPlotMin(data[Math.max(midPriceIndex - 15, 0)].x)
    setPlotMax(data[Math.min(midPriceIndex + 15, data.length - 1)].x)
  }

  useEffect(() => {
    if (!waiting) {
      resetPlot()
    }
  }, [waiting])

  useEffect(() => {
    if (blocked && !waiting) {
      setWaiting(true)
    } else if (!blocked && waiting) {
      setWaiting(false)
    }
  }, [blocked])

  useEffect(() => {
    if (!waiting) {
      const newLeft = data.findIndex((tick) => tick.index === leftRangeCompareIndex)
      const newRight = data.findIndex((tick) => tick.index === rightRangeCompareIndex)

      if (newLeft !== -1 && newRight !== -1) {
        changeRangeHandler(newLeft, newRight)
      }
    }
  }, [data.length])

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
        <Grid container direction='row' justifyContent='space-between'>
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
