import React, { useState } from 'react'
import { Grid, Tab, Tabs, Typography } from '@material-ui/core'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
import classNames from 'classnames'

export interface IFeeSwitch {
  onSelect: (value: number) => void
  showOnlyPercents?: boolean
  feeTiers: number[]
  bestTierIndex?: number
}

export const FeeSwitch: React.FC<IFeeSwitch> = ({
  onSelect,
  showOnlyPercents = false,
  feeTiers,
  bestTierIndex
}) => {
  const classes = useStyles()

  const [current, setCurrent] = useState(0)

  const tabsClasses = useTabsStyles()
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    onSelect(newValue)
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
        {feeTiers.map((tier, index) => (
          <Tab
            key={index}
            disableRipple
            label={showOnlyPercents ? `${tier}%` : `${tier}% fee`}
            classes={{
              root: classNames(
                singleTabClasses.root,
                index === bestTierIndex ? singleTabClasses.best : undefined
              ),
              selected: singleTabClasses.selected
            }}
            style={{
              minWidth: `calc(${feeTiers.length === 0 ? 0 : 100 / feeTiers.length}% - 7px)`
            }}
          />
        ))}
      </Tabs>
      <Grid className={classes.bestWrapper}>
        {typeof bestTierIndex !== 'undefined' ? (
          <Typography className={classes.bestText}>Best</Typography>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default FeeSwitch
