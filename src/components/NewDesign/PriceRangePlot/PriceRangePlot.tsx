import React, { useState, useEffect } from 'react'
import { Layer, ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
import { Button, Grid } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'
import Brush from './Brush/Brush'

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

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    const unitLen = innerWidth / (plotMax - plotMin)
    return (data[currentIndex].x >= plotMin) && (data[currentIndex].x <= plotMax)
      ? (
        <rect
          x={(data[currentIndex].x - plotMin) * unitLen}
          y={0}
          width={2}
          height={innerHeight}
          fill='#00ff00'
        />
      )
      : null
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
        <Button className={classes.zoomButton} onClick={zoomPlus}>+</Button>
        <Button className={classes.zoomButton} onClick={zoomMinus}>-</Button>
      </Grid>
      <ResponsiveLine
        data={[{
          id: 'default',
          data
        }]}
        curve='monotoneX'
        margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
        colors={colors.invariantV2.green2}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0
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
        areaOpacity={0.3}
        legends={[]}
        isInteractive={false}
        role="application"
        layers={[
          'grid',
          'markers',
          'areas',
          'lines',
          currentLayer,
          Brush(
            data[leftRangeIndex].x,
            data[rightRangeIndex].x,
            (position) => {
            },
            (position) => {
            },
            plotMin,
            plotMax
          ),
          'axes',
          'legends'
        ]}
      />
    </Grid>
  )
}

export default PriceRangePlot
