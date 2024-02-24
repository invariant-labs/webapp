import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'

export interface IProps {
  open: boolean
  anchorEl: HTMLButtonElement | null
  isIndexActive: boolean
  handleClose: () => void
}
export const IndexPoolModal: React.FC<IProps> = ({
  open,
  handleClose,
  anchorEl,
  isIndexActive
}) => {
  console.log(isIndexActive)
  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}>
      <Grid container>
        <Typography color='primary'>
          {isIndexActive ? <span>Indexing active</span> : <span>Indexing inactive</span>}
        </Typography>
      </Grid>
    </Popover>
  )
}
