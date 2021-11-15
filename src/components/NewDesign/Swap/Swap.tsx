import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { Decimal, PoolStructure } from '@invariant-labs/sdk/lib/market'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import { OutlinedButton } from '@components/NewDesign/OutlinedButton/OutlinedButton'
import Slippage from '@components/NewDesign/Swap/slippage/Slippage'
import ExchangeAmountInput from '@components/NewDesign/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import TransactionDetails from '@components/NewDesign/Swap/transactionDetails/TransactionDetails'
import { PRICE_DECIMAL } from '@consts/static'
import useStyles from './style'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'
import infoIcon from '@static/svg/info.svg'
import settingIcon from '@static/svg/settings.svg'
import { DENOMINATOR } from '@invariant-labs/sdk'

export interface SwapToken {
  balance: BN
  decimal: number
  symbol: string
  assetAddress: PublicKey
  name: string
  logoURI: string
}

export interface Pools {
  tokenX: PublicKey
  tokenY: PublicKey
  tokenXReserve: PublicKey;
  tokenYReserve: PublicKey;
  tickSpacing: number;
  sqrtPrice: {
    v: BN
    scale: number
  }
  fee: {
    val: BN,
    scale: number
  }
  exchangeRate: {
    val: BN,
    scale: number
  }
}

export interface ISwap {
  walletStatus: Status
  tokens: SwapToken[]
  pools: PoolStructure[]
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  pools,
  onSwap
}) => {
  const classes = useStyles()
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [tokensY, setTokensY] = React.useState<SwapToken[]>(tokens)
  const [poolIndex, setPoolIndex] = React.useState<number | null>(null)
  const [slippTolerance, setSlippTolerance] = React.useState<string>('')
  const [settings, setSettings] = React.useState<boolean>(false)
  const [details, setDetails] = React.useState<boolean>(false)

  const calculateSwapOutAmount = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    let amountOut: BN = new BN(0)
    let priceProportion = new BN(0)
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      if (poolIndex !== -1 && poolIndex !== null) {
        // priceProportion = pools[poolIndex].sqrtPrice.v
        //   .div(new BN(10 ** PRICE_DECIMAL))
        //   .mul(pools[poolIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL)))
        priceProportion = new BN(2)
        if (assetIn.assetAddress.toString() === pools[poolIndex].tokenX.toString()) {
          amountOut = printBNtoBN(amount, assetIn.decimal).mul(priceProportion)
        } else {
          amountOut = printBNtoBN(amount, assetIn.decimal).div(priceProportion)
        }
      }
    }
    return printBN(amountOut, assetFor.decimal)
  }
  const calculateSwapOutAmountTax = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    console.log('sqrtPrice 12 dec', printBN(pools[0].sqrtPrice.v, 12))
    // console.log(assetIn, assetFor)
    let amountOut: BN = new BN(0)
    let priceProportion = new BN(0)
    if (poolIndex !== -1 && poolIndex !== null) {
      priceProportion = pools[poolIndex].sqrtPrice.v.mul(pools[poolIndex].sqrtPrice.v).div(DENOMINATOR)
      if (assetIn.assetAddress.toString() === pools[poolIndex].tokenX.toString()) { // funkcja equal na address
        amountOut = printBNtoBN(amount, assetIn.decimal).mul(priceProportion).div(DENOMINATOR)
      } else {
        amountOut = printBNtoBN(amount, assetIn.decimal).mul(DENOMINATOR).div(priceProportion)
        console.log(123)
      }
      console.log('amount after mul/div', printBN(amountOut, 6))
      // amountOut = amountOut.sub(
      //   amountOut.mul(pools[poolIndex].fee.v).div(new BN(10 ** PRICE_DECIMAL))
      // )
    }

    // const decimalChange = 10 ** (assetFor.decimal - assetIn.decimal)
    // console.log('price decimal', decimalChange)

    // if (decimalChange < 1) {
    //   return printBN(amountOut.div(new BN(1 / decimalChange)), assetFor.decimal)
    // } else {
    //   return printBN(amountOut.mul(new BN(decimalChange)), assetFor.decimal)
    // }
    console.log('final amount', printBN(amountOut, assetFor.decimal))
    return printBN(amountOut, assetFor.decimal)
  }

  const calculateSwapOutAmountTaxReversed = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    let amountOut: BN = printBNtoBN(amount, assetFor.decimal)
    let priceProportion = new BN(0)
    if (poolIndex !== -1 && poolIndex !== null) {
      // priceProportion = pools[poolIndex].sqrtPrice.v
      //   .div(new BN(10 ** PRICE_DECIMAL))
      //   .mul(pools[poolIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL)))
      priceProportion = new BN(2)
      amountOut = amountOut.add(
        amountOut.mul(pools[poolIndex].fee.v).div(new BN(10 ** PRICE_DECIMAL))
      )

      if (assetIn.assetAddress.toString() === pools[poolIndex].tokenX.toString()) {
        amountOut = amountOut.div(priceProportion)
      } else {
        amountOut = amountOut.mul(priceProportion)
      }
    }

    const decimalChange = 10 ** (assetFor.decimal - assetIn.decimal)

    if (decimalChange < 1) {
      return printBN(amountOut.mul(new BN(1 / decimalChange)), assetFor.decimal)
    } else {
      return printBN(amountOut.div(new BN(decimalChange)), assetFor.decimal)
    }
  }

  useEffect(() => {
    updateEstimatedAmount(amountTo)
    setAmountFrom(amountTo)

    if ((tokenFromIndex !== null && tokenToIndex === null)) {
      setAmountFrom('0.000000')
    }
    if (tokenFromIndex !== null) {
      const tokensY = tokens.filter((token) => {
        return getSwapPoolIndex(token.assetAddress, tokens[tokenFromIndex].assetAddress) !== -1
      })
      setTokensY(tokensY)
    }
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      const pairIndex = pools.findIndex((pool) => {
        return (
          tokens[tokenFromIndex].assetAddress.toString() === pool.tokenX.toString() &&
          tokens[tokenToIndex].assetAddress.toString() === pool.tokenY.toString()) ||
          (tokens[tokenToIndex].assetAddress.toString() === pool.tokenX.toString() &&
          tokens[tokenFromIndex].assetAddress.toString() === pool.tokenY.toString())
      })
      setPoolIndex(pairIndex)
    }
  }, [tokenToIndex, tokenFromIndex, pools.length])

  // useEffect(() => {
  //   swap ? setTokenToIndex(tokenToIndex) : setTokenToIndex(null)
  // }, [tokenFromIndex])

  // useEffect(() => {
  //   swap ? setTokenFromIndex(null) : setTokenFromIndex(tokenFromIndex)
  // }, [tokenToIndex])
  const getSwapPoolIndex = (fromToken: PublicKey, toToken: PublicKey) => {
    return pools.findIndex((pool) => {
      return (
        (pool.tokenX.toString() === fromToken.toString() &&
        pool.tokenY.toString() === toToken.toString()) ||
        (pool.tokenX.toString() === toToken.toString() &&
        pool.tokenY.toString() === fromToken.toString()))
    })
  }
  const getIsXToY = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = pools.find(
      pool =>
        (fromToken.toString() === pool.tokenX.toString() &&
          toToken.toString() === pool.tokenY.toString()) ||
        (fromToken.toString() === pool.tokenY.toString() &&
          toToken.toString() === pool.tokenX.toString())
    )
    return !!swapPool
  }
  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmountTax(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountTo)
      )
      console.log('To input amount', calculateSwapOutAmountTax(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountTo))
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountFrom(
        calculateSwapOutAmountTaxReversed(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountFrom)
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
      return 'Pair does not exist'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).eqn(0) ||
      printBNtoBN(amountTo, tokens[tokenToIndex].decimal).eqn(0)
    ) {
      return 'Insufficient trade volume'
    }
    if (swap && printBNtoBN(amountTo, tokens[tokenToIndex].decimal).gt(
      tokens[tokenToIndex].balance)) {
      return 'Insufficient balance'
    } else {
      if (
        printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).gt(
          tokens[tokenFromIndex].balance
        )
      ) {
        return 'Insufficient balance'
      }
    }
    return 'Swap'
  }

  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
  }

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setSettings(true)
  }

  const hoverDetails = () => {
    setDetails(!details)
  }

  const handleCloseSettings = () => {
    unblurContent()
    setSettings(false)
  }
  return (
    <Grid container className={classes.swapWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>Swap tokens</Typography>
        <CardMedia image={settingIcon} className={classes.settingsIcon} onClick={handleClickSettings}/>
        <Grid className={classes.slippage}>
          <Slippage open={settings}
            setSlippage={setSlippage}
            handleClose={handleCloseSettings}
            anchorEl={anchorEl}
            defaultSlippage={'1'}/>
        </Grid>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.tokenComponentTextContainer}>
          <Typography className={classes.tokenComponentText}>Est.: </Typography>
          <Typography className={classes.tokenComponentText}>
          Balance: {tokenFromIndex !== null
              ? printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal) : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountFrom}
          className={classes.amountInput}
          style={{ transform: swap !== null ? swap ? 'translateY(0px)' : 'translateY(0px)' : '' }}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountFrom(value)
              updateEstimatedAmount(value)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
              updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
            }
          }}
          tokens={ tokens }
          current={
            tokenFromIndex !== null
              ? tokens[tokenFromIndex]
              : null}
          onSelect={(name: string) => {
            setTokenFromIndex(
              tokens.findIndex((token) => {
                return name === token.symbol
              })
            )
          }}
        />
        <Box className={classes.tokenComponentTextContainer}>
          <Box className={classes.swapArrowBox}>
            <CardMedia image={SwapArrows}
              style={
                {
                  transform: swap !== null
                    ? swap
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                    : ''
                }
              }
              className={classes.swapArrows} onClick={() => {
                if (tokenToIndex !== null) {
                  swap !== null
                    ? setSwap(!swap)
                    : setSwap(true)
                }
                const tmp = tokenFromIndex
                const tokensTmp = tokens
                setTokenFromIndex(tokenToIndex)
                setTokenToIndex(tmp)
                tokens = tokensY
                setTokensY(tokensTmp)
              }} />
          </Box>
          <Typography className={classes.tokenComponentText}>To (Estd.)</Typography>
          <Typography className={classes.tokenComponentText}>
          Balance: {tokenToIndex !== null
              ? printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal) : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountTo}
          className={classes.amountInput}
          style={
            {
              transform: swap !== null
                ? swap
                  ? 'translateY(0px)'
                  : 'translateY(0px)'
                : ''
            }
          }
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountTo(value)
              updateFromEstimatedAmount(value)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
              updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
            }
          }}
          tokens={ tokensY }
          current={
            tokenToIndex !== null
              ? tokens[tokenToIndex]
              : null}
          onSelect={(name: string) => {
            setTokenToIndex(
              tokens.findIndex((token) => {
                return name === token.symbol
              }))
            updateEstimatedAmount()
          }}
        />
        <Box className={classes.transactionDetails}>
          <Grid className={classes.transactionDetailsWrapper} onMouseEnter={hoverDetails} onMouseLeave={hoverDetails}>
            <Typography className={classes.transactionDetailsHeader}>See transaction details</Typography>
            <CardMedia image={infoIcon} style={{ width: 10, height: 10, marginLeft: 4 }}/>
          </Grid>
          {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap'
            ? <TransactionDetails
              open={details}
              fee={{ v: poolIndex !== -1 && poolIndex !== null ? pools[poolIndex].fee.v : new BN(0) }}
              exchangeRate={{
                val: calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1'),
                symbol: tokens[tokenToIndex].symbol
              }}
            />
            : null}
          {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap' ? (
            <Typography className={classes.rateText}>
          1 {tokens[tokenFromIndex].symbol } = {' '}
              {calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1')}{' '}
              {tokens[tokenToIndex].symbol}
            </Typography>
          ) : null}
        </Box>
        <OutlinedButton
          name={getButtonMessage()}
          color='secondary'
          className={classes.swapButton}
          disabled={getButtonMessage() !== 'Swap'}
          onClick={() => {
            if (tokenFromIndex === null || tokenToIndex === null) return

            onSwap(
              tokens[tokenFromIndex].assetAddress,
              tokens[tokenToIndex].assetAddress,
              printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal)
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
