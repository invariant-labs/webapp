import React, { useEffect, useRef } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN, handleSimulate, findPairs } from '@consts/utils'
import { Decimal, Tickmap } from '@invariant-labs/sdk/lib/market'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Typography, Box, CardMedia, Button } from '@material-ui/core'
import Slippage from '@components/Swap/slippage/Slippage'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import TransactionDetails from '@components/Swap/transactionDetails/TransactionDetails'
import { WRAPPED_SOL_ADDRESS, WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT } from '@consts/static'
import { Swap as SwapData } from '@reducers/swap'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'
import infoIcon from '@static/svg/info.svg'
import settingIcon from '@static/svg/settings.svg'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import useStyles from './style'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PoolWithAddress } from '@reducers/pools'
import ExchangeRate from './ExchangeRate/ExchangeRate'
import classNames from 'classnames'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import { WalletType } from '@web3/wallet'

export interface SwapToken {
  balance: BN
  decimals: number
  symbol: string
  assetAddress: PublicKey
  name: string
  logoURI: string
  address: PublicKey
}

export interface Pools {
  tokenX: PublicKey
  tokenY: PublicKey
  tokenXReserve: PublicKey
  tokenYReserve: PublicKey
  tickSpacing: number
  sqrtPrice: {
    v: BN
    scale: number
  }
  fee: {
    val: BN
    scale: number
  }
  exchangeRate: {
    val: BN
    scale: number
  }
}

export interface ISwap {
  walletStatus: Status
  swapData: SwapData
  tokens: SwapToken[]
  pools: PoolWithAddress[]
  tickmap: { [x: string]: Tickmap }
  onSwap: (
    slippage: Decimal,
    knownPrice: Decimal,
    tokenFrom: PublicKey,
    tokenTo: PublicKey,
    poolIndex: number,
    amountIn: BN,
    amountOut: BN,
    byAmountIn: boolean
  ) => void
  onSetPair: (tokenFrom: PublicKey, tokenTo: PublicKey) => void
  progress: ProgressState
  poolTicks: { [x: string]: Tick[] }
  isWaitingForNewPool: boolean
  onWalletSelect: (wallet: WalletType) => void
  onDisconnectWallet: () => void
  initialTokenFromIndex: number | null
  initialTokenToIndex: number | null
}

export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  pools,
  tickmap,
  onSwap,
  onSetPair,
  progress,
  poolTicks,
  isWaitingForNewPool,
  onWalletSelect,
  onDisconnectWallet,
  initialTokenFromIndex,
  initialTokenToIndex
}) => {
  const classes = useStyles()
  enum inputTarget {
    FROM = 'from',
    TO = 'to'
  }
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(null)
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [lockAnimation, setLockAnimation] = React.useState<boolean>(false)
  const [anchorTransaction, setAnchorTransaction] = React.useState<HTMLButtonElement | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [rotates, setRotates] = React.useState<number>(0)
  const [slippTolerance, setSlippTolerance] = React.useState<string>('1')
  const [throttle, setThrottle] = React.useState<boolean>(false)
  const [settings, setSettings] = React.useState<boolean>(false)
  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(false)
  const [inputRef, setInputRef] = React.useState<string>(inputTarget.FROM)
  const [rateReversed, setRateReversed] = React.useState<boolean>(false)
  const [simulateResult, setSimulateResult] = React.useState<{
    amountOut: BN
    poolIndex: number
    AmountOutWithFee: BN
    estimatedPriceAfterSwap: BN
    error: string
  }>({
    amountOut: new BN(0),
    poolIndex: 0,
    AmountOutWithFee: new BN(0),
    estimatedPriceAfterSwap: new BN(0),
    error: ''
  })

  const timeoutRef = useRef<number>(0)

  useEffect(() => {
    if (!!tokens.length && tokenFromIndex === null && tokenToIndex === null) {
      setTokenFromIndex(
        initialTokenFromIndex !== null ? initialTokenFromIndex : tokens.length ? 0 : null
      )
      setTokenToIndex(initialTokenToIndex)
    }
  }, [tokens.length])

  useEffect(() => {
    if (tokenFromIndex !== null && tokenToIndex !== null && !!pools.length) {
      onSetPair(tokens[tokenFromIndex].address, tokens[tokenToIndex].address)
    }
  }, [tokenFromIndex, tokenToIndex, pools.length])

  useEffect(() => {
    if (inputRef === inputTarget.FROM && !(amountFrom === '' && amountTo === '')) {
      simulateWithTimeout()
    }
  }, [amountFrom, tokenToIndex, tokenFromIndex, slippTolerance, Object.keys(poolTicks).length])

  useEffect(() => {
    if (inputRef === inputTarget.TO && !(amountFrom === '' && amountTo === '')) {
      simulateWithTimeout()
    }
  }, [amountTo, tokenToIndex, tokenFromIndex, slippTolerance, Object.keys(poolTicks).length])

  const simulateWithTimeout = () => {
    inputRef === inputTarget.FROM ? setAmountTo('') : setAmountFrom('')
    setThrottle(true)

    clearTimeout(timeoutRef.current)
    const timeout = setTimeout(() => {
      setSimulateAmount().finally(() => {
        setThrottle(false)
      })
    }, 100)
    timeoutRef.current = timeout
  }

  useEffect(() => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      if (inputRef === inputTarget.FROM) {
        const amount = getAmountOut(tokens[tokenToIndex])
        setAmountTo(+amount === 0 ? '' : amount)
      } else {
        const amount = getAmountOut(tokens[tokenFromIndex])
        setAmountFrom(+amount === 0 ? '' : amount)
      }
    }
  }, [simulateResult])

  useEffect(() => {
    updateEstimatedAmount()
  }, [tokenToIndex, tokenFromIndex, pools.length])

  useEffect(() => {
    const temp: string = amountFrom
    setAmountFrom(amountTo)
    setAmountTo(temp)
    setInputRef(inputRef === inputTarget.FROM ? inputTarget.TO : inputTarget.FROM)
  }, [swap])

  useEffect(() => {
    setRateReversed(false)
  }, [tokenFromIndex, tokenToIndex])

  const getAmountOut = (assetFor: SwapToken) => {
    const amountOut: number = Number(printBN(simulateResult.amountOut, assetFor.decimals))

    return amountOut.toFixed(assetFor.decimals)
  }

  const setSimulateAmount = async () => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      const pair = findPairs(tokens[tokenFromIndex].address, tokens[tokenToIndex].address, pools)[0]
      if (typeof pair === 'undefined') {
        setAmountTo('')
        return
      }
      const indexPool = Object.keys(poolTicks).filter(key => {
        return key === pair.address.toString()
      })

      if (indexPool.length === 0) {
        setAmountTo('')
        return
      }
      if (inputRef === inputTarget.FROM) {
        setSimulateResult(
          await handleSimulate(
            pools,
            poolTicks,
            tickmap,
            {
              v: fromFee(new BN(Number(+slippTolerance * 1000)))
            },
            tokens[tokenFromIndex].address,
            tokens[tokenToIndex].address,
            printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals),
            true
          )
        )
      } else if (inputRef === inputTarget.TO) {
        setSimulateResult(
          await handleSimulate(
            pools,
            poolTicks,
            tickmap,
            {
              v: fromFee(new BN(Number(+slippTolerance * 1000)))
            },
            tokens[tokenFromIndex].address,
            tokens[tokenToIndex].address,
            printBNtoBN(amountTo, tokens[tokenToIndex].decimals),
            false
          )
        )
      }
    }
  }

  const getIsXToY = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = pools.find(
      pool =>
        (fromToken.equals(pool.tokenX) && toToken.equals(pool.tokenY)) ||
        (fromToken.equals(pool.tokenY) && toToken.equals(pool.tokenX))
    )
    return !!swapPool
  }

  const updateEstimatedAmount = () => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      const amount = getAmountOut(tokens[tokenToIndex])
      setAmountTo(+amount === 0 ? '' : amount)
    }
  }

  const getStateMessage = () => {
    if ((tokenFromIndex !== null && tokenToIndex !== null && throttle) || isWaitingForNewPool) {
      return 'Loading'
    }
    if (walletStatus !== Status.Initialized) {
      return 'Connect a wallet'
    }

    if (tokenFromIndex === null || tokenToIndex === null) {
      return 'Select a token'
    }
    if (!getIsXToY(tokens[tokenFromIndex].assetAddress, tokens[tokenToIndex].assetAddress)) {
      return 'No route found'
    }
    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals).gt(
        printBNtoBN(
          printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals),
          tokens[tokenFromIndex].decimals
        )
      )
    ) {
      return 'Insufficient balance'
    }

    if (printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals).eqn(0)) {
      return 'Insufficient volume'
    }
    if (simulateResult.error === 'Error: Too large amount') {
      return 'Exceed single swap limit (split transaction into several)'
    }
    if (
      simulateResult.error === 'Error: At the end of price range' ||
      simulateResult.error === 'Error: Price would cross swap limit'
    ) {
      return 'Insufficient liquidity'
    }
    return 'Swap tokens'
  }
  const hasShowRateMessage = () => {
    return (
      getStateMessage() === 'Insufficient balance' ||
      getStateMessage() === 'Swap tokens' ||
      getStateMessage() === 'Loading' ||
      getStateMessage() === 'Connect a wallet' ||
      getStateMessage() === 'Exceed single swap limit (split transaction into several)'
    )
  }
  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
  }

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setSettings(true)
  }

  const handleCloseSettings = () => {
    unblurContent()
    setSettings(false)
  }

  const handleOpenTransactionDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorTransaction(event.currentTarget)
    blurContent()
    setDetailsOpen(!detailsOpen)
  }

  const handleCloseTransactionDetails = () => {
    unblurContent()
    setDetailsOpen(!detailsOpen)
  }

  React.useEffect(() => {
    lockAnimation && setTimeout(() => setLockAnimation(false), 305)
  }, [lockAnimation])

  const swapRate =
    tokenFromIndex === null || tokenToIndex === null || amountFrom === '' || amountTo === ''
      ? 0
      : +amountTo / +amountFrom

  return (
    <Grid container className={classes.swapWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>Swap tokens</Typography>
        <Button onClick={handleClickSettings} className={classes.settingsIconBtn}>
          <img src={settingIcon} className={classes.settingsIcon} />
        </Button>
        <Grid className={classes.slippage}>
          <Slippage
            open={settings}
            setSlippage={setSlippage}
            handleClose={handleCloseSettings}
            anchorEl={anchorEl}
            defaultSlippage={'1'}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box
          className={classNames(
            classes.exchangeRoot,
            lockAnimation && `${classes.exchangeRoot} ${classes.amountInputDown} `
          )}>
          <ExchangeAmountInput
            value={amountFrom}
            balance={
              tokenFromIndex !== null
                ? printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
                : '- -'
            }
            key={swap?.toString()}
            decimal={tokenFromIndex !== null ? tokens[tokenFromIndex].decimals : 6}
            className={classes.amountInput}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountFrom(value)
                setInputRef(inputTarget.FROM)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            onMaxClick={() => {
              if (tokenFromIndex !== null) {
                setInputRef(inputTarget.FROM)
                setAmountFrom(
                  printBN(
                    tokens[tokenFromIndex].assetAddress.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                      ? tokens[tokenFromIndex].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        ? tokens[tokenFromIndex].balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        : new BN(0)
                      : tokens[tokenFromIndex].balance,
                    tokens[tokenFromIndex].decimals
                  )
                )
              }
            }}
            tokens={tokens}
            current={tokenFromIndex !== null ? tokens[tokenFromIndex] : null}
            onSelect={(name: string) => {
              const token = tokens.findIndex(token => name === token.symbol)
              setTokenFromIndex(token)
            }}
            disabled={tokenFromIndex === null}
            hideBalancesInModal={walletStatus !== Status.Initialized}
          />
        </Box>
        <Box className={classes.tokenComponentTextContainer}>
          <Box
            className={classes.swapArrowBox}
            onClick={() => {
              if (lockAnimation) return
              setLockAnimation(!lockAnimation)
              setRotates(rotates + 1)
              swap !== null ? setSwap(!swap) : setSwap(true)
              const tmp = tokenFromIndex
              setTokenFromIndex(tokenToIndex)
              setTokenToIndex(tmp)
            }}>
            <Box className={classes.swapImgRoot}>
              <img
                src={SwapArrows}
                style={{
                  transform: `rotate(${-rotates * 180}deg)`
                }}
                className={classes.swapArrows}
              />
            </Box>
          </Box>
        </Box>
        <Box
          className={classNames(
            classes.exchangeRoot,
            classes.transactionBottom,
            lockAnimation && `${classes.exchangeRoot} ${classes.amountInputUp} `
          )}>
          <ExchangeAmountInput
            value={amountTo}
            balance={
              tokenToIndex !== null
                ? printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimals)
                : '- -'
            }
            key={tokenToIndex?.toString()}
            className={classes.amountInput}
            decimal={tokenToIndex !== null ? tokens[tokenToIndex].decimals : 6}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountTo(value)
                setInputRef(inputTarget.TO)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            onMaxClick={() => {
              if (tokenFromIndex !== null) {
                setInputRef(inputTarget.FROM)
                setAmountFrom(
                  printBN(
                    tokens[tokenFromIndex].assetAddress.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                      ? tokens[tokenFromIndex].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        ? tokens[tokenFromIndex].balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        : new BN(0)
                      : tokens[tokenFromIndex].balance,
                    tokens[tokenFromIndex].decimals
                  )
                )
              }
            }}
            tokens={tokens}
            current={tokenToIndex !== null ? tokens[tokenToIndex] : null}
            onSelect={(name: string) => {
              const token = tokens.findIndex(token => name === token.symbol)
              setTokenToIndex(token)
            }}
            disabled={tokenFromIndex === null}
            hideBalancesInModal={walletStatus !== Status.Initialized}
          />
        </Box>
        <Box className={classes.transactionDetails}>
          <button
            onClick={
              tokenFromIndex !== null &&
              tokenToIndex !== null &&
              hasShowRateMessage() &&
              amountFrom !== '' &&
              amountTo !== ''
                ? handleOpenTransactionDetails
                : undefined
            }
            className={
              tokenFromIndex !== null &&
              tokenToIndex !== null &&
              hasShowRateMessage() &&
              amountFrom !== '' &&
              amountTo !== ''
                ? classes.HiddenTransactionButton
                : classes.transactionDetailDisabled
            }>
            <Grid className={classes.transactionDetailsWrapper}>
              <Typography className={classes.transactionDetailsHeader}>
                See transaction details
              </Typography>
              <CardMedia image={infoIcon} className={classes.infoIcon} />
            </Grid>
          </button>
          {tokenFromIndex !== null &&
          tokenToIndex !== null &&
          hasShowRateMessage() &&
          (getStateMessage() === 'Loading' ||
            (swapRate !== 0 && swapRate !== Infinity && !isNaN(swapRate))) &&
          amountFrom !== '' &&
          amountTo !== '' ? (
            <>
              <TransactionDetails
                open={detailsOpen}
                fee={{
                  v: pools[simulateResult.poolIndex].fee.v
                }}
                exchangeRate={{
                  val: swapRate,
                  symbol: tokens[tokenToIndex].symbol
                }}
                anchorTransaction={anchorTransaction}
                handleCloseTransactionDetails={handleCloseTransactionDetails}
                decimal={tokens[tokenToIndex].decimals}
              />
              <ExchangeRate
                onClick={() => setRateReversed(!rateReversed)}
                tokenFromSymbol={tokens[rateReversed ? tokenToIndex : tokenFromIndex].symbol}
                tokenToSymbol={tokens[rateReversed ? tokenFromIndex : tokenToIndex].symbol}
                amount={rateReversed ? 1 / swapRate : swapRate}
                tokenToDecimals={tokens[rateReversed ? tokenFromIndex : tokenToIndex].decimals}
                loading={getStateMessage() === 'Loading'}
              />
            </>
          ) : null}
        </Box>
        {walletStatus !== Status.Initialized && getStateMessage() !== 'Loading' ? (
          <ChangeWalletButton
            name='Connect wallet'
            options={[
              WalletType.PHANTOM,
              WalletType.SOLLET,
              WalletType.MATH,
              WalletType.SOLFLARE,
              WalletType.COIN98,
              WalletType.SLOPE,
              WalletType.CLOVER
            ]}
            onSelect={onWalletSelect}
            connected={false}
            onDisconnect={onDisconnectWallet}
            activeWallet={undefined}
            className={classes.connectWalletButton}
          />
        ) : (
          <AnimatedButton
            content={getStateMessage()}
            className={
              getStateMessage() === 'Connect a wallet'
                ? `${classes.swapButton} ${classes.buttonSelectDisabled}`
                : getStateMessage() === 'Swap tokens' && progress === 'none'
                ? `${classes.swapButton} ${classes.ButtonSwapActive}`
                : classes.swapButton
            }
            disabled={getStateMessage() !== 'Swap tokens' || progress !== 'none'}
            onClick={() => {
              if (tokenFromIndex === null || tokenToIndex === null) return

              onSwap(
                { v: fromFee(new BN(Number(+slippTolerance * 1000))) },
                {
                  v: simulateResult.estimatedPriceAfterSwap
                },
                tokens[tokenFromIndex].address,
                tokens[tokenToIndex].address,
                simulateResult.poolIndex,
                printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals),
                printBNtoBN(amountTo, tokens[tokenToIndex].decimals),
                inputRef === inputTarget.FROM
              )
            }}
            progress={progress}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Swap
