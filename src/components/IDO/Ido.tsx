import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Grid, Typography, CardMedia } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import icons from '@static/icons'
import React, { useEffect, useState } from 'react'
import { useStyles } from './style'

export const Ido = () => {
  const classes = useStyles()

  const [est, setEst] = useState<string>(' ')
  const [balance, setBalance] = useState<string>(' ')
  const [inputValue, setInputValue] = useState<string | undefined>(' ')
  const [depositedXUSD, setDepositedXUSD] = useState<string>(' ')

  const [depositedUSD, setDepositedUSD] = useState<string>(' ')
  const [depositedSOL, setDepositedSOL] = useState<string>(' ')
  const [depositedXSOL, setDepositedXSOL] = useState<string>(' ')
  const [depositedXBTC, setDepositedXBTC] = useState<string>(' ')

  const [salePeriod, setSalePeriod] = useState<string>(' ')
  const [gracePeriod, setGracePeriod] = useState<string>(' ')
  const [SOLContributed, setSOLContributed] = useState<string>(' ')
  const [estTokenPrice, setEstTokenPrice] = useState<string>(' ')
  const [INVForSale, setINVForSale] = useState<string>(' ')

  // load dummy values
  useEffect(() => {
    setEst('56.0278')
    setBalance('1004.5')
    setInputValue('0.00000')
    setDepositedXUSD('46.643')
    setDepositedUSD('47.43')
    setDepositedSOL('0.0432')
    setDepositedXSOL('0.0000')
    setDepositedXBTC('0.0000')
    setSalePeriod('15:30:33')
    setGracePeriod('32:29:27')
    setSOLContributed('122 124 846')
    setEstTokenPrice('218.839')
    setINVForSale('20 000 000')
  }, [])

  // dummy
  const onSelect = () => {
    console.log('dummy select')
  }

  // dummy
  const onMaxClick = () => {
    setInputValue(balance)
  }

  // dummy
  const setValue = () => {
    console.log('dummy set value')
  }

  // dummy
  const handleConnectWallet = () => {
    console.log('dummy connect wallet')
  }

  return (
    <Grid container className={classes.idoWrapper} >
      <Grid container className={classes.idoHeader}>
        <Typography className={classes.idoTitle} >IDO</Typography>
      </Grid>
      <Grid container spacing={0} justifyContent="space-between" className={classes.idoGridWrapper}>
        <Grid justifyContent="space-evenly" className={classes.idoLeftGrid}>
          <Typography variant="h3" className={classes.idoLeftTitle}>Deposit your SOL</Typography>
          <Grid className={classes.idoLeftBalance} >
            <Grid container direction='row' justifyContent="space-between" className={classes.idoLeftAmountWrapper}>
              <Typography className={classes.idoLeftAmount}><span className={classes.idoLeftAmountBold}> Est.:</span>{` ${est}$`}</Typography>
              <Typography className={classes.idoLeftAmount}><span className={classes.idoLeftAmountBold}> Balance:</span>{` ${balance} SOL`}</Typography>
            </Grid>
            <Grid>
              <AmountInput className={classes.idoAmountInput} decimal={5} onMaxClick={onMaxClick}
                value={inputValue} tokens={[]} onSelect={onSelect} setValue={setValue} current={null} />
            </Grid>
          </Grid>
          <Grid className={classes.idoLeftDepositedTxt}>Deposited amount:</Grid>
          <Grid className={classes.idoLeftDepositWrapper}>
            <Grid className={classes.idoLeftDepositWrapper2}>
              <Grid >
                <CardMedia className={classes.idoLeftLogo} image={icons.LogoIdo} />
              </Grid>
              <Grid container direction='column' className={classes.idoLeftDepositWrapper3}>
                <Typography variant="h4" className={classes.idoLeftDepositValue1}>{`${depositedXUSD} xUSD`}</Typography>
                <Grid container direction='row' justifyContent='space-between' className={classes.idoLeftDepositWrapper3}>
                  <Typography className={classes.idoLeftDepositValues}>{`${depositedUSD} USD`}</Typography>
                  <Typography className={classes.idoLeftDepositValues}>{`${depositedSOL} SOL`}</Typography>
                  <Typography className={classes.idoLeftDepositValues}>{`${depositedXSOL} xSOL`}</Typography>
                  <Typography className={classes.idoLeftDepositValues}>{`${depositedXBTC} xBTC`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <OutlinedButton className={classes.idoLeftConnectBtn} name='Connect a wallet' color='primary' onClick={handleConnectWallet}/>
        </Grid>
        <Grid container direction='column' justifyContent="space-evenly" className={classes.idoRightGrid} >
          <Grid className={classes.rightGridBox1}>
            <Typography className={classes.idoRightGridTxt} variant="h4">Sale period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <AccessTimeIcon className={classes.idoRightGridIcons1} />
              <Typography className={classes.idoRightGridValues} variant="h4">{`${salePeriod}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBox2}>
            <Typography className={classes.idoRightGridTxt} variant="h4" >Grace period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <AccessTimeIcon className={classes.idoRightGridIcons1} />
              <Typography className={classes.idoRightGridValues} variant="h4">{`${gracePeriod}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBox1}>
            <Typography className={classes.idoRightGridTxt} variant="h4">SOL contributed</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.idoRightGridIcons1} image={icons.SOL} />
              <Typography className={classes.idoRightGridValues} variant="h4">{`${SOLContributed}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBox2}>
            <Typography className={classes.idoRightGridTxt} variant="h4">Estimated token price</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.idoRightGridIcons1} image={icons.USD} />
              <Typography className={classes.idoRightGridValues} variant="h4">{`${estTokenPrice}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rightGridBox1}>
            <Typography className={classes.idoRightGridTxt} variant="h4">INVARIANT for sale</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" >
              <CardMedia className={classes.idoRightGridIcons2} image={icons.LogoShort} />
              <Typography className={classes.idoRightGridValues} variant="h4">{`${INVForSale}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Ido
