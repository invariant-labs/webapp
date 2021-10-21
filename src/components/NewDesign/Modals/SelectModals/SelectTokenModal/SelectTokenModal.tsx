import React from 'react'
import { Typography, Popover, Grid, CardMedia, Box } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import useStyles from '../style'
import { printBN, showPrefix } from '@consts/utils'
import { BN } from '@project-serum/anchor'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; balance?: BN; decimals?: number }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
}

export const SelectTokenModal: React.FC<ISelectTokenModal> = ({
  tokens,
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

  const formatNumbers = (value: string) => {
    const num = Number(value)

    if (num < 10) {
      return num.toFixed(6)
    }

    if (num < 1000) {
      return num.toFixed(4)
    }

    if (num < 10000) {
      return num.toFixed(2)
    }

    if (num < 1000000) {
      return (num / 1000).toFixed(2)
    }

    return (num / 1000000).toFixed(2)
  }

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
            {tokens.map((token, index) => (
              <Grid
                container
                key={`tokens-${token.symbol}`}
                className={classes.tokenItem}
                alignItems='center'
                wrap='nowrap'
                onClick={() => {
                  onSelect(index)
                  handleClose()
                }}>
                <Grid item>
                  <CardMedia
                    className={classes.tokenIcon}
                    image={icons[token.symbol] ?? icons.USDT}
                  />{' '}
                </Grid>
                <Grid item className={classes.tokenData}>
                  <Typography className={classes.tokenName}>{token.symbol}</Typography>
                  <Typography className={classes.tokenDescrpiption}>
                    {descrpitionForSymbol[token.symbol] ?? 'Asset'}
                  </Typography>
                </Grid>
                {typeof token.balance !== 'undefined' && typeof token.decimals !== 'undefined' ? (
                  <Grid item style={{ marginLeft: 'auto', marginRight: 5 }}>
                    <Typography className={classes.tokenBalance}>
                      Balance: {formatNumbers(printBN(token.balance, token.decimals))}
                      {showPrefix(+printBN(token.balance, token.decimals))}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            ))}
          </CustomScrollbar>
        </Box>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
