import { Button, Grid, Popover, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

interface IJupiterIndexed {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
}

const JupiterIndexed: React.FC<IJupiterIndexed> = ({ open, handleClose, anchorEl }: any) => {
  const classes = useStyles()
  return (
    <Popover
      className={classes.root}
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
      <Grid container className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between'>
          <Typography variant='h2'>Jupiter indexing</Typography>
          <Button onClick={handleClose} className={classes.JupiterIndexedClose} />
        </Grid>
        <Typography className={classes.statusLabel}>
          Status: <span className={classes.greenText}>indexing active</span>
        </Typography>
        <Typography className={classes.text}>
          An indexed pool enhances your position's accessibility across the Solana ecosystem,
          boosting profitability.
        </Typography>
        <Typography className={classes.text}>
          If a pool is not yet indexed, meeting three requirements will enable its indexing:
          <ul className={classes.list}>
            <li>
              Ensure your token exists on-chain with metadata following the{' '}
              <a
                className={classes.link}
                href='https://docs.metaplex.com/programs/token-metadata/token-standard'>
                Metaplex Token Metadata
              </a>
            </li>
            <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
            <li>
              Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
            </li>
          </ul>
        </Typography>
        <Typography className={classes.text}>
          Once these criteria are met, Jupiter automatically lists your token within minutes
          (usually up to ~30 min).
        </Typography>
      </Grid>
    </Popover>
  )
}

export default JupiterIndexed
