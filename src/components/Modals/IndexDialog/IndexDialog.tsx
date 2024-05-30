import React from 'react'
import { Typography, Box, Grid, Button, Popover, Input } from '@material-ui/core'
import useStyles from './style'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLElement | null
  headerText?: string
}

const IndexDialog: React.FC<Props> = ({
  open,
  handleClose,
  anchorEl,
  headerText
}) => {
  const classes = useStyles()
  

  

  return (
    <Popover
      open={open}
      onClose={(event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        handleClose();
      }}
      classes={{ root: classes.root }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
      <Grid container className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
          <Typography component='h2'>{headerText}</Typography>
          <Button className={classes.selectTokenClose} onClick={(event) => {
            event.preventDefault(); 
            event.stopPropagation(); 
            handleClose();
          }} />
        </Grid>
        <Typography className={classes.label}>Status: <span className={classes.labelGreen}>indexing status</span></Typography>
        <Box>
          {}
        </Box>
        <Typography className={classes.info}>
        An indexed pool enhances your position's accessibility across the Solana ecosystem, boosting profitability. 

        <br></br>
          If a pool is not yet indexed, meeting three requirements will enable its indexing:<ul >
          <li>Ensure your token exists on-chain with metadata following the <a href="https://developers.metaplex.com/" className={classes.dialogHref}>Metaplex Token Metadata</a></li>
          <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
          <li>Limit buy and sell price impact to 30% to prevent single-sided liquidity markets</li>
        </ul>
          Once these criteria are met, Jupiter automatically lists your token within minutes (usually up to ~30 min).
        </Typography>
      </Grid>
    </Popover>
  )
}
export default IndexDialog
