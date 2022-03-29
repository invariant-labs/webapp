import React, { useState } from 'react'
import { Typography, Popover, Grid, Button, Input } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  addToken: (address: string) => void
}
export const AddTokenModal: React.FC<IProps> = ({ open, anchorEl, handleClose, addToken }) => {
  const classes = useStyles()

  const [address, setAddress] = useState('')

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
          <Button className={classes.add} onClick={() => addToken(address)} disableRipple>
            Add
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default AddTokenModal
