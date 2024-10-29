import { CustomLayerProps } from '@nivo/line'
import { colors } from '@static/theme'
import React, { useState, useEffect, useRef, PointerEventHandler, TouchEventHandler } from 'react'
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
  const { classes } = useStyles()
  const [drag, setDrag] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(position)
  const [offset, setOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    setCurrentPosition(position)
  }, [position, drag])

  const startDrag: PointerEventHandler<SVGRectElement> = event => {
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

  const startTouchDrag: TouchEventHandler<SVGRectElement> = event => {
    onStart()
    setDrag(true)
    if (handleRef.current) {
      const CTM = handleRef.current.getScreenCTM()

      if (CTM) {
        const ctmX = (event.targetTouches[0].clientX - CTM.e) / CTM.a
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

  const dragHandler: PointerEventHandler<SVGRectElement> = event => {
    if (drag && handleRef.current) {
      event.preventDefault()
      event.stopPropagation()
      const CTM = handleRef.current.getScreenCTM()

      if (CTM) {
        const x = (event.clientX - CTM.e) / CTM.a - offset

        if (x >= minPosition && x <= maxPosition) {
          setCurrentPosition(x)
        }
      }
    }
  }

  const dragTouchHandler: TouchEventHandler<SVGRectElement> = event => {
    if (drag && handleRef.current) {
      event.preventDefault()
      event.stopPropagation()
      const CTM = handleRef.current.getScreenCTM()

      if (CTM) {
        const x = (event.targetTouches[0].clientX - CTM.e) / CTM.a - offset

        if (x >= minPosition && x <= maxPosition) {
          setCurrentPosition(x)
        }
      }
    }
  }

  const isReversed = () => (isStart ? currentPosition < 37 : plotWidth - currentPosition < 37)

  return (
    <>
      {isStart ? (
        <MinHandle
          height={height}
          x={!isReversed() ? currentPosition - 37 : currentPosition}
          fill={
            disabled
              ? colors.invariant.light
              : isHovered
                ? colors.invariant.lightPink
                : colors.invariant.pink
          }
          textColor={disabled ? colors.invariant.lightHover : colors.invariant.componentBcg}
          isReversed={isReversed()}
        />
      ) : (
        <MaxHandle
          height={height}
          x={!isReversed() ? currentPosition : currentPosition - 37}
          fill={
            disabled
              ? colors.invariant.light
              : isHovered
                ? colors.invariant.lightPink
                : colors.invariant.pink
          }
          textColor={disabled ? colors.invariant.lightHover : colors.invariant.componentBcg}
          isReversed={isReversed()}
        />
      )}
      <rect
        className={!disabled ? classes.handle : undefined}
        ref={handleRef}
        x={
          drag
            ? 0
            : (isStart && !isReversed()) || (!isStart && isReversed())
              ? currentPosition - 40
              : currentPosition
        }
        y={0}
        width={drag ? plotWidth : 42}
        height={height}
        onMouseDown={!disabled ? startDrag : undefined}
        onMouseUp={!disabled ? endDrag : undefined}
        onMouseMove={!disabled ? dragHandler : undefined}
        onMouseLeave={!disabled ? endDrag : undefined}
        onTouchStart={!disabled ? startTouchDrag : undefined}
        onTouchEnd={!disabled ? endDrag : undefined}
        onTouchMove={!disabled ? dragTouchHandler : undefined}
        onTouchCancel={!disabled ? endDrag : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        fill='transparent'
      />
    </>
  )
}

export interface InnerBrushProps extends CustomLayerProps {
  leftPosition?: number
  rightPosition?: number
  onLeftDrop: (position: number) => void
  onRightDrop: (position: number) => void
  plotMin: number
  plotMax: number
  disabled: boolean
}

export const InnerBrush: React.FC<InnerBrushProps> = ({
  innerHeight,
  innerWidth,
  leftPosition,
  rightPosition,
  onLeftDrop,
  onRightDrop,
  plotMin,
  plotMax,
  disabled
}) => {
  const unitLen = innerWidth / (plotMax - plotMin)
  const [reverse, setReverse] = useState(false)

  const start =
    typeof leftPosition !== 'undefined' && leftPosition >= plotMin && leftPosition <= plotMax ? (
      <Handle
        key='start'
        plotWidth={innerWidth}
        height={innerHeight}
        position={(leftPosition - plotMin) * unitLen}
        minPosition={Math.max(0, -plotMin * unitLen)}
        maxPosition={
          typeof rightPosition !== 'undefined'
            ? (rightPosition - plotMin) * unitLen - 0.001
            : innerWidth
        }
        onDrop={position => {
          onLeftDrop(position / innerWidth)
          if ((leftPosition - plotMin) * unitLen < 37) {
            setReverse(false)
          }
        }}
        isStart
        onStart={() => {
          setReverse(true)
        }}
        disabled={disabled}
      />
    ) : null

  const end =
    typeof rightPosition !== 'undefined' && rightPosition >= plotMin && rightPosition <= plotMax ? (
      <Handle
        key='end'
        plotWidth={innerWidth}
        height={innerHeight}
        position={(rightPosition - plotMin) * unitLen}
        minPosition={
          typeof leftPosition !== 'undefined'
            ? (leftPosition - plotMin) * unitLen + 0.001
            : Math.max(0, -plotMin * unitLen)
        }
        maxPosition={innerWidth}
        onDrop={position => {
          onRightDrop(position / innerWidth)
          if (innerWidth - (rightPosition - plotMin) * unitLen < 37) {
            setReverse(true)
          }
        }}
        onStart={() => {
          setReverse(false)
        }}
        disabled={disabled}
      />
    ) : null

  return (
    <>
      {reverse ? end : start}

      {reverse ? start : end}
    </>
  )
}

export const Brush =
  (
    leftPosition: number,
    rightPosition: number,
    onLeftDrop: (position: number) => void,
    onRightDrop: (position: number) => void,
    plotMin: number,
    plotMax: number,
    disabled: boolean = false
  ): React.FC<CustomLayerProps> =>
  layerProps => (
    <InnerBrush
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      onLeftDrop={onLeftDrop}
      onRightDrop={onRightDrop}
      plotMin={plotMin}
      plotMax={plotMax}
      disabled={disabled}
      {...layerProps}
    />
  )

export default Brush
