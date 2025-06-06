import React, { useCallback, useState } from 'react'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
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
  const { classes, cx } = useStyles()

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

  const doesPoolExist = useCallback(
    (tier: number) => {
      return Object.prototype.hasOwnProperty.call(feeTiersWithTvl, tier)
    },
    [feeTiersWithTvl]
  )

  const getTvlValue = useCallback(
    (tier: number) => {
      const poolExist = doesPoolExist(tier)
      if (!poolExist || feeTiersWithTvl[tier] === 0) return '0'
      if (Object.keys(feeTiersWithTvl).length === 1) return '100'
      const percentage = feeTiersWithTvl[tier]
        ? Math.round((feeTiersWithTvl[tier] / totalTvl) * 100)
        : 0

      if (percentage < 1) return '<1'
      if (percentage > 99) return '>99'
      return `${percentage}`
    },
    [feeTiersWithTvl, totalTvl]
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
                    className={cx(classes.tabTvl, {
                      [classes.tabSelectedTvl]: currentValue === index || bestTierIndex === index
                    })}>
                    TVL {getTvlValue(tier)}%
                  </Typography>
                )}
                <Box>{showOnlyPercents ? `${tier}%` : `${tier}% fee`}</Box>
                {isLoadingStats || !showTVL ? (
                  <Skeleton animation={false} height={15} width={60} />
                ) : (
                  <Typography
                    className={cx(classes.tabTvl, {
                      [classes.tabSelectedTvl]: currentValue === index || bestTierIndex === index
                    })}>
                    {doesPoolExist(tier)
                      ? `$${+formatNumberWithSuffix(feeTiersWithTvl[tier], true, 18) < 1000 ? (+formatNumberWithSuffix(feeTiersWithTvl[tier], true, 18)).toFixed(2) : formatNumberWithSuffix(feeTiersWithTvl[tier])}`
                      : 'Not created'}
                  </Typography>
                )}
              </Box>
            }
            classes={{
              root: cx(
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
