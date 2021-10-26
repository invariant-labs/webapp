import React, { useState } from 'react'
import { Typography, Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import useStyles from '../style'
import searchIcon from '@static/svg/lupa.svg'
import { BN } from '@project-serum/anchor'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; balance?: BN; decimals?: number }>
  commonTokens: Array<{ symbol: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
}

export const SelectTokenModal: React.FC<ISelectTokenModal> = ({
  tokens,
  commonTokens,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect
}) => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('')

  const descrpitionForSymbol: { [key: string]: string } = {
    SOL: 'Solana',
    USDC: 'USD Coin',
    USDT: 'Tether',
    BTC: 'Bitcoin',
    USD: 'Dollar',
    FTT: 'FTX Token',
    ETH: 'Ethereum'

  }

  const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
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
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      {' '}
      <Grid container className={classes.container}>
        <Grid className={classes.selectTokenHeader}>
          <Typography component='h1'>Select a token</Typography>
          <Button className={classes.selectTokenClose}></Button>
        </Grid>
        <Grid container className={classes.inputControl}>
          <input className={classes.selectTokenInput} placeholder='Search token name or address' onChange={searchToken}/>
          <CardMedia image={searchIcon} className={classes.inputIcon} />
        </Grid>
        <Grid container className={classes.commonTokens}>
          <Typography component='h2' className={classes.commonTokensHeader}>Commonly used</Typography>
          <Grid className={classes.commonTokensList}>
            {commonTokens.map((token) => (
              <Box className={classes.commonTokenItem} key={token.symbol} >
                <CardMedia
                  className={classes.commonTokenIcon}
                  image={icons[token.symbol] ?? icons.USDT}
                />
                <Typography component='p'>{token.symbol}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box className={classes.tokenList}>
          <CustomScrollbar>
            {tokens.filter(token => {
              return token.symbol.toLowerCase().includes(value)
            }).map((token, index) => (
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
              </Grid>
            ))}
          </CustomScrollbar>
        </Box>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
