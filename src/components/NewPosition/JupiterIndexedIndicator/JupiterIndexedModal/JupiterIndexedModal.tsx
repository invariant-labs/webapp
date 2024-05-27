import React from 'react'
import { Popover, Typography } from '@material-ui/core'
import useStyles from '../.././style'

export interface IProps {
  open: boolean
  handleClose: () => void
  status: boolean
  hasError: boolean
}

export const JupiterIndexedModal: React.FC<IProps> = ({ open, handleClose, status, hasError }) => {
  const classes = useStyles()

  return (
    <Popover
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      classes={{ paper: classes.jupiterIndexedModal }}
      open={open}
      onClose={handleClose}>
      <Typography variant='inherit' className={classes.jupiterIndexedModalHeading} component='h1'>
        Jupiter indexing
      </Typography>

      <Typography variant='inherit'>
        Status:&nbsp;
        <Typography
          component='span'
          variant='inherit'
          className={
            status ? classes.jupiterIndexedModalStatusOn : classes.jupiterIndexedModalStatusOff
          }>
          {hasError ? 'Error fetching Jupiter API' : status ? 'Indexing active' : 'Not indexed yet'}
        </Typography>
      </Typography>

      <Typography className={classes.marginTop} variant='inherit' component='p'>
        An indexed pool enhances your position's accessibility across the Solana ecosystem, boosting
        profitability.
      </Typography>

      <Typography className={classes.marginTop} variant='inherit' component='p'>
        If a pool is not yet indexed, meeting three requirements will enable its indexing:
      </Typography>

      <ul className={classes.list}>
        <li>
          Ensure your token exists on-chain with metadata following the
          <a
            className={classes.link}
            href='https://docs.metaplex.com/programs/token-metadata/token-standard'
            target='_blank'
            rel='noopener noreferrer'>
            Metaplex Token Metadata
          </a>
        </li>
        <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
        <li>Limit buy and sell price impact to 30% to prevent single-sided liquidity markets</li>
      </ul>

      <Typography className={classes.marginTop} variant='inherit' component='p'>
        Once these criteria are met, Jupiter automatically lists your token within minutes (usually
        up to ~30 min).
      </Typography>
    </Popover>
  )
}
