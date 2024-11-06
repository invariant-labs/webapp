import { formatNumber } from '@utils/utils'
import React from 'react'
import { useSpring, animated } from 'react-spring'
interface IProps {
  start: number
  finish: number
  format?: (n: number) => string
}

const AnimatedNumber: React.FC<IProps> = ({ start, finish, format = formatNumber }) => {
  const { number } = useSpring({
    from: { number: start },
    number: finish,
    delay: 0,
    config: { mass: 1, tension: 20, friction: 10, duration: 300 }
  })

  return <animated.span>{number.to(n => format(n))}</animated.span>
}

export default AnimatedNumber
