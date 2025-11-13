import React, { useMemo, useState, useRef, forwardRef, useEffect } from 'react'
import { areEqual, FixedSizeList as List, ListChildComponentProps } from 'react-window'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddTokenModal from '@components/Modals/AddTokenModal/AddTokenModal'
import useStyles from './style'
import { SwapToken } from '@store/selectors/solanaWallet'
import { theme } from '@static/theme'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from '@store/consts/static'
import CustomScrollbar from '../CustromScrollbar/CustomScrollbar'
import Scrollbars from 'rc-scrollbars'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  Popover,
  Typography,
  useMediaQuery
} from '@mui/material'
import { formatNumberWithSuffix, getTokenPrice, printBN } from '@utils/utils'
import { emptyIcon, newTabIcon, searchIcon, unknownTokenIcon, warningIcon } from '@static/icons'

export interface ISelectTokenModal {
  tokens: Record<string, SwapToken> | SwapToken[]
  commonTokens: PublicKey[]
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (address: PublicKey) => void
  hideBalances?: boolean
  handleAddToken: (address: string) => void
  initialHideUnknownTokensValue: boolean
  onHideUnknownTokensChange: (val: boolean) => void
  hiddenUnknownTokens: boolean
  network: NetworkType
}

interface IScroll {
  onScroll: (e: React.UIEvent<HTMLElement>) => void
  children: React.ReactNode
}
interface RowItemData {
  tokens: (SwapToken & { index: number; strAddress: string })[]
  onSelect: (address: PublicKey) => void
  hideBalances: boolean
  isXs: boolean
  networkUrl: string
  classes: ReturnType<typeof useStyles>['classes']
  prices: Record<string, number>
}

const Scroll = forwardRef<React.LegacyRef<Scrollbars>, IScroll>(({ onScroll, children }, ref) => {
  return (
    <CustomScrollbar ref={ref} style={{ overflow: 'hidden' }} onScroll={onScroll}>
      {children}
    </CustomScrollbar>
  )
})

const CustomScrollbarsVirtualList = React.forwardRef<React.LegacyRef<Scrollbars>, IScroll>(
  (props, ref) => <Scroll {...props} ref={ref} />
)

const RowItem: React.FC<ListChildComponentProps<RowItemData>> = React.memo(
  ({ index, style, data }) => {
    const { tokens, onSelect, hideBalances, isXs, networkUrl, classes, prices } = data
    const token = tokens[index]
    const tokenBalance = printBN(token.balance, token.decimals)
    const price = prices[token.assetAddress.toString()]
    const usdBalance = price ? Number(tokenBalance) * price : 0

    return (
      <Grid
        style={{ ...style, width: 'calc(100% - 50px)' }}
        className={classes.tokenItem}
        container
        onClick={() => {
          onSelect(token.assetAddress)
        }}>
        <Box className={classes.imageContainer}>
          <img
            className={classes.tokenIcon}
            src={token.logoURI ?? ''}
            loading='lazy'
            alt={token.name + 'logo'}
            onError={e => {
              e.currentTarget.onerror = null
              e.currentTarget.src = unknownTokenIcon
            }}
          />{' '}
          {token.isUnknown && <img className={classes.warningIcon} src={warningIcon} />}
        </Box>
        <Grid container className={classes.tokenContainer}>
          <Grid container className={classes.addressWrapper}>
            <Typography className={classes.tokenName}>
              {token.symbol ? token.symbol : 'Unknown'}{' '}
            </Typography>
            <Grid className={classes.tokenAddress} container direction='column'>
              <a
                href={`https://solscan.io/token/${token.assetAddress.toString()}${networkUrl}`}
                target='_blank'
                rel='noopener noreferrer'
                onClick={event => {
                  event.stopPropagation()
                }}>
                <Typography>
                  {token.assetAddress.toString().slice(0, isXs ? 3 : 4) +
                    '...' +
                    token.assetAddress.toString().slice(isXs ? -4 : -5, -1)}
                </Typography>
                <img width={8} height={8} src={newTabIcon} alt={'Token address'} />
              </a>
            </Grid>
          </Grid>

          <Typography className={classes.tokenDescrpiption}>
            {token.name ? token.name.slice(0, isXs ? 20 : 30) : 'Unknown'}
            {token.name.length > (isXs ? 20 : 30) ? '...' : ''}
          </Typography>
        </Grid>
        <Grid container className={classes.balanceWrapper}>
          {!hideBalances && Number(tokenBalance) > 0 ? (
            <>
              <Typography className={classes.tokenBalanceStatus} noWrap>
                {formatNumberWithSuffix(tokenBalance)}
              </Typography>
              <Typography className={classes.tokenBalanceUSDStatus}>
                ${usdBalance.toFixed(2)}
              </Typography>
            </>
          ) : null}
        </Grid>
      </Grid>
    )
  },
  areEqual
)

export const SelectTokenModal: React.FC<ISelectTokenModal> = ({
  tokens,
  commonTokens,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect,
  hideBalances = false,
  handleAddToken,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange,
  hiddenUnknownTokens,
  network
}) => {
  const { classes } = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [value, setValue] = useState<string>('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [hideUnknown, setHideUnknown] = useState(initialHideUnknownTokensValue)

  const outerRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHideUnknown(hiddenUnknownTokens)
  }, [hiddenUnknownTokens])

  const tokensArray = useMemo(() => Object.values(tokens), [tokens])

  type IndexedSwapToken = SwapToken & {
    index: number
    strAddress: string
  }

  const tokensWithIndexes = useMemo<IndexedSwapToken[]>(() => {
    return tokensArray.map((token, index) => ({
      ...token,
      index,
      strAddress: token.assetAddress.toString()
    }))
  }, [tokensArray])

  useEffect(() => {
    tokensWithIndexes.forEach(token => {
      const balanceStr = printBN(token.balance, token.decimals)
      const balance = Number(balanceStr)
      if (balance > 0) {
        const addr = token.assetAddress.toString()
        if (prices[addr] === undefined) {
          getTokenPrice(addr, token.coingeckoId).then(priceData => {
            setPrices(prev => ({ ...prev, [addr]: priceData.price || 0 }))
          })
        }
      }
    })
  }, [tokensWithIndexes, prices])

  const commonTokensList = useMemo(
    () =>
      tokensWithIndexes.filter(
        ({ assetAddress }) => commonTokens.findIndex(key => key.equals(assetAddress)) !== -1
      ),
    [tokensWithIndexes, commonTokens]
  )

  const filteredTokens = useMemo(() => {
    const list = tokensWithIndexes.filter(
      token =>
        token.symbol.toLowerCase().includes(value.toLowerCase()) ||
        token.name.toLowerCase().includes(value.toLowerCase()) ||
        token.strAddress.includes(value)
    )

    list.sort((a, b) => {
      const aNative = +printBN(a.balance, a.decimals)
      const bNative = +printBN(b.balance, b.decimals)

      if (aNative === 0 && bNative > 0) return 1
      if (aNative > 0 && bNative === 0) return -1

      if (aNative > 0 && bNative > 0) {
        const aPrice = prices[a.assetAddress.toString()] || 0
        const bPrice = prices[b.assetAddress.toString()] || 0
        const aUSD = aNative * aPrice
        const bUSD = bNative * bPrice

        if (aUSD !== bUSD) return bUSD - aUSD
        if (aNative !== bNative) return bNative - aNative
        return a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
      }

      return 1
    })

    return hideUnknown ? list.filter(token => !token.isUnknown) : list
  }, [value, tokensWithIndexes, hideUnknown, prices])

  const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    if (open) {
      timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [open])

  const networkUrl = useMemo(() => {
    switch (network) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return '?cluster=testnet'
    }
  }, [network])
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
            <Button className={classes.selectTokenClose} onClick={handleClose} aria-label='Close' />
          </Grid>
          <Grid className={classes.topRow} container>
            <Grid container className={classes.inputControl}>
              <input
                ref={inputRef}
                className={classes.selectTokenInput}
                placeholder='Search token name or address'
                onChange={searchToken}
                value={value}
              />
              <CardMedia image={searchIcon} className={classes.inputIcon} />
            </Grid>
            <TooltipHover title='Add token'>
              <AddCircleOutlineIcon
                className={classes.addIcon}
                onClick={() => setIsAddOpen(true)}
              />
            </TooltipHover>
          </Grid>
          <Grid container>
            <Grid className={classes.commonTokensList}>
              {commonTokensList.map(token => (
                <Box
                  className={classes.commonTokenItem}
                  key={token.symbol}
                  onClick={() => {
                    onSelect(token.assetAddress)
                    setValue('')
                    handleClose()
                  }}>
                  <img
                    className={classes.commonTokenIcon}
                    src={token.logoURI}
                    alt={token.name + 'logo'}
                  />
                  <Typography component='p'>{token.symbol}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hideUnknown}
                  onChange={e => {
                    setHideUnknown(e.target.checked)
                    onHideUnknownTokensChange(e.target.checked)
                  }}
                  name='hideUnknown'
                />
              }
              label='Hide unknown tokens'
            />
          </Grid>
          <Box className={classes.tokenList}>
            {!filteredTokens.length && (
              <Grid className={classes.noTokenFoundContainer}>
                <img className={classes.img} src={emptyIcon} alt='Not connected' />
                <Typography className={classes.noTokenFoundPlaceholder}>
                  No token found...
                </Typography>
                <Typography className={classes.noTokenFoundPlaceholder}>
                  Add your token by pressing the button!
                </Typography>
                <Button
                  className={classes.addTokenButton}
                  onClick={() => setIsAddOpen(true)}
                  variant='contained'>
                  Add a token
                </Button>
              </Grid>
            )}
            <List
              height={400}
              width={360}
              itemSize={66}
              itemCount={filteredTokens.length}
              outerElementType={CustomScrollbarsVirtualList}
              outerRef={outerRef}
              itemData={{
                tokens: filteredTokens,
                onSelect: (address: PublicKey) => {
                  onSelect(address)
                  setValue('')
                  handleClose()
                },
                hideBalances,
                isXs,
                networkUrl,
                classes,
                prices
              }}>
              {RowItem}
            </List>
          </Box>
        </Grid>
      </Popover>
      <AddTokenModal
        open={isAddOpen}
        handleClose={() => setIsAddOpen(false)}
        addToken={(address: string) => {
          handleAddToken(address)
          setIsAddOpen(false)
          setHideUnknown(false)
          onHideUnknownTokensChange(false)
        }}
      />
    </>
  )
}

export default SelectTokenModal
