import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Grid, Popover, Skeleton, Typography, useMediaQuery } from '@mui/material'
import useStyles from './style'
import { DropdownIcon } from '@static/componentIcon/DropDownIcon'
import { colors, theme, typography } from '@static/theme'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { formatNumberWithSuffix } from '@utils/utils'
import { SwapToken } from '@store/selectors/solanaWallet'
export interface IProps {
  onSelect: (value: number) => void
  feeTiers: number[]
  currentFeeIndex: number
  promotedPoolTierIndex?: number
  feeTiersWithTvl: Record<number, number>
  aggregatedStats: { tvl: number; fees: number; volume: number }
  disabledFeeTiers: string[]
  noData: boolean
  isLoading: boolean
  interval: IntervalsKeys
  tokenX: SwapToken | null
  tokenY: SwapToken | null
}

export const FeeSelector: React.FC<IProps> = ({
  onSelect,
  feeTiers,
  currentFeeIndex,
  feeTiersWithTvl,
  aggregatedStats,
  promotedPoolTierIndex,
  disabledFeeTiers,
  noData,
  isLoading,
  interval,
  tokenX,
  tokenY
}) => {
  const { classes, cx } = useStyles()
  const isTablet = useMediaQuery(theme.breakpoints.down(1200))

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (value: number) => {
    onSelect(value)
    handleClose()
  }

  const feeTiersTVLValues = Object.values(feeTiersWithTvl)
  const bestFee = feeTiersTVLValues.length > 0 ? Math.max(...feeTiersTVLValues) : 0
  const isPromotedPool = promotedPoolTierIndex !== undefined && promotedPoolTierIndex !== null

  const originalBestTierIndex = isPromotedPool
    ? promotedPoolTierIndex!
    : feeTiers.findIndex(tier => feeTiersWithTvl[tier] === bestFee && bestFee > 0)

  const doesPoolExist = useCallback(
    (tier: number) => Object.prototype.hasOwnProperty.call(feeTiersWithTvl, tier),
    [feeTiersWithTvl]
  )

  const getTvlValue = useCallback(
    (tier: number) => {
      const value = feeTiersWithTvl[tier]
      if (!doesPoolExist(tier) || value === 0) return '0%'
      if (Object.keys(feeTiersWithTvl).length === 1) return '100%'
      const pct = Math.round((value / aggregatedStats.tvl) * 100)
      if (pct < 1) return '<1%'
      if (pct > 99) return '>99%'
      return `${pct}%`
    },
    [doesPoolExist, feeTiersWithTvl, aggregatedStats.tvl]
  )

  useEffect(() => {
    const doesExist = doesPoolExist(feeTiers[currentFeeIndex])

    if (!doesExist) {
      onSelect(originalBestTierIndex)
    }
  }, [currentFeeIndex, originalBestTierIndex])

  return (
    <Box display='flex' mt={'auto'}>
      {isLoading ? (
        <Skeleton
          variant='rounded'
          width={132}
          height={isTablet ? 40 : 44}
          sx={{ borderRadius: '8px' }}
        />
      ) : (
        <Button
          onClick={event => {
            if (noData) return

            handleClick(event)
          }}
          className={cx(classes.selected, {
            [classes.bestSelect]: currentFeeIndex === originalBestTierIndex,
            [classes.promotedSelect]: currentFeeIndex === promotedPoolTierIndex
          })}
          style={{ cursor: noData ? 'not-allowed' : 'pointer' }}>
          {noData ? (
            <Typography className={classes.selectedText}>-</Typography>
          ) : (
            <>
              <Typography className={classes.selectedText}>{feeTiers[currentFeeIndex]}%</Typography>
              {!open ? <DropdownIcon /> : <DropdownIcon style={{ transform: 'scaleY(-1)' }} />}
            </>
          )}
        </Button>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        classes={{ paper: classes.paper }}>
        <Grid className={classes.root}>
          <Grid container className={classes.topContainer}>
            <Typography
              color={colors.invariant.text}
              style={{ ...typography.body1 }}
              display='flex'
              alignSelf='center'
              mb={1}>
              {tokenX?.symbol + ' - ' + tokenY?.symbol}
            </Typography>

            <Box className={classes.valueContainer}>
              <Typography>TVL {interval}</Typography>
              <Typography>${formatNumberWithSuffix(aggregatedStats.tvl)}</Typography>
            </Box>
            <Box className={classes.valueContainer}>
              <Typography>Fees {interval}</Typography>
              <Typography>${formatNumberWithSuffix(aggregatedStats.fees.toFixed(2))}</Typography>
            </Box>
            <Box className={classes.valueContainer}>
              <Typography>Volume {interval}</Typography>
              <Typography>${formatNumberWithSuffix(aggregatedStats.volume)}</Typography>
            </Box>
          </Grid>

          {feeTiers.map((tier, index) => {
            const notCreated = !doesPoolExist(tier)
            const disabled = disabledFeeTiers.includes(tier.toString())

            return (
              <Box
                key={tier}
                className={cx(classes.option, {
                  [classes.disabled]: notCreated || disabled,
                  [classes.best]: index === originalBestTierIndex,
                  [classes.promoted]: index === promotedPoolTierIndex,
                  [classes.active]: currentFeeIndex === index
                })}
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  if (!notCreated && !disabled) {
                    handleClose()
                    handleSelect(index)
                  }
                }}>
                <Typography className={classes.optionText}>{tier}%</Typography>
                <Typography className={classes.tvlText}>
                  {disabled ? (
                    'Pool disabled'
                  ) : notCreated ? (
                    'Not created'
                  ) : (
                    <Grid>
                      <span>{getTvlValue(tier) + ' TVL'}</span>
                    </Grid>
                  )}
                </Typography>
              </Box>
            )
          })}
        </Grid>
      </Popover>
    </Box>
  )
}
