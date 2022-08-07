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
  onRPC?: () => void
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  anchorEl,
  handleClose,
  onSelect,
  current,
  onFaucet,
  onRPC
}) => {
  const classes = useStyles()

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    pool: [/^newPosition$/, /^position\/*/],
    farms: [/^farms$/, /^farm\/*/]
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
            <Link to={`/${route}`} className={classes.link}>
              <Typography
                className={
                  current === route ||
                  (typeof current !== 'undefined' &&
                    !!otherRoutesToHighlight[route] &&
                    otherRoutesToHighlight[route].some(pathRegex => pathRegex.test(current)))
                    ? classes.current
                    : classes.name
                }>
                {route}
              </Typography>
            </Link>
          </Grid>
        ))}
        {typeof onFaucet !== 'undefined' ? (
          <Grid
            item
            className={classes.listItem}
            onClick={() => {
              onFaucet()
              handleClose()
            }}>
            <Typography className={classes.name}>Faucet</Typography>
          </Grid>
        ) : null}
        {typeof onRPC !== 'undefined' ? (
          <Grid item className={classes.listItem} onClick={onRPC}>
            <Typography className={classes.name}>Set RPC</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Popover>
  )
}
export default RoutesModal
