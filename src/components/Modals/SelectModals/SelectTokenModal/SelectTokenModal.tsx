import React, { useMemo, useState, useRef, useCallback } from 'react'
import { Typography, Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import searchIcon from '@static/svg/lupa.svg'
import { FixedSizeList as List } from 'react-window'
import { formatNumbers, FormatNumberThreshold, printBN, showPrefix } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import useStyles from '../style'
import AddTokenModal from '@components/Modals/AddTokenModal/AddTokenModal'
// import icons from '@static/icons'

export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; name: string; logoURI: string; balance: BN; decimals: number }>
  // commonTokens: Array<{ symbol: string; name: string; logoURI: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
  hideBalances?: boolean
  handleAddToken: (address: string) => void
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
  hideBalances = false,
  handleAddToken
}) => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('')

  const [isAddOpen, setIsAddOpen] = useState(false)

  const outerRef = useRef<HTMLElement>(null)

  const tokensWithIndexes = tokens.map((token, index) => ({
    ...token,
    index
  }))

  const filteredTokens = useMemo(
    () =>
      tokensWithIndexes
        .filter(token => {
          return (
            token.symbol.toLowerCase().includes(value) || token.name.toLowerCase().includes(value)
          )
        })
        .sort((a, b) => {
          const aBalance = +printBN(a.balance, a.decimals)
          const bBalance = +printBN(b.balance, b.decimals)
          if ((aBalance === 0 && bBalance === 0) || (aBalance > 0 && bBalance > 0)) {
            return a.symbol.localeCompare(b.symbol)
          }

          return aBalance === 0 ? 1 : -1
        }),
    [value, tokensWithIndexes]
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
    <>
      <Popover
        classes={{ paper: classes.paper }}
        open={open && !isAddOpen}
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
          <Grid
            className={classes.topRow}
            container
            direction='row'
            wrap='nowrap'
            alignItems='center'>
            <Grid container className={classes.inputControl}>
              <input
                className={classes.selectTokenInput}
                placeholder='Search token name or address'
                onChange={searchToken}
                value={value}
              />
              <CardMedia image={searchIcon} className={classes.inputIcon} />
            </Grid>
            <AddCircleOutlineIcon className={classes.addIcon} onClick={() => setIsAddOpen(true)} />
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
              itemSize={66}
              itemCount={filteredTokens.length}
              outerElementType={CustomScrollbarsVirtualList}
              outerRef={outerRef}>
              {({ index, style }) => {
                const token = filteredTokens[index]
                const tokenBalance = printBN(token.balance, token.decimals)

                return (
                  <Grid
                    className={classes.tokenItem}
                    style={{
                      ...style,
                      width: 370,
                      height: 40
                    }}
                    alignItems='center'
                    wrap='nowrap'
                    onClick={() => {
                      onSelect(token.index)
                      setValue('')
                      handleClose()
                    }}>
                    <CardMedia className={classes.tokenIcon} image={token.logoURI} />{' '}
                    <Grid container className={classes.tokenContainer}>
                      <Typography className={classes.tokenName}>{token.symbol}</Typography>
                      <Typography className={classes.tokenDescrpiption}>
                        {token.name.slice(0, 30)}
                        {token.name.length > 30 ? '...' : ''}
                      </Typography>
                    </Grid>
                    {!hideBalances && Number(tokenBalance) > 0 ? (
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
      <AddTokenModal
        open={isAddOpen}
        anchorEl={anchorEl}
        handleClose={() => setIsAddOpen(false)}
        addToken={handleAddToken}
      />
    </>
  )
}
export default SelectTokenModal
