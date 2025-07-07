import { Box, Typography, useMediaQuery } from '@mui/material'
import { useStyles } from './style'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { theme } from '@static/theme'
import MarketIdLabel from '@components/NewPosition/MarketIdLabel/MarketIdLabel'
import { VariantType } from 'notistack'
import Refresher from '@common/Refresher/Refresher'
import { REFRESHER_INTERVAL } from '@store/consts/static'
import { useEffect, useMemo, useState } from 'react'
import { ROUTES, truncateString } from '@utils/utils'
import { Button } from '@common/Button/Button'
import { backArrowIcon, newTabIcon } from '@static/icons'
import { INavigatePosition } from '@store/consts/types'
import { ReverseTokensIcon } from '@static/componentIcon/ReverseTokensIcon'
import { useNavigate } from 'react-router-dom'
import { MobileNavigation } from '../Navigation/MobileNavigation/MobileNavigation'

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
  isClosing: boolean
  previousPosition: INavigatePosition | null
  nextPosition: INavigatePosition | null
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
  isPreview,
  isClosing,
  previousPosition,
  nextPosition
}: Props) => {
  const { classes, cx } = useStyles()
  const isSmDown = useMediaQuery(theme.breakpoints.down(688))
  const isMdDown = useMediaQuery(theme.breakpoints.down(1040))
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'))

  const [refresherTime, setRefresherTime] = useState(REFRESHER_INTERVAL)

  const navigate = useNavigate()

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

  const closeButton = closeButtonTitle ? (
    <TooltipHover title={closeButtonTitle}>
      <Button
        height={40}
        scheme='green'
        disabled={!canClosePosition || isPreview || isClosing}
        variant='contained'
        onClick={() => onClosePositionClick()}>
        Close position
      </Button>
    </TooltipHover>
  ) : (
    <Button
      height={40}
      scheme='green'
      disabled={!canClosePosition || isPreview || isClosing}
      variant='contained'
      onClick={() => onClosePositionClick()}>
      Close position
    </Button>
  )

  const addButton = (
    <TooltipHover title='Add more liquidity to this pool' fullSpan={isSmDown}>
      <Button scheme='pink' variant='contained' onClick={() => onAddPositionClick()} width='100%'>
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
          href={`https://solscan.io/account/${poolAddress}${networkUrl}`}
          target='_blank'
          rel='noopener noreferrer'>
          <img className={classes.explorerLink} src={newTabIcon} alt='Explorer link' />
        </a>
      </TooltipHover>
    </Box>
  )

  const refresher = (
    <TooltipHover title='Refresh'>
      <Box>
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
        <Box className={cx(classes.wrapper, classes.backContainer)} onClick={() => onGoBackClick()}>
          <img src={backArrowIcon} alt='Back arrow' />
          <Typography className={classes.backText}>Back to portfolio</Typography>
        </Box>
        {isMdDown && (
          <Box className={classes.navigationSide}>
            {marketIdLabel} {refresher}
          </Box>
        )}
        {!isMdDown && isLgDown && (previousPosition || nextPosition) && (
          <Box className={classes.tabletNavigation}>
            <MobileNavigation
              position={previousPosition}
              direction='left'
              onClick={() => {
                if (previousPosition) {
                  navigate(ROUTES.getPositionRoute(previousPosition.id))
                }
              }}
            />
            <MobileNavigation
              position={nextPosition}
              direction='right'
              onClick={() => {
                if (nextPosition) {
                  navigate(ROUTES.getPositionRoute(nextPosition.id))
                }
              }}
            />
          </Box>
        )}
      </Box>
      {isMdDown && (previousPosition || nextPosition) && (
        <Box display='flex' gap={1}>
          <MobileNavigation
            position={previousPosition}
            direction='left'
            onClick={() => {
              if (previousPosition) {
                navigate(ROUTES.getPositionRoute(previousPosition.id))
              }
            }}
          />
          <MobileNavigation
            position={nextPosition}
            direction='right'
            onClick={() => {
              if (nextPosition) {
                navigate(ROUTES.getPositionRoute(nextPosition.id))
              }
            }}
          />
        </Box>
      )}
      <Box className={classes.container}>
        <Box className={classes.upperContainer}>
          <Box className={classes.wrapper}>
            <Box className={classes.iconContainer}>
              <img className={classes.icon} src={tokenA.icon} alt={tokenA.ticker} />
              <TooltipHover title='Reverse tokens'>
                <ReverseTokensIcon
                  className={classes.reverseTokensIcon}
                  onClick={() => onReverseTokensClick()}
                />
              </TooltipHover>
              <img className={classes.icon} src={tokenB.icon} alt={tokenB.ticker} />
            </Box>
            <Typography className={classes.tickerContainer}>
              {truncateString(tokenA.ticker, 3)} - {truncateString(tokenB.ticker, 3)}
            </Typography>
          </Box>
          <Box className={classes.wrapper}>
            <TooltipHover
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
              increasePadding>
              <Box
                className={cx(classes.feeContainer, {
                  [classes.feeContainerIsActive]: isActive
                })}>
                {fee.toFixed(2)}%
              </Box>
            </TooltipHover>
            {!isSmDown && closeButton}
            {!isSmDown && isMdDown && <>{addButton}</>}
          </Box>
        </Box>
        {(isSmDown || !isMdDown) && (
          <Box className={classes.lowerContainer}>
            {!isMdDown ? (
              <>
                {marketIdLabel}
                <Box className={classes.wrapper}>
                  {refresher} {addButton}
                </Box>
              </>
            ) : (
              <>
                {closeButton}
                <Box display={'flex'} flexGrow={1}>
                  {addButton}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
