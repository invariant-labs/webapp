import * as React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import useStyles from './style'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@components/Swap/Swap'
import Vector from '../VectorLogo/Vector'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import watchIcon from '@static/svg/watch.svg'
import solanaIcon from '@static/svg/solanaToken.svg'
import dollarIcon from '@static/svg/dollarToken.svg'
import invariantIcon from '@static/svg/invariantToken.svg'
const IDO: React.FC = () => {
  const classes = useStyles()
  const getButtonMessage = () => {
    return 'Connect a wallet'
  }

  const tokens: SwapToken[] = [
    {
      balance: new BN(100).mul(new BN(34786)),
      decimal: 6,
      symbol: 'SOL',
      assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
      name: 'Wrapped Solana',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(100).mul(new BN(126)),
      decimal: 6,
      symbol: 'BTC',
      assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      name: 'BTC',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(10).mul(new BN(5342)),
      decimal: 6,
      symbol: 'USDC',
      assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      name: 'USD coin',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    }
  ]

  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  return (
    <Grid container className={classes.containerIDO}>
      <Grid sm={12} item className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid item sm={7} className={classes.IDOWrapper}>
        <Box>
          <Grid className={classes.root}>
            <Grid className={classes.header}>
              <Typography component='h2'>Deposit your SOL</Typography>
            </Grid>
            <Box className={classes.tokenComponentTextContainer}>
              <Typography className={classes.tokenComponentText}>Est.: 56.0278$</Typography>
              <Typography className={classes.tokenComponentText}>Balance: 1004.5 SOL </Typography>
            </Box>
            <ExchangeAmountInput
              setValue={() => {}}
              decimal={6}
              placeholder={'0.0'}
              onMaxClick={() => {}}
              current={tokenFromIndex !== null ? tokens[tokenFromIndex] : null}
              tokens={tokens}
              onSelect={(name: string) => {
                setTokenFromIndex(
                  tokens.findIndex(token => {
                    return name === token.symbol
                  })
                )
              }}
            />
            <Grid>
              <Typography className={classes.tokenComponentText}>Deposited amount:</Typography>
            </Grid>
            <Box className={classes.valueBox}>
              <Vector />
              <Box className={classes.infoContainer}>
                <Box>
                  <Typography className={classes.depositAmouted}>46.643 xUSD</Typography>
                </Box>
                <Box className={classes.boxInfo}>
                  <Typography className={classes.valueInfo}>47.43 USD</Typography>
                  <Typography className={classes.valueInfo}> 0.0432 SOL</Typography>
                  <Typography className={classes.valueInfo}> 0.0000 xETH</Typography>
                  <Typography className={classes.valueInfo}>0.0000 xBTC</Typography>
                </Box>
              </Box>
            </Box>
            <OutlinedButton
              name={getButtonMessage()}
              className={classes.buttonBuy}
              color='primary'
              onClick={() => {}}
            />
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={4} className={classes.info}>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>Sale period ends in</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={watchIcon} className={classes.icon} />
            <Typography className={classes.textInfo}>15:30:33</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfoDark}>
          <Typography className={classes.labelInfo}>Grace period ends in</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={watchIcon} className={classes.icon} />
            <Typography className={classes.textInfo}>32:29:27</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>SOL Contributed</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={solanaIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>15:30:33</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfoDark}>
          <Typography className={classes.labelInfo}>Estimated token price</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={dollarIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>218.839</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>INVARIANT for sale</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={invariantIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>20 000 000</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDO
