import { CustomLayerProps } from '@nivo/line'
import { colors } from '@static/theme'
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react'
import useStyles from './style'
import { MaxHandle, MinHandle } from './svgHandles'

export interface HandleProps {
  plotWidth: number
  height: number
  position: number
  minPosition: number
  maxPosition: number
  onDrop: (position: number) => void
  isStart?: boolean
  onStart: () => void
  disabled?: boolean
}

export const Handle: React.FC<HandleProps> = ({
  plotWidth,
  height,
  position,
  minPosition,
  maxPosition,
  onDrop,
  isStart = false,
  onStart,
  disabled = false
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

  const isReversed = () => isStart
    ? currentPosition < 37
    : plotWidth - currentPosition < 37

  return (
    <>
      {
        isStart
          ? <MinHandle
            height={height}
            x={!isReversed() ? currentPosition - 37 : currentPosition}
            fill={disabled ? colors.invariant.componentOut3 : colors.invariant.accent1}
            textColor={disabled ? colors.invariant.lightInfoText : colors.white.main}
            isReversed={isReversed()}
          />
          : <MaxHandle
            height={height}
            x={!isReversed() ? currentPosition : currentPosition - 37}
            fill={disabled ? colors.invariant.componentOut3 : colors.invariant.accent1}
            textColor={disabled ? colors.invariant.lightInfoText : colors.white.main}
            isReversed={isReversed()}
          />
      }
      <rect
        className={!disabled ? classes.handle : undefined}
        ref={handleRef}
        x={
          (isStart && !isReversed()) || (!isStart && isReversed())
            ? currentPosition - (drag ? plotWidth : 40)
            : currentPosition
        }
        y={0}
        width={drag ? (2 * plotWidth) + 2 : 42}
        height={height}
        onMouseDown={!disabled ? startDrag : undefined}
        onMouseUp={!disabled ? endDrag : undefined}
        onMouseMove={!disabled ? dragHandler : undefined}
        onMouseLeave={!disabled ? endDrag : undefined}
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
  plotMax: number,
  disabled: boolean = false
): React.FC<CustomLayerProps> => ({ innerHeight, innerWidth }) => {
  const unitLen = innerWidth / (plotMax - plotMin)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reverse, setReverse] = useState(false)

  const start = (leftPosition >= plotMin) && (leftPosition <= plotMax)
    ? (
      <Handle
        key='start'
        plotWidth={innerWidth}
        height={innerHeight}
        position={(leftPosition - plotMin) * unitLen}
        minPosition={Math.max(0, -plotMin * unitLen)}
        maxPosition={((rightPosition - plotMin) * unitLen) - 0.001}
        onDrop={(position) => {
          onLeftDrop(position / innerWidth)
          if (((leftPosition - plotMin) * unitLen) < 37) {
            setReverse(false)
          }
        }}
        isStart
        onStart={() => { setReverse(true) }}
        disabled={disabled}
      />
    )
    : null

  const end = (rightPosition >= plotMin) && (rightPosition <= plotMax)
    ? (
      <Handle
        key='end'
        plotWidth={innerWidth}
        height={innerHeight}
        position={(rightPosition - plotMin) * unitLen}
        minPosition={((leftPosition - plotMin) * unitLen) + 0.001}
        maxPosition={innerWidth}
        onDrop={(position) => {
          onRightDrop(position / innerWidth)
          if (innerWidth - ((rightPosition - plotMin) * unitLen) < 37) {
            setReverse(true)
          }
        }}
        onStart={() => { setReverse(false) }}
        disabled={disabled}
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
