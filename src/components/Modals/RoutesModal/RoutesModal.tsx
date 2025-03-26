import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './style'
import { Grid, Popover, Typography, useMediaQuery } from '@mui/material'
import classNames from 'classnames'
import { theme } from '@static/theme'

export interface IRoutesModal {
  routes: string[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  onSelect: (selected: string) => void
  current?: string
  onFaucet?: () => void
  onRPC?: () => void
  onChainSelect?: () => void
  onSocials?: () => void
  onPriority?: () => void
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  anchorEl,
  handleClose,
  onSelect,
  current,
  onFaucet,
  onRPC,
  onChainSelect,
  onSocials,
  onPriority
}) => {
  const { classes } = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    liquidity: [/^newPosition\/*/, /^position\/*/],
    exchange: [/^exchange\/*/]
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
      <Grid className={classes.root} container>
        {!isSmDown && (
          <>
            {' '}
            <Typography className={classes.subtitle}>Navigation</Typography>
            {routes.map(route => (
              <Grid
                item
                key={`routes-${route}`}
                className={classNames(
                  classes.listItem,
                  current === route ||
                    (typeof current !== 'undefined' &&
                      !!otherRoutesToHighlight[route] &&
                      otherRoutesToHighlight[route].some(pathRegex => pathRegex.test(current)))
                    ? classes.current
                    : null
                )}
                onClick={() => {
                  onSelect(route)
                  handleClose()
                }}>
                <Link to={`/${route}`} className={classes.link}>
                  <Typography className={classes.name}>{route}</Typography>
                </Link>
              </Grid>
            ))}
          </>
        )}
        {(typeof onFaucet !== 'undefined' ||
          typeof onRPC !== 'undefined' ||
          typeof onChainSelect !== 'undefined') && (
          <Typography className={classes.subtitle}>Wallet</Typography>
        )}
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
        {typeof onChainSelect !== 'undefined' ? (
          <Grid item className={classes.listItem} onClick={onChainSelect}>
            <Typography className={classes.name}>Change chain</Typography>
          </Grid>
        ) : null}
        {isSmDown && (
          <>
            <Typography className={classes.subtitle}>Website</Typography>
            <Grid item className={classes.listItem} onClick={onSocials}>
              <Typography className={classes.name}>View Socials</Typography>
            </Grid>
          </>
        )}
        {typeof onPriority !== 'undefined' ? (
          <Grid item className={classes.listItem} onClick={onPriority}>
            <Typography className={classes.name}>Set Fee</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Popover>
  )
}
export default RoutesModal
