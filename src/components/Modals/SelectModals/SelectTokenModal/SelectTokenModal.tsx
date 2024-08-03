import React, { useMemo, useState, useRef, useCallback } from 'react'
import {
  Typography,
  Popover,
  Grid,
  CardMedia,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  useMediaQuery
} from '@material-ui/core'
import CustomScrollbar from '../CustomScrollbar'
import searchIcon from '@static/svg/lupa.svg'
import { FixedSizeList as List } from 'react-window'
import { formatNumbers, FormatNumberThreshold, printBN, showPrefix } from '@consts/utils'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AddTokenModal from '@components/Modals/AddTokenModal/AddTokenModal'
import useStyles from '../style'
import { SwapToken } from '@selectors/solanaWallet'
import { theme } from '@static/theme'
import { PublicKey } from '@solana/web3.js'

export interface ISelectTokenModal {
  tokens: Record<string, SwapToken>
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
  commonTokens,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect,
  hideBalances = false,
  handleAddToken,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange
}) => {
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [value, setValue] = useState<string>('')

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [hideUnknown, setHideUnknown] = useState(initialHideUnknownTokensValue)

  const outerRef = useRef<HTMLElement>(null)

  const commonTokensList = useMemo(() => {
    const commonTokensList: SwapToken[] = []

    commonTokens.forEach(assetAddress => {
      const token = tokens[assetAddress.toString()]

      if (token) {
        commonTokensList.push({ ...token, assetAddress })
      }
    })

    return commonTokensList
  }, [tokens, commonTokens])

  const filteredTokens = useMemo(() => {
    if (!open) {
      return []
    }

    const filteredTokens: SwapToken[] = []
    for (const [assetAddress, token] of Object.entries(tokens)) {
      if (
        token.symbol.toLowerCase().includes(value.toLowerCase()) ||
        token.name.toLowerCase().includes(value.toLowerCase()) ||
        assetAddress.includes(value)
      ) {
        if (hideUnknown && token.isUnknown) {
          continue
        }

        filteredTokens.push({ ...token, assetAddress: new PublicKey(assetAddress) })
      }
    }

    const sortedTokens = value
      ? filteredTokens.sort((a, b) => {
          const aBalance = +printBN(a.balance, a.decimals)
          const bBalance = +printBN(b.balance, b.decimals)
          if ((aBalance === 0 && bBalance === 0) || (aBalance > 0 && bBalance > 0)) {
            if (value.length) {
              if (
                a.symbol.toLowerCase().startsWith(value.toLowerCase()) &&
                !b.symbol.toLowerCase().startsWith(value.toLowerCase())
              ) {
                return -1
              }

              if (
                b.symbol.toLowerCase().startsWith(value.toLowerCase()) &&
                !a.symbol.toLowerCase().startsWith(value.toLowerCase())
              ) {
                return 1
              }
            }

            return a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
          }

          return aBalance === 0 ? 1 : -1
        })
      : filteredTokens

    return sortedTokens
  }, [value, tokens, hideUnknown, open])

  const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
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
                  <img className={classes.commonTokenIcon} src={token.logoURI} />
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
            <List
              height={352}
              width={360}
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
                    container
                    style={{
                      ...style,
                      width: '90%',
                      height: 40
                    }}
                    alignItems='center'
                    wrap='nowrap'
                    onClick={() => {
                      onSelect(token.assetAddress)
                      setValue('')
                      handleClose()
                    }}>
                    <img className={classes.tokenIcon} src={token.logoURI} loading='lazy' />{' '}
                    <Grid container className={classes.tokenContainer}>
                      <Typography className={classes.tokenName}>{token.symbol}</Typography>
                      <Typography className={classes.tokenDescrpiption}>
                        {token.name.slice(0, isXs ? 20 : 30)}
                        {token.name.length > (isXs ? 20 : 30) ? '...' : ''}
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
        handleClose={() => setIsAddOpen(false)}
        addToken={address => {
          handleAddToken(address)
          setIsAddOpen(false)
        }}
      />
    </>
  )
}
export default SelectTokenModal
