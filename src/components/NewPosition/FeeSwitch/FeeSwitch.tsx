import React, { useState } from 'react'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
import classNames from 'classnames'
import { Box, Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { formatNumberWithSuffix } from '@utils/utils'
export interface IFeeSwitch {
  onSelect: (value: number) => void
  showOnlyPercents?: boolean
  feeTiers: number[]
  currentValue: number
  feeTiersWithTvl: Record<number, number>
  showTVL?: boolean
  totalTvl: number
  isLoadingStats: boolean
}

export const FeeSwitch: React.FC<IFeeSwitch> = ({
  onSelect,
  showOnlyPercents = false,
  feeTiers,
  showTVL,
  currentValue,
  feeTiersWithTvl,
  totalTvl,
  isLoadingStats
}) => {
  const { classes } = useStyles()

  const [blocked, setBlocked] = useState(false)

  const { classes: tabsClasses } = useTabsStyles()
  const { classes: singleTabClasses } = useSingleTabStyles()

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (!blocked) {
      onSelect(newValue)
      setBlocked(true)
      setTimeout(() => {
        setBlocked(false)
      }, 200)
    }
  }

  const bestTierIndex = feeTiers.findIndex(
    tier => feeTiersWithTvl[tier] === Math.max(...Object.values(feeTiersWithTvl))
  )

  return (
    <Grid className={classes.wrapper}>
      <Tabs
        value={currentValue}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        TabIndicatorProps={{ children: <span /> }}
        classes={tabsClasses}>
        {feeTiers.map((tier, index) => (
          <Tab
            key={index}
            disableRipple
            label={
              <Box className={classes.tabContainer}>
                {isLoadingStats || !showTVL ? (
                  <Skeleton animation={false} height={15} width={60} />
                ) : (
                  <Typography
                    className={classNames(classes.tabTvl, {
                      [classes.tabSelectedTvl]: currentValue === index || bestTierIndex === index
                    })}>
                    TVL{' '}
                    {feeTiersWithTvl[tier]
                      ? Math.round((feeTiersWithTvl[tier] / totalTvl) * 100)
                      : 0}
                    %
                  </Typography>
                )}
                <Box>{showOnlyPercents ? `${tier}%` : `${tier}% fee`}</Box>
                {isLoadingStats || !showTVL ? (
                  <Skeleton animation={false} height={15} width={60} />
                ) : (
                  <Typography
                    className={classNames(classes.tabTvl, {
                      [classes.tabSelectedTvl]: currentValue === index || bestTierIndex === index
                    })}>
                    {feeTiersWithTvl[tier]
                      ? `$${+formatNumberWithSuffix(feeTiersWithTvl[tier], true, 18) < 1000 ? (+formatNumberWithSuffix(feeTiersWithTvl[tier], true, 18)).toFixed(2) : formatNumberWithSuffix(feeTiersWithTvl[tier])}`
                      : 'Not created'}
                  </Typography>
                )}
              </Box>
            }
            classes={{
              root: classNames(
                singleTabClasses.root,
                index === bestTierIndex ? singleTabClasses.best : undefined
              ),
              selected: singleTabClasses.selected
            }}
          />
        ))}
      </Tabs>
    </Grid>
  )
}

export default FeeSwitch
