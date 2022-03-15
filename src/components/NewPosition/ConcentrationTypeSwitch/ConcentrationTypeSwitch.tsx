import React, { useState } from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { useSingleTabStyles, useTabsStyles } from './style'

export interface IProps {
  onSwitch: (isConcentrated: boolean) => void
  initialValue: number
}

export const ConcentrationTypeSwitch: React.FC<IProps> = ({ onSwitch, initialValue }) => {
  const [current, setCurrent] = useState(initialValue)

  const tabsClasses = useTabsStyles({ value: current })
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    onSwitch(!!newValue)
  }

  return (
    <Tabs
      value={current}
      onChange={handleChange}
      variant='scrollable'
      scrollButtons='off'
      TabIndicatorProps={{ children: <span /> }}
      classes={tabsClasses}>
      <Tab disableRipple label='Range' classes={singleTabClasses} />
      <Tab disableRipple label='Concentr.' classes={singleTabClasses} />
    </Tabs>
  )
}

export default ConcentrationTypeSwitch
