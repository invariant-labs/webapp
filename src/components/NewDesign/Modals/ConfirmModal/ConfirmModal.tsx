import { Button, Grid, Modal, Typography } from '@material-ui/core'
import useStyles from './style'
import React from 'react'
interface IProp {
  title: string
  desc: string
}

export const ConfirmModal: React.FC<IProp> = ({ title, desc }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }
  const handleClaim = () => {
    console.log('claim')
    handleClose()
  }
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disablePortal>
      <Grid className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.desc}>{desc}</Typography>
        <Grid className={classes.buttons}>
          <Button className={classes.buttonCancel} variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.buttonClaim} variant='contained' onClick={handleClaim}>
            Claim
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}
