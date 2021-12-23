import React, { useState } from 'react'
import useStyle from './styles'
import { Grid, Typography, Box, CardMedia, Button, Input } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import icons from '@static/icons'
import { Status } from '@reducers/solanaWallet'
import { useSelector } from 'react-redux'
import { status } from '@selectors/solanaWallet'

const IDOPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [mockedAmount, setMockedAmount] = useState<string>('2.3512')

  const classes = useStyle()
  const walletStatus = useSelector(status)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)

  const getMaxAmount = () => setInputValue(mockedAmount)

  const getButtonMessage = () => {
    if (walletStatus !== Status.Initialized) {
      return 'Connect a wallet'
    } else {
      return 'Deposit'
    }
  }

  const depositAmount = (amount: string) => {
    if (walletStatus !== Status.Initialized) return
    if (!+amount) return console.log('Enter the amount')

    console.log(`You deposited ${amount} SOL`)
  }

  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.mainWrapper}>
        <Grid container className={classes.header}>
          <Typography component='h1'>IDO</Typography>
        </Grid>
        <Grid container className={classes.idoWrapper}>
          <Grid container className={classes.main}>
            <Typography className={classes.mainHeader}>Deposit your SOL</Typography>
            <Grid className={classes.tokenComponentTextContainer}>
              <Typography className={classes.tokenComponentText}>
                <span style={{ fontWeight: 600 }}>Est.:</span> 56.0278$
              </Typography>
              <Typography className={classes.tokenComponentText}>
                <span style={{ fontWeight: 600 }}>Balance:</span> {mockedAmount} SOL
              </Typography>
            </Grid>
            <Input
              type='number'
              className={classes.amountInput}
              value={inputValue}
              disableUnderline={true}
              onChange={handleInputChange}
              placeholder='0.00000'
              endAdornment={
                <OutlinedButton
                  name='Max'
                  color='primary'
                  className={classes.maxButton}
                  onClick={() => getMaxAmount()}
                />
              }
              startAdornment={
                <Button className={classes.selectButton}>
                  <CardMedia image={icons.smallSOLIcon} className={classes.tokenIcon} />
                  SNY
                </Button>
              }
            />
            <Typography className={classes.tokenComponentText}>Deposited amount:</Typography>
            <Grid className={classes.amountWrapper}>
              <Box className={classes.amountIconBox}>
                <CardMedia image={icons.LogoShortGray} className={classes.amountIcon} />
              </Box>
              <Grid className={classes.amountBox}>
                <Typography className={classes.amountMainText}>46.643 xUSD</Typography>
                <Grid className={classes.amountLineBox}>
                  <Typography className={classes.singleAmountText}>47.43 USD</Typography>
                  <Typography className={classes.singleAmountText}>0.0432 SOL</Typography>
                  <Typography className={classes.singleAmountText}>0.0000 xETH</Typography>
                  <Typography className={classes.singleAmountText}>0.0000 xBTC</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Button
              className={classes.button}
              variant='contained'
              onClick={() => depositAmount(inputValue)}>
              {getButtonMessage()}
            </Button>
          </Grid>
          <Grid container className={classes.sideSection}>
            <Grid className={classes.singleSection}>
              <Typography className={classes.singleSectionHeader}>Sale period ends in</Typography>
              <Grid className={classes.iconWithTextWrapper}>
                <CardMedia image={icons.altClock} className={classes.clockIcon} />
                <Typography className={classes.singleSectionText}>15:30:33</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.singleSection}>
              <Typography className={classes.singleSectionHeader}>Grace period ends in</Typography>
              <Grid className={classes.iconWithTextWrapper}>
                <CardMedia image={icons.altClock} className={classes.clockIcon} />
                <Typography className={classes.singleSectionText}>32:29:27</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.singleSection}>
              <Typography className={classes.singleSectionHeader}>SOL Contributed</Typography>
              <Grid className={classes.iconWithTextWrapper}>
                <CardMedia image={icons.smallSOLIcon} className={classes.tokenIcon} />
                <Typography className={classes.singleSectionText}>122 124 846</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.singleSection}>
              <Typography className={classes.singleSectionHeader}>Estimated token price</Typography>
              <Grid className={classes.iconWithTextWrapper}>
                <CardMedia image={icons.smallUSDIcon} className={classes.tokenIcon} />
                <Typography className={classes.singleSectionText}>218.839</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.singleSection}>
              <Typography className={classes.singleSectionHeader}>INVARIANT for sale</Typography>
              <Grid className={classes.iconWithTextWrapper}>
                <CardMedia image={icons.LogoShort} className={classes.logoIcon} />
                <Typography className={classes.singleSectionText}>20 000 000</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IDOPage
