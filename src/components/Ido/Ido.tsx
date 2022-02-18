import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import { SwapToken } from '@components/Swap/Swap'

import useStyle from './style'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import icons from '@static/icons'
import classNames from 'classnames'
import { printBN } from '@consts/utils'

interface IdoInterface {
  xBtc: string
  xEth: string
  sol: string
  usd: string
  xUsd: string
  header: string
  buttonHeader: string
  tokens: SwapToken[]
}

const Ido: React.FC<IdoInterface> = ({
  header,
  xUsd,
  usd,
  sol,
  xEth,
  xBtc,
  buttonHeader,
  tokens
}) => {
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [tokenIndex, setTokenIndex] = React.useState<number | null>(tokens.length ? 0 : null)

  const classes = useStyle()

  return (
    <Grid className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.depositHeader}>
          <Typography component='h1'>{header}</Typography>
        </Box>
        <Grid className={classes.AmountInputContainer}>
          <AmountInput
            value={amountFrom}
            balance={
              tokenIndex !== null
                ? printBN(tokens[tokenIndex].balance, tokens[tokenIndex].decimals)
                : '- -'
            }
            current={tokenIndex !== null ? tokens[tokenIndex] : null}
            tokens={tokens}
            placeholder={`0.${'0'.repeat(6)}`}
            setValue={value => setAmountFrom(value)}
            onMaxClick={() => {
              if (tokenIndex !== null) {
                setAmountFrom(printBN(tokens[tokenIndex].balance, tokens[tokenIndex].decimals))
              }
            }}
            decimal={tokenIndex !== null ? tokens[tokenIndex].decimals : 6}
            onSelect={(name: string) => {
              setTokenIndex(tokens.findIndex(token => name === token.symbol))
            }}
            disabled={tokenIndex === null}
          />
        </Grid>
        <Grid className={classes.DepositContainer}>
          <Typography component='p'>Deposited Amount</Typography>
        </Grid>
        <Grid className={classes.AmountContainer}>
          <Box>
            <CardMedia className={classes.logo} image={icons.LogoShort} />
          </Box>
          <Grid className={classes.amountCollection}>
            <Box className={classes.amountBox}>
              <Typography component='p'>{xUsd}</Typography>
              <Box className={classes.amountData}>
                <Typography component='p'>{usd}</Typography>
                <Typography component='p'>{sol}</Typography>
                <Typography component='p'>{xEth}</Typography>
                <Typography component='p'>{xBtc}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.IdoButtonContainer}>
          <AnimatedButton
            onClick={() => {}}
            content={buttonHeader}
            progress={'none'}
            className={classNames(classes.IDOButton, classes.buttonDisabled)}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Ido
