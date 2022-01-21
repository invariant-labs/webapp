import React from 'react'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import { IdoStats } from './IdoStats'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { DENOMINATOR } from '@invariant-labs/sdk'
import { PRICE_DECIMAL } from '@consts/static'
import { ISwap } from '@components/Swap/Swap'
import { SwapToken } from '@components/Swap/Swap'
import useStyles from './style'

export const Ido: React.FC<ISwap> = ({ walletStatus, tokens, pools, onSwap, progress }) => {
  const classes = useStyles()
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [poolIndex, setPoolIndex] = React.useState<number | null>(null)

  enum feeOption {
    FEE = 'fee',
    REVERSED = 'reversed'
  }

  const calculateSwapOutAmount = (
    assetIn: SwapToken,
    assetFor: SwapToken,
    amount: string,
    fee: string = 'noFee'
  ) => {
    let amountOut: BN = new BN(0)
    let priceProportion = new BN(0)
    if (poolIndex !== -1 && poolIndex !== null) {
      priceProportion = pools[poolIndex].sqrtPrice.v
        .mul(pools[poolIndex].sqrtPrice.v)
        .div(DENOMINATOR)
      if (+printBN(pools[poolIndex].sqrtPrice.v, PRICE_DECIMAL) < 1) {
        if (assetIn.assetAddress.equals(pools[poolIndex].tokenX)) {
          amountOut = printBNtoBN(amount, assetIn.decimals).mul(priceProportion).div(DENOMINATOR)
        } else {
          amountOut = printBNtoBN(amount, assetIn.decimals).mul(DENOMINATOR).div(priceProportion)
        }
      } else {
        if (assetIn.assetAddress.equals(pools[poolIndex].tokenX)) {
          amountOut = printBNtoBN(amount, assetIn.decimals).mul(priceProportion).div(DENOMINATOR)
        } else {
          amountOut = printBNtoBN(amount, assetIn.decimals).mul(DENOMINATOR).div(priceProportion)
        }
      }
      if (fee === feeOption.FEE) {
        amountOut = amountOut.sub(amountOut.mul(pools[poolIndex].fee.v).div(DENOMINATOR))
      } else if (fee === feeOption.REVERSED) {
        amountOut = amountOut.add(
          amountOut.mul(pools[poolIndex].fee.v).div(new BN(10).pow(new BN(PRICE_DECIMAL)))
        )
      }
    }
    return printBN(amountOut, assetFor.decimals)
  }

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(
          tokens[tokenFromIndex],
          tokens[tokenToIndex],
          amount ?? amountFrom,
          feeOption.FEE
        )
      )
    }
  }
  return (
    <Grid container className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid className={classes.main}>
        <Grid container className={classes.root} direction='column'>
          <Typography component='h1' className={classes.label}>
            Deposit your SOL
          </Typography>
          <Box className={classes.tokenComponentTextContainer}>
            <Typography className={classes.tokenComponentText}>Est.: 56.0278$ </Typography>
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
            style={{
              transform: swap !== null ? (swap ? 'translateY(0px)' : 'translateY(0px)') : ''
            }}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountFrom(value)
                updateEstimatedAmount(value)
              }
            }}
            placeholder={'0.0'}
            onMaxClick={() => {
              if (tokenToIndex !== null && tokenFromIndex !== null) {
                setAmountFrom(
                  printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
                )
                updateEstimatedAmount(
                  printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)
                )
              }
            }}
            tokens={tokens}
            current={tokenFromIndex !== null ? tokens[tokenFromIndex] : null}
            onSelect={(name: string) => {
              setTokenFromIndex(
                tokens.findIndex(token => {
                  console.log('URI', token.logoURI)
                  return name === token.symbol
                })
              )
            }}
          />
          <Box className={classes.depositedAmountContainer}>
            <Typography className={classes.tokenComponentText}>Deposited amount: </Typography>
            <Box className={classes.depositedAmounts}>
              <img src='../../public/logoGrey.png' />
              <Box className={classes.depositedAmountTextContainer}>
                <Typography className={classes.depositedAmountMainText}>46.643 xUSD </Typography>
                <Box className={classes.depositedAmountSecondaryTextContainer}>
                  <Typography className={classes.depositedAmountSecondaryText}>
                    47.43 USD{' '}
                  </Typography>
                  <Typography className={classes.depositedAmountSecondaryText}>
                    0.0432 SOL{' '}
                  </Typography>
                  <Typography className={classes.depositedAmountSecondaryText}>
                    0.0000 xETH{' '}
                  </Typography>
                  <Typography className={classes.depositedAmountSecondaryText}>
                    0.0000 xBTC{' '}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Button className={classes.connectWalletButton}>Connect a wallet</Button>
        </Grid>
        <IdoStats />
      </Grid>
    </Grid>
  )
}
