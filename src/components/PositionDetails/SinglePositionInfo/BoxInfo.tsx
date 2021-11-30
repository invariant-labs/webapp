import React from 'react'
import useStyles from './style'
import { Button, Grid, Typography } from '@material-ui/core'

export const BoxInfo: React.FC<{
  nameToSwap: string
  iconToSwap: string
  nameFromSwap: string
  iconFromSwap: string
  title: string
  onClickClaimFee?: () => void
  valueTokenToSwap: number
  valueTokenFromSwap: number
}> = ({
  nameFromSwap,
  iconFromSwap,
  nameToSwap,
  iconToSwap,
  title,
  onClickClaimFee,
  valueTokenFromSwap,
  valueTokenToSwap
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.boxInfo}>
      <Grid container justifyContent='space-between'>
        <Typography className={classes.title}> {title}</Typography>
        {title === 'Unclaimed fees' ? (
          <Button className={classes.violetButton} variant='contained' onClick={onClickClaimFee}>
            Claim fee
          </Button>
        ) : null}
      </Grid>

      <Grid className={classes.tokenGrid}>
        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={iconToSwap} alt={nameToSwap} />
            <Typography className={classes.tokenName}>{nameToSwap}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>{valueTokenToSwap}</Typography>
        </Grid>

        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={iconFromSwap} alt={nameFromSwap} />
            <Typography className={classes.tokenName}>{nameFromSwap}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>{valueTokenFromSwap}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
