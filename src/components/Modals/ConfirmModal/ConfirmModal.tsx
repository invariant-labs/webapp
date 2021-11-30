import { Button, Grid, Modal, Typography } from '@material-ui/core'
import useStyles from './style'
import React from 'react'
interface IProp {
  title: string
  desc: string
  confirm: string
  handleCancel: () => void
  handleConfirm: () => void
  open: boolean
}

export const ConfirmModal: React.FC<IProp> = ({
  title,
  desc,
  confirm,
  handleCancel,
  handleConfirm,
  open
}) => {
  const classes = useStyles()

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleCancel}
      disableAutoFocus
      disableEnforceFocus
      disablePortal>
      <Grid className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.desc}>{desc}</Typography>
        <Grid className={classes.buttons}>
          <Button className={classes.buttonCancel} variant='contained' onClick={handleCancel}>
            Cancel
          </Button>
          <Button className={classes.buttonClaim} variant='contained' onClick={handleConfirm}>
            {confirm}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}
