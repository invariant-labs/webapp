import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import { WRAPPED_SOL_ADDRESS, WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT } from '@consts/static'
import {
  printBN,
  printBNtoBN,
  formatNumbers,
  FormatNumberThreshold,
  showPrefix,
  trimLeadingZeros,
  getScaleFromString,
  TokenPriceData
} from '@consts/utils'
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
  remaining: number
  supply: number
  vestingTerm: string
  onBuy: (amount: BN, slippage: number) => void
  onAmountChange: (amount: BN, byAmountBond: boolean) => void
  progress: ProgressState
  quoteTokenPriceData?: TokenPriceData
  bondTokenPriceData?: TokenPriceData
  quotePriceLoading?: boolean
  bondPriceLoading?: boolean
}

enum InputType {
  QUOTE,
  BOND
}

const thresholds: FormatNumberThreshold[] = [
  {
    value: 10,
    decimals: 6
  },
  {
    value: 100,
    decimals: 4
  },
  {
    value: 1000,
    decimals: 2
  },
  {
    value: 10000,
    decimals: 1
  },
  {
    value: 1000000,
    decimals: 2,
    divider: 1000
  },
  {
    value: 1000000000,
    decimals: 2,
    divider: 1000000
  },
  {
    value: Infinity,
    decimals: 2,
    divider: 1000000000
  }
]

const BuyBondModal: React.FC<IBuyBondModal> = ({
  open,
  handleClose,
  bondToken,
  quoteToken,
  price,
  remaining,
  supply,
  vestingTerm,
  onBuy,
  onAmountChange,
  progress,
  quoteTokenPriceData,
  bondTokenPriceData,
  quotePriceLoading,
  bondPriceLoading
}) => {
  const classes = useStyles()

  const [amountBond, setAmountBond] = useState<string>('0')
  const [amountQuote, setAmountQuote] = useState<string>('0')
  const [slippage, setSlippage] = useState<number>(1)
  const [inputSlippage, setInputSlippage] = useState<string>('1%')
  const [lastTouchedInput, setLastTouchedInput] = useState<InputType>(InputType.BOND)

  const getButtonMessage = () => {
    if (+amountBond === 0) {
      return 'Amount must be higher than 0'
    }

    if (+amountBond > remaining) {
      return 'Amount not available to buy'
    }

    return `Buy ${bondToken.symbol}`
  }

  useEffect(() => {
    if (open) {
      setLastTouchedInput(InputType.BOND)
      setAmountBond('0.' + '0'.repeat(bondToken.decimals))
    }
  }, [open])

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

  const priceStr = printBN(price, DECIMAL)

  const onSlippageBlur = () => {
    if (!inputSlippage) {
      setSlippage(0)
      setInputSlippage('0%')
      return
    }

    let valueMinusPercent = inputSlippage

    if (inputSlippage[inputSlippage.length - 1] === '%') {
      valueMinusPercent = inputSlippage.slice(0, inputSlippage.length - 1)
    }

    if (getScaleFromString(valueMinusPercent) > 2) {
      valueMinusPercent = valueMinusPercent.slice(
        0,
        valueMinusPercent.length - getScaleFromString(valueMinusPercent) + 2
      )
    }

    if (+valueMinusPercent > 50) {
      setSlippage(50)
      setInputSlippage('50%')
      return
    }

    if (+valueMinusPercent < 0 || !valueMinusPercent.length || isNaN(+valueMinusPercent)) {
      setSlippage(0)
      setInputSlippage('0%')
      return
    }

    setSlippage(+valueMinusPercent)
    setInputSlippage(valueMinusPercent + '%')
  }

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
          {trimLeadingZeros(formatNumbers(thresholds)(priceStr))}
          {showPrefix(+priceStr)} {quoteToken.symbol}/{bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Total supply</Typography>
        <Typography className={classes.value}>
          {trimLeadingZeros(formatNumbers(thresholds)(supply.toString()))}
          {showPrefix(supply)} {bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Slippage</Typography>
        <Input
          className={classes.input}
          value={inputSlippage}
          onChange={e => setInputSlippage(e.target.value)}
          onBlur={onSlippageBlur}
          disableUnderline
          endAdornment={
            <Button
              className={classes.slippageButton}
              onClick={() => {
                setSlippage(1)
                setInputSlippage('1%')
              }}>
              Auto
            </Button>
          }
        />
        <Grid className={classes.headers}>
          <Typography className={classes.label}>Vesting term</Typography>
          <Typography className={classes.label}>Remaining {bondToken.symbol}</Typography>
        </Grid>
        <Grid className={classes.values}>
          <Typography className={classes.greenValue}>{vestingTerm}</Typography>
          <Typography className={classes.greenValue}>
            {trimLeadingZeros(formatNumbers(thresholds)(remaining.toString()))}
            {showPrefix(remaining)}
          </Typography>
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
          tokenPrice={quoteTokenPriceData?.price}
          // percentageChange={quoteTokenPriceData?.priceChange}
          priceLoading={quotePriceLoading}
          isBalanceLoading={false}
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
          tokenPrice={bondTokenPriceData?.price}
          // percentageChange={bondTokenPriceData?.priceChange}
          priceLoading={bondPriceLoading}
          isBalanceLoading={false}
        />
        <AnimatedButton
          className={classes.button}
          content={getButtonMessage()}
          disabled={+amountBond === 0 || +amountBond > remaining}
          onClick={() => onBuy(printBNtoBN(amountBond, bondToken.decimals), slippage)}
          progress={progress}
        />
      </Grid>
    </Popover>
  )
}

export default BuyBondModal
