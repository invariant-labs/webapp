import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { useStyles } from './style'
import { PopularPoolData } from '@containers/PopularPoolsWrapper/PopularPoolsWrapper'
import GradientBorder from '@common/GradientBorder/GradientBorder'
import { colors } from '@static/theme'
import cardBackgroundBottom from '@static/png/cardBackground1.png'
import cardBackgroundTop from '@static/png/cardBackground2.png'
import icons from '@static/icons'
import StatsLabel from './StatsLabel/StatsLabel'
import { Button } from '@common/Button/Button'

import {
  addressToTicker,
  formatNumberWithSuffix,
  initialXtoY,
  parseFeeToPathFee,
  ROUTES
} from '@utils/utils'
import { useNavigate } from 'react-router-dom'
import { NetworkType } from '@store/consts/static'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
export interface ICard extends PopularPoolData {
  isLoading: boolean
  network: NetworkType
  showAPY: boolean
}

const Card: React.FC<ICard> = ({
  addressFrom,
  addressTo,
  TVL,
  apy,
  // apyData,
  isLoading,
  isUnknownFrom,
  fee,
  iconFrom,
  iconTo,
  isUnknownTo,
  symbolFrom,
  symbolTo,
  volume,
  network,
  showAPY
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const isXtoY = initialXtoY(addressFrom ?? '', addressTo ?? '')

  const tokenAData = isXtoY
    ? {
        symbol: symbolFrom,
        icon: iconFrom,
        address: addressFrom,
        isUnknown: isUnknownFrom
      }
    : {
        symbol: symbolTo,
        icon: iconTo,
        address: addressTo,
        isUnknown: isUnknownTo
      }

  const tokenBData = isXtoY
    ? {
        symbol: symbolTo,
        icon: iconTo,
        address: addressTo,
        isUnknown: isUnknownTo
      }
    : {
        symbol: symbolFrom,
        icon: iconFrom,
        address: addressFrom,
        isUnknown: isUnknownFrom
      }

  const handleOpenPosition = () => {
    if (fee === undefined) return
    const tokenA = addressToTicker(network, tokenAData.address ?? '')
    const tokenB = addressToTicker(network, tokenBData.address ?? '')

    navigate(
      ROUTES.getNewPositionRoute(
        tokenA,
        tokenB,
        parseFeeToPathFee(Math.round(fee * 10 ** (DECIMAL - 2)))
      ),
      { state: { referer: 'liquidity' } }
    )
  }

  const handleOpenSwap = () => {
    navigate(
      ROUTES.getExchangeRoute(
        addressToTicker(network, addressFrom ?? ''),
        addressToTicker(network, addressTo ?? '')
      ),
      { state: { referer: 'liquidity' } }
    )
  }

  const shortenAddressName = (address: string) =>
    address.length > 8 ? `${address.slice(0, 4)}...` : address

  return (
    <Grid className={classes.root}>
      {isLoading ? (
        <Skeleton variant='rounded' animation='wave' className={classes.skeletonRect} />
      ) : (
        <Grid>
          <GradientBorder
            borderRadius={24}
            borderWidth={2}
            backgroundColor={colors.invariant.newDark}
            innerClassName={classes.container}>
            <img
              src={cardBackgroundTop}
              alt=''
              className={classes.backgroundImage}
              style={{ top: 0, zIndex: -1 }}
            />
            <img
              src={cardBackgroundBottom}
              alt=''
              className={classes.backgroundImage}
              style={{ bottom: 0, zIndex: -1 }}
            />
            <Grid container className={classes.wrapper}>
              <Grid container className={classes.iconsWrapper}>
                <Box className={classes.iconContainer}>
                  <img
                    className={classes.tokenIcon}
                    src={tokenAData.icon}
                    alt='Token from'
                    onError={e => {
                      e.currentTarget.src = icons.unknownToken
                    }}
                  />
                  {tokenAData.isUnknown && (
                    <img className={classes.warningIcon} src={icons.warningIcon} />
                  )}
                </Box>
                <img className={classes.swapIcon} src={icons.revertIcon} alt='Token from' />
                <Box className={classes.iconContainer}>
                  <img
                    className={classes.tokenIcon}
                    src={tokenBData.icon}
                    alt='Token to'
                    onError={e => {
                      e.currentTarget.src = icons.unknownToken
                    }}
                  />
                  {tokenBData.isUnknown && (
                    <img className={classes.warningIcon} src={icons.warningIcon} />
                  )}
                </Box>
              </Grid>

              <Typography className={classes.symbolsContainer}>
                {shortenAddressName(tokenAData.symbol ?? '')} -{' '}
                {shortenAddressName(tokenBData.symbol ?? '')}
              </Typography>
              <Grid container gap='8px'>
                {apy !== undefined && showAPY && (
                  <StatsLabel
                    title='APY'
                    value={`${apy > 1000 ? '>1000%' : apy === 0 ? '-' : Math.abs(apy).toFixed(2) + '%'}`}
                  />
                )}
                <StatsLabel title='Fee' value={fee + '%'} />
                {TVL !== undefined && (
                  <StatsLabel title='TVL' value={`$${formatNumberWithSuffix(TVL)}`} />
                )}
                {volume !== undefined && (
                  <StatsLabel title='Volume' value={`$${formatNumberWithSuffix(volume)}`} />
                )}
              </Grid>
              <Grid container className={classes.backWrapper}>
                <Grid className={classes.back} container item onClick={handleOpenSwap}>
                  <img className={classes.backIcon} src={icons.backIcon2} alt='Back' />
                  <Typography className={classes.backText}>Swap</Typography>
                </Grid>
                <Button
                  scheme='pink'
                  height={32}
                  borderRadius={8}
                  padding='0 25px'
                  onClick={handleOpenPosition}>
                  Deposit
                </Button>
              </Grid>
            </Grid>
          </GradientBorder>
        </Grid>
      )}
    </Grid>
  )
}

export default Card
