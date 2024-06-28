import React from 'react'
import { createRef, useEffect, useState } from 'react'
import useStyles from './style'

type Props = {
  currentIndex: number
  maxIndex: number
  onClick: () => void
}

export const Refresher = ({ currentIndex, maxIndex, onClick }: Props) => {
  const [circumference, setCircumference] = useState(0)
  const circleRef = createRef<SVGCircleElement>()

  const classes = useStyles()

  useEffect(() => {
    if (circleRef.current) {
      setCircumference(circleRef.current.r.baseVal.value * 2 * Math.PI)
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`
    }
  }, [circleRef])

  useEffect(() => {
    const newProgress = Math.round((currentIndex / maxIndex) * 100)

    if (circleRef.current) {
      const offset = circumference - (newProgress / 100) * circumference
      circleRef.current.style.strokeDashoffset = `${offset}`
    }
  }, [circleRef, currentIndex, maxIndex])

  return (
    <svg className={classes.ring} width='20' height='20' onClick={onClick}>
      <circle stroke='#3A466B' strokeWidth='2' fill='transparent' r='8' cx='10' cy='10' />
      <circle
        className={classes.innerCircle}
        strokeDasharray='0'
        strokeDashoffset='0'
        stroke='#EF84F5'
        strokeWidth='2'
        fill='transparent'
        r='8'
        cx='10'
        cy='10'
        ref={circleRef}
      />
    </svg>
  )
}

export default Refresher
