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
  onFaucet?: () => void
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  anchorEl,
  handleClose,
  onSelect,
  current,
  onFaucet
}) => {
  const classes = useStyles()

  const otherRoutesToHighlight: Record<string, string[]> = {
    pool: ['newPosition', 'position']
  }

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
            <Link
              to={`/${route}`}
              className={classes.link}>
              <Typography className={current === route || !!(current && otherRoutesToHighlight[route]?.includes(current)) ? classes.current : classes.name}>
                {route}
              </Typography>
            </Link>
          </Grid>
        ))}
        {onFaucet && (
          <Grid
            item
            className={classes.listItem}
            onClick={() => {
              onFaucet()
              handleClose()
            }}
          >
            <Typography className={classes.name}>
              Faucet
            </Typography>
          </Grid>
        )}
      </Grid>
    </Popover>
  )
}
export default RoutesModal
