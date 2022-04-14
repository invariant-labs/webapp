import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import { WRAPPED_SOL_ADDRESS, WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT } from '@consts/static'
import { printBN, printBNtoBN } from '@consts/utils'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { Button, Grid, Input, Popover, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'

interface IBuyBondModal {
  open: boolean
  handleClose: () => void
  bondToken: SwapToken
  quoteToken: SwapToken
  price: BN
  supply: number
  roi: number
  vestingTerm: string
  onBuy: (amount: BN, slippage: number) => void
  onAmountChange: (amount: BN, byAmountBond: boolean) => void
}

enum InputType {
  QUOTE,
  BOND
}

const BuyBondModal: React.FC<IBuyBondModal> = ({
  open,
  handleClose,
  bondToken,
  quoteToken,
  price,
  supply,
  roi,
  vestingTerm,
  onBuy,
  onAmountChange
}) => {
  const classes = useStyles()

  const [amountBond, setAmountBond] = useState<string>('0')
  const [amountQuote, setAmountQuote] = useState<string>('0')
  const [slippage, setSlippage] = useState<string>('1')
  const [lastTouchedInput, setLastTouchedInput] = useState<InputType>(InputType.BOND)

  useEffect(() => {
    if (lastTouchedInput === InputType.BOND) {
      onAmountChange(printBNtoBN(amountBond, bondToken.decimals), true)

      if (price.eq(new BN(0))) {
        setAmountQuote('0')
        return
      }

      const bondBN = printBNtoBN(amountBond, bondToken.decimals)
      setAmountQuote(printBN(bondBN.mul(price).div(new BN(10 ** DECIMAL)), quoteToken.decimals))
    }
  }, [amountBond])

  useEffect(() => {
    if (lastTouchedInput === InputType.QUOTE) {
      onAmountChange(printBNtoBN(amountQuote, quoteToken.decimals), false)

      if (price.eq(new BN(0))) {
        setAmountBond('0')
        return
      }

      const quoteBN = printBNtoBN(amountQuote, quoteToken.decimals)
      setAmountBond(printBN(quoteBN.mul(new BN(10 ** DECIMAL)).div(price), bondToken.decimals))
    }
  }, [amountQuote])

  useEffect(() => {
    if (lastTouchedInput === InputType.QUOTE) {
      if (price.eq(new BN(0))) {
        setAmountBond('0')
        return
      }

      const quoteBN = printBNtoBN(amountQuote, quoteToken.decimals)
      setAmountBond(printBN(quoteBN.mul(new BN(10 ** DECIMAL)).div(price), bondToken.decimals))
    } else {
      if (price.eq(new BN(0))) {
        setAmountQuote('0')
        return
      }

      const bondBN = printBNtoBN(amountBond, bondToken.decimals)
      setAmountQuote(printBN(bondBN.mul(price).div(new BN(10 ** DECIMAL)), quoteToken.decimals))
    }
  }, [price])

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      onClose={handleClose}
      anchorReference='none'
      className={classes.popover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid container className={classes.container} direction='column' alignItems='center'>
        <Typography className={classes.buy}>Buy {bondToken.symbol}</Typography>
        <Button className={classes.close} onClick={handleClose}>
          {'\u2715'}
        </Button>
        <Typography className={classes.label}>You're paying with</Typography>
        <Grid container alignItems='center' justifyContent='center' className={classes.pay}>
          <img className={classes.icon} src={quoteToken.logoURI} />
          <Typography className={classes.value} style={{ marginBottom: 0 }}>
            {quoteToken.symbol}
          </Typography>
        </Grid>
        <Typography className={classes.label}>Treasury sell price</Typography>
        <Typography className={classes.value}>
          {printBN(price, DECIMAL)} {quoteToken.symbol}/{bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Supply</Typography>
        <Typography className={classes.value}>
          {supply} {bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Slippage</Typography>
        <Input
          className={classes.input}
          value={slippage}
          onChange={e => setSlippage(e.target.value)}
          disableUnderline
          endAdornment={
            <Button className={classes.slippageButton} onClick={() => setSlippage('1')}>
              Auto
            </Button>
          }
        />
        <Grid className={classes.headers}>
          <Typography className={classes.label}>Vesting term</Typography>
          <Typography className={classes.label}>ROI</Typography>
        </Grid>
        <Grid className={classes.values}>
          <Typography className={classes.greenValue}>{vestingTerm}</Typography>
          <Typography className={classes.greenValue}>+{roi}%</Typography>
        </Grid>
        <DepositAmountInput
          value={amountQuote}
          balanceValue={printBN(quoteToken.balance, quoteToken.decimals)}
          currency={quoteToken.symbol}
          currencyIconSrc={quoteToken.logoURI}
          decimalsLimit={quoteToken.decimals}
          setValue={value => {
            setLastTouchedInput(InputType.QUOTE)
            setAmountQuote(value)
          }}
          onMaxClick={() => {
            setLastTouchedInput(InputType.QUOTE)
            setAmountQuote(
              printBN(
                quoteToken.assetAddress.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                  ? quoteToken.balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    ? quoteToken.balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    : new BN(0)
                  : quoteToken.balance,
                quoteToken.decimals
              )
            )
          }}
        />
        <DepositAmountInput
          value={amountBond}
          balanceValue={printBN(bondToken.balance, bondToken.decimals)}
          currency={bondToken.symbol}
          currencyIconSrc={bondToken.logoURI}
          decimalsLimit={bondToken.decimals}
          setValue={value => {
            setLastTouchedInput(InputType.BOND)
            setAmountBond(value)
          }}
          onMaxClick={() => {
            setLastTouchedInput(InputType.QUOTE)
            setAmountQuote(
              printBN(
                quoteToken.assetAddress.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                  ? quoteToken.balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    ? quoteToken.balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    : new BN(0)
                  : quoteToken.balance,
                quoteToken.decimals
              )
            )
          }}
        />
        <Button
          className={classes.button}
          onClick={() => onBuy(printBNtoBN(amountBond, bondToken.decimals), +slippage)}>
          Buy {bondToken.symbol}
        </Button>
      </Grid>
    </Popover>
  )
}

export default BuyBondModal