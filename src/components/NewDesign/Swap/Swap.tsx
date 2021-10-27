import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { OutlinedButton } from '@components/NewDesign/OutlinedButton/OutlinedButton'
import ExchangeAmountInput from '@components/NewDesign/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import useStyles from './style'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'
import { PRICE_DECIMAL } from '@consts/static'

export interface SwapToken {
  balance: BN
  decimal: number
  symbol: string
  assetAddress: PublicKey
}

export interface Pools {
  tokenX: {
    _bn: PublicKey
  }
  tokenY: {
    _bn: PublicKey
  }
  sqrtPrice: {
    v: BN
  }
}

export interface ISwap {
  walletStatus: Status
  tokens: SwapToken[]
  pools: Pools[]
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
  isPairExisting: (fromToken: PublicKey, toToken: PublicKey) => boolean
  getIsXToY: (fromToken: PublicKey, toToken: PublicKey) => boolean
}
export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  pools,
  onSwap,
  isPairExisting,
  getIsXToY
}) => {
  const classes = useStyles()
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [tokenY, setTokenY] = React.useState<SwapToken[]>(tokens)
  const [priceProportion, setPriceProportion] = React.useState<BN>(new BN(1))
  // const firstUpdate = useRef(true)

  const calculateSwapOutAmount = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    const decimalChange = 10 ** (assetFor.decimal - assetIn.decimal)
    const isXToY = getIsXToY(assetIn.assetAddress, assetFor.assetAddress)
    console.log('decimal change', decimalChange)
    // TODO: solution if 0 => change to 1
    if (priceProportion.eqn(0)) {
      setPriceProportion(new BN(1))
    }

    const amountOut =
      (decimalChange >= 1 && isXToY) || (decimalChange < 1 && !isXToY)
        ? printBNtoBN(amount, assetIn.decimal).mul(priceProportion)
        : printBNtoBN(amount, assetIn.decimal).div(priceProportion)
    console.log('amount out', printBN(amountOut, 1))
    if (decimalChange < 1) {
      return printBN(amountOut.div(new BN(1 / decimalChange)), assetFor.decimal)
    } else {
      return printBN(amountOut.mul(new BN(decimalChange)), assetFor.decimal)
    }
  }

  useEffect(() => {
    if (tokenFromIndex === null) {

    } else {
      let pairs = pools.map((pool) => {
        return tokens[tokenFromIndex].assetAddress.toString() === pool.tokenX._bn.toString()
          ? getTokenByPubKey(pool.tokenY._bn.toString())
          : tokens[tokenFromIndex].assetAddress.toString() === pool.tokenY._bn.toString()
            ? getTokenByPubKey(pool.tokenX._bn.toString())
            : null
      })
      pairs = pairs.filter((pair) => {
        return pair !== null
      })
      setTokenToIndex(null)
      setTokenY(pairs.map((pair) => {
        return pair[0]
      }))
      console.log('tokenFrom', tokenFromIndex)
    }
  }, [tokenFromIndex])

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false
  //     return
  //   }
  //   const toTokenIndex: number | null = tokenToIndex === null ? null : tokenToIndex
  //   setTokenToIndex(tokenFromIndex)
  //   setTokenFromIndex(toTokenIndex)

  //   console.log(tokenToIndex, tokenFromIndex)
  // }, [swap])

  useEffect(() => {
    if (tokenFromIndex === null || tokenToIndex === null) {

    } else {
      const pairIndex = pools.findIndex((pool) => {
        return (tokens[tokenFromIndex].assetAddress.toString() === pool.tokenX._bn.toString() &&
        tokenY[tokenToIndex].assetAddress.toString() === pool.tokenY._bn.toString()) ||
       (tokenY[tokenToIndex].assetAddress.toString() === pool.tokenX._bn.toString() &&
        tokens[tokenFromIndex].assetAddress.toString() === pool.tokenY._bn.toString())
      })

      console.log('pairIndex', pairIndex)
      setPriceProportion(pools[pairIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL))
        .mul(pools[pairIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL))))
      console.log('tokenTo', tokenToIndex)
    }
  }, [tokenToIndex, swap])

  useEffect(() => {
    updateEstimatedAmount()

    if (tokenFromIndex !== null && tokenToIndex === null) {
      setAmountFrom('0.000000')
    }
  }, [tokenToIndex, tokenFromIndex])

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(tokens[tokenFromIndex], tokenY[tokenToIndex], amount ?? amountFrom)
      )
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountFrom(
        calculateSwapOutAmount(tokens[tokenToIndex], tokenY[tokenFromIndex], amount ?? amountFrom)
      )
    }
  }
  const getTokenByPubKey = (key: string): SwapToken[] => {
    return tokens.filter((token) => {
      return token.assetAddress.toString() === key
    })
  }

  const getButtonMessage = () => {
    if (walletStatus !== Status.Initialized) {
      return 'Please connect wallet'
    }

    if (tokenFromIndex === null || tokenToIndex === null) {
      return 'Swap tokens'
    }

    if (!isPairExisting(tokens[tokenFromIndex].assetAddress, tokens[tokenToIndex].assetAddress)) {
      return 'Pair does not exist'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex as number].decimal).eqn(0) ||
      printBNtoBN(amountTo, tokenY[tokenToIndex as number].decimal).eqn(0)
    ) {
      return 'Insufficient trade volume'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex as number].decimal).gt(
        tokens[tokenFromIndex as number].balance
      )
    ) {
      return 'Insufficient balance'
    }

    return 'Swap'
  }

  return (
    <Grid container className={classes.root} direction='column'>
      <Box className={classes.tokenComponentTextContainer}>
        <Typography className={classes.tokenComponentText}>Est.: </Typography>
        <Typography className={classes.tokenComponentText}>
          Balance: {tokenFromIndex !== null
            ? swap
              ? printBN(tokenY[tokenToIndex].balance, tokenY[tokenToIndex].decimal)
              : printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal) : '0'}
        </Typography>
      </Box>

      <ExchangeAmountInput
        value={amountFrom}
        style={{ transform: swap !== null ? swap ? 'translateY(104px)' : 'translateY(0px)' : '' }}
        setValue={value => {
          if (value.match(/^\d*\.?\d*$/)) {
            setAmountFrom(value)
            updateEstimatedAmount(value)
          }
        }}
        placeholder={'0.0'}
        onMaxClick={() => {
          if (tokenFromIndex !== null) {
            setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
            updateEstimatedAmount(
              printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal)
            )
          }
        }}
        tokens={tokens.map(({ symbol, balance, decimal }) => ({
          symbol,
          balance,
          decimals: decimal
        }))}
        current={tokenFromIndex !== null ? tokens[tokenFromIndex].symbol : null}
        onSelect={(chosen: number) => setTokenFromIndex(chosen)}
      />
      <Box className={classes.tokenComponentTextContainer}>
        <Box className={classes.swapArrowBox}>
          <CardMedia image={SwapArrows}
            style={{ transform: swap !== null ? swap ? 'rotate(180deg)' : 'rotate(0deg)' : '' }}
            className={classes.swapArrows} onClick={() => {
              if (tokenToIndex !== null) {
                swap !== null ? setSwap(!swap) : setSwap(true)
              } else {

              }
            }} />
        </Box>
        <Typography className={classes.tokenComponentText}>To (Estd.)</Typography>
        <Typography className={classes.tokenComponentText}>
          Balance: {tokenToIndex !== null
            ? swap
              ? printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal)
              : printBN(tokenY[tokenToIndex].balance, tokenY[tokenToIndex].decimal) : '0'}
        </Typography>
      </Box>
      <ExchangeAmountInput
        value={amountTo}
        style={{ transform: swap !== null ? swap ? 'translateY(-104px)' : 'translateY(0px)' : '' }}
        setValue={value => {
          if (value.match(/^\d*\.?\d*$/)) {
            setAmountTo(value)
            updateFromEstimatedAmount(value)
          }
        }}
        placeholder={'0.0'}
        onMaxClick={() => {
          if (tokenFromIndex !== null && tokenToIndex !== null) {
            setAmountFrom(printBN(tokenY[tokenFromIndex].balance, tokenY[tokenFromIndex].decimal))
            updateEstimatedAmount(
              printBN(tokenY[tokenFromIndex].balance, tokenY[tokenFromIndex].decimal)
            )
          }
        }}
        tokens={tokenY.map(({ symbol, balance, decimal }) => ({
          symbol,
          balance,
          decimals: decimal
        }))}
        current={tokenToIndex !== null ? tokenY[tokenToIndex].symbol : null}
        onSelect={(chosen: number) => {
          setTokenToIndex(chosen)
          updateEstimatedAmount()
        }}
      />

      {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap' ? (
        <Typography className={classes.rateText}>
          1 {swap ? tokenY[tokenToIndex].symbol : tokens[tokenFromIndex].symbol } ={' '}
          {swap ? calculateSwapOutAmount(tokenY[tokenToIndex], tokens[tokenFromIndex], '1') : calculateSwapOutAmount(tokens[tokenFromIndex], tokenY[tokenToIndex], '1')}{' '}
          {swap ? tokens[tokenFromIndex].symbol : tokenY[tokenToIndex].symbol}
        </Typography>
      ) : null}
      <Box className={classes.transactionDetails} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classes.transactionDetailsHeader}>See transaction details</Typography>
        <ExpandMoreIcon style={{
          color: '#746E7C',
          rotate: collapsed ? '-180deg' : '0deg',
          transition: 'all .4s'
        }}
        onClick={() => setCollapsed(!collapsed)}
        />
      </Box>
      <Grid container className={classes.transactionDetailsInfo} style={{
        maxHeight: collapsed ? '300px' : '0',
        opacity: collapsed ? 1 : 0,
        marginBottom: collapsed ? 16 : 0,
        padding: collapsed ? 16 : '0 16px'
      }}>
        <Grid className={classes.detailsInfoWrapper}>
          <Typography component='p'>Fee: 0.01%</Typography>
          <Typography component='p'>Exchange rate: 0.00001 xUSD</Typography>
          <Typography component='p'>Slippage tolerance:</Typography>
          <Box>
            <input placeholder='0.50%' className={classes.detailsInfoForm} />
            <button className={classes.detailsInfoBtn}>Auto</button>
          </Box>
        </Grid>
      </Grid>
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
  )
}
export default Swap
