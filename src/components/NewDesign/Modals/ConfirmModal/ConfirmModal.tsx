import { Button, Grid, Modal, Typography } from '@material-ui/core'
import useStyles from './style'
import React from 'react'
interface IProp {
  title: string
  desc: string
  action1: string
  action2: string
  handleAction1: () => void
  handleAction2: () => void
  open: boolean
}

export const ConfirmModal: React.FC<IProp> = ({
  title,
  desc,
  action1,
  action2,
  handleAction1,
  handleAction2,
  open
}) => {
  const classes = useStyles()

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleAction1}
      disableAutoFocus
      disableEnforceFocus
      disablePortal>
      <Grid className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.desc}>{desc}</Typography>
        <Grid className={classes.buttons}>
          <Button className={classes.buttonCancel} variant='contained' onClick={handleAction1}>
            {action1}
          </Button>
          <Button className={classes.buttonClaim} variant='contained' onClick={handleAction2}>
            {action2}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}
