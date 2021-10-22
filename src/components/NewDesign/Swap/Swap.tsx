import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { Grid, Typography, Box, CardMedia, TextField } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { OutlinedButton } from '@components/NewDesign/OutlinedButton/OutlinedButton'
import ExchangeAmountInput from '@components/NewDesign/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import useStyles from './style'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'

export interface SwapToken {
  balance: BN
  decimal: number
  symbol: string
  assetAddress: PublicKey
}

export interface ISwap {
  walletStatus: Status
  tokens: SwapToken[]
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
  isPairExisting: (fromToken: PublicKey, toToken: PublicKey) => boolean
  getPriceProportion: (fromToken: PublicKey, toToken: PublicKey) => BN
  getIsXToY: (fromToken: PublicKey, toToken: PublicKey) => boolean
}
export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  onSwap,
  isPairExisting,
  getPriceProportion,
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

  const calculateSwapOutAmount = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    const decimalChange = 10 ** (assetFor.decimal - assetIn.decimal)
    const isXToY = getIsXToY(assetIn.assetAddress, assetFor.assetAddress)

    // TODO: solution if 0 => change to 1
    let priceProportion = getPriceProportion(assetIn.assetAddress, assetFor.assetAddress)
    if (priceProportion.eqn(0)) {
      priceProportion = new BN(1)
    }

    const amountOut =
      (decimalChange >= 1 && isXToY) || (decimalChange < 1 && !isXToY)
        ? printBNtoBN(amount, assetIn.decimal).mul(priceProportion)
        : printBNtoBN(amount, assetIn.decimal).div(priceProportion)

    if (decimalChange < 1) {
      return printBN(amountOut.div(new BN(1 / decimalChange)), assetFor.decimal)
    } else {
      return printBN(amountOut.mul(new BN(decimalChange)), assetFor.decimal)
    }
  }

  useEffect(() => {
    updateEstimatedAmount()

    if (tokenFromIndex !== null && tokenToIndex === null) {
      setAmountFrom('0.000000')
    }
  }, [tokenToIndex, tokenFromIndex])

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountFrom)
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

    if (!isPairExisting(tokens[tokenFromIndex].assetAddress, tokens[tokenToIndex].assetAddress)) {
      return 'Pair does not exist'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex as number].decimal).eqn(0) ||
      printBNtoBN(amountTo, tokens[tokenToIndex as number].decimal).eqn(0)
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
        <Typography className={classes.tokenComponentText}>From</Typography>
        <Typography className={classes.tokenComponentText}>Balance: 1204.5 SNY</Typography>
      </Box>

      <ExchangeAmountInput
        value={amountFrom}
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
          <CardMedia image={SwapArrows} className={classes.swapArrows} />
        </Box>
        <Typography className={classes.tokenComponentText}>To (Estd.)</Typography>
        <Typography className={classes.tokenComponentText}>Balance: 0.0</Typography>
      </Box>
      <ExchangeAmountInput
        value={amountTo}
        setValue={value => {
          if (value.match(/^\d*\.?\d*$/)) {
            setAmountTo(value)
            updateFromEstimatedAmount(value)
          }
        }}
        placeholder={'0.0'}
        onMaxClick={() => {
          if (tokenFromIndex !== null && tokenToIndex !== null) {
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
        current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : null}
        onSelect={(chosen: number) => {
          setTokenToIndex(chosen)
          updateEstimatedAmount()
        }}
      />

      {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap' ? (
        <Typography className={classes.rateText}>
          1 {tokens[tokenToIndex].symbol} ={' '}
          {calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], '1')}{' '}
          {tokens[tokenFromIndex].symbol}
        </Typography>
      ) : null}
      <Box className={classes.transactionDetails} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classes.transactionDetailsHeader}>See transaction details</Typography>
        <ExpandMoreIcon style={{ color: '#746E7C', rotate: collapsed ? '-180deg' : '0deg', transition: 'all .4s' }} />
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
