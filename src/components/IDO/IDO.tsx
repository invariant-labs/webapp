import React, { useEffect } from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import useStyles from './style'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { printBN } from '@consts/utils'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import watchIcon from '@static/svg/watch.svg'
import solanaIcon from '@static/svg/solanaToken.svg'
import dollarIcon from '@static/svg/dollarToken.svg'
import invariantIcon from '@static/svg/invariantToken.svg'
import invariantLogo from '@static/svg/invariantLogo.svg'
import { SwapToken } from '@components/Swap/Swap'

export interface IIDO {
  tokens: SwapToken[]
}
interface ICurrencyData {
  bitcoin: ICurrencyObject
  tether: ICurrencyObject
  solana: ICurrencyObject
  ethereum: ICurrencyObject
}
interface ICurrencyObject {
  usd: number
}

const IDO: React.FC<IIDO> = ({ tokens }) => {
  const classes = useStyles()
  const getButtonMessage = () => {
    return 'Connect a wallet'
  }
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [totalDeposited, setTotalDeposited] = React.useState<number>(0)
  const [totalSolContributed, setTotalSolContributed] = React.useState<number>(0)
  const [tokenPrice, setTokenPrice] = React.useState<number>(0)
  const [invariantForSale, setInvariantForSale] = React.useState<number>(0)
  const [currencyData, setCurrencyData] = React.useState<ICurrencyData>({})

  useEffect(() => {
    if (tokenFromIndex !== null) {
      setAmountFrom('0.000000')
    }
    setTotalDeposited(45.32)
    setTotalSolContributed(122124846)
    setTokenPrice(218.839)
    setInvariantForSale(20000000)
  }, [])

  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  useEffect(() => {
    const apiUrl =
      'https://api.coingecko.com/api/v3/simple/price?ids=tether%2Csolana%2Cethereum%2Cbitcoin&vs_currencies=usd'

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const json = await response.json()
        setCurrencyData(json)
        console.log(await json)
      } catch (error) {
        console.log('error', error)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])
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
              <Typography className={classes.tokenComponentText}>Est.: </Typography>
              <Typography className={classes.tokenComponentText}>
                Balance:
                {tokenFromIndex !== null
                  ? printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal)
                  : '0'}{' '}
              </Typography>
            </Box>
            <ExchangeAmountInput
              value={amountFrom}
              setValue={value => {
                if (value.match(/^\d*\.?\d*$/)) {
                  setAmountFrom(value)
                }
              }}
              decimal={6}
              placeholder={'0.0'}
              current={tokenFromIndex !== null ? tokens[tokenFromIndex] : null}
              tokens={tokens}
              onSelect={(name: string) => {
                setTokenFromIndex(
                  tokens.findIndex(token => {
                    return name === token.symbol
                  })
                )
              }}
              onMaxClick={() => {
                if (tokenFromIndex !== null) {
                  setAmountFrom(
                    printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal)
                  )
                }
              }}
            />
            <Grid>
              <Typography className={classes.tokenComponentText}>Deposited amount:</Typography>
            </Grid>
            <Box className={classes.valueBox}>
              <CardMedia image={invariantLogo} className={classes.iconLogo} />
              <Box className={classes.infoContainer}>
                <Box>
                  <Typography className={classes.depositAmouted}>
                    {totalDeposited.toFixed(2)} xUSD
                  </Typography>
                </Box>
                <Box className={classes.boxInfo}>
                  <Typography className={classes.valueInfo}>
                    {(totalDeposited / currencyData.tether?.usd).toFixed(2)}
                    USD
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {' '}
                    {(totalDeposited / currencyData.solana?.usd).toFixed(2)} SOL
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {' '}
                    {(totalDeposited / currencyData.ethereum?.usd).toFixed(4)}xETH
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {(totalDeposited / currencyData.bitcoin?.usd).toFixed(4)} xBTC
                  </Typography>
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
            <Typography className={classes.textInfo}>
              {numberWithSpaces(totalSolContributed)}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfoDark}>
          <Typography className={classes.labelInfo}>Estimated token price</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={dollarIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>{tokenPrice}</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>INVARIANT for sale</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={invariantIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>
              {numberWithSpaces(invariantForSale)}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDO
