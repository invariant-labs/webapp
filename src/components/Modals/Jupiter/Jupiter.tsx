import React from 'react'
import { Button, Grid, Link, Popover, Typography } from '@material-ui/core'
import useStyles from './style'

function Jupiter({
  open,
  handleClose,
  anchorEl,
  active
}: {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  active: boolean
}) {
  const classes = useStyles()
  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      classes={{ root: classes.root }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
      <Grid container className={classes.wrapper}>
        <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
          <Typography component='h2'>Jupiter indexing</Typography>
          <Button className={classes.selectClose} onClick={handleClose} />
        </Grid>
        <Typography className={classes.status}>
          Status:{' '}
          {active ? (
            <span className={classes.active}>Indexing active</span>
          ) : (
            <span className={classes.inactive}>Indexing inactive</span>
          )}
        </Typography>
        <Typography className={classes.label}>
          An indexed pool enhances your position's accessibility across the Solana ecosystem,
          boosting profitability.
        </Typography>

        <Typography className={classes.label}>
          If a pool is not yet indexed, meeting three requirements will enable its indexing:
          <ul className={classes.list}>
            <li>
              Ensure your token exists on-chain with metadata following the{' '}
              <Link
                className={classes.link}
                href='https://docs.metaplex.com/programs/token-metadata/token-standard'>
                Metaplex Token Metadata
              </Link>
            </li>
            <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
            <li>
              Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
            </li>
          </ul>
        </Typography>
        <Typography className={classes.label}>
          Once these criteria are met, Jupiter automatically lists your token within minutes
          (usually up to ~30 min).
        </Typography>
      </Grid>
    </Popover>
  )
}

export default Jupiter
