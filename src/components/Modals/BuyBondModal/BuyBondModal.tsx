import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import { WRAPPED_SOL_ADDRESS, WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT } from '@consts/static'
import { printBN, printBNtoBN } from '@consts/utils'
import { Button, Grid, Popover, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import React, { useState } from 'react'
import useStyles from './styles'

interface IBuyBondModal {
  open: boolean
  handleClose: () => void
  bondToken: SwapToken
  quoteToken: SwapToken
  price: number
  supply: number
  roi: number
  vestingTerm: string
  onBuy: (amount: BN, slippage: number) => void
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
  onBuy
}) => {
  const classes = useStyles()

  const [amountBond, setAmountBond] = useState<string>('')
  const [amountQuote, setAmountQuote] = useState<string>('')
  const [slippage, setSlippage] = useState<string>('')

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
      <Grid container className={classes.container}>
        <Typography className={classes.buy}>Buy {bondToken.symbol}</Typography>
        <Typography className={classes.label}>You're paying with</Typography>
        <Typography className={classes.value}>
          <img className={classes.icon} src={quoteToken.logoURI} /> {quoteToken.symbol}
        </Typography>
        <Typography className={classes.label}>Treasury sell price</Typography>
        <Typography className={classes.value}>
          {price} {quoteToken.symbol}/{bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Supply</Typography>
        <Typography className={classes.value}>
          {supply} {bondToken.symbol}
        </Typography>
        <Typography className={classes.label}>Slippage</Typography>
        <Grid className={classes.mainInput}>
          <input
            className={classes.input}
            value={slippage}
            onChange={e => setSlippage(e.target.value)}></input>
          <Button className={classes.slippageButton} onClick={() => setSlippage('1')}>
            Auto
          </Button>
        </Grid>
        <Grid className={classes.vesting}>
          <Typography className={classes.label}>Vesting term</Typography>
          <Typography className={classes.greenValue}>ROI</Typography>
        </Grid>
        <Grid className={classes.roi}>
          <Typography className={classes.label}>{vestingTerm} days</Typography>
          <Typography className={classes.greenValue}>+{roi}%</Typography>
        </Grid>
        <DepositAmountInput
          value={amountQuote}
          balanceValue={printBN(quoteToken.balance, quoteToken.decimals)}
          currency={quoteToken.symbol}
          currencyIconSrc={quoteToken.logoURI}
          decimalsLimit={quoteToken.decimals}
          setValue={setAmountQuote}
          onMaxClick={() => {
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
          setValue={setAmountBond}
          onMaxClick={() => {
            setAmountQuote(
              printBN(
                bondToken.assetAddress.equals(new PublicKey(WRAPPED_SOL_ADDRESS))
                  ? bondToken.balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    ? bondToken.balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    : new BN(0)
                  : bondToken.balance,
                bondToken.decimals
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
