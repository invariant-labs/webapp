import React, { useMemo, useState, useRef, useCallback } from 'react'
import { Typography, Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import searchIcon from '@static/svg/lupa.svg'
import { FixedSizeList as List } from 'react-window'
import useStyles from '../style'
import { formatNumbers, FormatNumberThreshold, printBN, showPrefix } from '@consts/utils'
import { BN } from '@project-serum/anchor'
// import icons from '@static/icons'

export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; name: string; logoURI: string; balance: BN; decimals: number }>
  // commonTokens: Array<{ symbol: string; name: string; logoURI: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (name: string) => void
  hideBalances?: boolean
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
  onSelect,
  hideBalances = false
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

  const thresholds = (decimals: number): FormatNumberThreshold[] => [
    {
      value: 10,
      decimals
    },
    {
      value: 100,
      decimals: 4
    },
    {
      value: 1000,
      decimals: 2
    },
    {
      value: 10000,
      decimals: 1
    },
    {
      value: 1000000,
      decimals: 2,
      divider: 1000
    },
    {
      value: 1000000000,
      decimals: 2,
      divider: 1000000
    },
    {
      value: Infinity,
      decimals: 2,
      divider: 1000000000
    }
  ]

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
      <Grid container className={classes.container}>
        <Grid className={classes.selectTokenHeader}>
          <Typography component='h1'>Select a token</Typography>
          <Button className={classes.selectTokenClose} onClick={handleClose}></Button>
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
        {/* TODO: create a common tokens list */}
        {/* <Grid container className={classes.commonTokens}>
          <Grid className={classes.commonTokensList}>
            {commonTokens.map(token => (
              <Box
                className={classes.commonTokenItem}
                key={token.symbol}
                // onClick={() => {
                //   onSelect(tokenIndex(token ? token.symbol : ''))
                //   handleClose()
                // }}
              >
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
            {({ index }) => {
              const token = filteredTokens[index]
              const tokenBalance = printBN(token.balance, token.decimals)

              return (
                <Grid
                  className={classes.tokenItem}
                  style={{ width: 'calc(100% - 8px)' }}
                  alignItems='center'
                  wrap='nowrap'
                  onClick={() => {
                    onSelect(token.symbol)
                    setValue('')
                    handleClose()
                  }}>
                  <CardMedia className={classes.tokenIcon} image={token.logoURI} />{' '}
                  <Grid container className={classes.tokenContainer}>
                    <Typography className={classes.tokenName}>{token.symbol}</Typography>
                    <Typography className={classes.tokenDescrpiption}>{token.name}</Typography>
                  </Grid>
                  {!hideBalances ? (
                    <Typography className={classes.tokenBalanceStatus}>
                      Balance: {formatNumbers(thresholds(token.decimals))(tokenBalance)}
                      {showPrefix(Number(tokenBalance))}
                    </Typography>
                  ) : null}
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
