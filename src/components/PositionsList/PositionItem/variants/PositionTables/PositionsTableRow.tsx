import {
  Grid,
  TableRow,
  TableCell,
  Button,
  Typography,
  useMediaQuery,
  Box,
  Skeleton
} from '@mui/material'
import { useMemo, useState } from 'react'
import { MinMaxChart } from '../../components/MinMaxChart/MinMaxChart'
import { IPositionItem } from '../../../types'
import { colors, theme } from '@static/theme'
import { initialXtoY, tickerToAddress, formatNumberWithoutSuffix } from '@utils/utils'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../PositionMobileCard/style/shared'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import React from 'react'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { singlePositionData } from '@store/selectors/positions'
import { usePositionTableRowStyle } from './styles/positionTableRow'
import PositionViewActionPopover from '@components/Modals/PositionViewActionPopover/PositionViewActionPopover'
import { useUnclaimedFee } from '@store/hooks/positionList/useUnclaimedFee'
import icons from '@static/icons'
import { TooltipInv } from '@components/TooltipHover/TooltipInv'

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
  handleClaimFee,
  isFullRange,
  handleClosePosition
}) => {
  const { classes } = usePositionTableRowStyle()
  const { classes: sharedClasses } = useSharedStyles()
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

  const { tokenValueInUsd, tokenXPercentage, tokenYPercentage, unclaimedFeesInUSD } =
    useUnclaimedFee({
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='circular' width={36} height={36} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton
            variant='rectangular'
            width={100}
            height={36}
            sx={{ ml: 1.5, borderRadius: '10px' }}
          />
        </Box>
      )
    }

    return (
      <Grid container item className={classes.iconsAndNames} alignItems='center' wrap='nowrap'>
        <Grid container item className={sharedClasses.icons} alignItems='center' wrap='nowrap'>
          <img
            className={sharedClasses.tokenIcon}
            src={xToY ? tokenXIcon : tokenYIcon}
            alt={xToY ? tokenXName : tokenYName}
          />
          <TooltipHover title='Reverse tokens'>
            <img
              className={sharedClasses.arrows}
              src={icons.swapListIcon}
              alt='Arrow'
              onClick={e => {
                e.stopPropagation()
                setXToY(!xToY)
              }}
            />
          </TooltipHover>
          <img
            className={sharedClasses.tokenIcon}
            src={xToY ? tokenYIcon : tokenXIcon}
            alt={xToY ? tokenYName : tokenXName}
          />
        </Grid>

        <Typography className={sharedClasses.names}>
          {xToY ? tokenXName : tokenYName} - {xToY ? tokenYName : tokenXName}
        </Typography>
      </Grid>
    )
  }, [loading, xToY, tokenXIcon, tokenYIcon, tokenXName, tokenYName])

  const feeFragment = useMemo(() => {
    if (isItemLoading('feeTier')) {
      return (
        <Skeleton variant='rectangular' width='60px' height={36} sx={{ borderRadius: '10px' }} />
      )
    }
    return (
      <TooltipInv
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
        top={1}>
        <Grid
          container
          item
          sx={{ width: 65 }}
          className={classNames(sharedClasses.fee, isActive ? sharedClasses.activeFee : undefined)}
          justifyContent='center'
          alignItems='center'>
          <Typography
            className={classNames(
              sharedClasses.infoText,
              isActive ? sharedClasses.activeInfoText : undefined
            )}>
            {fee}%
          </Typography>
        </Grid>
      </TooltipInv>
    )
  }, [fee, classes, isActive])

  const tokenRatioContent = useMemo(() => {
    if (isItemLoading('tokenRatio')) {
      return (
        <Skeleton
          variant='rectangular'
          width='100%'
          height={36}
          sx={{ borderRadius: '10px', margin: '0 auto' }}
        />
      )
    }

    return (
      <Typography
        className={`${sharedClasses.infoText}`}
        style={{
          background: colors.invariant.light,
          padding: '8px 12px',
          borderRadius: '12px'
        }}>
        {tokenXPercentage === 100 && (
          <span>
            {tokenXPercentage}
            {'%'} {xToY ? tokenXName : tokenYName}
          </span>
        )}
        {tokenYPercentage === 100 && (
          <span>
            {tokenYPercentage}
            {'%'} {xToY ? tokenYName : tokenXName}
          </span>
        )}

        {tokenYPercentage !== 100 && tokenXPercentage !== 100 && (
          <span>
            {tokenXPercentage}
            {'%'} {xToY ? tokenXName : tokenYName} {' - '} {tokenYPercentage}
            {'%'} {xToY ? tokenYName : tokenXName}
          </span>
        )}
      </Typography>
    )
  }, [tokenXPercentage, tokenYPercentage, xToY, tokenXName, tokenYName, loading])

  const valueFragment = useMemo(() => {
    if (isItemLoading('value') || tokenValueInUsd.loading) {
      return (
        <Skeleton
          variant='rectangular'
          width='100%'
          height={36}
          sx={{ borderRadius: '10px', margin: '0 auto' }}
        />
      )
    }

    return (
      <Grid
        container
        item
        className={`${sharedClasses.value} ${classes.itemCellContainer}`}
        justifyContent='space-between'
        alignItems='center'
        wrap='nowrap'>
        <Grid className={sharedClasses.infoCenter} container item justifyContent='center'>
          <Typography className={sharedClasses.greenText}>
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
      return (
        <Skeleton
          variant='rectangular'
          width='100%'
          height={36}
          sx={{ borderRadius: '10px', margin: '0 auto' }}
        />
      )
    }
    return (
      <Grid
        container
        item
        className={`${sharedClasses.value} ${classes.itemCellContainer}`}
        justifyContent='space-between'
        alignItems='center'
        wrap='nowrap'>
        <Grid className={sharedClasses.infoCenter} container item justifyContent='center'>
          <Typography className={sharedClasses.greenText}>
            ${formatNumberWithoutSuffix(unclaimedFeesInUSD.value, { twoDecimals: true })}
          </Typography>
        </Grid>
      </Grid>
    )
  }, [unclaimedFeesInUSD, classes, loading])

  const chartFragment = useMemo(() => {
    if (isItemLoading('chart')) {
      return (
        <Skeleton
          variant='rectangular'
          width='100%'
          height={36}
          sx={{ borderRadius: '10px', margin: '0 auto' }}
        />
      )
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
      return (
        <Skeleton
          variant='rectangular'
          width={32}
          height={32}
          sx={{ borderRadius: '10px', margin: '0 auto' }}
        />
      )
    }

    return (
      <Button
        className={classes.button}
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
    <TableRow>
      <PositionViewActionPopover
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={isActionPopoverOpen}
        unclaimedFeesInUSD={unclaimedFeesInUSD.value}
        claimFee={() => handleClaimFee(positionSingleData?.positionIndex ?? 0)}
        closePosition={() => handleClosePosition(positionSingleData?.positionIndex ?? 0)}
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
    </TableRow>
  )
}
