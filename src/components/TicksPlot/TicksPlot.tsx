import React, { useState, useEffect } from 'react'
import { Layer, ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
import { Grid } from '@material-ui/core'
import DragRange from './DragRange/DragRange'
import classNames from 'classnames'
import useStyles from './style'

export interface ITicksPlot {
  data: Array<{ x: number; y: number }>
  leftRangeIndex: number,
  rightRangeIndex: number,
  currentIndex: number,
  xStep: number,
  onChangeRange: (left: number, right: number) => void
  style?: React.CSSProperties
  className?: string
}

export const TicksPlot: React.FC<ITicksPlot> = ({ data, leftRangeIndex, rightRangeIndex, currentIndex, xStep, onChangeRange, style, className }) => {
  const classes = useStyles()

  const [leftPosition, setLeftPosition] = useState(leftRangeIndex)
  const [rightPosition, setRightPosition] = useState(rightRangeIndex)

  useEffect(() => {
    setLeftPosition(leftRangeIndex)
  }, [leftRangeIndex])

  useEffect(() => {
    setRightPosition(rightRangeIndex)
  }, [rightRangeIndex])

  useEffect(() => {
    onChangeRange(leftPosition, rightPosition)
  }, [leftPosition, rightPosition])

  const xValues = data
    .filter((_el, index) => index % xStep === 0)
    .map((el) => el.x)

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    const unitLen = innerWidth / (data.length - 1)
    return (
      <rect
        x={currentIndex * unitLen}
        y={0}
        width={2}
        height={innerHeight}
        fill='#00ff00'
      />
    )
  }

  return (
    <Grid container className={classNames(classes.container, className)} style={style}>
      <ResponsiveLine
        data={[{
          id: 'default',
          data
        }]}
        curve='stepAfter'
        margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
        colors={colors.green.main}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: xValues
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableArea={true}
        areaOpacity={1}
        lineWidth={0}
        legends={[]}
        isInteractive={false}
        role="application"
        layers={[
          'grid',
          'markers',
          'areas',
          currentLayer,
          DragRange(
            leftPosition,
            rightPosition,
            data.length,
            (pos) => {
              setLeftPosition(pos)
            },
            (pos) => {
              setRightPosition(pos)
            }
          ),
          'axes',
          'legends'
        ]}
      />
    </Grid>
  )
}

export default TicksPlot
