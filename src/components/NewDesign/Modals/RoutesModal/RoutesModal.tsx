import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './style'

export interface IRoutesModal {
  routes: string[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  onSelect: (selected: string) => void
  current?: string
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  anchorEl,
  handleClose,
  onSelect,
  current
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
      }}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {routes.map(route => (
          <Grid
            item
            key={`routes-${route}`}
            className={classes.listItem}
            onClick={() => {
              onSelect(route)
              handleClose()
            }}>
            <Link to={`/${route}`} style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
              <Typography className={current === route ? classes.current : classes.name}>
                {route}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Popover>
  )
}
export default RoutesModal
