import React from 'react'
import { Typography, Popover, Grid, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import useStyles from './style'

export enum IndexPoolState {
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive'
}

interface JupiterIndexingProps {
  open: boolean
  handleClose: () => void
  anchorElement: HTMLButtonElement | null
  indexPoolState: IndexPoolState
}

export const JupiterIndexing: React.FC<JupiterIndexingProps> = ({
  open,
  handleClose,
  anchorElement,
  indexPoolState
}) => {
  const classes = useStyles()

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      onClose={handleClose}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}>
      <Grid container className={classes.root}>
        <Grid container justifyContent='space-between'>
          <Typography component={'h2'} className={classes.title}>
            Jupiter indexing
          </Typography>
          <IconButton className={classes.closeBtn} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <Grid container direction='column'>
          <Typography
            component={'h4'}
            className={classNames(classes.text, classes.whiteText, classes.marginBottom)}>
            <span>Status:</span>{' '}
            <span
              className={
                indexPoolState === IndexPoolState.Active
                  ? classes.indexActive
                  : classes.indexInactive
              }>
              {indexPoolState === IndexPoolState.Active ? 'Indexing active' : 'Indexing inactive'}
            </span>
          </Typography>
          <Typography className={classNames(classes.text, classes.grayText, classes.marginBottom)}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </Typography>

          <Typography className={classNames(classes.text, classes.grayText)}>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
          </Typography>
          <ul className={classes.UlList}>
            <li>
              <Typography className={classes.text}>
                Ensure your token exists on-chain with metadata following the{' '}
                <a
                  href='https://docs.metaplex.com/programs/token-metadata/token-standard'
                  className={classes.linkText}
                  rel='noreferrer noopener'
                  target='_blank'>
                  Metaplex Token Metadata
                </a>
              </Typography>
            </li>
            <li>
              <Typography className={classes.text}>
                Maintain at least $250 liquidity on both buy and sell sides.
              </Typography>
            </li>
            <li>
              <Typography className={classes.text}>
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets.
              </Typography>
            </li>
          </ul>
          <Typography className={classNames(classes.text, classes.grayText)}>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
