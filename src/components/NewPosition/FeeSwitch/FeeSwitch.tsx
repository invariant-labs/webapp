import React, { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/material'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
import { formatNumberWithSuffix } from '@utils/utils'

export interface IFeeSwitch {
  onSelect: (value: number) => void
  showOnlyPercents?: boolean
  feeTiers: number[]
  currentValue: number
  promotedPoolTierIndex: number | undefined
  feeTiersWithTvl: Record<number, number>
  showTVL?: boolean
  disabledFeeTiers: string[]
  totalTvl: number
  isLoadingStats: boolean
  containerKey?: string
}

export const FeeSwitch: React.FC<IFeeSwitch> = ({
  onSelect,
  showOnlyPercents = false,
  feeTiers,
  promotedPoolTierIndex,
  showTVL,
  currentValue,
  feeTiersWithTvl,
  totalTvl,
  isLoadingStats,
  containerKey,
  disabledFeeTiers
}) => {
  const { classes, cx } = useStyles()
  const [blocked, setBlocked] = useState(false)
  const { classes: singleTabClasses } = useSingleTabStyles()
  const [bestTierNode, setBestTierNode] = useState<HTMLElement | null>(null)
  const isPromotedPool = promotedPoolTierIndex !== undefined && promotedPoolTierIndex !== null

  const enabledFeeTiers = feeTiers.filter(tier => {
    const isDisabled = disabledFeeTiers.includes(tier.toString())
    return !isDisabled
  })
  const originalToFilteredIndex = new Map<number, number>()
  const filteredToOriginalIndex = new Map<number, number>()

  let filteredIndex = 0
  feeTiers.forEach((tier, originalIndex) => {
    const isDisabled = disabledFeeTiers.includes(tier.toString())
    if (!isDisabled) {
      originalToFilteredIndex.set(originalIndex, filteredIndex)
      filteredToOriginalIndex.set(filteredIndex, originalIndex)
      filteredIndex++
    }
  })

  const feeTiersTVLValues = Object.values(feeTiersWithTvl)
  const bestFee = feeTiersTVLValues.length > 0 ? Math.max(...feeTiersTVLValues) : 0
  const originalBestTierIndex = isPromotedPool
    ? promotedPoolTierIndex!
    : feeTiers.findIndex(tier => feeTiersWithTvl[tier] === bestFee && bestFee > 0)

  const bestTierIndex = originalToFilteredIndex.get(originalBestTierIndex) ?? -1
  const hasValidBestTier = bestTierIndex !== -1
  const filteredCurrentValue = originalToFilteredIndex.get(currentValue) ?? 0

  const [isBestTierHiddenOnLeft, setIsBestTierHiddenOnLeft] = useState(false)
  const [isBestTierHiddenOnRight, setIsBestTierHiddenOnRight] = useState(false)
  const tabsContainerRef = useRef<HTMLDivElement | null>(null)

  const checkBestTierVisibility = () => {
    if (!tabsContainerRef.current || !bestTierNode) return
    const containerRect = tabsContainerRef.current.getBoundingClientRect()
    const bestRect = bestTierNode.getBoundingClientRect()

    setIsBestTierHiddenOnLeft(bestRect.left < containerRect.left)
    setIsBestTierHiddenOnRight(bestRect.right > containerRect.right)
  }

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

  useLayoutEffect(() => {
    checkBestTierVisibility()
  }, [bestTierNode, enabledFeeTiers, promotedPoolTierIndex])

  useLayoutEffect(() => {
    window.addEventListener('resize', checkBestTierVisibility)

    return () => {
      window.removeEventListener('resize', checkBestTierVisibility)
    }
  }, [])

  const { classes: tabsClasses } = useTabsStyles({
    isBestTierHiddenOnLeft,
    isBestTierHiddenOnRight,
    hasValidBestTier,
    isPromotedPool
  })

  const handleChange = (_: React.SyntheticEvent, newFilteredValue: number) => {
    if (!blocked) {
      const originalIndex = filteredToOriginalIndex.get(newFilteredValue)
      if (originalIndex !== undefined) {
        onSelect(originalIndex)
        setBlocked(true)
        setTimeout(() => setBlocked(false), 300)
      }
    }
  }
  const filteredPromotedPoolTierIndex =
    promotedPoolTierIndex !== undefined
      ? originalToFilteredIndex.get(promotedPoolTierIndex)
      : undefined

  useLayoutEffect(() => {
    const currentTier = feeTiers[currentValue]
    const isCurrentTierDisabled =
      currentTier !== undefined && disabledFeeTiers.includes(currentTier.toString())

    if (isCurrentTierDisabled && enabledFeeTiers.length > 0) {
      const firstEnabledTierIndex = feeTiers.findIndex(
        tier => !disabledFeeTiers.includes(tier.toString())
      )

      if (firstEnabledTierIndex !== -1 && firstEnabledTierIndex !== currentValue) {
        onSelect(firstEnabledTierIndex)
      }
    }
  }, [currentValue, feeTiers, disabledFeeTiers, enabledFeeTiers.length, onSelect])

  return (
    <Grid key={containerKey} className={classes.wrapper}>
      <Tabs
        ref={tabsContainerRef}
        onScroll={checkBestTierVisibility}
        onAnimationEnd={checkBestTierVisibility}
        value={filteredCurrentValue}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        TabIndicatorProps={{ children: <span /> }}
        classes={tabsClasses}>
        {enabledFeeTiers.map((tier, filteredIndex) => {
          return (
            <Tab
              key={filteredIndex}
              disableRipple
              ref={filteredIndex === bestTierIndex ? setBestTierNode : undefined}
              label={
                <Box className={classes.tabContainer}>
                  {isLoadingStats || !showTVL ? (
                    <Skeleton animation={false} height={15} width={60} />
                  ) : (
                    <Typography
                      className={cx(classes.tabTvl, {
                        [classes.tabSelectedTvl]:
                          filteredCurrentValue === filteredIndex ||
                          filteredPromotedPoolTierIndex === filteredIndex ||
                          bestTierIndex === filteredIndex
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
                        [classes.tabSelectedTvl]:
                          filteredCurrentValue === filteredIndex ||
                          filteredPromotedPoolTierIndex === filteredIndex ||
                          bestTierIndex === filteredIndex
                      })}>
                      {doesPoolExist(tier)
                        ? `$${
                            +formatNumberWithSuffix(feeTiersWithTvl[tier], {
                              noDecimals: true,
                              decimalsAfterDot: 18
                            }) < 1000
                              ? (+formatNumberWithSuffix(feeTiersWithTvl[tier], {
                                  noDecimals: true,
                                  decimalsAfterDot: 18
                                })).toFixed(2)
                              : formatNumberWithSuffix(feeTiersWithTvl[tier])
                          }`
                        : 'Not created'}
                    </Typography>
                  )}
                </Box>
              }
              classes={{
                root: cx(
                  singleTabClasses.root,
                  filteredIndex === filteredPromotedPoolTierIndex
                    ? singleTabClasses.promoted
                    : filteredIndex === bestTierIndex
                      ? singleTabClasses.best
                      : undefined
                ),
                selected: singleTabClasses.selected
              }}
            />
          )
        })}
      </Tabs>
    </Grid>
  )
}

export default FeeSwitch
