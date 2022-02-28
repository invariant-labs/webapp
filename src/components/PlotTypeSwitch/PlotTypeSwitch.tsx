import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'

export interface IPlotTypeSwitch {
  onSwitch: () => void
}

export const PlotTypeSwitch: React.FC<IPlotTypeSwitch> = ({
  onSwitch
}) => {
  const classes = useStyles()

  const [current, setCurrent] = useState(0)

  const tabsClasses = useTabsStyles()
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(!!current ? 0 : 1)
    onSwitch()
  }

  return (
      <Grid className={classes.wrapper}>
        <Tabs
          value={current}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='off'
          TabIndicatorProps={{ children: <span /> }}
          classes={tabsClasses}>
            <Tab
              disableRipple
              label={''}
              classes={singleTabClasses} />
            <Tab
              disableRipple
              label={''}
              classes={singleTabClasses}
            />
        </Tabs>
      </Grid>
  )
}

export default PlotTypeSwitch