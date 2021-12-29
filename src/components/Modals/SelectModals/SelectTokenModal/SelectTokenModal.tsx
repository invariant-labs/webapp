/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import { Typography, Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import useStyles from '../style'
import searchIcon from '@static/svg/lupa.svg'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; name: string; logoURI: string }>
  // commonTokens: Array<{ symbol: string, name: string, logoURI: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (name: string) => void
}

export const SelectTokenModal: React.FC<ISelectTokenModal> = ({
  tokens,
  // commonTokens,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect
}) => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('')

  const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const tokenIndex = (name: string) => {
    return name
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
        <Button className={classes.selectTokenClose} onClick={handleClose}></Button>
        <Grid className={classes.selectTokenHeader}>
          <Typography component='h1'>Select a token</Typography>
        </Grid>
        <Grid container className={classes.inputControl}>
          <input
            className={classes.selectTokenInput}
            placeholder='Search token name or address'
            onChange={searchToken}
          />
          <CardMedia image={searchIcon} className={classes.inputIcon} />
        </Grid>
        {/* TODO: create a common tokens list */}
        {/* <Grid container className={classes.commonTokens}>
          <Typography component='h2' className={classes.commonTokensHeader}>Commonly used</Typography>
          <Grid className={classes.commonTokensList}>
            {commonTokens.map((token) => (
              <Box className={classes.commonTokenItem}
                key={token.symbol}
                onClick={() => {
                  onSelect(tokenIndex(token ? token.symbol : ''))
                  handleClose()
                }} >
                <CardMedia
                  className={classes.commonTokenIcon}
                  image={icons[token.symbol] ?? icons.USDT}
                />
                <Typography component='p'>{token.symbol}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid> */}
        <Box className={classes.tokenList}>
          <CustomScrollbar>
            {tokens
              ? tokens
                  .filter(token => {
                    return token ? token.symbol.toLowerCase().includes(value) : null
                  })
                  .map(token => (
                    <Grid
                      container
                      key={token ? `tokens-${token.symbol}` : ''}
                      className={classes.tokenItem}
                      alignItems='center'
                      wrap='nowrap'
                      onClick={() => {
                        onSelect(tokenIndex(token ? token.symbol : ''))
                        handleClose()
                      }}>
                      <Grid item>
                        <CardMedia
                          className={classes.tokenIcon}
                          image={token ? token.logoURI : ''}
                        />{' '}
                      </Grid>
                      <Grid item>
                        <Typography className={classes.tokenName}>
                          {token ? token.symbol : ''}
                        </Typography>
                        <Typography className={classes.tokenDescrpiption}>
                          {token ? token.name : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
              : null}
          </CustomScrollbar>
        </Box>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
