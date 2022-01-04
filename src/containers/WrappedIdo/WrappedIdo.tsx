import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import icons from '@static/icons'
import React, { useState } from 'react'
import { useStyles } from './style'
// prototype, raw layout, needs all responsives, dimensions fix, icons, interfaces, openings for data and missing functions...

export const WrappedIdo = () => {
  const classes = useStyles()

  const [est, setEst] = useState(56.0278)
  const [balance, setBalance] = useState(1004.5)
  const [inputValue, setInputValue] = useState<string | undefined>('0.00000')
  const [depositedXUSD, setDepositedXUSD] = useState(46.643)

  const [depositedUSD, setDepositedUSD] = useState(47.43)
  const [depositedSOL, setDepositedSOL] = useState(0.0432)
  const [depositedXSOL, setDepositedXSOL] = useState(0.0000)
  const [depositedXBTC, setDepositedXBTC] = useState(0.0000)

  const [salePeriod, setSalePeriod] = useState('15:30:33')
  const [gracePeriod, setGracePeriod] = useState('32:29:27')
  const [SOLContributed, setSOLContributed] = useState('122 124 846')
  const [estTokenPrice, setEstTokenPrice] = useState(218.839)
  const [INVForSale, setINVForSale] = useState('20 000 000')





  // dummy
  const onSelect = () => {
    console.log('dummy select')
  }

  // dummy
  const onMaxClick = () => {
    console.log('dummy max value')
    setInputValue('999999')
  }

  // dummy
  const setValue = (e: any) => {
    console.log('dummy set value')
    setInputValue(e.target.value)
  }

  // dummy
  const handleConnectWallet = () => {
    console.log('dummy connect wallet')
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Typography className={classes.idoTitle} >IDO</Typography>

      <Box className={classes.idoWrapper}>
        <Grid container direction='column' justifyContent="space-evenly" className={classes.leftGrid}>
          <Typography variant="h3" className={classes.idoLeft1}>Deposit your SOL</Typography>

          <Grid className={classes.idoLeft1}>

            <Grid container direction='row' justifyContent="space-between" className={classes.idoLeft21}>
              <Grid className={classes.idoLeft211}>{`Est.: ${est}$`}</Grid>
              <Grid className={classes.idoLeft211}>{`Balance: ${balance} SOL`}</Grid>
            </Grid>

            <Grid >
              <AmountInput decimal={4} onMaxClick={onMaxClick}
                value={inputValue} tokens={[]} onSelect={onSelect} setValue={setValue} current={null} />

            </Grid>

          </Grid>

          <Grid className={classes.idoLeft3}>
            <Grid className={classes.idoLeft31}>Deposited amount:</Grid>

            <Box className={classes.idoLeft32}>

              <Grid className={classes.idoLeft33}>
                <CardMedia className={classes.idoLeft33} image={icons.LogoShort} />
              </Grid>

              <Grid container direction='column' justifyContent="space-evenly" className={classes.idoLeft34}>

                <Typography variant="h4" className={classes.idoLeft35}>{`${depositedXUSD} xUSD`}</Typography>

                <Grid container justifyContent="space-between" className={classes.idoLeft36}>
                  <Grid className={classes.idoLeft361}>{`${depositedUSD} USD`}</Grid>
                  <Grid className={classes.idoLeft361}>{`${depositedSOL} SOL`}</Grid>
                  <Grid className={classes.idoLeft361}>{`${depositedXSOL} xSOL`}</Grid>
                  <Grid className={classes.idoLeft361}>{`${depositedXBTC} xBTC`}</Grid>
                </Grid>

              </Grid>

            </Box>
          </Grid>
          <OutlinedButton className={classes.idoLeft4} name='Connect a wallet' color='primary' onClick={handleConnectWallet}/>
        </Grid>

        <Grid container direction='column' justifyContent="space-evenly" className={classes.rightGrid}>

          <Grid className={classes.rightGrid1}>
            <Typography className={classes.rightGrid11} variant="h4">Sale period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              <AccessTimeIcon />
              <Typography variant="h4">{`${salePeriod}`}</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid2}>
            <Typography className={classes.rightGrid11} variant="h4" >Grace period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              <AccessTimeIcon />
              <Typography variant="h4">{`${gracePeriod}`}</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid3}>
            <Typography className={classes.rightGrid11} variant="h4">SOL contributed</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              {/* <AccessTimeIcon /> */}
              <Typography variant="h4">{`${SOLContributed}`}</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid4}>
            <Typography className={classes.rightGrid11} variant="h4">Estimated token price</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              {/* <AccessTimeIcon /> */}
              <Typography variant="h4">{`${estTokenPrice}`}</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid5}>
            <Typography className={classes.rightGrid11} variant="h4">INVARIANT for sale</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              {/* <AccessTimeIcon /> */}
              <Typography variant="h4">{`${INVForSale}`}</Typography>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Grid>

  )
}

export default WrappedIdo
