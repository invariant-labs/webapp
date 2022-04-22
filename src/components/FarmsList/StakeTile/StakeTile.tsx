import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import useStyle from './styles'

export interface IStakedTile {
  tokenXSymbol: string
  tokenYSymbol: string
  minPrice: number
  maxPrice: number
  fee: number
  tokenXDeposit: number
  tokenYDeposit: number
  value: number
  onStake: () => void
}

export const StakeTile: React.FC<IStakedTile> = ({
  tokenXSymbol,
  tokenYSymbol,
  minPrice,
  maxPrice,
  fee,
  tokenXDeposit,
  tokenYDeposit,
  value,
  onStake
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root} container direction='column'>
      <Typography className={classes.header}>Stake</Typography>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container>
            <Typography className={classes.label}>Min price:</Typography>
            <Typography className={classes.value}>{minPrice} {tokenXSymbol}/{tokenYSymbol}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Max price:</Typography>
            <Typography className={classes.value}>{maxPrice} {tokenXSymbol}/{tokenYSymbol}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Fee:</Typography>
            <Typography className={classes.value}>{fee}%</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
          <Grid className={classes.row} container>
            <Typography className={classes.label}>{tokenXSymbol} deposit:</Typography>
            <Typography className={classes.value}>{tokenXDeposit}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>{tokenYSymbol} deposit:</Typography>
            <Typography className={classes.value}>{tokenYDeposit}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Value:</Typography>
            <Typography className={classes.value}>{value} {tokenXSymbol}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <OutlinedButton
        className={classes.buttonStake}
        name='Stake'
        onClick={onStake}
      />
    </Grid>
  )
}

export default StakeTile