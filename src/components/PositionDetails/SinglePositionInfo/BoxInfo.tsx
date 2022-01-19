import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles from './style'

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
  return (
    <Grid className={classes.boxInfo}>
      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}> {title}</Typography>
        {onClickButton ? (
          <Button className={classes.violetButton} variant='contained' onClick={onClickButton}>
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
                <AnimatedNumber value={tokenXValue} duration={300} formatValue={(value: string) => Number(value).toFixed(tokenXDecimal)} />
              </Typography>
            </Grid>
            {
              typeof tokenXBalance !== 'undefined'
                ? (
                  <Grid className={classes.tokenAreaLowerPart}>
                    <Typography className={classes.tokenBalance}>
                      Balance: {tokenXBalance} {tokenXName}
                    </Typography>
                    {
                      typeof tokenXUSDValue !== 'undefined'
                      ? (
                      <Typography className={classes.tokenUSDValue}>
                        ~ $ {tokenXUSDValue}
                      </Typography>
                      )
                      : null
                    }
                    </Grid>
                  )
                : null
            }
        </Grid>

        <Grid className={classes.tokenArea}>
          <Grid className={classes.tokenAreaUpperPart}>
            <Grid className={classes.token}>
              <img className={classes.iconSmall} src={tokenYIcon} alt={tokenYName} />
              <Typography className={classes.tokenName}>{tokenYName}</Typography>
            </Grid>
            <Typography className={classes.tokenValue}>
              <AnimatedNumber value={tokenYValue} duration={300} formatValue={(value: string) => Number(value).toFixed(tokenYDecimal)} />
            </Typography>
          </Grid>
          {
              typeof tokenYBalance !== 'undefined'
                ? (
                  <Grid className={classes.tokenAreaLowerPart}>
                    <Typography className={classes.tokenBalance}>
                      Balance: {tokenYBalance} {tokenYName}
                    </Typography>
                    {
                      typeof tokenYUSDValue !== 'undefined'
                      ? (
                      <Typography className={classes.tokenUSDValue}>
                        ~ $ {tokenYUSDValue}
                      </Typography>
                      )
                      : null
                    }
                  </Grid>
                  )
                : null
            }
        </Grid>
    </Grid>
  </Grid>
  )
}
