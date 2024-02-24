import React from 'react'
import { Typography, Popover, Grid, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

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
  const classes = useStyles()

  console.log(isIndexActive)
  return (
    <Popover
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}>
      <Grid container className={classes.root}>
        <Grid container justifyContent='space-between'>
          <Typography component={'h2'} className={classes.title}>
            Jupiter indexing
          </Typography>
          <Button className={classes.closeButton} onClick={handleClose} />
        </Grid>

        <Grid container direction='column'>
          <Typography
            component={'h3'}
            className={classNames(classes.text, classes.whiteText, classes.marginBottom)}>
            <span>Status:</span>{' '}
            {isIndexActive ? (
              <span className={classes.indexingActive}>Indexing active</span>
            ) : (
              <span className={classes.indexingInactive}>Indexing inactive</span>
            )}
          </Typography>
          <Typography className={classNames(classes.text, classes.garyText, classes.marginBottom)}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </Typography>

          <Typography className={classNames(classes.text, classes.garyText)}>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
          </Typography>
          <ul className={classes.list}>
            <li>
              <Typography className={classes.text}>
                Ensure your token exists on-chain with metadata following the{' '}
                <a
                  className={classes.linkText}
                  target='_blank'
                  href='https://docs.metaplex.com/programs/token-metadata/token-standard'>
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
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
              </Typography>
            </li>
          </ul>
          <Typography className={classNames(classes.text, classes.garyText)}>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
