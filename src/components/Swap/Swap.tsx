import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { Decimal, PoolStructure } from '@invariant-labs/sdk/lib/market'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Typography, Box, CardMedia, Button } from '@material-ui/core'
import Slippage from '@components/Swap/slippage/Slippage'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import TransactionDetails from '@components/Swap/transactionDetails/TransactionDetails'
import { PRICE_DECIMAL } from '@consts/static'
import { Swap as SwapData } from '@reducers/swap'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'
import infoIcon from '@static/svg/info.svg'
import settingIcon from '@static/svg/settings.svg'
import { DENOMINATOR } from '@invariant-labs/sdk'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import useStyles from './style'

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
  pools: PoolStructure[]
  onSwap: (
    slippage: Decimal,
    price: Decimal,
    simulate: {
      simulatePrice: BN
      fromToken: PublicKey
      toToken: PublicKey
      amount: BN
    }
  ) => void
  initPool: (init: boolean) => void
  onSimulate: (simulatePrice: BN, fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
  progress: ProgressState
}
export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  pools,
  onSwap,
  initPool,
  onSimulate,
  swapData,
  progress
}) => {
  const classes = useStyles()
  enum feeOption {
    FEE = 'fee',
    REVERSED = 'reversed'
  }
  enum inputTarget {
    FROM = 'from',
    TO = 'to'
  }
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [swapRate, setSwapRate] = React.useState<number>(0)
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [tokensY, setTokensY] = React.useState<SwapToken[]>(tokens)
  const [poolIndex, setPoolIndex] = React.useState<number | null>(null)
  const [slippTolerance, setSlippTolerance] = React.useState<string>('1')
  const [settings, setSettings] = React.useState<boolean>(false)
  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(false)
  const [inputRef, setInputRef] = React.useState<string>(inputTarget.FROM)

  const [rotates, setRotates] = React.useState<number>(0)
  const calculateSwapOutAmount = (
    assetIn: SwapToken,
    assetFor: SwapToken,
    fee: string = 'noFee'
  ) => {
    let sqrtPrice: BN = new BN(0)
    let amountOut: number = 0
    let priceProportion: number = 0
    const decimalDiff: number = PRICE_DECIMAL + (assetIn.decimals - assetFor.decimals)
    if (poolIndex !== -1 && poolIndex !== null) {
      const sqrtPricePow: number =
        +printBN(pools[poolIndex].sqrtPrice.v, PRICE_DECIMAL) *
        +printBN(pools[poolIndex].sqrtPrice.v, PRICE_DECIMAL)
      if (!assetIn.assetAddress.equals(pools[poolIndex].tokenX)) {
        sqrtPrice = new BN((1 / sqrtPricePow) * 10 ** decimalDiff)
      } else {
        sqrtPrice = new BN(sqrtPricePow * 10 ** decimalDiff)
      }
      if (swapData.price.v.gt(new BN(0))) {
        priceProportion = +printBN(swapData.price.v, assetFor.decimals)
      } else {
        priceProportion = Number(
          printBN(
            pools[poolIndex].sqrtPrice.v.mul(pools[poolIndex].sqrtPrice.v).div(DENOMINATOR),
            decimalDiff
          )
        )
      }

      amountOut = Number(printBN(swapData.price.v, assetFor.decimals))
      setSwapRate(priceProportion)
      // if (fee === feeOption.FEE) {
      //   amountOut = amountOut - amountOut * +printBN(pools[poolIndex].fee.v, PRICE_DECIMAL)
      // } else if (fee === feeOption.REVERSED) {
      //   amountOut = amountOut + amountOut * +printBN(pools[poolIndex].fee.v, PRICE_DECIMAL)
      // }
    }
    return {
      amountOut: amountOut.toFixed(assetFor.decimals),
      sqrtPrice: printBNtoBN(sqrtPrice.toString(), 0)
    }
  }

  useEffect(() => {
    updateEstimatedAmount()
  }, [poolIndex])

  useEffect(() => {
    setInputRef(inputTarget.FROM)
  }, [swap])

  useEffect(() => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      if (inputRef === inputTarget.FROM) {
        const simulatePrice = calculateSwapOutAmount(
          tokens[tokenFromIndex],
          tokens[tokenToIndex],
          printBN(swapData.simulate.amount, tokens[tokenFromIndex].decimals)
        )
        onSimulate(
          simulatePrice.sqrtPrice,
          tokens[tokenFromIndex].address,
          tokens[tokenToIndex].address,
          printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals)
        )
      } else {
        const simulatePrice = calculateSwapOutAmount(
          tokens[tokenToIndex],
          tokens[tokenFromIndex],
          printBN(swapData.simulate.amount, tokens[tokenFromIndex].decimals)
        )
        onSimulate(
          simulatePrice.sqrtPrice,
          tokens[tokenToIndex].address,
          tokens[tokenFromIndex].address,
          printBNtoBN(amountTo, tokens[tokenToIndex].decimals)
        )
      }
    }
  }, [amountFrom, amountTo, tokenToIndex, tokenFromIndex])

  useEffect(() => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      inputRef === inputTarget.FROM
        ? setAmountTo(
            calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], feeOption.FEE)
              .amountOut
          )
        : setAmountFrom(
            calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], feeOption.REVERSED)
              .amountOut
          )
    }
  }, [swapData.price])

  useEffect(() => {
    updateEstimatedAmount()
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      initPool(true)
      const pairIndex = pools.findIndex(pool => {
        return (
          (tokens[tokenFromIndex].assetAddress.equals(pool.tokenX) &&
            tokens[tokenToIndex].assetAddress.equals(pool.tokenY)) ||
          (tokens[tokenToIndex].assetAddress.equals(pool.tokenX) &&
            tokens[tokenFromIndex].assetAddress.equals(pool.tokenY))
        )
      })
      setPoolIndex(pairIndex)
    }

    if (tokenFromIndex !== null && tokenToIndex === null) {
      setAmountFrom('0.000000')
    }
    if (tokenFromIndex !== null) {
      const tokensY = tokens.filter(token => {
        return getSwapPoolIndex(token.assetAddress, tokens[tokenFromIndex].assetAddress) !== -1
      })
      setTokensY(tokensY)
    }
  }, [tokenToIndex, tokenFromIndex, pools.length])

  const getSwapPoolIndex = (fromToken: PublicKey, toToken: PublicKey) => {
    return pools.findIndex(pool => {
      return (
        (pool.tokenX.equals(fromToken) && pool.tokenY.equals(toToken)) ||
        (pool.tokenX.equals(toToken) && pool.tokenY.equals(fromToken))
      )
    })
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
      setAmountTo(
        calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], feeOption.FEE)
          .amountOut
      )
    }
  }

  const getButtonMessage = () => {
    if (walletStatus !== Status.Initialized) {
      return 'Please connect wallet'
    }

    if (tokenFromIndex === null || tokenToIndex === null) {
      return 'Swap tokens'
    }

    if (!getIsXToY(tokens[tokenFromIndex].assetAddress, tokens[tokenToIndex].assetAddress)) {
      return 'No route found'
    }

    if (printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals).eqn(0)) {
      return 'Insufficient trade volume'
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
    return 'Swap'
  }
  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
    console.log(slippage.toString())
  }

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setSettings(true)
  }

  const hoverDetails = () => {
    setDetailsOpen(!detailsOpen)
  }

  const handleCloseSettings = () => {
    unblurContent()
    setSettings(false)
  }
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
        <Box className={classes.tokenComponentTextContainer}>
          <Typography className={classes.tokenComponentText}>From: </Typography>
          <Typography className={classes.tokenComponentText}>
            Balance:{' '}
            {tokenFromIndex !== null
              ? printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
              : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountFrom}
          key={swap?.toString()}
          decimal={tokenFromIndex !== null ? tokens[tokenFromIndex].decimals : 6}
          className={
            swap !== null
              ? `${classes.amountInput} ${classes.amountInputDown}`
              : `${classes.amountInput}`
          }
          style={{ transform: swap !== null ? (swap ? 'translateY(0px)' : 'translateY(0px)') : '' }}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountFrom(value)
              // updateEstimatedAmount(value)
              setInputRef(inputTarget.FROM)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              setAmountFrom(
                printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
              )
              // updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
            }
          }}
          tokens={tokens}
          current={tokenFromIndex !== null ? tokens[tokenFromIndex] : null}
          onSelect={(name: string) => {
            setTokenFromIndex(
              tokens.findIndex(token => {
                return name === token.symbol
              })
            )
          }}
        />
        <Box className={classes.tokenComponentTextContainer}>
          <Box
            className={classes.swapArrowBox}
            onClick={() => {
              setRotates(rotates + 1)
              swap !== null ? setSwap(!swap) : setSwap(true)
              const tmp = tokenFromIndex
              const tokensTmp = tokens
              setTokenFromIndex(tokenToIndex)
              setTokenToIndex(tmp)
              tokens = tokensY
              setTokensY(tokensTmp)
            }}>
            <img
              src={SwapArrows}
              style={{
                transform: `rotate(${-rotates * 180}deg)`
              }}
              className={classes.swapArrows}
            />
          </Box>
          <Typography className={classes.tokenComponentText}>To (Estd.)</Typography>
          <Typography className={classes.tokenComponentText}>
            Balance:{' '}
            {tokenToIndex !== null
              ? printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimals)
              : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountTo}
          key={tokenToIndex?.toString()}
          className={
            swap !== null
              ? `${classes.amountInput} ${classes.amountInputUp}`
              : `${classes.amountInput}`
          }
          decimal={tokenToIndex !== null ? tokens[tokenToIndex].decimals : 6}
          style={{
            transform: swap !== null ? (swap ? 'translateY(0px)' : 'translateY(0px)') : ''
          }}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountTo(value)
              // updateFromEstimatedAmount(value)
              setInputRef(inputTarget.TO)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              setAmountFrom(
                printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
              )
              // updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
            }
          }}
          tokens={tokensY}
          current={tokenToIndex !== null ? tokens[tokenToIndex] : null}
          onSelect={(name: string) => {
            setTokenToIndex(
              tokens.findIndex(token => {
                return name === token.symbol
              })
            )
            updateEstimatedAmount()
          }}
        />
        <Box className={classes.transactionDetails}>
          <Grid
            className={classes.transactionDetailsWrapper}
            onMouseEnter={hoverDetails}
            onMouseLeave={hoverDetails}>
            <Typography className={classes.transactionDetailsHeader}>
              See transaction details
            </Typography>
            <CardMedia image={infoIcon} style={{ width: 10, height: 10, marginLeft: 4 }} />
          </Grid>
          {tokenFromIndex !== null && tokenToIndex !== null ? (
            <TransactionDetails
              open={detailsOpen}
              fee={{
                v: poolIndex !== -1 && poolIndex !== null ? pools[poolIndex].fee.v : new BN(0)
              }}
              exchangeRate={{
                val: Number(printBN(swapData.price.v, tokens[tokenToIndex].decimals)).toFixed(
                  tokens[tokenToIndex].decimals
                ),
                symbol: tokens[tokenToIndex].symbol
              }}
            />
          ) : null}
          {tokenFromIndex !== null && tokenToIndex !== null ? (
            <Typography className={classes.rateText}>
              1 {tokens[tokenFromIndex].symbol} = {swapRate.toFixed(tokens[tokenToIndex].decimals)}{' '}
              {tokens[tokenToIndex].symbol}
            </Typography>
          ) : null}
        </Box>
        <AnimatedButton
          content={getButtonMessage()}
          className={classes.swapButton}
          disabled={getButtonMessage() !== 'Swap'}
          onClick={() => {
            if (tokenFromIndex === null || tokenToIndex === null) return
            onSwap(
              { v: fromFee(new BN(Number(+slippTolerance * 1000))) },
              { v: poolIndex !== null ? pools[poolIndex].sqrtPrice.v : new BN(1) },
              {
                simulatePrice: printBNtoBN(amountFrom, 0),
                fromToken: tokens[tokenFromIndex].address,
                toToken: tokens[tokenToIndex].address,
                amount: printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals)
              }
            )
          }}
          progress={progress}
        />
      </Grid>
    </Grid>
  )
}

export default Swap
