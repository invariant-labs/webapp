import React, { useState } from 'react'
import { Typography, Popover, Grid, Button, Input } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  open: boolean
  handleClose: () => void
  addToken: (address: string) => void
}
export const AddTokenModal: React.FC<IProps> = ({ open, handleClose, addToken }) => {
  const classes = useStyles()

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
      <Grid container className={classes.root} direction='column' justifyContent='space-between'>
        <Grid className={classes.upperRow} container direction='row' justifyContent='space-between'>
          <Typography>Enter the address of the token</Typography>
          <Button className={classes.close} onClick={handleClose}>
            {'\u2715'}
          </Button>
        </Grid>
        <Grid
          className={classes.lowerRow}
          container
          direction='row'
          justifyContent='space-between'
          wrap='nowrap'>
          <Input
            className={classes.input}
            placeholder='Token address'
            onChange={e => setAddress(e.target.value)}
            value={address}
            disableUnderline
          />
          <Button
            className={classes.add}
            onClick={() => addToken(address)}
            disableRipple
            disabled={address.length === 44}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default AddTokenModal
