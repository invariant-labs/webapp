import React, { useState } from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { useSingleTabStyles, useTabsStyles, useStyles } from './style'
import Continuous from '@static/svg/continuous.svg'
import Discrete from '@static//svg/discrete.svg'

export interface IPlotTypeSwitch {
  onSwitch: (isDiscrete: boolean) => void
  initialValue: number
}

export const PlotTypeSwitch: React.FC<IPlotTypeSwitch> = ({ onSwitch, initialValue }) => {
  const [current, setCurrent] = useState(initialValue)

  const classes = useStyles()
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
        label={<img src={Continuous} className={classes.continuous} />}
        classes={singleTabClasses}
      />
      <Tab
        disableRipple
        label={<img src={Discrete} className={classes.discrete} />}
        classes={singleTabClasses}
      />
    </Tabs>
  )
}

export default PlotTypeSwitch
