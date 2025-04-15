import { Box, Typography, useMediaQuery } from '@mui/material'
import { useStyles } from './style'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import icons from '@static/icons'
import classNames from 'classnames'
import { theme } from '@static/theme'
import MarketIdLabel from '@components/NewPosition/MarketIdLabel/MarketIdLabel'
import { VariantType } from 'notistack'
import Refresher from '@common/Refresher/Refresher'
import { REFRESHER_INTERVAL } from '@store/consts/static'
import { useEffect, useMemo, useState } from 'react'
import { truncateString } from '@utils/utils'
import { Button } from '@common/Button/Button'
import { TooltipGradient } from '@common/TooltipHover/TooltipGradient'

type Props = {
  tokenA: {
    icon: string
    ticker: string
  }
  tokenB: {
    icon: string
    ticker: string
  }
  fee: number
  canClosePosition: boolean
  hasFees: boolean
  poolAddress: string
  networkUrl: string
  isActive: boolean
  onReverseTokensClick: () => void
  onClosePositionClick: () => void
  onAddPositionClick: () => void
  onRefreshClick: () => void
  onGoBackClick: () => void
  copyPoolAddressHandler: (message: string, variant: VariantType) => void
  isPreview: boolean
}

export const PositionHeader = ({
  tokenA,
  tokenB,
  fee,
  canClosePosition,
  hasFees,
  poolAddress,
  networkUrl,
  isActive,
  onReverseTokensClick,
  onClosePositionClick,
  onAddPositionClick,
  onRefreshClick,
  onGoBackClick,
  copyPoolAddressHandler,
  isPreview
}: Props) => {
  const { classes } = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down(688))
  const isMdDown = useMediaQuery(theme.breakpoints.down(1040))
  const isMdUp = useMediaQuery(theme.breakpoints.up(1040))

  const [refresherTime, setRefresherTime] = useState(REFRESHER_INTERVAL)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refresherTime > 0) {
        setRefresherTime(refresherTime - 1)
      } else {
        onRefreshClick()
        setRefresherTime(REFRESHER_INTERVAL)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [refresherTime])

  const closeButtonTitle = useMemo(() => {
    if (isPreview) {
      return 'Closing positions is disabled in preview'
    }

    if (!canClosePosition) {
      return 'Insufficient SOL to close position'
    }
    if (hasFees) {
      return 'Unclaimed fees will be returned when closing the position'
    }
    return ''
  }, [isPreview, canClosePosition, hasFees])

  const closeButton = (
    <TooltipHover title={closeButtonTitle}>
      <Button
        height={36}
        scheme='green'
        disabled={!canClosePosition || isPreview}
        variant='contained'
        onClick={() => onClosePositionClick()}>
        Close position
      </Button>
    </TooltipHover>
  )

  const addButton = (
    <TooltipHover title='Add more liquidity to this pool'>
      <Button scheme='pink' variant='contained' onClick={() => onAddPositionClick()}>
        + Add position
      </Button>
    </TooltipHover>
  )

  const marketIdLabel = (
    <Box className={classes.marketIdLabelContainer}>
      <MarketIdLabel
        marketId={poolAddress}
        displayLength={5}
        copyPoolAddressHandler={copyPoolAddressHandler}
      />
      <TooltipHover title='Open pool in explorer'>
        <a
          href={`https://eclipsescan.xyz/account/${poolAddress.toString()}${networkUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          className={classes.explorerLink}>
          <img src={icons.newTab} alt='Explorer link' />
        </a>
      </TooltipHover>
    </Box>
  )

  const refresher = (
    <TooltipHover title='Refresh'>
      <Box display='flex' alignItems='center'>
        <Refresher
          currentIndex={refresherTime}
          maxIndex={REFRESHER_INTERVAL}
          onClick={() => {
            onRefreshClick()
            setRefresherTime(REFRESHER_INTERVAL)
          }}
        />
      </Box>
    </TooltipHover>
  )

  return (
    <Box className={classes.headerContainer}>
      <Box className={classes.navigation}>
        <Box
          className={classNames(classes.wrapper, classes.backContainer)}
          onClick={() => onGoBackClick()}>
          <img src={icons.backArrow} alt='Back arrow' />
          <Typography className={classes.backText}>Back to portfolio</Typography>
        </Box>
        {isMdDown && (
          <Box className={classes.navigationSide}>
            {marketIdLabel} {refresher}
          </Box>
        )}
      </Box>
      <Box className={classes.container}>
        <Box className={classes.upperContainer}>
          <Box className={classes.wrapper}>
            <Box className={classes.iconContainer}>
              <img className={classes.icon} src={tokenA.icon} alt={tokenA.ticker} />
              <TooltipHover title='Reverse tokens'>
                <img
                  className={classes.reverseTokensIcon}
                  src={icons.reverseTokens}
                  alt='Reverse tokens'
                  onClick={() => onReverseTokensClick()}
                />
              </TooltipHover>
              <img className={classes.icon} src={tokenB.icon} alt={tokenB.ticker} />
            </Box>
            <Typography className={classes.tickerContainer}>
              {truncateString(tokenA.ticker, 4)} - {truncateString(tokenB.ticker, 4)}
            </Typography>
            {/* <TooltipHover
              title={
                isPromoted ? 'This pool distributes points' : "This pool doesn't distribute points"
              }>
              <img
                className={classNames(classes.airdropIcon, {
                  [classes.airdropIconInActive]: !isPromoted
                })}
                src={icons.airdropRainbow}
                alt='Points'
              />
            </TooltipHover> */}
          </Box>
          <Box className={classes.wrapper}>
            <TooltipGradient
              title={
                isActive ? (
                  <>
                    The position is <b>active</b> and <b>earning a fee</b> as long as the current
                    price is <b>within</b> the position's price range.
                  </>
                ) : (
                  <>
                    The position is <b>inactive</b> and <b>not earning a fee</b> as long as the
                    current price is <b>outside</b> the position's price range.
                  </>
                )
              }
              placement='top'
              top={3}
              noGradient>
              <Box
                className={classNames(classes.feeContainer, {
                  [classes.feeContainerIsActive]: isActive
                })}>
                {fee.toFixed(2)}%
              </Box>
            </TooltipGradient>
            {!isSmDown && closeButton}
            {!isSmDown && isMdDown && <>{addButton}</>}
          </Box>
        </Box>
        {(isSmDown || isMdUp) && (
          <Box className={classes.lowerContainer}>
            {!isMdDown ? (
              <>
                {marketIdLabel}
                <Box className={classes.wrapper}>
                  {refresher} {addButton}{' '}
                </Box>
              </>
            ) : (
              <>
                {closeButton}
                {addButton}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
