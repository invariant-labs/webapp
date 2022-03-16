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
  const [blocked, setBlocked] = useState(false)

  const tabsClasses = useTabsStyles()
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    if (!blocked) {
      setCurrent(newValue)
      onSelect(newValue)
      setBlocked(true)
      setTimeout(() => {
        setBlocked(false)
      }, 100)
    }
  }

  return (
    <>
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
      </Grid>
      <Grid className={classes.bestWrapper}>
        {typeof bestTierIndex !== 'undefined' && !!feeTiers.length ? (
          <Typography
            className={classes.bestText}
            style={{
              width: `calc(${100 / feeTiers.length}% - 7px)`,
              left: `calc(${(100 / feeTiers.length) * bestTierIndex}% + 3px)`
            }}>
            Best
          </Typography>
        ) : null}
      </Grid>
    </>
  )
}

export default FeeSwitch
