import { Grid, TableCell, Typography, useMediaQuery, Box, Skeleton } from '@mui/material'

import { useMemo, useState } from 'react'
import { colors, theme } from '@static/theme'
import { initialXtoY, tickerToAddress, formatNumberWithoutSuffix } from '@utils/utils'
import { useSelector } from 'react-redux'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import React from 'react'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { singlePositionData } from '@store/selectors/positions'
import PositionViewActionPopover from '@components/Modals/PositionViewActionPopover/PositionViewActionPopover'
import { useTokenValues } from '@store/hooks/positionList/useTokenValues'
import { Button } from '@common/Button/Button'
import { IPositionItem } from '@store/consts/types'
import { MinMaxChart } from '@components/Portfolio/PositionItem/components/MinMaxChart/MinMaxChart'
import { useStyles } from './style'
import { swapListIcon } from '@static/icons'

interface ILoadingStates {
  pairName?: boolean
  feeTier?: boolean
  tokenRatio?: boolean
  value?: boolean
  unclaimedFee?: boolean
  chart?: boolean
  actions?: boolean
}

interface IPositionsTableRow extends IPositionItem {
  isLockPositionModalOpen: boolean
  setIsLockPositionModalOpen: (value: boolean) => void
  loading?: boolean | ILoadingStates
  handleLockPosition: (index: number) => void
  handleClosePosition: (index: number) => void
  handleClaimFee: (index: number) => void
  createNewPosition: () => void
  shouldDisable: boolean
}

export const PositionTableRow: React.FC<IPositionsTableRow> = ({
  tokenXName,
  tokenYName,
  tokenXIcon,
  tokenYIcon,
  currentPrice,
  id,
  fee,
  min,
  position,
  max,
  valueX,
  valueY,
  isActive = false,
  tokenXLiq,
  tokenYLiq,
  network,
  loading,
  unclaimedFeesInUSD = { value: 0, loading: false, isClaimAvailable: false },
  handleClaimFee,
  isFullRange,
  handleClosePosition,
  createNewPosition,
  shouldDisable
}) => {
  const { classes, cx } = useStyles()
  const [xToY, setXToY] = useState<boolean>(
    initialXtoY(tickerToAddress(network, tokenXName), tickerToAddress(network, tokenYName))
  )
  const positionSingleData = useSelector(singlePositionData(id ?? ''))
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const isItemLoading = (item: keyof ILoadingStates): boolean => {
    if (typeof loading === 'boolean') return loading
    return loading?.[item] ?? false
  }

  const { tokenValueInUsd, tokenXPercentage, tokenYPercentage } = useTokenValues({
    currentPrice,
    id,
    position,
    tokenXLiq,
    tokenYLiq,
    positionSingleData,
    xToY
  })

  const pairNameContent = useMemo(() => {
    if (isItemLoading('pairName')) {
      return (
        <Box className={classes.skeletonWrapper}>
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='circular' width={36} height={36} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='rectangular' className={classes.skeleton100x60} />
        </Box>
      )
    }

    return (
      <Grid container item className={classes.iconsAndNames}>
        <Grid container item className={classes.iconsShared}>
          <img
            className={classes.tokenIcon}
            src={xToY ? tokenXIcon : tokenYIcon}
            alt={xToY ? tokenXName : tokenYName}
          />
          <TooltipHover title='Reverse tokens'>
            <img
              className={classes.arrowsShared}
              src={swapListIcon}
              alt='Arrow'
              onClick={e => {
                e.stopPropagation()
                setXToY(!xToY)
              }}
            />
          </TooltipHover>
          <img
            className={classes.tokenIcon}
            src={xToY ? tokenYIcon : tokenXIcon}
            alt={xToY ? tokenYName : tokenXName}
          />
        </Grid>

        <Typography className={classes.names}>
          {xToY ? tokenXName : tokenYName} - {xToY ? tokenYName : tokenXName}
        </Typography>
      </Grid>
    )
  }, [loading, xToY, tokenXIcon, tokenYIcon, tokenXName, tokenYName])

  const feeFragment = useMemo(() => {
    if (isItemLoading('feeTier')) {
      return <Skeleton variant='rectangular' className={classes.skeleton3660} />
    }
    return (
      <TooltipHover
        title={
          isActive ? (
            <>
              The position is <b>active</b> and currently <b>earning a fee</b> as long as the
              current price is <b>within</b> the position's price range.
            </>
          ) : (
            <>
              The position is <b>inactive</b> and <b>not earning a fee</b> as long as the current
              price is <b>outside</b> the position's price range.
            </>
          )
        }
        placement='top'
        increasePadding>
        <Grid
          container
          item
          sx={{ width: 65 }}
          className={cx(classes.fee, isActive ? classes.activeFee : undefined)}>
          <Typography
            className={cx(classes.infoText, isActive ? classes.activeInfoText : undefined)}>
            {fee}%
          </Typography>
        </Grid>
      </TooltipHover>
    )
  }, [fee, classes, isActive])

  const tokenRatioContent = useMemo(() => {
    if (isItemLoading('tokenRatio')) {
      return <Skeleton variant='rectangular' className={classes.skeleton36Rect} />
    }

    const displayTokenYName =
      tokenYPercentage !== 100 && tokenYName.length > 5
        ? tokenYName.slice(0, 5) + '...'
        : tokenYName

    const displayTokenXName =
      tokenXPercentage !== 100 && tokenXName.length > 5
        ? tokenXName.slice(0, 5) + '...'
        : tokenXName

    return (
      <Typography
        className={classes.infoText}
        style={{
          background: colors.invariant.light,
          padding: '8px 12px',
          borderRadius: '12px'
        }}>
        {tokenXPercentage === 100 && (
          <span>
            {tokenXPercentage}
            {'%'} {xToY ? displayTokenXName : displayTokenYName}
          </span>
        )}
        {tokenYPercentage === 100 && (
          <span>
            {tokenYPercentage}
            {'%'} {xToY ? displayTokenYName : displayTokenXName}
          </span>
        )}
        {tokenYPercentage !== 100 && tokenXPercentage !== 100 && (
          <span>
            {tokenXPercentage}
            {'%'} {xToY ? displayTokenXName : displayTokenYName} {' - '}
            {tokenYPercentage}
            {'%'} {xToY ? displayTokenYName : displayTokenXName}
          </span>
        )}
      </Typography>
    )
  }, [
    tokenXPercentage,
    tokenYPercentage,
    xToY,
    tokenXName,
    tokenYName,
    isItemLoading,
    classes.infoText,
    classes.skeleton36Rect,
    colors.invariant.light
  ])

  const valueFragment = useMemo(() => {
    if (isItemLoading('value') || tokenValueInUsd.loading) {
      return <Skeleton className={classes.skeleton36Rect} />
    }

    return (
      <Grid container item className={`${classes.value} ${classes.itemCellContainer}`}>
        <Grid className={classes.infoCenter} container item>
          <Typography className={classes.greenText}>
            {`$${formatNumberWithoutSuffix(tokenValueInUsd.value, { twoDecimals: true })}`}
          </Typography>
        </Grid>
      </Grid>
    )
  }, [
    tokenValueInUsd,
    valueX,
    valueY,
    tokenXName,
    classes,
    isXs,
    isDesktop,
    tokenYName,
    xToY,
    loading
  ])

  const unclaimedFee = useMemo(() => {
    if (isItemLoading('unclaimedFee') || unclaimedFeesInUSD.loading) {
      return <Skeleton className={classes.skeleton36Rect} />
    }
    return (
      <Grid container item className={`${classes.value} ${classes.itemCellContainer}`}>
        <Grid className={classes.infoCenter} container item>
          <Typography className={classes.greenText}>
            ${formatNumberWithoutSuffix(unclaimedFeesInUSD.value, { twoDecimals: true })}
          </Typography>
        </Grid>
      </Grid>
    )
  }, [unclaimedFeesInUSD, classes, loading])

  const chartFragment = useMemo(() => {
    if (isItemLoading('chart')) {
      return <Skeleton variant='rectangular' />
    }

    return (
      <MinMaxChart
        isFullRange={isFullRange}
        min={Number(xToY ? min : 1 / max)}
        max={Number(xToY ? max : 1 / min)}
        current={
          xToY ? currentPrice : currentPrice !== 0 ? 1 / currentPrice : Number.MAX_SAFE_INTEGER
        }
      />
    )
  }, [min, max, currentPrice, xToY, loading])

  const actionsFragment = useMemo(() => {
    if (isItemLoading('actions')) {
      return <Skeleton variant='rectangular' className={classes.skeleton30Rect} />
    }

    return (
      <Button
        scheme='green'
        onClick={e => {
          e.stopPropagation()
          handleClick(e)
        }}>
        ...
      </Button>
    )
  }, [loading])

  const [isActionPopoverOpen, setActionPopoverOpen] = React.useState<boolean>(false)

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setActionPopoverOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setActionPopoverOpen(false)
  }

  return (
    <>
      <PositionViewActionPopover
        shouldDisable={shouldDisable}
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={isActionPopoverOpen}
        unclaimedFeesInUSD={unclaimedFeesInUSD}
        claimFee={() => handleClaimFee(positionSingleData?.positionIndex ?? 0)}
        closePosition={() => handleClosePosition(positionSingleData?.positionIndex ?? 0)}
        createPosition={createNewPosition}
      />
      <TableCell className={`${classes.pairNameCell} ${classes.cellBase}`}>
        {pairNameContent}
      </TableCell>

      <TableCell className={`${classes.cellBase} ${classes.feeTierCell}`}>
        <Box sx={{ display: 'flex' }}>{feeFragment}</Box>
      </TableCell>

      <TableCell className={`${classes.cellBase} ${classes.tokenRatioCell}`}>
        {tokenRatioContent}
      </TableCell>

      <TableCell className={`${classes.cellBase} ${classes.valueCell}`}>{valueFragment}</TableCell>

      <TableCell className={`${classes.cellBase} ${classes.feeCell}`}>{unclaimedFee}</TableCell>

      <TableCell className={`${classes.cellBase} ${classes.chartCell}`}>{chartFragment}</TableCell>

      <TableCell className={`${classes.cellBase} ${classes.actionCell} action-button`}>
        {actionsFragment}
      </TableCell>
    </>
  )
}
