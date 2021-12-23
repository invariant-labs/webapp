import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import Select from '@components/Inputs/Select/Select'
import { SwapToken } from '@selectors/solanaWallet'
import { printBN, printBNtoBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import React, { useState, useCallback, useEffect } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import classNames from 'classnames'
import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import useStyles from './style'

export interface InputState {
  value: string
  setValue: (value: string) => void
  blocked: boolean
  blockerInfo?: string
  decimalsLimit: number
}

export interface IDepositSelector {
  tokens: SwapToken[]
  tokensB: SwapToken[]
  setPositionTokens: (tokenAIndex: number | null, tokenBindex: number | null, feeTierIndex: number) => void
  onAddLiquidity: () => void
  tokenAInputState: InputState
  tokenBInputState: InputState
  feeTiers: number[]
  isCurrentPoolExisting: boolean
  className?: string
  progress: ProgressState
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  tokens,
  tokensB,
  setPositionTokens,
  onAddLiquidity,
  tokenAInputState,
  tokenBInputState,
  feeTiers,
  isCurrentPoolExisting,
  className,
  progress
}) => {
  const classes = useStyles()

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)
  const [feeTierIndex, setFeeTierIndex] = useState<number>(0)

  const getButtonMessage = useCallback(() => {
    if (tokenAIndex === null || tokenBIndex === null) {
      return 'Select tokens'
    }

    if (!isCurrentPoolExisting) {
      return 'Pool does not exist'
    }

    if (printBNtoBN(tokenAInputState.value, tokens[tokenAIndex].decimal).gt(tokens[tokenAIndex].balance)) {
      return 'You don\'t have enough token A'
    }

    if (printBNtoBN(tokenBInputState.value, tokens[tokenBIndex].decimal).gt(tokens[tokenBIndex].balance)) {
      return 'You don\'t have enough token B'
    }

    if (
      (!tokenAInputState.blocked && +tokenAInputState.value === 0) &&
      (!tokenBInputState.blocked && +tokenBInputState.value === 0)
    ) {
      return 'Liquidity must be greater than 0'
    }

    return 'Add Liquidity'
  }, [tokenAIndex, tokenBIndex, tokenAInputState.value, tokenBInputState.value, tokens, isCurrentPoolExisting])

  useEffect(() => {
    if (tokenAIndex !== null && tokenBIndex !== null && !(tokensB.find((token) => token.symbol === tokens[tokenAIndex].symbol))) {
      const indexB = tokensB.length
        ? tokens.findIndex((token) => token.symbol === tokensB[0].symbol)
        : null
      setTokenBIndex(indexB)
      setPositionTokens(tokenAIndex, indexB, feeTierIndex)
    }
  }, [tokensB])

  return (
    <Grid container direction='column' className={classNames(classes.wrapper, className)}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>
      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 8 }}>
        <Grid container className={classes.selects} direction='row' justifyContent='space-between'>
          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token A</Typography>
            <Select
              tokens={tokens}
              current={tokenAIndex !== null ? tokens[tokenAIndex] : null}
              onSelect={(name) => {
                const index = tokens.findIndex((e) => e.symbol === name)
                setTokenAIndex(index)
                setPositionTokens(index, tokenBIndex, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>

          <Grid className={classes.selectWrapper}>
            <Typography className={classes.inputLabel}>Pair token B</Typography>
            <Select
              tokens={tokensB}
              current={tokenBIndex !== null ? tokens[tokenBIndex] : null}
              onSelect={(name) => {
                const index = tokens.findIndex((e) => e.symbol === name)
                setTokenBIndex(index)
                setPositionTokens(tokenAIndex, index, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>
        </Grid>

        <Typography className={classes.inputLabel}>Fee</Typography>
        <FeeSwitch
          onSelect={(fee) => {
            setFeeTierIndex(fee)
            setPositionTokens(tokenAIndex, tokenBIndex, fee)
          }}
          feeTiers={feeTiers}
          showOnlyPercents
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <Typography className={classes.inputLabel}>Pair token A amount</Typography>
        <DepositAmountInput
          currency={tokenAIndex !== null ? tokens[tokenAIndex].symbol : null}
          currencyIconSrc={tokenAIndex !== null ? tokens[tokenAIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenAIndex === null) {
              return
            }
            tokenAInputState.setValue(printBN(tokens[tokenAIndex].balance, tokens[tokenAIndex].decimal))
          }}
          style={{
            marginBottom: 10
          }}
          onBlur={() => {
            if (tokenAIndex !== null && tokenBIndex !== null && tokenAInputState.value.length === 0) {
              tokenAInputState.setValue('0.0')
            }
          }}
          {...tokenAInputState}
        />

        <Typography className={classes.inputLabel}>Pair token B amount</Typography>
        <DepositAmountInput
          currency={tokenBIndex !== null ? tokens[tokenBIndex].symbol : null}
          currencyIconSrc={tokenBIndex !== null ? tokens[tokenBIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenBIndex === null) {
              return
            }
            tokenBInputState.setValue(printBN(tokens[tokenBIndex].balance, tokens[tokenBIndex].decimal))
          }}
          onBlur={() => {
            if (tokenAIndex !== null && tokenBIndex !== null && tokenBInputState.value.length === 0) {
              tokenBInputState.setValue('0.0')
            }
          }}
          {...tokenBInputState}
        />
      </Grid>

      <AnimatedButton
        className={classes.addButton}
        onClick={onAddLiquidity}
        disabled={getButtonMessage() !== 'Add Liquidity'}
        content={getButtonMessage()}
        progress={progress}
      />
    </Grid>
  )
}

export default DepositSelector
