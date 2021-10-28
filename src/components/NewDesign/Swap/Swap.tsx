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
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [priceProportion, setPriceProportion] = React.useState<BN>(new BN(1))
  // const firstUpdate = useRef(true)

  const calculateSwapOutAmount = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    // TODO: solution if 0 => change to 1
    if (priceProportion.eqn(0)) {
      setPriceProportion(new BN(1))
    }

    const amountOut: BN =
      swap
        ? printBNtoBN(amount, assetIn.decimal).mul(priceProportion)
        : printBNtoBN(amount, assetIn.decimal).div(priceProportion)

    console.log('calculate', printBN(amountOut, assetFor.decimal))

    return printBN(amountOut, assetFor.decimal)
  }

  useEffect(() => {
    updateEstimatedAmount()

    if (tokenFromIndex !== null && tokenToIndex === null) {
      setAmountFrom('0.000000')
    }
    console.log('token From', tokenFromIndex)
    console.log('token To', tokenToIndex)
  }, [tokenToIndex, tokenFromIndex])

  useEffect(() => {
    if (tokenFromIndex === null || tokenToIndex === null) {

    } else {
      const pairIndex = pools.findIndex((pool) => {
        return (tokens[tokenFromIndex].assetAddress.toString() === pool.tokenX._bn.toString() &&
        tokens[tokenToIndex].assetAddress.toString() === pool.tokenY._bn.toString()) ||
       (tokens[tokenToIndex].assetAddress.toString() === pool.tokenX._bn.toString() &&
        tokens[tokenFromIndex].assetAddress.toString() === pool.tokenY._bn.toString())
      })
      if (pairIndex !== -1) {
        setPriceProportion(pools[pairIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL))
          .mul(pools[pairIndex].sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL))))
      }
    }
  }, [tokenToIndex, tokenFromIndex, swap])

  const getIsXToY = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = pools.find(
      pool =>
        (fromToken.toString() === pool.tokenX._bn.toString() &&
          toToken.toString() === pool.tokenY._bn.toString()) ||
        (fromToken.toString() === pool.tokenY._bn.toString() &&
          toToken.toString() === pool.tokenX._bn.toString())
    )

    if (!swapPool) {
      return false
    }

    return (
      true
    )
  }
  const updateEstimatedAmount = (amount: string | null = null) => {
    console.log('amount', amount)
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountTo)
      )
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountFrom(
        calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], amount ?? amountFrom)
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

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).gt(
        tokens[tokenFromIndex].balance
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
              ? printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal)
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
              : printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal) : '0'}
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
          if (tokenToIndex !== null) {
            setAmountTo(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal))
            updateFromEstimatedAmount(
              printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal)
            )
          }
        }}
        tokens={tokens.map(({ symbol, balance, decimal }) => ({
          symbol,
          balance,
          decimals: decimal
        }))}
        current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : null}
        onSelect={(chosen: number) => {
          setTokenToIndex(chosen)
          updateEstimatedAmount()
        }}
      />

      {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap' ? (
        <Typography className={classes.rateText}>
          1 {swap ? tokens[tokenToIndex].symbol : tokens[tokenFromIndex].symbol } ={' '}
          {swap ? calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], '1')
            : calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1')}{' '}
          {swap ? tokens[tokenFromIndex].symbol : tokens[tokenToIndex].symbol}
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
