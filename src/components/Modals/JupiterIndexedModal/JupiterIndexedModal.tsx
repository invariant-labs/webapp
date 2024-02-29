import React from 'react'
import { Box, Fade, IconButton, Link, List, ListItem, Modal, Typography } from '@material-ui/core'
import useStyles from './style'
import icons from '@static/icons'

export interface IJupiterIndexedModal {
  poolIndexed: boolean
  open: boolean
  handleClose: () => void
}

export const JupiterIndexedModal: React.FC<IJupiterIndexedModal> = ({
  poolIndexed,
  open,
  handleClose
}) => {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Fade in={open} timeout={500}>
        <Box className={classes.modalContent}>
          <Box className={classes.titleContent}>
            <Typography variant='inherit' component='h1'>
              Jupiter indexing
            </Typography>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <img src={icons.closeIcon} />
            </IconButton>
          </Box>
          <Typography variant='inherit'>
            Status:
            <Typography
              component='span'
              variant='inherit'
              className={poolIndexed ? classes.statusGreen : classes.statusRed}>
              {poolIndexed ? ' Indexing active' : ' Indexing disable'}
            </Typography>
          </Typography>
          <Typography variant='inherit' component='p'>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </Typography>
          <Typography variant='inherit' component='p'>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
          </Typography>
          <List>
            <ListItem>
              <Typography>
                Ensure your token exists on-chain with metadata following the{' '}
                <Link href='https://developers.metaplex.com/'>Metaplex Token Metadata</Link>
              </Typography>
            </ListItem>
            <ListItem>Maintain at least $250 liquidity on both buy and sell sides.</ListItem>
            <ListItem>
              Limit buy and sell price impact to 30% to prevent single-sided liquidity markets.
            </ListItem>
          </List>
          <Typography variant='inherit' component='p'>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}
