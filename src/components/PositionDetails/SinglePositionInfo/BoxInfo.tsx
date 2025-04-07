import { Grid, Typography, useMediaQuery } from '@mui/material'
import loader from '@static/gif/loading.gif'
import {
  formatNumberWithSuffix,
  formatNumberWithoutSuffix,
  formatNumbers,
  showPrefix,
  trimZeros
} from '@utils/utils'
import React from 'react'
import loadingAnimation from '@static/gif/loading.gif'
import { ILiquidityToken } from './consts'
import useStyles from './style'
import { FormatNumberThreshold, PrefixConfig } from '@store/consts/types'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import icons from '@static/icons'
import { theme } from '@static/theme'
import { Button } from '@common/Button/Button'

export interface BoxInfoToken extends Omit<ILiquidityToken, 'claimValue' | 'liqValue'> {
  value: number
  price?: number
}

export const BoxInfo: React.FC<{
  title: string
  onClickButton?: () => void
  tokenA: BoxInfoToken
  tokenB: BoxInfoToken
  showBalance?: boolean
  swapHandler?: () => void
  showLoader?: boolean
  isBalanceLoading: boolean
}> = ({
  title,
  onClickButton,
  tokenB,
  tokenA,
  showBalance = false,
  swapHandler,
  showLoader = false,
  isBalanceLoading
}) => {
  const { classes } = useStyles()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

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

  const prefixConfig: PrefixConfig = {
    B: 1000000000,
    M: 1000000
  }

  const tokenXPrintValue =
    Math.abs(Number(tokenA.value)) < 10 ** Number(-tokenA.decimal) ? 0 : Number(tokenA.value)

  const tokenYPrintValue =
    Math.abs(Number(tokenB.value)) < 10 ** Number(-tokenB.decimal) ? 0 : Number(tokenB.value)

  return (
    <Grid className={classes.boxInfo}>
      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}> {title}</Typography>
        {onClickButton ? (
          <Button
            scheme='pink'
            height={32}
            padding='0 24px'
            borderRadius={12}
            onClick={onClickButton}
            disabled={
              Math.abs(Number(tokenA.value)) < 10 ** Number(-tokenA.decimal) &&
              Math.abs(Number(tokenB.value)) < 10 ** Number(-tokenB.decimal)
            }>
            Claim fee
          </Button>
        ) : null}
      </Grid>

      <Grid className={classes.tokenGrid} container direction='column'>
        {showLoader ? (
          <Grid container className={classes.cover}>
            <img src={loader} className={classes.loader} alt='Loader' />
          </Grid>
        ) : null}
        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenA.icon} alt={tokenA.name} />
              <Typography className={classes.tokenName}>{tokenA.name}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {trimZeros(
                formatNumbers(thresholdsWithTokenDecimal(Number(tokenA.decimal)))(
                  `${tokenXPrintValue}`
                )
              )}
              {showPrefix(tokenXPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {showBalance ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance:{' '}
                {isBalanceLoading ? (
                  <img src={loadingAnimation} className={classes.loadingBalance} alt='Loading' />
                ) : (
                  formatNumberWithSuffix(tokenA.balance)
                )}{' '}
                {tokenA.name}
              </Typography>
              {typeof tokenA.usdValue !== 'undefined' && tokenA.price ? (
                <TooltipHover
                  title="Estimated USD Value of the Position's Tokens"
                  placement='bottom'
                  top={1}
                  left={isMd ? 'auto' : -90}>
                  <Typography className={classes.tokenUSDValue}>
                    ~${formatNumberWithoutSuffix(tokenA.value * tokenA.price)}
                  </Typography>
                </TooltipHover>
              ) : (
                <TooltipHover
                  title='Cannot fetch price of token'
                  placement='bottom'
                  top={1}
                  left={isMd ? 'auto' : -90}>
                  <Typography className={classes.noData}>
                    <span className={classes.noDataIcon}>?</span>No data
                  </Typography>
                </TooltipHover>
              )}
            </Grid>
          ) : null}
        </Grid>

        {typeof swapHandler !== 'undefined' ? (
          <TooltipHover title='Reverse tokens'>
            <img
              src={icons.swapPosition}
              className={classes.arrowsIcon}
              onClick={swapHandler}
              alt='Exchange'
            />
          </TooltipHover>
        ) : null}

        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenB.icon} alt={tokenB.name} />
              <Typography className={classes.tokenName}>{tokenB.name}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {trimZeros(
                formatNumbers(thresholdsWithTokenDecimal(Number(tokenB.decimal)))(
                  `${tokenYPrintValue}`
                )
              )}
              {showPrefix(tokenYPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {showBalance ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance:{' '}
                {isBalanceLoading ? (
                  <img src={loadingAnimation} className={classes.loadingBalance} alt='Loading' />
                ) : (
                  formatNumberWithSuffix(tokenB.balance)
                )}{' '}
                {tokenB.name}
              </Typography>
              {typeof tokenB.usdValue !== 'undefined' && tokenB.price ? (
                <TooltipHover
                  title="Estimated USD Value of the Position's Tokens"
                  placement='bottom'
                  top={1}
                  left={isMd ? 'auto' : -90}>
                  <Typography className={classes.tokenUSDValue}>
                    ~${formatNumberWithoutSuffix(tokenB.value * tokenB.price)}
                  </Typography>
                </TooltipHover>
              ) : (
                <TooltipHover
                  title='Cannot fetch price of token'
                  placement='bottom'
                  top={1}
                  left={isMd ? 'auto' : -90}>
                  <Typography className={classes.noData}>
                    <span className={classes.noDataIcon}>?</span>No data
                  </Typography>
                </TooltipHover>
              )}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
