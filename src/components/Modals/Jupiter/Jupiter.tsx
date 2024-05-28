import React from 'react'
import { Typography, Grid, Button, Popover } from '@material-ui/core'
import useStyles from './style'
import { colors } from '@static/theme'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  headerText: string
  status: boolean
}

const list = [
  {
    text: 'Ensure your token exists on-chain with metadata following the ',
    link: 'Metaplex Token Metadata',
    linkURL: 'https://developers.metaplex.com/'
  },
  { text: 'Maintain at least $250 liquidity on both buy and sell sides.' },
  { text: 'Limit buy and sell price impact to 30% to prevent single-sided liquidity markets.' }
]

const Jupiter: React.FC<Props> = ({ open, handleClose, headerText, status, anchorEl }) => {
  const classes = useStyles()
  return (
    <Popover
      open={open}
      onClose={handleClose}
      classes={{ root: classes.root }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}>
      <Grid container className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between' style={{ marginBottom: 24 }}>
          <Typography component='h2'>{headerText ?? 'Jupiter indexing'}</Typography>
          <Button className={classes.selectJupiterClose} onClick={handleClose} />
        </Grid>
        <Grid container className={classes.statusWrapper}>
          <Typography>Status:</Typography>
          <Typography style={{ color: status ? colors.invariant.green : colors.invariant.Error }}>
            {status ? 'Indexing activate' : 'Indexing disabled'}
          </Typography>
        </Grid>
        <Typography className={classes.text}>
          An indexed pool enhances your position's accessibility across the Solana ecosystem,
          boosting profitability.
          <br />
          <br />
          If a pool is not yet indexed, meeting three requirements will enable its indexing:
          <ul className={classes.list}>
            {list.map((element, index) => (
              <li key={index}>
                <Typography className={classes.text}>
                  {element.text}
                  {element.link && (
                    <a
                      className={classes.link}
                      href={element.linkURL}
                      target='_blank'
                      rel='noopener noreferrer'>
                      {element.link}
                    </a>
                  )}
                </Typography>
              </li>
            ))}
          </ul>
          <br />
          Once these criteria are met, Jupiter automatically lists your token within minutes
          (usually up to ~30 min).
        </Typography>
      </Grid>
    </Popover>
  )
}
export default Jupiter
