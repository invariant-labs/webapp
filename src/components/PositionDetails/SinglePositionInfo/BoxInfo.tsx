import React from 'react'
import useStyles from './style'
import { Button, Grid, Typography } from '@material-ui/core'

export const BoxInfo: React.FC<{
  tokenXName: string
  tokenXIcon: string
  tokenYName: string
  tokenYIcon: string
  title: string
  onClickButton?: () => void
  tokenXValue: number
  tokenYValue: number
}> = ({
  tokenYName,
  tokenYIcon,
  tokenXName,
  tokenXIcon,
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
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={tokenXIcon} alt={tokenXName} />
            <Typography className={classes.tokenName}>{tokenXName}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>{tokenXValue}</Typography>
        </Grid>

        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={tokenYIcon} alt={tokenYName} />
            <Typography className={classes.tokenName}>{tokenYName}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>{tokenYValue}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
