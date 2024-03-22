import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { formatNumbers, FormatNumberThreshold, PrefixConfig, showPrefix } from '@consts/utils'
import { ILiquidityToken } from './consts'
import SwapPosition from '@static/svg/swap-position.svg'
import loader from '@static/gif/loading2.gif'
import useStyles from './style'

export interface BoxInfoToken extends Omit<ILiquidityToken, 'claimValue'> {
  value: number
}

export const BoxInfo: React.FC<{
  title: string
  onClickButton?: () => void
  tokenA: BoxInfoToken
  tokenB: BoxInfoToken
  showBalance?: boolean
  swapHandler?: () => void
  showLoader?: boolean
}> = ({
  title,
  onClickButton,
  tokenB,
  tokenA,
  showBalance = false,
  swapHandler,
  showLoader = false
}) => {
  const classes = useStyles()

  const thresholdsWithTokenDecimal = (decimals: number): FormatNumberThreshold[] => [
    {
      value: 10,
      decimals
    },
    {
      value: 10000,
      decimals: 6
    },
    {
      value: 100000,
      decimals: 4
    },
    {
      value: 1000000,
      decimals: 3
    },
    {
      value: 1000000000,
      decimals: 2,
      divider: 1000000
    },
    {
      value: Infinity,
      decimals: 2,
      divider: 1000000000
    }
  ]

  const usdThresholds: FormatNumberThreshold[] = [
    {
      value: 1000,
      decimals: 2
    },
    {
      value: 10000,
      decimals: 1
    },
    {
      value: 1000000,
      decimals: 2,
      divider: 1000
    },
    {
      value: 1000000000,
      decimals: 2,
      divider: 1000000
    },
    {
      value: Infinity,
      decimals: 2,
      divider: 1000000000
    }
  ]

  const prefixConfig: PrefixConfig = {
    B: 1000000000,
    M: 1000000
  }

  const tokenXPrintValue =
    Math.abs(Number(tokenA.value)) < 10 ** -tokenA.decimal ? 0 : Number(tokenA.value)

  const tokenYPrintValue =
    Math.abs(Number(tokenB.value)) < 10 ** -tokenB.decimal ? 0 : Number(tokenB.value)

  return (
    <Grid className={classes.boxInfo}>
      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}> {title}</Typography>
        {onClickButton ? (
          <Button
            className={classes.violetButton}
            variant='contained'
            onClick={onClickButton}
            disabled={
              Math.abs(Number(tokenA.value)) < 10 ** -tokenA.decimal &&
              Math.abs(Number(tokenB.value)) < 10 ** -tokenB.decimal
            }>
            Claim fee
          </Button>
        ) : null}
      </Grid>

      <Grid className={classes.tokenGrid} container direction='column'>
        {showLoader ? (
          <Grid container className={classes.cover}>
            <img src={loader} className={classes.loader} />
          </Grid>
        ) : null}
        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenA.icon} alt={tokenA.name} />
              <Typography className={classes.tokenName}>{tokenA.name}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenA.decimal))(`${tokenXPrintValue}`)}
              {showPrefix(tokenXPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {showBalance ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance: {tokenA.balance} {tokenA.name}
              </Typography>
              {typeof tokenA.usdValue !== 'undefined' ? (
                <Typography className={classes.tokenUSDValue}>
                  ~${formatNumbers(usdThresholds)(tokenA.liqValue.toString())}
                  {showPrefix(tokenA.usdValue)}
                </Typography>
              ) : null}
            </Grid>
          ) : null}
        </Grid>

        {typeof swapHandler !== 'undefined' ? (
          <img src={SwapPosition} className={classes.arrowsIcon} onClick={swapHandler} />
        ) : null}

        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenB.icon} alt={tokenB.name} />
              <Typography className={classes.tokenName}>{tokenB.name}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenB.decimal))(`${tokenYPrintValue}`)}
              {showPrefix(tokenYPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {showBalance ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance: {tokenB.balance} {tokenB.name}
              </Typography>
              {typeof tokenB.usdValue !== 'undefined' ? (
                <Typography className={classes.tokenUSDValue}>
                  ~${formatNumbers(usdThresholds)(tokenB.liqValue.toString())}
                  {showPrefix(tokenB.usdValue)}
                </Typography>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
