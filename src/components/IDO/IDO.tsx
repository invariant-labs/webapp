import React, { useEffect, useState } from 'react'
import { Grid, Typography, CardMedia } from '@material-ui/core'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import icons from '@static/icons'
import { useStyles } from './style'

export const IDO = () => {
  const classes = useStyles()
  const [est, setEst] = useState<string>(' ')
  const [balance, setBalance] = useState<string>(' ')
  const [inputValue, setInputValue] = useState<string | undefined>(' ')
  const [depositedXUSD, setDepositedXUSD] = useState<string>(' ')
  const [depositedUSD, setDepositedUSD] = useState<string>(' ')
  const [depositedSOL, setDepositedSOL] = useState<string>(' ')
  const [depositedXETH, setDepositedXETH] = useState<string>(' ')
  const [depositedXBTC, setDepositedXBTC] = useState<string>(' ')
  const [salePeriod, setSalePeriod] = useState<string>(' ')
  const [gracePeriod, setGracePeriod] = useState<string>(' ')
  const [SOLContributed, setSOLContributed] = useState<string>(' ')
  const [estTokenPrice, setEstTokenPrice] = useState<string>(' ')
  const [INVForSale, setINVForSale] = useState<string>(' ')

  useEffect(() => {
    setEst('56.0278')
    setBalance('1004.5')
    setInputValue('0.00000')
    setDepositedXUSD('46.643')
    setDepositedUSD('47.43')
    setDepositedSOL('0.0432')
    setDepositedXETH('0.000')
    setDepositedXBTC('0.000')
    setSalePeriod('15:30:33')
    setGracePeriod('32:29:27')
    setSOLContributed('122 124 846')
    setEstTokenPrice('218.839')
    setINVForSale('20 000 000')
  }, [])

  return (
    <Grid container className={classes.wrapper} >
      <Grid container className={classes.header}>
        <Typography component='h1' className={classes.title} >IDO</Typography>
      </Grid>
      <Grid container className={classes.gridWrapper}>
        <Grid className={classes.leftGrid}>
          <Typography className={classes.leftTitle}>Deposit your SOL</Typography>
          <Grid className={classes.leftImputGrid}>
            <Grid container direction='row' justifyContent="space-between">
              <Typography className={classes.leftImputTxt}><span className={classes.leftImputTxtBold}> Est.:</span>{` ${est}$`}</Typography>
              <Typography className={classes.leftImputTxt}><span className={classes.leftImputTxtBold}> Balance:</span>{` ${balance} SOL`}</Typography>
            </Grid>
            <Grid>
              <AmountInput className={classes.amountInput} decimal={5} onMaxClick={()=>balance}
                value={inputValue} tokens={[]} onSelect={()=>console.log("selected")} setValue={()=>console.log('value')} current={null} />
            </Grid>
          </Grid>
          <Typography className={classes.leftDepositedTxt}>Deposited amount:</Typography>
          <Grid className={classes.leftDepositedWrapper}>
            <Grid className={classes.leftDepositedWrapper2}>
              <Grid >
                <CardMedia className={classes.leftLogo} image={icons.LogoShortGrey} />
              </Grid>
              <Grid container direction='column' className={classes.leftDepositedWrapper3}>
                <Typography variant="h4" className={classes.leftDepositedValueTxt}>{`${depositedXUSD} xUSD`}</Typography>
                <Grid container direction='row' justifyContent='space-between' className={classes.leftDepositedWrapper3}>
                  <Typography className={classes.leftDepositedValue}>{`${depositedUSD} USD`}</Typography>
                  <Typography className={classes.leftDepositedValue}>{`${depositedSOL} SOL`}</Typography>
                  <Typography className={classes.leftDepositedValue}>{`${depositedXETH} xETH`}</Typography>
                  <Typography className={classes.leftDepositedValue}>{`${depositedXBTC} xBTC`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <OutlinedButton className={classes.leftConnectBtn} name='Connect a wallet' color='primary' onClick={()=>console.log("clicked")}/>
        </Grid>
        <Grid container className={classes.rightGrid} >
          <Grid className={classes.rightGridBoxOdd}>
            <Typography className={classes.rightGridTxt} variant="h4">Sale period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <AccessTimeIcon className={classes.rightGridIcons1} />
              <Typography className={classes.rightGridValues} variant="h4">{`${salePeriod}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBoxEven}>
            <Typography className={classes.rightGridTxt} variant="h4" >Grace period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <AccessTimeIcon className={classes.rightGridIcons1} />
              <Typography className={classes.rightGridValues} variant="h4">{`${gracePeriod}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBoxOdd}>
            <Typography className={classes.rightGridTxt} variant="h4">SOL contributed</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.rightGridIcons1} image={icons.SOL} />
              <Typography className={classes.rightGridValues} variant="h4">{`${SOLContributed}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBoxEven}>
            <Typography className={classes.rightGridTxt} variant="h4">Estimated token price</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.rightGridIcons1} image={icons.USD} />
              <Typography className={classes.rightGridValues} variant="h4">{`${estTokenPrice}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBoxOdd}>
            <Typography className={classes.rightGridTxt} variant="h4">INVARIANT for sale</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.rightGridIcons2} image={icons.LogoShort} />
              <Typography className={classes.rightGridValues} variant="h4">{`${INVForSale}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IDO