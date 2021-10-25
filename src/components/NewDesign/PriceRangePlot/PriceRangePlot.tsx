import React, { useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { colors } from '@static/theme'
import { Button, Grid } from '@material-ui/core'
import classNames from 'classnames'
import ZoomInIcon from '@static/svg/zoom-in-icon.svg'
import ZoomOutIcon from '@static/svg/zoom-out-icon.svg'
import Brush from './Brush/Brush'
import useStyles from './style'

export interface IPriceRangePlot {
  data: Array<{ x: number; y: number }>
  leftRangeIndex: number,
  rightRangeIndex: number,
  currentIndex: number,
  onChangeRange: (left: number, right: number) => void
  style?: React.CSSProperties
  className?: string
}

export const PriceRangePlot: React.FC<IPriceRangePlot> = ({ data, leftRangeIndex, rightRangeIndex, currentIndex, onChangeRange, style, className }) => {
  const classes = useStyles()

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(data[currentIndex].x * 3)

  const nearestPriceIndex = (price: number) => {
    let nearest = 0

    for (let i = 1; i < data.length; i++) {
      if (Math.abs(data[i].x - price) < Math.abs(data[nearest].x - price)) {
        nearest = i
      }
    }

    return nearest
  }

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    setPlotMin(plotMin - (diff / 4))
    setPlotMax(plotMax + (diff / 4))
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    setPlotMin(plotMin + (diff / 6))
    setPlotMax(plotMax - (diff / 6))
  }

  return (
    <Grid container className={classNames(classes.container, className)} style={style}>
      <Grid container item className={classes.zoomButtonsWrapper} direction='column' justifyContent='space-between'>
        <Button className={classes.zoomButton} onClick={zoomPlus} disableRipple>
          <img src={ZoomInIcon} className={classes.zoomIcon}/>
        </Button>
        <Button className={classes.zoomButton} onClick={zoomMinus} disableRipple>
          <img src={ZoomOutIcon} className={classes.zoomIcon} />
        </Button>
      </Grid>
      <ResponsiveLine
        data={[{
          id: 'default',
          data
        }]}
        curve='monotoneX'
        margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
        colors={colors.invariantV2.green2}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 5
        }}
        xScale={{
          type: 'linear',
          min: plotMin,
          max: plotMax
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableArea={true}
        legends={[]}
        isInteractive={false}
        animate={false}
        role="application"
        layers={[
          'grid',
          'markers',
          'areas',
          'lines',
          Brush(
            data[leftRangeIndex].x,
            data[rightRangeIndex].x,
            (position) => {
              onChangeRange(
                nearestPriceIndex(plotMin + (position * (plotMax - plotMin))),
                rightRangeIndex
              )
            },
            (position) => {
              onChangeRange(
                leftRangeIndex,
                nearestPriceIndex(plotMin + (position * (plotMax - plotMin)))
              )
            },
            plotMin,
            plotMax
          ),
          'axes',
          'legends'
        ]}
        defs={[
          linearGradientDef('gradient', [
            { offset: 0, color: 'inherit' },
            { offset: 25, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 }
          ])
        ]}
        fill={[
          {
            match: '*',
            id: 'gradient'
          }
        ]}
      />
    </Grid>
  )
}

export default PriceRangePlot
