import { CustomLayerProps } from '@nivo/line'
import { colors } from '@static/theme'
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react'
import useStyles from './style'
import { MaxHandle, MinHandle } from './svgHandles'

export interface HandleProps {
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

  return (
    <>
      {
        isStart
          ? <MinHandle
            height={height}
            x={currentPosition - 37}
            fill={disabled ? colors.invariant.componentOut3 : colors.invariant.accent1}
            textColor={disabled ? colors.invariant.lightInfoText : colors.white.main}
          />
          : <MaxHandle
            height={height}
            x={currentPosition + 2}
            fill={disabled ? colors.invariant.componentOut3 : colors.invariant.accent1}
            textColor={disabled ? colors.invariant.lightInfoText : colors.white.main}
          />
      }
      <rect
        className={!disabled ? classes.handle : undefined}
        ref={handleRef}
        x={isStart || drag ? currentPosition - 40 : currentPosition}
        y={0}
        width={drag ? 82 : 42}
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
        height={innerHeight}
        position={(leftPosition - plotMin) * unitLen}
        minPosition={Math.max(0, -plotMin * unitLen)}
        maxPosition={((rightPosition - plotMin) * unitLen) - 0.001}
        onDrop={(position) => {
          onLeftDrop(position / innerWidth)
          setReverse(false)
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
        height={innerHeight}
        position={(rightPosition - plotMin) * unitLen}
        minPosition={((leftPosition - plotMin) * unitLen) + 0.001}
        maxPosition={innerWidth}
        onDrop={(position) => {
          onRightDrop(position / innerWidth)
          setReverse(true)
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
