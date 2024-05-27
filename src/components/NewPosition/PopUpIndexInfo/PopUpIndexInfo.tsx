import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IPopUpIndexInfo {
  onClose: () => void
  indexed?: boolean
}

export const PopUpIndexInfo: React.FC<IPopUpIndexInfo> = ({ onClose, indexed }) => {
  const classes = useStyles()

  return (
    <div className={classes.backdrop}>
      <Grid container className={classes.index} direction='column'>
        <button className={classes.closeButton} onClick={onClose}>
          x
        </button>
        <Typography>
          Jupiter indexing
          <br />
          <Typography className={classes.statusTitle}>
            {' '}
            Status:{' '}
            {/* 
   Rendering of the indexing status color font and text is conditionally determined 
   by the value of the 'indexed' prop. 
*/}
            {indexed ? (
              <span className={classes.active}>Indexing active</span>
            ) : (
              <span className={classes.inactive}>Indexing inactive</span>
            )}
          </Typography>
          <Typography className={classes.greyText}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
            <br />
            <br />
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
            <ul>
              <li>
                Ensure your token exists on-chain with metadata following the
                <a href='https://developers.metaplex.com/' target='blank'>
                  Metaplex Token Metadata
                </a>
              </li>
              <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
              <li>
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
              </li>
            </ul>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </Typography>
        </Typography>
      </Grid>
    </div>
  )
}

export default PopUpIndexInfo
