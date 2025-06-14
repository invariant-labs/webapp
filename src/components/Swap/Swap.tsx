import AnimatedButton, { ProgressState } from '@common/AnimatedButton/AnimatedButton'
import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import Slippage from '@components/Modals/Slippage/Slippage'
import Refresher from '@common/Refresher/Refresher'
import { BN } from '@project-serum/anchor'
import { Box, Button, Grid, Typography } from '@mui/material'
import {
  DEFAULT_TOKEN_DECIMAL,
  NetworkType,
  REFRESHER_INTERVAL,
  WRAPPED_SOL_ADDRESS,
  WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_MAIN,
  WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_DEV
} from '@store/consts/static'
import {
  addressToTicker,
  convertBalanceToBN,
  findPairs,
  handleSimulate,
  initialXtoY,
  printBN,
  ROUTES,
  trimLeadingZeros
} from '@utils/utils'
import { Swap as SwapData } from '@store/reducers/swap'
import { Status } from '@store/reducers/solanaWallet'
import { SwapToken } from '@store/selectors/solanaWallet'
import { blurContent, createButtonActions, unblurContent } from '@utils/uiUtils'
import React, { useEffect, useMemo, useRef } from 'react'
import ExchangeRate from './ExchangeRate/ExchangeRate'
import TransactionDetailsBox from './TransactionDetailsBox/TransactionDetailsBox'
import useStyles from './style'
import { TokenPriceData } from '@store/consts/types'
import TokensInfo from './TokensInfo/TokensInfo'
import { VariantType } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { PoolWithAddress } from '@store/reducers/pools'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Tick, Tickmap } from '@invariant-labs/sdk/lib/market'
import { DECIMAL, fromFee, SimulationStatus } from '@invariant-labs/sdk/lib/utils'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { auditIcon, refreshIcon, settingIcon, swapArrowsIcon } from '@static/icons'
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
  copyTokenAddressHandler: (message: string, variant: VariantType) => void
  network: NetworkType
  solBalance: BN
  // unwrapWETH: () => void
  // wrappedETHAccountExist: boolean
  isTimeoutError: boolean
  deleteTimeoutError: () => void
  canNavigate: boolean
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
  copyTokenAddressHandler,
  network,
  solBalance,
  // unwrapWETH,
  // wrappedETHAccountExist,
  isTimeoutError,
  deleteTimeoutError,
  canNavigate
}) => {
  const { classes, cx } = useStyles()
  enum inputTarget {
    DEFAULT = 'default',
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
  const [inputRef, setInputRef] = React.useState<string>(inputTarget.DEFAULT)
  const [rateReversed, setRateReversed] = React.useState<boolean>(
    tokenFrom && tokenTo ? !initialXtoY(tokenFrom.toString(), tokenTo.toString()) : false
  )
  const [rateLoading, setRateLoading] = React.useState<boolean>(false)
  const [refresherTime, setRefresherTime] = React.useState<number>(REFRESHER_INTERVAL)
  const [hideUnknownTokens, setHideUnknownTokens] = React.useState<boolean>(
    initialHideUnknownTokensValue
  )
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

  const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT = useMemo(() => {
    if (network === NetworkType.Devnet) {
      return WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_DEV
    } else {
      return WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_MAIN
    }
  }, [network])

  const timeoutRef = useRef<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    if (isTimeoutError) {
      onRefresh(tokenFrom, tokenTo)
      deleteTimeoutError()
    }
  }, [isTimeoutError])

  useEffect(() => {
    if (canNavigate) {
      navigate(
        ROUTES.getExchangeRoute(
          tokenFrom !== null ? addressToTicker(network, tokenFrom.toString()) : '-',
          tokenTo !== null ? addressToTicker(network, tokenTo.toString()) : '-'
        ),
        {
          replace: true
        }
      )
    }
  }, [tokenTo, tokenFrom])

  useEffect(() => {
    if (!!Object.keys(tokens).length && tokenFrom === null && tokenTo === null && canNavigate) {
      setTokenFrom(initialTokenFrom)
      setTokenTo(initialTokenTo)
    }
  }, [tokens.length, canNavigate, initialTokenFrom, initialTokenTo])

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
    }, 500)
    timeoutRef.current = timeout as unknown as number
  }

  useEffect(() => {
    if (tokenFrom !== null && tokenTo !== null) {
      if (inputRef === inputTarget.FROM) {
        const amount = getAmountOut(tokens[tokenTo.toString()])
        setAmountTo(+amount === 0 ? '' : trimLeadingZeros(amount))
      } else if (tokenFrom !== null) {
        const amount = getAmountOut(tokens[tokenFrom.toString()])
        setAmountFrom(+amount === 0 ? '' : trimLeadingZeros(amount))
      } else if (!tokens[tokenTo.toString()]) {
        setAmountTo('')
      } else {
        setAmountFrom('')
      }
    }
  }, [simulateResult])

  useEffect(() => {
    updateEstimatedAmount()
  }, [tokenTo, tokenFrom, pools.length])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (refresherTime > 0 && tokenFrom !== null && tokenTo !== null) {
        setRefresherTime(refresherTime - 1)
      } else {
        handleRefresh()
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [refresherTime, tokenFrom, tokenTo])

  useEffect(() => {
    if (inputRef !== inputTarget.DEFAULT) {
      const temp: string = amountFrom
      setAmountFrom(amountTo)
      setAmountTo(temp)
      setInputRef(inputRef === inputTarget.FROM ? inputTarget.TO : inputTarget.FROM)
    }
  }, [swap])

  useEffect(() => {
    if (tokenFrom !== null && tokenTo !== null) {
      setRateReversed(!initialXtoY(tokenFrom.toString(), tokenTo.toString()))
      setRateLoading(false)
    }
  }, [tokenFrom, tokenTo])

  const getAmountOut = (assetFor: SwapToken) => {
    const amountOut: number = Number(printBN(simulateResult.amountOut, assetFor.decimals))

    return amountOut.toFixed(assetFor.decimals)
  }

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
            convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals),
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
            convertBalanceToBN(amountTo, tokens[tokenTo.toString()].decimals),
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

  const isEveryPoolEmpty = useMemo(() => {
    if (tokenFrom !== null && tokenTo !== null) {
      const pairs = findPairs(tokenFrom, tokenTo, pools)

      let poolEmptyCount = 0
      for (const pair of pairs) {
        if (
          poolTicks[pair.address.toString()] === undefined ||
          (poolTicks[pair.address.toString()] && !poolTicks[pair.address.toString()].length)
        ) {
          poolEmptyCount++
        }
      }
      return poolEmptyCount === pairs.length
    }

    return true
  }, [tokenFrom, tokenTo, poolTicks])

  // const isInsufficientLiquidityError = useMemo(
  //   () =>
  //     simulateResult.poolKey === null &&
  //     (isError(SwapError.InsufficientLiquidity) || isError(SwapError.MaxSwapStepsReached)),
  //   [simulateResult]
  // )

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
      return "Pool doesn't exist."
    }

    if (
      isError(SimulationStatus.SwapStepLimitReached) ||
      isError(SimulationStatus.PriceLimitReached)
    ) {
      return 'Insufficient liquidity'
    }

    if (
      convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals).gt(
        convertBalanceToBN(
          printBN(tokens[tokenFrom.toString()]?.balance, tokens[tokenFrom.toString()]?.decimals),
          tokens[tokenFrom.toString()].decimals
        )
      )
    ) {
      return 'Insufficient balance'
    }

    if (
      tokenFrom.toString() === WRAPPED_SOL_ADDRESS
        ? solBalance.lt(
            convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals).add(
              WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT
            )
          )
        : solBalance.lt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
    ) {
      return `Insufficient Wrapped SOL`
    }

    if (
      convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals).eqn(0) ||
      isError(SimulationStatus.NoGainSwap)
    ) {
      return 'Insufficient amount'
    }

    if (isError('Too large amount')) {
      return 'Not enough liquidity'
    }

    if (!isEveryPoolEmpty && amountTo === '') {
      return 'Amount out is zero'
    }

    if (isEveryPoolEmpty) {
      return 'RPC connection error'
    }

    // Fallback error
    if (simulateResult.error.length !== 0) {
      return 'Not enough liquidity'
    }

    return 'Exchange'
  }
  const hasShowRateMessage = () => {
    return (
      getStateMessage() === 'Insufficient balance' ||
      getStateMessage() === 'Exchange' ||
      getStateMessage() === 'Loading' ||
      getStateMessage() === 'Connect a wallet' ||
      getStateMessage() === 'Insufficient liquidity' ||
      getStateMessage() === 'Not enough liquidity' ||
      getStateMessage() === 'Insufficient Wrapped SOL'
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
    let timeoutId: NodeJS.Timeout

    if (lockAnimation) {
      timeoutId = setTimeout(() => setLockAnimation(false), 300)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
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

  const handleRefresh = async () => {
    onRefresh(tokenFrom, tokenTo)
    setRefresherTime(REFRESHER_INTERVAL)
  }

  useEffect(() => {
    void setSimulateAmount()
  }, [isFetchingNewPool])

  useEffect(() => {
    setRefresherTime(REFRESHER_INTERVAL)

    if (tokenFrom !== null && tokenTo !== null && tokenFrom.equals(tokenTo)) {
      setAmountFrom('')
      setAmountTo('')
    }
  }, [tokenFrom, tokenTo])

  useEffect(() => {
    void setSimulateAmount()
  }, [isFetchingNewPool])

  const actions = createButtonActions({
    tokens,
    wrappedTokenAddress: WRAPPED_SOL_ADDRESS,
    minAmount: WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT,
    onAmountSet: setAmountFrom,
    onSelectInput: () => setInputRef(inputTarget.FROM)
  })

  return (
    <Grid container className={classes.swapWrapper}>
      {/* {wrappedETHAccountExist && (
        <Box className={classes.unwrapContainer}>
          You have wrapped SOL.{' '}
          <u className={classes.unwrapNowButton} onClick={unwrapWETH}>
            Unwrap now.
          </u>
        </Box>
      )} */}
      <Grid container className={classes.header}>
        <Typography component='h1'>Swap tokens</Typography>
        <Box className={classes.swapControls}>
          <Button className={classes.slippageButton} onClick={e => handleClickSettings(e)}>
            <p>
              Slippage: <span className={classes.slippageAmount}>{slippTolerance}%</span>
            </p>
          </Button>
          <TooltipHover title='Refresh'>
            <Grid className={classes.refresh}>
              <Button
                onClick={handleRefresh}
                className={classes.refreshIconBtn}
                disabled={
                  priceFromLoading ||
                  priceToLoading ||
                  isBalanceLoading ||
                  getStateMessage() === 'Loading' ||
                  tokenFrom === null ||
                  tokenTo === null ||
                  tokenFrom.equals(tokenTo)
                }>
                <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
              </Button>
            </Grid>
          </TooltipHover>
          <TooltipHover title='Settings'>
            <Button onClick={handleClickSettings} className={classes.settingsIconBtn}>
              <img src={settingIcon} className={classes.settingsIcon} alt='Settings' />
            </Button>
          </TooltipHover>
        </Box>
        <Grid className={classes.slippage}>
          <Slippage
            open={settings}
            setSlippage={setSlippage}
            handleClose={handleCloseSettings}
            anchorEl={anchorEl}
            initialSlippage={initialSlippage}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Typography className={classes.swapLabel}>Pay</Typography>
        <Box
          className={cx(classes.exchangeRoot, lockAnimation ? classes.amountInputDown : undefined)}>
          <ExchangeAmountInput
            value={amountFrom}
            balance={
              tokenFrom !== null && tokens[tokenFrom.toString()] !== undefined
                ? printBN(
                    tokens[tokenFrom.toString()].balance,
                    tokens[tokenFrom.toString()].decimals
                  )
                : '- -'
            }
            decimal={
              tokenFrom !== null ? tokens[tokenFrom.toString()].decimals : DEFAULT_TOKEN_DECIMAL
            }
            className={classes.amountInput}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountFrom(value)
                setInputRef(inputTarget.FROM)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            actionButtons={[
              {
                label: 'Max',
                variant: 'max',
                onClick: () => {
                  actions.max(tokenFrom?.toString())
                }
              },
              {
                label: '50%',
                variant: 'half',
                onClick: () => {
                  actions.half(tokenFrom?.toString())
                }
              }
            ]}
            tokens={tokens}
            current={tokenFrom !== null ? tokens[tokenFrom.toString()] : null}
            onSelect={setTokenFrom}
            disabled={tokenTo === null || !!tokenFrom?.equals(tokenTo)}
            hideBalances={walletStatus !== Status.Initialized}
            handleAddToken={handleAddToken}
            commonTokens={commonTokens}
            limit={1e14}
            initialHideUnknownTokensValue={initialHideUnknownTokensValue}
            onHideUnknownTokensChange={e => {
              onHideUnknownTokensChange(e)
              setHideUnknownTokens(e)
            }}
            tokenPrice={tokenFromPriceData?.price}
            priceLoading={priceFromLoading}
            isBalanceLoading={isBalanceLoading}
            showMaxButton={true}
            showBlur={
              lockAnimation ||
              (getStateMessage() === 'Loading' &&
                (inputRef === inputTarget.TO || inputRef === inputTarget.DEFAULT))
            }
            hiddenUnknownTokens={hideUnknownTokens}
            network={network}
          />
        </Box>

        <Box className={classes.tokenComponentTextContainer}>
          <Box
            className={classes.swapArrowBox}
            onClick={() => {
              if (lockAnimation) return
              setRateLoading(true)
              setLockAnimation(!lockAnimation)
              setRotates(rotates + 1)
              swap !== null ? setSwap(!swap) : setSwap(true)
              setTimeout(() => {
                const tmpAmount = amountTo

                const tmp = tokenFrom
                setTokenFrom(tokenTo)
                setTokenTo(tmp)

                setInputRef(inputTarget.FROM)
                setAmountFrom(tmpAmount)
              }, 50)
            }}>
            <Box className={classes.swapImgRoot}>
              <img
                src={swapArrowsIcon}
                style={{
                  transform: `rotate(${-rotates * 180}deg)`
                }}
                className={classes.swapArrows}
                alt='Invert tokens'
              />
            </Box>
          </Box>
        </Box>
        <Typography className={classes.swapLabel} mt={1.5}>
          Receive
        </Typography>
        <Box
          className={cx(
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
            decimal={tokenTo !== null ? tokens[tokenTo.toString()].decimals : DEFAULT_TOKEN_DECIMAL}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountTo(value)
                setInputRef(inputTarget.TO)
              }
            }}
            placeholder={`0.${'0'.repeat(6)}`}
            tokens={tokens}
            current={tokenTo !== null ? tokens[tokenTo.toString()] : null}
            onSelect={setTokenTo}
            disabled={tokenTo === null || !!tokenFrom?.equals(tokenTo)}
            hideBalances={walletStatus !== Status.Initialized}
            handleAddToken={handleAddToken}
            commonTokens={commonTokens}
            limit={1e14}
            initialHideUnknownTokensValue={initialHideUnknownTokensValue}
            onHideUnknownTokensChange={e => {
              onHideUnknownTokensChange(e)
              setHideUnknownTokens(e)
            }}
            tokenPrice={tokenToPriceData?.price}
            priceLoading={priceToLoading}
            isBalanceLoading={isBalanceLoading}
            showMaxButton={false}
            showBlur={
              lockAnimation ||
              (getStateMessage() === 'Loading' &&
                (inputRef === inputTarget.FROM || inputRef === inputTarget.DEFAULT))
            }
            hiddenUnknownTokens={hideUnknownTokens}
            network={network}
          />
        </Box>
        <Box className={classes.unknownWarningContainer}>
          {+printBN(simulateResult.priceImpact, DECIMAL - 2) > 25 && (
            <TooltipHover title='Your trade size might be too large'>
              <Box className={classes.unknownWarning}>
                High price impact: {(+printBN(simulateResult.priceImpact, DECIMAL - 2)).toFixed(2)}
                %! This swap will cause a significant price movement.
              </Box>
            </TooltipHover>
          )}
          {tokens[tokenFrom?.toString() ?? '']?.isUnknown && (
            <TooltipHover
              title={`${
                tokens[tokenFrom?.toString() ?? ''].symbol
              } is unknown, make sure address is correct before trading`}>
              <Box className={classes.unknownWarning}>
                {tokens[tokenFrom?.toString() ?? ''].symbol} is not verified
              </Box>
            </TooltipHover>
          )}
          {tokens[tokenTo?.toString() ?? '']?.isUnknown && (
            <TooltipHover
              title={`${
                tokens[tokenTo?.toString() ?? ''].symbol
              } is unknown, make sure address is correct before trading`}>
              <Box className={classes.unknownWarning}>
                {tokens[tokenTo?.toString() ?? ''].symbol} is not verified
              </Box>
            </TooltipHover>
          )}
        </Box>

        <Box className={classes.transactionDetails}>
          <Box className={classes.transactionDetailsInner}>
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
              className={cx(
                tokenFrom !== null &&
                  tokenTo !== null &&
                  hasShowRateMessage() &&
                  amountFrom !== '' &&
                  amountTo !== ''
                  ? classes.HiddenTransactionButton
                  : classes.transactionDetailDisabled,
                classes.transactionDetailsButton
              )}>
              <Grid className={classes.transactionDetailsWrapper}>
                <Typography className={classes.transactionDetailsHeader}>
                  {detailsOpen && canShowDetails ? 'Hide' : 'Show'} transaction details
                </Typography>
              </Grid>
            </button>
            {tokenFrom !== null && tokenTo !== null && tokenFrom !== tokenTo && (
              <TooltipHover title='Refresh'>
                <Grid container className={classes.refreshWrapper}>
                  <Refresher
                    currentIndex={refresherTime}
                    maxIndex={REFRESHER_INTERVAL}
                    onClick={handleRefresh}
                  />
                </Grid>
              </TooltipHover>
            )}
          </Box>
          {canShowDetails ? (
            <Box className={classes.exchangeRateWrapper}>
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
                loading={getStateMessage() === 'Loading' || rateLoading}
              />
            </Box>
          ) : null}
        </Box>
        <TransactionDetailsBox
          open={detailsOpen && canShowDetails}
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
          priceImpact={simulateResult.priceImpact}
          slippage={+slippTolerance}
          isLoadingRate={getStateMessage() === 'Loading'}
        />
        <TokensInfo
          tokenFrom={tokenFrom !== null ? tokens[tokenFrom.toString()] : null}
          tokenTo={tokenTo !== null ? tokens[tokenTo.toString()] : null}
          tokenToPrice={tokenToPriceData?.price}
          tokenFromPrice={tokenFromPriceData?.price}
          copyTokenAddressHandler={copyTokenAddressHandler}
          network={network}
        />
        {walletStatus !== Status.Initialized && getStateMessage() !== 'Loading' ? (
          <ChangeWalletButton
            height={48}
            name='Connect wallet'
            onConnect={onConnectWallet}
            connected={false}
            onDisconnect={onDisconnectWallet}
            isSwap={true}
          />
        ) : getStateMessage() === 'Insufficient Wrapped SOL' ? (
          <TooltipHover
            title='More SOL is required to cover the transaction fee. Obtain more SOL to complete this transaction.'
            top={-45}>
            <AnimatedButton
              content={getStateMessage()}
              className={
                getStateMessage() === 'Connect a wallet'
                  ? `${classes.swapButton}`
                  : getStateMessage() === 'Exchange' && progress === 'none'
                    ? `${classes.swapButton} ${classes.ButtonSwapActive}`
                    : classes.swapButton
              }
              disabled={getStateMessage() !== 'Exchange' || progress !== 'none'}
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
                  convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals),
                  convertBalanceToBN(amountTo, tokens[tokenTo.toString()].decimals),
                  inputRef === inputTarget.FROM
                )
              }}
              progress={progress}
            />
          </TooltipHover>
        ) : (
          <AnimatedButton
            content={getStateMessage()}
            className={
              getStateMessage() === 'Connect a wallet'
                ? `${classes.swapButton}`
                : getStateMessage() === 'Exchange' && progress === 'none'
                  ? `${classes.swapButton} ${classes.ButtonSwapActive}`
                  : classes.swapButton
            }
            disabled={getStateMessage() !== 'Exchange' || progress !== 'none'}
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
                convertBalanceToBN(amountFrom, tokens[tokenFrom.toString()].decimals),
                convertBalanceToBN(amountTo, tokens[tokenTo.toString()].decimals),
                inputRef === inputTarget.FROM
              )
            }}
            progress={progress}
          />
        )}
      </Grid>
      <img src={auditIcon} alt='Audit' className={classes.audit} />
    </Grid>
  )
}

export default Swap
