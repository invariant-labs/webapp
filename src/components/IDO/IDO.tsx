import React, { useEffect } from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import { Decimal, PoolStructure } from '@invariant-labs/sdk/lib/market'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { printBN, printBNtoBN } from '@consts/utils'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import watchIcon from '@static/svg/watch.svg'
import solanaIcon from '@static/svg/solanaToken.svg'
import dollarIcon from '@static/svg/dollarToken.svg'
import invariantIcon from '@static/svg/invariantToken.svg'
import invariantLogo from '@static/svg/invariantLogo.svg'
import { SwapToken } from '@components/Swap/Swap'
import AnimatedNumber from '@components/AnimatedNumber'
import { Status } from '@reducers/solanaWallet'
import { fromFee } from '@invariant-labs/sdk/lib/utils'

export interface IIDO {
  tokens: SwapToken[]
  totalDeposit: number
  totalSolContribute: number
  priceOfToken: number
  valueOfInvariantTokens: number
  walletStatus: Status
  claimable: Boolean
  withdrawable: Boolean
  currencyInfo: ICurrencyData
  saleEnd: ITime
  graceEnd: ITime
  pools: PoolStructure[]
  slippTolerance: string
  tokenToIndex: number
  onSwap: (fromToken: PublicKey,
    toToken: PublicKey,
    amount: BN,
    slippage: Decimal,
    price: Decimal) => void
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

interface ITime {
  hours: number
  minutes: number
  seconds: number
}

const IDO: React.FC<any> = ({
  tokens,
  totalDeposit,
  totalSolContribute,
  priceOfToken,
  valueOfInvariantTokens,
  walletStatus,
  claimable,
  withdrawable,
  currencyInfo,
  saleEnd,
  graceEnd,
  onSwap,
  pools,
  slippTolerance,
  tokenToIndex // this props should be a index of INVARIANT
}) => {
  const classes = useStyles()
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [poolIndex, setPoolIndex] = React.useState<number | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')

  const getButtonMessage = (): string => {
    if (walletStatus !== Status.Initialized) {
      return 'Connect a wallet'
    }

    if (tokenFromIndex === null || tokenToIndex === null) {
      return 'Deposit'
    }

    if (withdrawable === true) {
      return 'Withdraw'
    }

    if (claimable === true) {
      return 'Claim'
    }

    if (printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).eqn(0)) {
      return 'Insufficient trade volume'
    }
    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).gt(
        printBNtoBN(
          printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal),
          tokens[tokenFromIndex].decimal
        )
      )
    ) {
      return 'Insufficient balance'
    }
    return 'Deposit'
  }

  const getHeaderMessage = (): string => {
    if (claimable === true) {
      return 'Claim your SOL'
    } else if (withdrawable === true) {
      return 'Withdraw your SOL'
    } else {
      return 'Deposit your SOL'
    }
  }

  const formatValue = (value: number): string => value.toFixed(0)

  useEffect(() => {
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      const pairIndex = pools.findIndex((pool: { tokenX: PublicKey; tokenY: PublicKey }) => {
        return (
          tokens[tokenFromIndex].assetAddress.equals(pool.tokenX) &&
          tokens[tokenToIndex].assetAddress.equals(pool.tokenY)) ||
          (tokens[tokenToIndex].assetAddress.equals(pool.tokenX) &&
          tokens[tokenFromIndex].assetAddress.equals(pool.tokenY))
      })
      setPoolIndex(pairIndex)
    }

    if (tokenFromIndex !== null) {
      setAmountFrom('0.000000')
    }
  }, [tokenToIndex, tokenFromIndex, pools.length])

  function numberWithSpaces(x: number) {
    return x.toLocaleString('pl-PL')
  }

  return (
    <Grid container className={classes.containerIDO}>
      <Grid sm={12} item className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid item sm={7} className={classes.IDOWrapper}>
        <Box>
          <Grid className={classes.root}>
            <Grid className={classes.header}>
              <Typography component='h2'>{getHeaderMessage()}</Typography>
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
                  tokens.findIndex((token: { symbol: string }) => {
                    return name === token.symbol
                  })
                )
              }}
              onMaxClick={() => {
                if (tokenToIndex !== null && tokenFromIndex !== null) {
                  setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
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
                    {totalDeposit.toFixed(2)} xUSD
                  </Typography>
                </Box>
                <Box className={classes.boxInfo}>
                  <Typography className={classes.valueInfo}>
                    {currencyInfo.tether?.usd > 0
                      ? `${(totalDeposit / currencyInfo.tether?.usd).toFixed(2)} USD`
                      : '0.0 USD'}
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {currencyInfo.solana?.usd > 0
                      ? `${(totalDeposit / currencyInfo.solana?.usd).toFixed(2)} SOL`
                      : '0.0 SOL'}
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {currencyInfo.ethereum?.usd > 0
                      ? `${(totalDeposit / currencyInfo.ethereum?.usd).toFixed(4)} xETH`
                      : '0.0 xETH'}
                  </Typography>
                  <Typography className={classes.valueInfo}>
                    {currencyInfo.bitcoin?.usd > 0
                      ? `${(totalDeposit / currencyInfo.bitcoin?.usd).toFixed(4)} xBTC`
                      : '0.0 xBTC'}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <OutlinedButton
              name={getButtonMessage()}
              className={classes.buttonBuy}
              disabled={
                getButtonMessage() === 'Insufficient trade volume' ||
                getButtonMessage() === 'Insufficient balance'
              }
              color='primary'
              onClick={() => {
                if (tokenFromIndex === null || tokenToIndex === null) {
                  console.log('Select tokens for the transaction')
                } else if (getButtonMessage() === 'Connect a wallet') {
                  console.log('Connect a Wallet')
                } else {
                  onSwap(
                    tokens[tokenFromIndex].assetAddress,
                    tokens[tokenToIndex].assetAddress,
                    printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal),
                    { v: fromFee(new BN(Number(+slippTolerance * 1000))) },
                    { v: poolIndex !== null ? pools[poolIndex].sqrtPrice.v : new BN(1) }
                  )
                }
              }}
            />
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={4} className={classes.info}>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>Sale period ends in</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={watchIcon} className={classes.icon} />
            <Typography className={classes.textInfo}>
              <AnimatedNumber value={saleEnd.hours} formatValue={formatValue} />:
              <AnimatedNumber value={saleEnd.minutes} formatValue={formatValue} />:
              <AnimatedNumber value={saleEnd.seconds} formatValue={formatValue} />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfoDark}>
          <Typography className={classes.labelInfo}>Grace period ends in</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={watchIcon} className={classes.icon} />
            <Typography className={classes.textInfo}>
              <AnimatedNumber value={graceEnd.hours} formatValue={formatValue} />:
              <AnimatedNumber value={graceEnd.minutes} formatValue={formatValue} />:
              <AnimatedNumber value={graceEnd.seconds} formatValue={formatValue} />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>SOL Contributed</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={solanaIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>
              {numberWithSpaces(totalSolContribute)}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfoDark}>
          <Typography className={classes.labelInfo}>Estimated token price</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={dollarIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>{priceOfToken}</Typography>
          </Box>
        </Box>
        <Box className={classes.containerInfo}>
          <Typography className={classes.labelInfo}>INVARIANT for sale</Typography>
          <Box className={classes.wrapperInfo}>
            <CardMedia image={invariantIcon} className={classes.solIcon} />
            <Typography className={classes.textInfo}>
              {numberWithSpaces(valueOfInvariantTokens)}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDO
