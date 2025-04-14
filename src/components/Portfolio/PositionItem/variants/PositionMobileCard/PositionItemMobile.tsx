import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import { formatNumberWithSuffix } from '@utils/utils'
import classNames from 'classnames'
import { useMemo, useRef, useState } from 'react'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { initialXtoY, tickerToAddress } from '@utils/utils'
import { useSelector } from 'react-redux'
import { useTokenValues } from '@store/hooks/positionList/useTokenValues'
import { singlePositionData } from '@store/selectors/positions'
import { MinMaxChart } from '../../components/MinMaxChart/MinMaxChart'
import { blurContent, unblurContent } from '@utils/uiUtils'
import PositionViewActionPopover from '@components/Modals/PositionViewActionPopover/PositionViewActionPopover'
import { ISinglePositionData } from '@components/Portfolio/Overview/Overview/Overview'
import icons from '@static/icons'
import { TooltipInv } from '@common/TooltipHover/TooltipInv'
import { useMobileStyles } from './style'
import { IPositionItem } from '@store/consts/types'

interface IPositionItemMobile extends IPositionItem {
  setAllowPropagation: React.Dispatch<React.SetStateAction<boolean>>
  handleClosePosition: (index: number) => void
  handleClaimFee: (index: number) => void
}

export const PositionItemMobile: React.FC<IPositionItemMobile> = ({
  tokenXName,
  tokenYName,
  tokenXIcon,
  tokenYIcon,
  fee,
  min,
  max,
  position,
  id,
  isActive = false,
  currentPrice,
  tokenXLiq,
  tokenYLiq,
  network,
  unclaimedFeesInUSD = { value: 0, loading: false },
  isFullRange,
  handleClosePosition,
  handleClaimFee
}) => {
  const { classes } = useMobileStyles()
  const airdropIconRef = useRef<any>(null)
  const positionSingleData: ISinglePositionData | undefined = useSelector(
    singlePositionData(id ?? '')
  )

  const [xToY, setXToY] = useState<boolean>(
    initialXtoY(tickerToAddress(network, tokenXName), tickerToAddress(network, tokenYName))
  )

  const [isActionPopoverOpen, setActionPopoverOpen] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setActionPopoverOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setActionPopoverOpen(false)
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

  const topSection = useMemo(
    () => (
      <Grid container sx={{ width: '100%', marginBottom: 2 }}>
        <Grid item xs={5}>
          <TooltipInv
            title={
              isActive ? (
                <>
                  The position is <b>active</b> and currently <b>earning a fee</b>
                </>
              ) : (
                <>
                  The position is <b>inactive</b> and <b>not earning a fee</b>
                </>
              )
            }
            placement='top'>
            <Grid
              container
              className={classNames(classes.fee, isActive ? classes.activeFee : undefined)}
              onClick={e => e.stopPropagation()}>
              <Typography
                className={classNames(
                  classes.infoText,
                  isActive ? classes.activeInfoText : undefined
                )}>
                {fee}% fee
              </Typography>
            </Grid>
          </TooltipInv>
        </Grid>

        <Grid item xs={7} paddingLeft={'16px'}>
          {unclaimedFeesInUSD.loading ? (
            <Skeleton
              variant='rectangular'
              width='100%'
              height={36}
              sx={{ borderRadius: '10px' }}
            />
          ) : (
            <Grid container className={classes.fee} sx={{ width: '100%' }}>
              <Box className={classes.unclaimedFeeContainer}>
                <Typography className={classes.infoText}>Unclaimed Fee</Typography>
                <Typography className={classes.greenText}>
                  ${formatNumberWithSuffix(unclaimedFeesInUSD.value)}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    ),
    [fee, isActive, unclaimedFeesInUSD]
  )

  const middleSection = useMemo(
    () => (
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          {tokenValueInUsd.loading ? (
            <Skeleton
              variant='rectangular'
              width='100%'
              height={36}
              sx={{ borderRadius: '10px' }}
            />
          ) : (
            <Grid container className={classes.value} alignItems='center' justifyContent='center'>
              <Box gap={'8px'} display={'flex'} alignItems={'center'}>
                <Typography className={classes.infoText}>Value</Typography>
                <Typography className={classes.greenText}>
                  ${formatNumberWithSuffix(tokenValueInUsd.value)}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems='center' className={classes.value} justifyContent='center'>
            <Typography className={classes.infoText}>
              {tokenXPercentage === 100 && (
                <span>
                  {tokenXPercentage}% {xToY ? tokenXName : tokenYName}
                </span>
              )}
              {tokenYPercentage === 100 && (
                <span>
                  {tokenYPercentage}% {xToY ? tokenYName : tokenXName}
                </span>
              )}
              {tokenYPercentage !== 100 && tokenXPercentage !== 100 && (
                <span>
                  {tokenXPercentage}% {xToY ? tokenXName : tokenYName} - {tokenYPercentage}%{' '}
                  {xToY ? tokenYName : tokenXName}
                </span>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ),
    [tokenValueInUsd, tokenXPercentage, tokenYPercentage, xToY]
  )

  const chartSection = useMemo(
    () => (
      <Grid container justifyContent='center' margin={'0 auto'} width={'80%'}>
        <MinMaxChart
          isFullRange={isFullRange}
          min={Number(xToY ? min : 1 / max)}
          max={Number(xToY ? max : 1 / min)}
          current={
            xToY ? currentPrice : currentPrice !== 0 ? 1 / currentPrice : Number.MAX_SAFE_INTEGER
          }
        />
      </Grid>
    ),
    [min, max, currentPrice, xToY]
  )

  return (
    <Grid className={classes.root} container direction='column'>
      <PositionViewActionPopover
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={isActionPopoverOpen}
        unclaimedFeesInUSD={unclaimedFeesInUSD.value}
        claimFee={() => handleClaimFee(positionSingleData?.positionIndex ?? 0)}
        closePosition={() => handleClosePosition(positionSingleData?.positionIndex ?? 0)}
      />
      <Grid
        container
        item
        className={classes.mdTop}
        direction='row'
        wrap='nowrap'
        sx={{ marginBottom: 2 }}>
        <Grid
          container
          item
          className={classes.iconsAndNames}
          alignItems='center'
          justifyContent={'space-between'}
          wrap='nowrap'>
          <Box display='flex' alignItems={'center'}>
            <Grid container item className={classes.icons} alignItems='center' wrap='nowrap'>
              <img
                className={classes.tokenIcon}
                src={xToY ? tokenXIcon : tokenYIcon}
                alt={xToY ? tokenXName : tokenYName}
              />
              <TooltipHover title='Reverse tokens'>
                <img
                  className={classes.arrows}
                  src={icons.swapListIcon}
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
          </Box>

          <Box ref={airdropIconRef} className={classes.actionButtonContainer}>
            <Button
              className={classes.button}
              onClick={e => {
                e.stopPropagation()
                handleClick(e)
              }}>
              ...
            </Button>
          </Box>
        </Grid>
      </Grid>

      {topSection}
      {middleSection}
      {chartSection}
    </Grid>
  )
}
