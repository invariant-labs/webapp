import React from 'react'
import { formatNumbers, printBN, showPrefix } from '@consts/utils'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { colors, theme } from '@static/theme'
import { useStyles } from './style'
interface IProps {
  displayType: string
  itemNumber?: number
  icon?: string
  name?: string
  symbol?: string
  price?: BN
  decimals?: number
  priceChange?: string
  volume?: string
  TVL?: string
}

const TokenListItem: React.FC<IProps> = ({
  displayType,
  itemNumber = 0,
  icon = 'BTCIcon',
  name = 'Bitcoin',
  symbol = 'BTCIcon',
  price = new BN(0),
  decimals = 0,
  priceChange = '0',
  volume = '0',
  TVL = '0'
}) => {
  const classes = useStyles()
  const isNegative = Number(priceChange) < 0

  const isXDown = useMediaQuery(theme.breakpoints.down('sm'))
  const hideName = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid>
      {displayType === 'tokens' ? (
        <Grid
          container
          style={{ color: colors.white.main }}
          classes={{ container: classes.container, root: classes.tokenList }}>
          <Typography component='p'>{itemNumber}</Typography>
          <Grid className={classes.tokenName}>
            {!isXDown && <img src={icon}></img>}
            <Typography>
              {hideName ? symbol : name}
              {!hideName && <span className={classes.tokenSymbol}>{` (${symbol})`}</span>}
            </Typography>
          </Grid>
          <Typography>${Number(printBN(price, decimals)).toFixed(2)}</Typography>
          <Typography style={{ color: isNegative ? colors.invariant.Error : colors.green.main }}>
            {isNegative ? `-${Math.abs(Number(priceChange))}%` : `+${priceChange}%`}
          </Typography>
          <Typography>
            {isXDown
              ? `~$${formatNumbers()(volume.replace(/[,.]/g, ''))} ${showPrefix(
                  Number(volume.split(',').join(''))
                )}`
              : `$${volume}`}
          </Typography>
          <Typography>
            {isXDown
              ? `~$${formatNumbers()(TVL.replace(/[,.]/g, ''))} ${showPrefix(
                  Number(TVL.split(',').join(''))
                )}`
              : `$${TVL}`}
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          style={{ color: colors.invariant.textGrey, fontWeight: 400 }}
          classes={{ container: classes.container, root: classes.header }}>
          <Typography style={{ lineHeight: '12px' }}>
            N<sup>o</sup>
          </Typography>
          <Grid>
            <Typography>Name</Typography>
          </Grid>
          <Typography>Price</Typography>
          <Typography>Price Change</Typography>
          <Typography>Volume 24H</Typography>
          <Typography>TVL</Typography>
        </Grid>
      )}
    </Grid>
  )
}
export default TokenListItem
