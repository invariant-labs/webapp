import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyle from './styles'
import { formatNumbers, showPrefix } from '@consts/utils'
import { StakeStatus } from '@reducers/farms'
import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'

export interface IStakedTile {
  tokenXSymbol: string
  tokenYSymbol: string
  minPrice: number
  maxPrice: number
  fee: number
  tokenXDeposit: number
  tokenYDeposit: number
  value: number
  stakeStatus?: StakeStatus
  isActive?: boolean
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
  stakeStatus,
  isActive = true,
  onStake
}) => {
  const classes = useStyle()

  const [progress, setProgress] = useState<ProgressState>('none')

  useEffect(() => {
    if (typeof stakeStatus === 'undefined') {
      return
    }

    if (!stakeStatus.inProgress && progress === 'progress') {
      setProgress(stakeStatus.success ? 'approvedWithSuccess' : 'approvedWithFail')

      setTimeout(() => {
        setProgress(stakeStatus.success ? 'success' : 'failed')
      }, 1500)

      setTimeout(() => {
        setProgress('none')
      }, 3000)
    } else if (stakeStatus.inProgress && progress !== 'progress') {
      setProgress('progress')
    }
  }, [stakeStatus])

  return (
    <Grid className={classes.root} container direction='column'>
      <Typography className={classes.header}>Stake</Typography>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Min price:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(minPrice.toString())}
              {showPrefix(minPrice)} {tokenXSymbol}/{tokenYSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Max price:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(maxPrice.toString())}
              {showPrefix(maxPrice)} {tokenXSymbol}/{tokenYSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Fee tier:</Typography>
            <Typography className={classes.value}>{fee}%</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>{tokenXSymbol} deposit:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(tokenXDeposit.toString())}
              {showPrefix(tokenXDeposit)}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>{tokenYSymbol} deposit:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(tokenYDeposit.toString())}
              {showPrefix(tokenYDeposit)}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Value:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(value.toString())}
              {showPrefix(value)} {tokenXSymbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <AnimatedButton
        className={classes.buttonStake}
        disabled={!isActive}
        content={isActive ? 'Stake' : 'Farm inactive'}
        onClick={onStake}
        progress={progress}
      />
    </Grid>
  )
}

export default StakeTile
