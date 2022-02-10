import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import { formatNumbers, FormatNumberThreshold, PrefixConfig, showPrefix } from '@consts/utils'

export const BoxInfo: React.FC<{
  tokenXName: string
  tokenXIcon: string
  tokenYName: string
  tokenYIcon: string
  tokenXDecimal: number
  tokenYDecimal: number
  tokenXBalance?: number
  tokenYBalance?: number
  tokenXUSDValue?: number
  tokenYUSDValue?: number
  title: string
  onClickButton?: () => void
  tokenXValue: number
  tokenYValue: number
}> = ({
  tokenYName,
  tokenYIcon,
  tokenXName,
  tokenXIcon,
  tokenXDecimal,
  tokenYDecimal,
  tokenXBalance,
  tokenXUSDValue,
  tokenYBalance,
  tokenYUSDValue,
  title,
  onClickButton,
  tokenYValue,
  tokenXValue
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

  const prefixConfig: PrefixConfig = {
    B: 1000000000,
    M: 1000000
  }

  const tokenXPrintValue =
    Math.abs(Number(tokenXValue)) < 10 ** -tokenXDecimal ? 0 : Number(tokenXValue)

  const tokenYPrintValue =
    Math.abs(Number(tokenYValue)) < 10 ** -tokenYDecimal ? 0 : Number(tokenYValue)

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
              Math.abs(Number(tokenXValue)) < 10 ** -tokenXDecimal &&
              Math.abs(Number(tokenYValue)) < 10 ** -tokenYDecimal
            }>
            Claim fee
          </Button>
        ) : null}
      </Grid>

      <Grid className={classes.tokenGrid} container direction='column'>
        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenXIcon} alt={tokenXName} />
              <Typography className={classes.tokenName}>{tokenXName}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenXDecimal))(`${tokenXPrintValue}`)}
              {showPrefix(tokenXPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {typeof tokenXBalance !== 'undefined' ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance: {tokenXBalance} {tokenXName}
              </Typography>
              {typeof tokenXUSDValue !== 'undefined' ? (
                <Typography className={classes.tokenUSDValue}>$ {tokenXUSDValue}</Typography>
              ) : null}
            </Grid>
          ) : null}
        </Grid>

        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenYIcon} alt={tokenYName} />
              <Typography className={classes.tokenName}>{tokenYName}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenYDecimal))(`${tokenYPrintValue}`)}
              {showPrefix(tokenYPrintValue, prefixConfig)}
            </Typography>
          </Grid>
          {typeof tokenYBalance !== 'undefined' ? (
            <Grid className={classes.tokenAreaLowerPart}>
              <Typography className={classes.tokenBalance}>
                Balance: {tokenYBalance} {tokenYName}
              </Typography>
              {typeof tokenYUSDValue !== 'undefined' ? (
                <Typography className={classes.tokenUSDValue}>$ {tokenYUSDValue}</Typography>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
