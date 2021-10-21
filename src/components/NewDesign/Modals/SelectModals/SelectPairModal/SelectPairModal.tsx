import React from 'react'
import { Typography, Popover, Grid, CardMedia, Box } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyles from '../style'

export interface ISelectPairModal {
  pairs: Array<{ symbol1: string; symbol2: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
}

export const SelectPairModal: React.FC<ISelectPairModal> = ({
  pairs,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect
}) => {
  const classes = useStyles()

  const descrpitionForSymbol: { [key: string]: string } = {
    SOL: 'Solana',
    USDC: 'USD Coin',
    USDT: 'Tether'
  }

  const pairSymbol = (pair: { symbol1: string; symbol2: string }) =>
    `${pair.symbol1}/${pair.symbol2}`

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorReference={centered ? 'none' : 'anchorEl'}
      className={classes.popover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      {' '}
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        <Box className={classes.tokenList}>
          <CustomScrollbar>
            {pairs.map((pair, index) => (
              <Grid
                container
                key={index}
                className={classes.tokenItem}
                alignItems='center'
                wrap='nowrap'
                onClick={() => {
                  onSelect(index)
                  handleClose()
                }}>
                <Grid className={classes.dualIcon}>
                  <CardMedia
                    className={classes.tokenIcon}
                    image={icons[pair.symbol1] ?? icons.USDT}
                    style={{ marginRight: 0 }}
                  />
                  <CardMedia
                    className={classNames(classes.tokenIcon, classes.secondIcon)}
                    image={icons[pair.symbol2] ?? icons.USDT}
                  />{' '}
                </Grid>
                <Grid item className={classes.tokenData}>
                  <Typography className={classes.tokenName}>{pairSymbol(pair)}</Typography>
                  <Typography className={classes.tokenDescrpiption}>
                    {descrpitionForSymbol[pair.symbol1] ?? 'Asset'}/
                    {descrpitionForSymbol[pair.symbol2] ?? 'Asset'}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </CustomScrollbar>
        </Box>
      </Grid>
    </Popover>
  )
}
export default SelectPairModal
