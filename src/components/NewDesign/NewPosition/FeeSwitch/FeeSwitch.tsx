import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'

export interface IFeeSwitch {
  setFeeValue: (value: number) => void
}

export const FeeSwitch: React.FC<IFeeSwitch> = ({ setFeeValue }) => {
  const classes = useStyles()

  const [current, setCurrent] = useState(0)

  const singleTabClasses = useSingleTabStyles()
  const tabsClasses = useTabsStyles()

  const feeTiers = [0.05, 0.3, 1]

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    setFeeValue(feeTiers[newValue])
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
        {feeTiers.map((tier) => <Tab disableRipple label={`${tier}% fee`} classes={singleTabClasses} />)}
      </Tabs>
    </Grid>
  )
}

export default FeeSwitch
