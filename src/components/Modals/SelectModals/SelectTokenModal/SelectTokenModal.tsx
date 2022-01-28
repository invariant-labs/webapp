import React, { useMemo, useState, useRef, useCallback } from 'react'
import { Typography, Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import searchIcon from '@static/svg/lupa.svg'
import { FixedSizeList as List } from 'react-window'
import useStyles from '../style'
import { BN } from '@project-serum/anchor'
import { printBN } from '@consts/utils'

export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; name: string; logoURI: string; balance: BN; decimals: number }>
  // commonTokens: Array<{ symbol: string, name: string, logoURI: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (name: string) => void
}

interface IScroll {
  onScroll: (e: React.UIEvent<HTMLElement>) => void
  forwardedRef:
    | ((instance: HTMLElement | null) => void)
    | React.MutableRefObject<HTMLElement | null>
    | null
}

const Scroll: React.FC<IScroll> = ({ onScroll, forwardedRef, children }) => {
  const refSetter = useCallback(
    scrollbarsRef => {
      if (forwardedRef === null || !(forwardedRef instanceof Function)) {
        return
      }

      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view)
      } else {
        forwardedRef(null)
      }
    },
    [forwardedRef]
  )

  return (
    <CustomScrollbar ref={refSetter} style={{ overflow: 'hidden' }} onScroll={onScroll}>
      {children}
    </CustomScrollbar>
  )
}

const CustomScrollbarsVirtualList = React.forwardRef<HTMLElement, IScroll>((props, ref) => (
  <Scroll {...props} forwardedRef={ref} />
))

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

  const outerRef = useRef<HTMLElement>(null)

  const filteredTokens = useMemo(
    () =>
      tokens.filter(token => {
        return (
          token.symbol.toLowerCase().includes(value) || token.name.toLowerCase().includes(value)
        )
      }),
    [value, tokens]
  )

  const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase())
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
          <Typography className={classes.selectTokenTitle}>Select a token</Typography>
        </Grid>
        <Grid container className={classes.inputControl}>
          <input
            className={classes.selectTokenInput}
            placeholder='Search token name or address'
            onChange={searchToken}
            value={value}
          />
          <CardMedia image={searchIcon} className={classes.inputIcon} />
        </Grid>
        {/* Testing elements for 'common tokens'styling */}
        <Grid container className={classes.commonTokens}>
          <Grid className={classes.commonTokensList}>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> xBTC </Typography>
            </Box>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> xSNY </Typography>
            </Box>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> SOL </Typography>
            </Box>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> xBTC </Typography>
            </Box>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> xSNY </Typography>
            </Box>
            <Box className={classes.commonTokenItem}>
                <CardMedia
                  className={classes.commonTokenIcon}/>
                <Typography component='p'> SOL </Typography>
            </Box>
           </Grid>
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
          <List
            height={352}
            width={371}
            itemSize={70}
            itemCount={filteredTokens.length}
            outerElementType={CustomScrollbarsVirtualList}
            outerRef={outerRef}>
            {({ index, style }) => {
              const token = filteredTokens[index]
              return (
                <Grid
                  container
                  className={classes.tokenItem}
                  style={{
                    ...style,
                    width: 'calc(100% - 16px)'
                  }}
                  alignItems='center'
                  wrap='nowrap'
                  onClick={() => {
                    onSelect(token.symbol)
                    setValue('')
                    handleClose()
                  }}>
                  <Grid item>
                    <CardMedia className={classes.tokenIcon} image={token.logoURI} />{' '}
                  </Grid>
                  <Grid item
                   style={{
                    marginRight: '20px',
                    width: '170px'
                    }}>
                    <Typography className={classes.tokenName}>{token.symbol}</Typography>
                    <Typography className={classes.tokenDescrpiption}>{token.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.tokenBalance}> Balance:{' '}
                      {token.balance !== null ? printBN(token.balance, token.decimals)
                      : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              )
            }}
          </List>
        </Box>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
