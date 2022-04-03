import React, { useState } from 'react'
import { Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import { useSingleTabStyles, useTabsStyles } from './style'

export interface IProps {
  onSwitch: (isConcentrated: boolean) => void
  initialValue: number
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export const ConcentrationTypeSwitch: React.FC<IProps> = ({
  onSwitch,
  initialValue,
  className,
  style,
  disabled = false
}) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [current, setCurrent] = useState(initialValue)

  const tabsClasses = useTabsStyles({ value: current, disabled })
  const singleTabClasses = useSingleTabStyles({ disabled })

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    onSwitch(!newValue)
  }

  return (
    <Tabs
      className={className}
      style={style}
      value={current}
      onChange={!disabled ? handleChange : undefined}
      variant='scrollable'
      scrollButtons='off'
      TabIndicatorProps={{ children: <span /> }}
      classes={tabsClasses}>
      <Tab disableRipple label={isXs ? 'Conc.' : 'Concentr.'} classes={singleTabClasses} />
      <Tab disableRipple label='Range' classes={singleTabClasses} />
    </Tabs>
  )
}

export default ConcentrationTypeSwitch
