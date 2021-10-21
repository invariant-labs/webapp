import { CustomLayerProps } from '@nivo/line'
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react'
import useStyles from './style'

export interface HandleProps {
  height: number
  position: number
  minPosition: number
  maxPosition: number
  fill: string
  onDrop: (position: number) => void
  isStart?: boolean
  onStart: () => void
}

export const Handle: React.FC<HandleProps> = ({
  height,
  position,
  minPosition,
  maxPosition,
  fill,
  onDrop,
  isStart = false,
  onStart
}) => {
  const classes = useStyles()
  const [drag, setDrag] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(position)
  const [offset, setOffset] = useState(0)

  const handleRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    setCurrentPosition(position)
  }, [position])

  const startDrag: MouseEventHandler<SVGRectElement> = (event) => {
    onStart()
    setDrag(true)
    if (handleRef.current) {
      const CTM = handleRef.current.getScreenCTM()

      if (CTM) {
        const ctmX = (event.clientX - CTM.e) / CTM.a
        setOffset(ctmX - currentPosition)
      }
    }
  }

  const endDrag = () => {
    if (drag) {
      setDrag(false)
      onDrop(currentPosition)
    }
  }

  const dragHandler: MouseEventHandler<SVGRectElement> = (event) => {
    if (drag && handleRef.current) {
      event.preventDefault()
      event.stopPropagation()
      const CTM = handleRef.current.getScreenCTM()

      if (CTM) {
        const x = ((event.clientX - CTM.e) / CTM.a) - offset

        if ((x >= minPosition) && (x <= maxPosition)) {
          setCurrentPosition(x)
        }
      }
    }
  }

  return (
    <>
      <rect
        className={classes.handle}
        x={currentPosition}
        y={0}
        width={2}
        height={height}
        fill={fill}
      />
      <rect
        className={classes.handle}
        x={isStart ? currentPosition - 10 : currentPosition + 2}
        y={0}
        width={10}
        height={30}
        fill={fill}
      />
      <rect
        className={classes.handle}
        ref={handleRef}
        x={currentPosition - 40}
        y={0}
        width={82}
        height={height}
        onMouseDown={startDrag}
        onMouseUp={endDrag}
        onMouseMove={dragHandler}
        onMouseLeave={endDrag}
        fill='transparent'
      />
    </>
  )
}

export const Brush = (
  leftPosition: number,
  rightPosition: number,
  onLeftDrop: (position: number) => void,
  onRightDrop: (position: number) => void,
  plotMin: number,
  plotMax: number
): React.FC<CustomLayerProps> => ({ innerHeight, innerWidth }) => {
  const unitLen = innerWidth / (plotMax - plotMin)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reverse, setReverse] = useState(false)
  const start = (leftPosition >= plotMin) && (leftPosition <= plotMax)
    ? (
      <Handle
        key='start'
        height={innerHeight}
        position={(leftPosition - plotMin) * unitLen}
        minPosition={Math.max(0, -plotMin * unitLen)}
        maxPosition={((rightPosition - plotMin) * unitLen) - 0.001}
        fill='#0000ff'
        onDrop={(position) => {
          onLeftDrop(position / innerWidth)
          setReverse(false)
        }}
        isStart
        onStart={() => { setReverse(true) }}
      />
    )
    : null

  const end = (rightPosition >= plotMin) && (rightPosition <= plotMax)
    ? (
      <Handle
        key='end'
        height={innerHeight}
        position={(rightPosition - plotMin) * unitLen}
        minPosition={((leftPosition - plotMin) * unitLen) + 0.001}
        maxPosition={innerWidth}
        fill='#ff0000'
        onDrop={(position) => {
          onRightDrop(position / innerWidth)
          setReverse(true)
        }}
        onStart={() => { setReverse(false) }}
      />
    )
    : null

  return (
    <>
      {reverse ? end : start}

      {reverse ? start : end}
    </>
  )
}

export default Brush
