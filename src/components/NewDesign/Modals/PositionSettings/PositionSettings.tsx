import { Button, Grid, Input, Popover, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

export interface IPositionSettings {
  open: boolean
  anchorEl: Element | null
  handleClose: () => void
  slippageTolerance: number
  onChangeSlippageTolerance: (tolerance: number) => void
  autoSetSlippageTolerance: () => void
}

export const PositionSettings: React.FC<IPositionSettings> = ({
  open,
  anchorEl,
  handleClose,
  slippageTolerance,
  onChangeSlippageTolerance,
  autoSetSlippageTolerance
}) => {
  const classes = useStyles()

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Grid className={classes.root}>
        <Typography className={classes.header}>Liquidity Position Settings</Typography>

        <Typography className={classes.label}>Slippage tolerance</Typography>
        <Input
          type={'text'}
          disableUnderline={true}
          className={classes.valueInput}
          endAdornment={(
            <Button
              className={classes.autoButton}
              onClick={autoSetSlippageTolerance}
              disableRipple
            >
              Auto
            </Button>
          )}
        />
      </Grid>
    </Popover>
  )
}

export default PositionSettings
