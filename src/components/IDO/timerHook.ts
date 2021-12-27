import * as React from 'react'
interface ITime {
  hours: number
  minutes: number
  seconds: number
}

export function useTimer(hours: number, minutes: number, seconds: number): [ITime] {
  const [hoursTimer, setHoursTimer] = React.useState<number>(hours)
  const [minutesTimer, setMinutesTimer] = React.useState<number>(minutes)
  const [secondsTimer, setSecondsTimer] = React.useState<number>(seconds)
  React.useEffect(() => {
    const s = setInterval(() => {
      setSecondsTimer(prev => prev - 1)
    }, 1000)
    return () => {
      clearInterval(s)
    }
  }, [seconds])
  React.useEffect(() => {
    if (secondsTimer === 0) {
      setMinutesTimer(prev => prev - 1)
      setSecondsTimer(59)
    }
    if (minutesTimer === 0 && secondsTimer === 0) {
      setHoursTimer(prev => prev - 1)
      setMinutesTimer(59)
    }
  }, [secondsTimer, minutesTimer])
  const time: ITime = {
    hours: hoursTimer,
    minutes: minutesTimer,
    seconds: secondsTimer
  }
  return [time]
}
