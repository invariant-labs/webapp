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
  unitLen: number
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
  unitLen,
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
      onDrop(Math.round(currentPosition / unitLen))
      setCurrentPosition(Math.round(currentPosition / unitLen) * unitLen)
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
  dataLength: number,
  onLeftDrop: (position: number) => void,
  onRightDrop: (position: number) => void
): React.FC<CustomLayerProps> => ({ innerHeight, innerWidth }) => {
  const unitLen = innerWidth / (dataLength - 1)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reverse, setReverse] = useState(false)
  const start = (
    <Handle
      key='start'
      height={innerHeight}
      position={leftPosition * unitLen}
      minPosition={0}
      maxPosition={(rightPosition - 1) * unitLen}
      fill='#0000ff'
      onDrop={(position) => {
        onLeftDrop(position)
        setReverse(false)
      }}
      isStart
      unitLen={unitLen}
      onStart={() => { setReverse(true) }}
    />
  )

  const end = (
    <Handle
      key='end'
      height={innerHeight}
      position={rightPosition * unitLen}
      minPosition={(leftPosition + 1) * unitLen}
      maxPosition={innerWidth}
      fill='#ff0000'
      onDrop={(position) => {
        onRightDrop(position)
        setReverse(true)
      }}
      unitLen={unitLen}
      onStart={() => { setReverse(false) }}
    />
  )
  return (
    <>
      {reverse ? end : start}

      {reverse ? start : end}
    </>
  )
}

export default Brush
