import React, { useMemo, useState, useRef, forwardRef, useEffect } from 'react'
import searchIcon from '@static/svg/lupa.svg'
import { FixedSizeList as List } from 'react-window'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddTokenModal from '@components/Modals/AddTokenModal/AddTokenModal'
import useStyles from '../style'
import { SwapToken } from '@store/selectors/solanaWallet'
import { theme } from '@static/theme'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from '@store/consts/static'
import CustomScrollbar from './CustomScrollbar'
import Scrollbars from 'rc-scrollbars'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import {
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  Popover,
  Typography,
  useMediaQuery
} from '@mui/material'
import { formatNumberWithSuffix, printBN } from '@utils/utils'
import { Box } from '@mui/system'
import icons from '@static/icons'

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
  hiddenUnknownTokens: boolean
  network: NetworkType
}

interface IScroll {
  onScroll: (e: React.UIEvent<HTMLElement>) => void
  children: React.ReactNode
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

  const [value, setValue] = useState<string>('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [hideUnknown, setHideUnknown] = useState(initialHideUnknownTokensValue)

  const outerRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHideUnknown(hiddenUnknownTokens)
  }, [hiddenUnknownTokens])

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
          <Grid
            className={classes.topRow}
            container
            direction='row'
            wrap='nowrap'
            alignItems='center'>
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
            <TooltipHover text='Add token'>
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
                <img className={classes.img} src={icons.empty} alt='Not connected' />
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
              outerRef={outerRef}>
              {({ index, style }: { index: number; style: React.CSSProperties }) => {
                const token = filteredTokens[index]
                const tokenBalance = printBN(token.balance, token.decimals)

                return (
                  <Grid
                    className={classes.tokenItem}
                    container
                    style={{
                      ...style,
                      width: 'calc(100% - 50px)'
                    }}
                    alignItems='center'
                    wrap='nowrap'
                    onClick={() => {
                      onSelect(token.assetAddress)
                      setValue('')
                      handleClose()
                    }}>
                    <Box className={classes.imageContainer}>
                      <img
                        className={classes.tokenIcon}
                        src={token?.logoURI ?? icons.unknownToken}
                        loading='lazy'
                        alt={token.name + 'logo'}
                        onError={e => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = icons.unknownToken
                        }}
                      />
                      {token.isUnknown && (
                        <img className={classes.warningIcon} src={icons.warningIcon} />
                      )}
                    </Box>
                    <Grid container className={classes.tokenContainer}>
                      <Grid
                        container
                        direction='row'
                        columnGap='6px'
                        alignItems='center'
                        wrap='nowrap'>
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
                              {token.assetAddress.toString().slice(0, 4) +
                                '...' +
                                token.assetAddress.toString().slice(-5, -1)}
                            </Typography>
                            <img width={8} height={8} src={icons.newTab} alt={'Token address'} />
                          </a>
                        </Grid>
                      </Grid>

                      <Typography className={classes.tokenDescrpiption}>
                        {token.name ? token.name.slice(0, isXs ? 20 : 30) : 'Unknown'}
                        {token.name.length > (isXs ? 20 : 30) ? '...' : ''}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      justifyContent='flex-end'
                      wrap='wrap'
                      className={classes.tokenBalanceStatus}>
                      {!hideBalances && Number(tokenBalance) > 0 ? (
                        <>
                          <Typography>Balance:</Typography>
                          <Typography>&nbsp; {formatNumberWithSuffix(tokenBalance)}</Typography>
                        </>
                      ) : null}
                    </Grid>
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
