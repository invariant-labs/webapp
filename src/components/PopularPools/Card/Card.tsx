import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import { useStyles } from './style'
import { PopularPoolData } from '@containers/PopularPoolsWrapper/PopularPoolsWrapper'
import GradientBorder from '@components/GradientBorder/GradientBorder'
import { colors } from '@static/theme'
import cardBackgroundBottom from '@static/png/cardBackground1.png'
import cardBackgroundTop from '@static/png/cardBackground2.png'
import icons from '@static/icons'
import RevertIcon from '@static/svg/revert.svg'
import { shortenAddress } from '@utils/uiUtils'
import StatsLabel from './StatsLabel/StatsLabel'
import backIcon from '@static/svg/back-arrow-2.svg'
import { addressToTicker, formatNumber, initialXtoY, parseFeeToPathFee } from '@utils/utils'
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

  const handleOpenPosition = () => {
    if (fee === undefined) return

    const revertRatio = !initialXtoY(addressFrom ?? '', addressTo ?? '')

    const tokenA = revertRatio
      ? addressToTicker(network, addressTo ?? '')
      : addressToTicker(network, addressFrom ?? '')
    const tokenB = revertRatio
      ? addressToTicker(network, addressFrom ?? '')
      : addressToTicker(network, addressTo ?? '')

    navigate(
      `/newPosition/${tokenA}/${tokenB}/${parseFeeToPathFee(Math.round(fee * 10 ** (DECIMAL - 2)))}`,
      { state: { referer: 'liquidity' } }
    )
  }

  const handleOpenSwap = () => {
    navigate(
      `/exchange/${addressToTicker(network, addressFrom ?? '')}/${addressToTicker(network, addressTo ?? '')}`,
      { state: { referer: 'liquidity' } }
    )
  }

  return (
    <Grid className={classes.root}>
      {isLoading ? (
        <Skeleton
          variant='rounded'
          animation='wave'
          width={220}
          height={344}
          style={{ opacity: 0.7, borderRadius: 24 }}
        />
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
            <Grid container p={'20px'} alignItems='center' flexDirection='column'>
              <Grid container className={classes.iconsWrapper}>
                <Box className={classes.iconContainer}>
                  <img
                    className={classes.tokenIcon}
                    src={iconFrom}
                    alt='Token from'
                    onError={e => {
                      e.currentTarget.src = icons.unknownToken
                    }}
                  />
                  {isUnknownFrom && <img className={classes.warningIcon} src={icons.warningIcon} />}
                </Box>
                <img className={classes.swapIcon} src={RevertIcon} alt='Token from' />
                <Box className={classes.iconContainer}>
                  <img
                    className={classes.tokenIcon}
                    src={iconTo}
                    alt='Token to'
                    onError={e => {
                      e.currentTarget.src = icons.unknownToken
                    }}
                  />
                  {isUnknownTo && <img className={classes.warningIcon} src={icons.warningIcon} />}
                </Box>
              </Grid>

              <Typography className={classes.symbolsContainer}>
                {shortenAddress(symbolFrom ?? '')} - {shortenAddress(symbolTo ?? '')}
              </Typography>
              <Grid container gap='8px'>
                {apy !== undefined && showAPY && (
                  <StatsLabel
                    title='APY'
                    value={`${apy > 1000 ? '>1000%' : apy === 0 ? '-' : Math.abs(apy).toFixed(2) + '%'}`}
                  />
                )}
                <StatsLabel title='Fee' value={fee + '%'} />
                {TVL !== undefined && <StatsLabel title='TVL' value={`$${formatNumber(TVL)}`} />}
                {volume !== undefined && (
                  <StatsLabel title='Volume' value={`$${formatNumber(volume)}`} />
                )}
              </Grid>
              <Grid container justifyContent='space-between' alignItems='center' mt='auto'>
                <Grid
                  className={classes.back}
                  container
                  item
                  alignItems='center'
                  onClick={handleOpenSwap}>
                  <img className={classes.backIcon} src={backIcon} alt='Back' />
                  <Typography className={classes.backText}>Swap</Typography>
                </Grid>
                <Button className={classes.button} variant='contained' onClick={handleOpenPosition}>
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
