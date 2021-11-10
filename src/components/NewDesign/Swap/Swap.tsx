import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import { OutlinedButton } from '@components/NewDesign/OutlinedButton/OutlinedButton'
import Slippage from '@components/NewDesign/Swap/slippage/Slippage'
import ExchangeAmountInput from '@components/NewDesign/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import TransactionDetails from '@components/NewDesign/Swap/transactionDetails/TransactionDetails'
import useStyles from './style'
import { Status } from '@reducers/solanaWallet'
import SwapArrows from '@static/svg/swap-arrows.svg'
import infoIcon from '@static/svg/info.svg'
import settingIcon from '@static/svg/settings.svg'

export interface SwapToken {
  balance: BN
  decimal: number
  symbol: string
  assetAddress: PublicKey
  name: string
  icon: string
}

export interface Pools {
  tokenX: PublicKey
  tokenY: PublicKey
  sqrtPrice: {
    v: BN
    scale: number
  }
  fee: {
    val: BN,
    scale: number
  }
  exchangeRate: {
    val: BN,
    scale: number
  }
}

export interface ISwap {
  walletStatus: Status
  tokens: SwapToken[]
  pools: Pools[]
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const Swap: React.FC<ISwap> = ({
  walletStatus,
  tokens,
  pools,
  onSwap
}) => {
  const classes = useStyles()
  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(
    tokens.length ? 0 : null
  )
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [tax, setTax] = React.useState<number>(0)
  const [swap, setSwap] = React.useState<boolean | null>(null)
  const [tokenY, setTokenY] = React.useState<SwapToken[] | null>(null)
  const [poolIndex, setPoolIndex] = React.useState<number | null>(null)
  const [slippTolerance, setSlippTolerance] = React.useState<string>('')
  const [settings, setSettings] = React.useState<boolean>(false)
  const [details, setDetails] = React.useState<boolean>(false)

  const calculateSwapOutAmount = (assetIn: SwapToken, assetFor: SwapToken, amount: string) => {
    let amountOut: BN = new BN(0)
    let priceProportion = new BN(0)
    if (priceProportion.eqn(0)) {
      priceProportion = new BN(1)
    }
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      if (poolIndex !== -1 && poolIndex !== null) {
        priceProportion = pools[poolIndex].sqrtPrice.v
          .div(new BN(10 ** pools[poolIndex].sqrtPrice.scale))
          .pow(new BN(2))
        if (assetIn.assetAddress.toString() === pools[poolIndex].tokenX.toString()) {
          amountOut = printBNtoBN(amount, assetIn.decimal).mul(priceProportion)
        } else {
          amountOut = printBNtoBN(amount, assetIn.decimal).div(priceProportion)
        }
      }
    }
    return printBN(amountOut, assetFor.decimal)
  }

  useEffect(() => {
    updateEstimatedAmount()

    if ((tokenFromIndex !== null && tokenToIndex === null)) {
      setAmountFrom('0.000000')
    }
    if (tokenFromIndex !== null) {
      const tokensY = tokens.filter((token) => {
        if (swap) {
          return getSwapPoolIndex(token.assetAddress, tokens[tokenToIndex ?? 0].assetAddress) !== -1
        } else {
          return getSwapPoolIndex(token.assetAddress, tokens[tokenFromIndex].assetAddress) !== -1
        }
      })
      setTokenY(tokensY)
    }
    if (tokenToIndex !== null && tokenFromIndex !== null) {
      const pairIndex = pools.findIndex((pool) => {
        return (
          tokens[tokenFromIndex].assetAddress.toString() === pool.tokenX.toString() &&
          tokens[tokenToIndex].assetAddress.toString() === pool.tokenY.toString()) ||
          (tokens[tokenToIndex].assetAddress.toString() === pool.tokenX.toString() &&
          tokens[tokenFromIndex].assetAddress.toString() === pool.tokenY.toString())
      })
      setPoolIndex(pairIndex)
      if (pairIndex !== -1) {
        setTax(1 - +printBN(pools[pairIndex].fee.val, pools[pairIndex].fee.scale))
      }
    }
  }, [tokenToIndex, tokenFromIndex])

  useEffect(() => {
    swap ? setTokenToIndex(tokenToIndex) : setTokenToIndex(null)
    setSwap(false)
  }, [tokenFromIndex])

  useEffect(() => {
    swap ? setTokenFromIndex(null) : setTokenFromIndex(tokenFromIndex)
    setSwap(false)
  }, [tokenToIndex])

  const getSwapPoolIndex = (fromToken: PublicKey, toToken: PublicKey) => {
    return pools.findIndex((pool) => {
      return (
        pool.tokenX.toString() === fromToken.toString() &&
        pool.tokenY.toString() === toToken.toString()) ||
        (pool.tokenX.toString() === toToken.toString() &&
        pool.tokenY.toString() === fromToken.toString())
    })
  }
  const getIsXToY = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = pools.find(
      pool =>
        (fromToken.toString() === pool.tokenX.toString() &&
          toToken.toString() === pool.tokenY.toString()) ||
        (fromToken.toString() === pool.tokenY.toString() &&
          toToken.toString() === pool.tokenX.toString())
    )
    return !!swapPool
  }
  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountTo)
      )
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountFrom(
        calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], amount ?? amountFrom)
      )
    }
  }

  const getButtonMessage = () => {
    if (walletStatus !== Status.Initialized) {
      return 'Please connect wallet'
    }

    if (tokenFromIndex === null || tokenToIndex === null) {
      return 'Swap tokens'
    }

    if (!getIsXToY(tokens[tokenFromIndex].assetAddress, tokens[tokenToIndex].assetAddress)) {
      return 'Pair does not exist'
    }

    if (
      printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).eqn(0) ||
      printBNtoBN(amountTo, tokens[tokenToIndex].decimal).eqn(0)
    ) {
      return 'Insufficient trade volume'
    }
    if (swap) {
      if (
        printBNtoBN(amountTo, tokens[tokenToIndex].decimal).gt(
          tokens[tokenToIndex].balance
        )
      ) {
        return 'Insufficient balance'
      }
    } else {
      if (
        printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal).gt(
          tokens[tokenFromIndex].balance
        )
      ) {
        return 'Insufficient balance'
      }
    }
    return 'Swap'
  }

  const setSlippage = (slippage: string): void => {
    setSlippTolerance(slippage)
  }

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setSettings(true)
  }

  const hoverDetails = () => {
    setDetails(!details)
  }

  const handleCloseSettings = () => {
    unblurContent()
    setSettings(false)
  }
  return (
    <Grid container>
      <Grid container className={classes.header}>
        <Typography component='h1'>Swap tokens</Typography>
        <CardMedia image={settingIcon} className={classes.settingsIcon} onClick={handleClickSettings}/>
        <Grid className={classes.slippage}>
          <Slippage open={settings}
            setSlippage={setSlippage}
            handleClose={handleCloseSettings}
            anchorEl={anchorEl}/>
        </Grid>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.tokenComponentTextContainer}>
          <Typography className={classes.tokenComponentText}>Est.: </Typography>
          <Typography className={classes.tokenComponentText}>
          Balance: {tokenFromIndex !== null
              ? swap
                ? printBN(tokens[tokenToIndex ?? 0].balance, tokens[tokenToIndex ?? 0].decimal)
                : printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal) : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountFrom}
          className={classes.amountInput}
          style={{ transform: swap !== null ? swap ? 'translateY(104px)' : 'translateY(0px)' : '' }}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountFrom(value)
              updateEstimatedAmount((+value * tax).toString())
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              if (swap) {
                setAmountTo(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal))
                updateFromEstimatedAmount(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal))
              } else {
                setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
                updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
              }
            }
          }}
          tokens={swap ? tokenY.map((
            {
              symbol,
              name,
              icon
            }) => ({
            symbol,
            name,
            icon
          }))
            : tokens.map((
              {
                symbol,
                name,
                icon
              }) => ({
              symbol,
              name,
              icon
            }))}
          current={
            tokenFromIndex !== null
              ? tokens[tokenFromIndex].symbol
              : null}
          onSelect={(chosen: number) => setTokenFromIndex(chosen)}
        />
        <Box className={classes.tokenComponentTextContainer}>
          <Box className={classes.swapArrowBox}>
            <CardMedia image={SwapArrows}
              style={
                {
                  transform: swap !== null
                    ? swap
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                    : ''
                }
              }
              className={classes.swapArrows} onClick={() => {
                if (tokenToIndex !== null) {
                  swap !== null
                    ? setSwap(!swap)
                    : setSwap(true)
                }
              }} />
          </Box>
          <Typography className={classes.tokenComponentText}>To (Estd.)</Typography>
          <Typography className={classes.tokenComponentText}>
          Balance: {tokenToIndex !== null
              ? swap
                ? printBN(tokens[tokenFromIndex ?? 0].balance, tokens[tokenFromIndex ?? 0].decimal)
                : printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal) : '0'}
          </Typography>
        </Box>
        <ExchangeAmountInput
          value={amountTo}
          className={classes.amountInput}
          style={
            {
              transform: swap !== null
                ? swap
                  ? 'translateY(-104px)'
                  : 'translateY(0px)'
                : ''
            }
          }
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountTo(value)
              updateFromEstimatedAmount((+value * tax).toString())
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (tokenToIndex !== null && tokenFromIndex !== null) {
              if (swap) {
                setAmountTo(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal))
                updateFromEstimatedAmount(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimal))
              } else {
                setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
                updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimal))
              }
            }
          }}
          tokens={swap ? tokens.map(({ symbol, name, icon }) => ({
            symbol,
            name,
            icon
          }))
            : tokenY ? tokenY.map(({ symbol, name, icon }) => ({
              symbol,
              name,
              icon
            }))
              : null}
          current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : null}
          onSelect={(chosen: number) => {
            setTokenToIndex(chosen)
            updateEstimatedAmount()
          }}
        />
        <Box className={classes.transactionDetails}>
          <Grid className={classes.transactionDetailsWrapper} onMouseEnter={hoverDetails} onMouseLeave={hoverDetails}>
            <Typography className={classes.transactionDetailsHeader}>See transaction details</Typography>
            <CardMedia image={infoIcon} style={{ width: 10, height: 10, marginLeft: 4 }}/>
          </Grid>
          {tokenFromIndex !== null && tokenToIndex !== null && getButtonMessage() === 'Swap'
            ? <TransactionDetails
              open={details}
              pool={pools[poolIndex ?? 0].fee}
              exchangeRate={{
                val: swap
                  ? calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], '1')
                  : calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1'),
                symbol: swap ? tokens[tokenFromIndex].symbol : tokens[tokenToIndex].symbol
              }}
            />
            : null}
          {tokenFromIndex !== null && tokenToIndex !== null ? (
            <Typography className={classes.rateText}>
          1 {swap ? tokens[tokenToIndex].symbol : tokens[tokenFromIndex].symbol } ={' '}
              {swap ? calculateSwapOutAmount(tokens[tokenToIndex], tokens[tokenFromIndex], '1')
                : calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1')}{' '}
              {swap ? tokens[tokenFromIndex].symbol : tokens[tokenToIndex].symbol}
            </Typography>
          ) : null}
        </Box>
        <OutlinedButton
          name={getButtonMessage()}
          color='secondary'
          className={classes.swapButton}
          disabled={getButtonMessage() !== 'Swap'}
          onClick={() => {
            if (tokenFromIndex === null || tokenToIndex === null) return

            onSwap(
              tokens[tokenFromIndex].assetAddress,
              tokens[tokenToIndex].assetAddress,
              printBNtoBN(amountFrom, tokens[tokenFromIndex].decimal)
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
export default Swap
