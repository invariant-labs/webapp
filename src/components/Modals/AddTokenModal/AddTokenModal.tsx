import React, { useState } from 'react'
import useStyles from './style'
import { Button, Grid, Input, Popover, Typography } from '@mui/material'

export interface IProps {
  open: boolean
  handleClose: () => void
  addToken: (address: string) => void
}
export const AddTokenModal: React.FC<IProps> = ({ open, handleClose, addToken }) => {
  const { classes } = useStyles()

  const [address, setAddress] = useState('')

  return (
    <Popover
      classes={{ paper: classes.paper }}
      className={classes.popover}
      open={open}
      anchorReference='none'
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid container className={classes.root}>
        <Grid className={classes.upperRow} container>
          <Typography>Enter the address of the token</Typography>
          <Button className={classes.close} onClick={handleClose}>
            {'\u2715'}
          </Button>
        </Grid>
        <Grid container className={classes.inputWrapper}>
          <Input
            classes={{ input: classes.input }}
            placeholder='Token address'
            onChange={e => setAddress(e.target.value)}
            value={address}
            disableUnderline
          />
          <Button
            className={classes.add}
            onClick={() => {
              addToken(address)
              setAddress('')
            }}
            disableRipple
            disabled={address.length === 0}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default AddTokenModal
