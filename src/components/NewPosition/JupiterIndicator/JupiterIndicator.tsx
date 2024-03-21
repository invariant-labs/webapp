import { useState } from 'react'
import jupiterColor from '@static/svg/jupiterColor.svg'
import jupiterWashed from '@static/svg/jupiterWashed.svg'
import closeIcon from '@static/svg/closeIcon.svg'
import useStyles from './style'
import { JupiterAggregatorObject, getJupiter } from '@consts/utils'
import { Popover, Typography, Box, IconButton } from '@material-ui/core'

export interface IJupiterIndicator {
  poolAddress: string
}

const JupiterIndicator: React.FC<IJupiterIndicator> = ({ poolAddress }) => {
  const classes = useStyles()
  const [isIndexed, setIsIndexed] = useState<boolean>(false)
  getJupiter(poolAddress).then((res: JupiterAggregatorObject | undefined) => {
    if (res) {
      setIsIndexed(true)
    } else setIsIndexed(false)
  })

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton className={classes.iconButton} onClick={handlePopoverOpen}>
        {isIndexed ? (
          <img className={classes.icon} src={jupiterColor} />
        ) : (
          <img className={classes.icon} src={jupiterWashed} />
        )}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        classes={{ paper: classes.popoverWrapper }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
        <Box className={classes.titleWrapper}>
          <Typography className={classes.popoverTitle}>Jupiter indexing</Typography>
          <IconButton className={classes.closeButton} onClick={handlePopoverClose}>
            <img src={closeIcon} />
          </IconButton>
        </Box>
        <Typography className={classes.statusText}>
          Status:{' '}
          <span className={isIndexed ? classes.green : classes.red}>
            {isIndexed ? 'Indexing active' : 'Indexing inactive'}
          </span>
        </Typography>
        <Typography variant={'p'} className={classes.bodyText}>
          An indexed pool enhances your position's accessibility across the Solana ecosystem,
          boosting profitability.{' '}
        </Typography>
        <Typography variant={'p'} className={classes.bodyText}>
          If a pool is not yet indexed, meeting three requirements will enable its indexing:
          <ul>
            <li>
              Ensure your token exists on-chain with metadata following the{' '}
              <a className={classes.link} href='https://developers.metaplex.com/'>
                Metaplex Token Metadata
              </a>
            </li>
            <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
            <li>
              Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
            </li>
          </ul>
        </Typography>
        <Typography variant={'p'} className={classes.bodyText}>
          Once these criteria are met, Jupiter automatically lists your token within minutes
          (usually up to ~30 min).
        </Typography>
      </Popover>
    </>
  )
}

export default JupiterIndicator
