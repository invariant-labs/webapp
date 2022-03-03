import React, { useState } from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { useSingleTabStyles, useTabsStyles } from './style'
import Continuous from '@static/svg/continuous.svg'
import Discrete from '@static//svg/discrete.svg'

export interface IPlotTypeSwitch {
  onSwitch: (isDiscrete: boolean) => void
}

export const PlotTypeSwitch: React.FC<IPlotTypeSwitch> = ({ onSwitch }) => {
  const [current, setCurrent] = useState(0)

  const tabsClasses = useTabsStyles()
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
      <Tab
        disableRipple
        label={<img src={Continuous} className={tabsClasses.continuous} />}
        classes={singleTabClasses}
      />
      <Tab
        disableRipple
        label={<img src={Discrete} className={tabsClasses.discrete} />}
        classes={singleTabClasses}
      />
    </Tabs>
  )
}

export default PlotTypeSwitch
