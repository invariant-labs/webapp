import React from 'react'
import { Popover, Grid, Typography, Button } from '@material-ui/core'
import useStyles from './style'

interface JupiterIndexingPopoverProps {
  open: boolean
  indexingActive: boolean
  onClose: () => void
}

const JupiterIndexingPopover: React.FC<JupiterIndexingPopoverProps> = ({
  open,
  indexingActive,
  onClose
}) => {
  const classes = useStyles()

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
      className={classes.popover}
      anchorReference={'none'}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid container className={classes.container}>
        <Grid className={classes.jupiterIndexingHeader}>
          <Typography component='h1'>Jupiter indexing</Typography>
          <Button className={classes.jupiterIndexingClose} onClick={onClose}></Button>
        </Grid>
        <Grid style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography className={classes.StatusText}>
            Status:{' '}
            {indexingActive ? (
              <span className={classes.indexingActiveText}>Indexing active</span>
            ) : (
              <span className={classes.indexingInactiveText}>Indexing inactive</span>
            )}
          </Typography>
          <Typography className={classes.StatusBackText} style={{ marginBottom: '10px' }}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </Typography>
          <Typography className={classes.StatusBackText}>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
          </Typography>
          <ul className={classes.jupiterIndexingUl}>
            <li>
              <Typography className={classes.StatusBackText}>
                Ensure your token exists on-chain with metadata following the{' '}
                <a
                  className={classes.jupiterIndexingLink}
                  href='https://docs.metaplex.com/programs/token-metadata/token-standard'>
                  Metaplex Token Metadata
                </a>
              </Typography>
            </li>
            <li>
              <Typography className={classes.StatusBackText}>
                Maintain at least $250 liquidity on both buy and sell sides.
              </Typography>
            </li>
            <li>
              <Typography className={classes.StatusBackText}>
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
              </Typography>
            </li>
          </ul>
          <Typography className={classes.StatusBackText}>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).{' '}
          </Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}

export default JupiterIndexingPopover
