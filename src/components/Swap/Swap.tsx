import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import Slippage from '@components/Modals/Slippage/Slippage'
import {
  REFRESHER_INTERVAL,
  WRAPPED_SOL_ADDRESS,
  WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT
} from '@consts/static'
import { blurContent, unblurContent } from '@consts/uiUtils'
import {
  TokenPriceData,
  findPairs,
  handleSimulate,
  printBN,
  printBNtoBN,
  trimLeadingZeros
} from '@consts/utils'
import { Decimal, Tickmap } from '@invariant-labs/sdk/lib/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import { Tick } from '@invariant-labs/sdk/src/market'
import { Box, Button, CardMedia, Grid, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { PoolWithAddress } from '@reducers/pools'
import { Status } from '@reducers/solanaWallet'
import { Swap as SwapData } from '@reducers/swap'
import { PublicKey } from '@solana/web3.js'
import infoIcon from '@static/svg/info.svg'
import refreshIcon from '@static/svg/refresh.svg'
import settingIcon from '@static/svg/settings.svg'
import SwapArrows from '@static/svg/swap-arrows.svg'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import ExchangeRate from './ExchangeRate/ExchangeRate'
import TransactionDetailsBox from './TransactionDetailsBox/TransactionDetailsBox'
import useStyles from './style'
import Refresher from '@components/Refresher/Refresher'
import { SwapToken } from '@selectors/solanaWallet'

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
  isFetchingNewPool: boolean
  onRefresh: (tokenFrom: PublicKey | null, tokenTo: PublicKey | null) => void
  walletStatus: Status
  swapData: SwapData
  tokens: Record<string, SwapToken>
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
  onSetPair: (tokenFrom: PublicKey | null, tokenTo: PublicKey | null) => void
  progress: ProgressState
  poolTicks: { [x: string]: Tick[] }
  isWaitingForNewPool: boolean
  onConnectWallet: () => void
  onDisconnectWallet: () => void
  initialTokenFrom: PublicKey | null
  initialTokenTo: PublicKey | null
  handleAddToken: (address: string) => void
  commonTokens: PublicKey[]
  initialHideUnknownTokensValue: boolean
  onHideUnknownTokensChange: (val: boolean) => void
  tokenFromPriceData?: TokenPriceData
  tokenToPriceData?: TokenPriceData
  priceFromLoading?: boolean
  priceToLoading?: boolean
  onSlippageChange: (slippage: string) => void
  initialSlippage: string
  isBalanceLoading: boolean
  deleteTimeoutError: () => void
  isTimeoutError: boolean
}

export const Swap: React.FC<ISwap> = ({
  isFetchingNewPool,
  onRefresh,
  walletStatus,
  tokens,
  pools,
  tickmap,
  onSwap,
  onSetPair,
  progress,
  poolTicks,
  isWaitingForNewPool,
  onConnectWallet,
  onDisconnectWallet,
  initialTokenFrom,
  initialTokenTo,
  handleAddToken,
  commonTokens,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange,
  tokenFromPriceData,
  tokenToPriceData,
  priceFromLoading,
  priceToLoading,
  onSlippageChange,
  initialSlippage,
  isBalanceLoading,
  deleteTimeoutError,
  isTimeoutError
}) => {
  const classes = useStyles()
  enum inputTarget {
    FROM = 'from',
    TO = 'to'
  }
  const [tokenFrom, setTokenFrom] = React.useState<PublicKey | null>(null)
  const [tokenTo, setTokenTo] = React.useState<PublicKey | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [lockAnimation, setLockAnimation] = React.useState<boolean>(false)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [rotates, setRotates] = React.useState<number>(0)
  const [slippTolerance, setSlippTolerance] = React.useState<string>(initialSlippage)
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
    // minimumReceived: BN
    priceImpact: BN
    error: string[]
  }>({
    amountOut: new BN(0),
    poolIndex: 0,
    AmountOutWithFee: new BN(0),
    estimatedPriceAfterSwap: new BN(0),
    // minimumReceived: new BN(0),
    priceImpact: new BN(0),
    error: []
  })
  const [refresherTime, setRefresherTime] = React.useState<number>(REFRESHER_INTERVAL)

  const timeoutRef = useRef<number>(0)

  useEffect(() => {
    if (Object.keys(tokens).length && tokenFrom === null && tokenTo === null) {
      const firstCommonToken = commonTokens[0] || null

      setTokenFrom(initialTokenFrom !== null ? initialTokenFrom : firstCommonToken)
      setTokenTo(initialTokenTo)
    }
  }, [Object.keys(tokens).length])

  useEffect(() => {
    onSetPair(tokenFrom, tokenTo)
  }, [tokenFrom, tokenTo, pools.length])

  useEffect(() => {
    if (inputRef === inputTarget.FROM && !(amountFrom === '' && amountTo === '')) {
      simulateWithTimeout()
    }
  }, [
    amountFrom,
    tokenTo,
    tokenFrom,
    slippTolerance,
    Object.keys(poolTicks).length,
    Object.keys(tickmap).length
  ])

  useEffect(() => {
    if (inputRef === inputTarget.TO && !(amountFrom === '' && amountTo === '')) {
      simulateWithTimeout()
    }
  }, [
    amountTo,
    tokenTo,
    tokenFrom,
    slippTolerance,
    Object.keys(poolTicks).length,
    Object.keys(tickmap).length
  ])

  useEffect(() => {
    if (progress === 'none' && !(amountFrom === '' && amountTo === '')) {
      simulateWithTimeout()
    }
  }, [progress])

  const simulateWithTimeout = () => {
    setThrottle(true)

    clearTimeout(timeoutRef.current)
    const timeout = setTimeout(() => {
      setSimulateAmount().finally(() => {
        setThrottle(false)
      })
    }, 100)
    timeoutRef.current = timeout as unknown as number
  }

  useEffect(() => {
    if (tokenFrom !== null && tokenTo !== null) {
      if (inputRef === inputTarget.FROM) {
        const amount = getAmountOut(tokens[tokenTo.toString()])
        setAmountTo(+amount === 0 ? '' : trimLeadingZeros(amount))
      } else {
        const amount = getAmountOut(tokens[tokenFrom.toString()])
        setAmountFrom(+amount === 0 ? '' : trimLeadingZeros(amount))
      }
    }
  }, [simulateResult])

  useEffect(() => {
    updateEstimatedAmount()
  }, [tokenTo, tokenFrom, pools.length])

  useEffect(() => {
    const temp: string = amountFrom
    setAmountFrom(amountTo)
    setAmountTo(temp)
    setInputRef(inputRef === inputTarget.FROM ? inputTarget.TO : inputTarget.FROM)
  }, [swap])

  useEffect(() => {
    setRateReversed(false)
  }, [tokenFrom, tokenTo])

  const getAmountOut = (assetFor: SwapToken) => {
    const amountOut: number = Number(printBN(simulateResult.amountOut, assetFor.decimals))

    return amountOut.toFixed(assetFor.decimals)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refresherTime > 0) {
        setRefresherTime(refresherTime - 1)
      } else {
        void handleRefresh()
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [refresherTime])

  const setSimulateAmount = async () => {
    if (tokenFrom !== null && tokenTo !== null) {
      const pair = findPairs(tokenFrom, tokenTo, pools)[0]
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
            tokenFrom,
            tokenTo,
            printBNtoBN(amountFrom, tokens[tokenFrom.toString()].decimals),
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
            tokenFrom,
            tokenTo,
            printBNtoBN(amountTo, tokens[tokenTo.toString()].decimals),
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
    if (tokenFrom !== null && tokenTo !== null) {
      const amount = getAmountOut(tokens[tokenTo.toString()])
      setAmountTo(+amount === 0 ? '' : trimLeadingZeros(amount))
    }
  }

  const isError = (error: string) => {
    return simulateResult.error.some(err => err === error)
  }

  const getStateMessage = () => {
    if (
      (tokenFrom !== null && tokenTo !== null && throttle) ||
      isWaitingForNewPool ||
      isError("TypeError: Cannot read properties of undefined (reading 'bitmap')")
    ) {
      return 'Loading'
    }
    if (walletStatus !== Status.Initialized) {
      return 'Connect a wallet'
    }

    if (tokenFrom === null || tokenTo === null) {
      return 'Select a token'
    }

    if (tokenFrom.equals(tokenTo)) {
      return 'Select different tokens'
    }

    if (!getIsXToY(tokenFrom, tokenTo)) {
      return 'No route found'
    }

    if (
      isError('At the end of price range') ||
      isError('Price would cross swap limit') ||
      isError('Too large liquidity gap')
    ) {
      return 'Insufficient liquidity'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFrom.toString()].decimals).gt(
        printBNtoBN(
          printBN(tokens[tokenFrom.toString()].balance, tokens[tokenFrom.toString()].decimals),
          tokens[tokenFrom.toString()].decimals
        )
      )
    ) {
      return 'Insufficient balance'
    }

    if (
      (printBNtoBN(amountFrom, tokens[tokenFrom.toString()].decimals).eqn(0) ||
        isError('Amount out is zero')) &&
      !simulateResult.error.length
    ) {
      return 'Insufficient volume'
    }
    if (isError('Too large amount')) {
      return 'Exceed single swap limit (split transaction into several)'
    }

    return 'Swap tokens'
  }
  const hasShowRateMessage = () => {
    return (
      getStateMessage() === 'Insufficient balance' ||
      getStateMessage() === 'Swap tokens' ||
      getStateMessage() === 'Loading' ||
      getStateMessage() === 'Connect a wallet' ||
      getStateMessage() === 'Exceed single swap limit (split transaction into several)' ||
      getStateMessage() === 'Insufficient liquidity'
    )
  }
  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
    onSlippageChange(slippage)
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

  const handleOpenTransactionDetails = () => {
    setDetailsOpen(!detailsOpen)
  }

  useEffect(() => {
    let timerId: any

    if (lockAnimation) {
      timerId = setTimeout(() => setLockAnimation(false), 500)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [lockAnimation])

  const swapRate =
    tokenFrom === null || tokenTo === null || amountFrom === '' || amountTo === ''
      ? 0
      : +amountTo / +amountFrom

  const canShowDetails =
    tokenFrom !== null &&
    tokenTo !== null &&
    hasShowRateMessage() &&
    (getStateMessage() === 'Loading' ||
      (swapRate !== 0 && swapRate !== Infinity && !isNaN(swapRate))) &&
    amountFrom !== '' &&
    amountTo !== ''

  const [prevOpenState, setPrevOpenState] = useState(detailsOpen && canShowDetails)

  useEffect(() => {
    if (getStateMessage() !== 'Loading') {
      setPrevOpenState(detailsOpen && canShowDetails)
    }
  }, [detailsOpen, canShowDetails])

  const handleRefresh = async () => {
    onRefresh(tokenFrom, tokenTo)
    setRefresherTime(REFRESHER_INTERVAL)
  }

  useEffect(() => {
    if (isTimeoutError) {
      void handleRefresh()
      deleteTimeoutError()
    }
  }, [isTimeoutError])

  useEffect(() => {
    setRefresherTime(REFRESHER_INTERVAL)
  }, [tokenFrom, tokenTo])

  useEffect(() => {
    void setSimulateAmount()
  }, [isFetchingNewPool])

  return (
    <Grid container className={classes.swapWrapper} alignItems='center'>
      <Grid container className={classes.header}>
        <Typography component='h1'>Swap tokens</Typography>
        <Box className={classes.swapControls}>
          <Button
            onClick={handleRefresh}
            className={classes.refreshIconBtn}
            disabled={
              priceFromLoading ||
              priceToLoading ||
              isBalanceLoading ||
              getStateMessage() === 'Loading' ||
              walletStatus !== Status.Initialized
            }>
            <img src={refreshIcon} className={classes.refreshIcon} />
          </Button>
          <Button onClick={handleClickSettings} className={classes.settingsIconBtn}>
            <img src={settingIcon} className={classes.settingsIcon} />
          </Button>
        </Box>
        <Grid className={classes.slippage}>
          <Slippage
            open={settings}
            setSlippage={setSlippage}
            handleClose={handleCloseSettings}
            anchorEl={anchorEl}
            defaultSlippage={'1'}
            initialSlippage={initialSlippage}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box
          className={classNames(
            classes.exchangeRoot,
            lockAnimation ? classes.amountInputDown : undefined
          )}>
          <ExchangeAmountInput
            value={amountFrom}
            balance={
              tokenFrom !== null
                ? printBN(
                    tokens[tokenFrom.toString()].balance,
                    tokens[tokenFrom.toString()].decimals
                  )
                : '- -'
            }
            decimal={tokenFrom !== null ? tokens[tokenFrom.toString()].decimals : 6}
            className={classes.amountInput}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountFrom(value)
                setInputRef(inputTarget.FROM)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            onMaxClick={() => {
              if (tokenFrom !== null) {
                setInputRef(inputTarget.FROM)
                setAmountFrom(
                  printBN(
                    tokenFrom.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                      ? tokens[tokenFrom.toString()].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        ? tokens[tokenFrom.toString()].balance.sub(
                            WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT
                          )
                        : new BN(0)
                      : tokens[tokenFrom.toString()].balance,
                    tokens[tokenFrom.toString()].decimals
                  )
                )
              }
            }}
            tokens={tokens}
            current={tokenFrom !== null ? tokens[tokenFrom.toString()] : null}
            onSelect={setTokenFrom}
            disabled={tokenFrom === null}
            hideBalances={walletStatus !== Status.Initialized}
            handleAddToken={handleAddToken}
            commonTokens={commonTokens}
            limit={1e14}
            initialHideUnknownTokensValue={initialHideUnknownTokensValue}
            onHideUnknownTokensChange={onHideUnknownTokensChange}
            tokenPrice={tokenFromPriceData?.price}
            priceLoading={priceFromLoading}
            isBalanceLoading={isBalanceLoading}
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
              setTimeout(() => {
                const tmp = tokenFrom
                setTokenFrom(tokenTo)
                setTokenTo(tmp)
              }, 50)
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
            lockAnimation ? classes.amountInputUp : undefined
          )}>
          <ExchangeAmountInput
            value={amountTo}
            balance={
              tokenTo !== null
                ? printBN(tokens[tokenTo.toString()].balance, tokens[tokenTo.toString()].decimals)
                : '- -'
            }
            className={classes.amountInput}
            decimal={tokenTo !== null ? tokens[tokenTo.toString()].decimals : 6}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountTo(value)
                setInputRef(inputTarget.TO)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            onMaxClick={() => {
              if (tokenFrom !== null) {
                setInputRef(inputTarget.FROM)
                setAmountFrom(
                  printBN(
                    tokenFrom.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                      ? tokens[tokenFrom.toString()].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                        ? tokens[tokenFrom.toString()].balance.sub(
                            WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT
                          )
                        : new BN(0)
                      : tokens[tokenFrom.toString()].balance,
                    tokens[tokenFrom.toString()].decimals
                  )
                )
              }
            }}
            tokens={tokens}
            current={tokenTo !== null ? tokens[tokenTo.toString()] : null}
            onSelect={setTokenTo}
            disabled={tokenFrom === null}
            hideBalances={walletStatus !== Status.Initialized}
            handleAddToken={handleAddToken}
            commonTokens={commonTokens}
            limit={1e14}
            initialHideUnknownTokensValue={initialHideUnknownTokensValue}
            onHideUnknownTokensChange={onHideUnknownTokensChange}
            tokenPrice={tokenToPriceData?.price}
            priceLoading={priceToLoading}
            isBalanceLoading={isBalanceLoading}
          />
        </Box>
        <Box className={classes.transactionDetails}>
          <Grid className={classes.exchangeRateContainer}>
            <button
              onClick={
                tokenFrom !== null &&
                tokenTo !== null &&
                hasShowRateMessage() &&
                amountFrom !== '' &&
                amountTo !== ''
                  ? handleOpenTransactionDetails
                  : undefined
              }
              className={
                tokenFrom !== null &&
                tokenTo !== null &&
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
            {tokenFrom !== null && tokenTo !== null && (
              <Refresher
                currentIndex={refresherTime}
                maxIndex={REFRESHER_INTERVAL}
                onClick={handleRefresh}
              />
            )}
          </Grid>
          {canShowDetails ? (
            <ExchangeRate
              onClick={() => setRateReversed(!rateReversed)}
              tokenFromSymbol={
                tokens[rateReversed ? tokenTo.toString() : tokenFrom.toString()].symbol
              }
              tokenToSymbol={
                tokens[rateReversed ? tokenFrom.toString() : tokenTo.toString()].symbol
              }
              amount={rateReversed ? 1 / swapRate : swapRate}
              tokenToDecimals={
                tokens[rateReversed ? tokenFrom.toString() : tokenTo.toString()].decimals
              }
              loading={getStateMessage() === 'Loading'}
            />
          ) : null}
        </Box>
        <TransactionDetailsBox
          open={getStateMessage() !== 'Loading' ? detailsOpen && canShowDetails : prevOpenState}
          fee={{
            v: canShowDetails ? pools[simulateResult.poolIndex].fee.v : new BN(0)
          }}
          exchangeRate={{
            val: rateReversed ? 1 / swapRate : swapRate,
            symbol: canShowDetails
              ? tokens[rateReversed ? tokenFrom.toString() : tokenTo.toString()].symbol
              : '',
            decimal: canShowDetails
              ? tokens[rateReversed ? tokenFrom.toString() : tokenTo.toString()].decimals
              : 0
          }}
          // minimumReceived={{
          //   val: simulateResult.minimumReceived,
          //   symbol: canShowDetails ? tokens[tokenToIndex].symbol : '',
          //   decimal: canShowDetails ? tokens[tokenToIndex].decimals : 0
          // }}
          priceImpact={simulateResult.priceImpact}
          slippage={+slippTolerance}
          isLoadingRate={getStateMessage() === 'Loading'}
        />
        {walletStatus !== Status.Initialized && getStateMessage() !== 'Loading' ? (
          <ChangeWalletButton
            name='Connect wallet'
            onConnect={onConnectWallet}
            connected={false}
            onDisconnect={onDisconnectWallet}
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
              if (tokenFrom === null || tokenTo === null) return

              onSwap(
                { v: fromFee(new BN(Number(+slippTolerance * 1000))) },
                {
                  v: simulateResult.estimatedPriceAfterSwap
                },
                tokenFrom,
                tokenTo,
                simulateResult.poolIndex,
                printBNtoBN(amountFrom, tokens[tokenFrom.toString()].decimals),
                printBNtoBN(amountTo, tokens[tokenTo.toString()].decimals),
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
