import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import Select from '@components/Inputs/Select/Select'
import { SwapToken } from '@selectors/solanaWallet'
import { getScaleFromString, printBN, printBNtoBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import React, { useState, useCallback, useEffect } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import classNames from 'classnames'
import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import SwapList from '@static/svg/swap-list.svg'
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
  setPositionTokens: (
    tokenAIndex: number | null,
    tokenBindex: number | null,
    feeTierIndex: number
  ) => void
  onAddLiquidity: () => void
  tokenAInputState: InputState
  tokenBInputState: InputState
  feeTiers: number[]
  className?: string
  progress: ProgressState
  percentageChangeA?: number
  usdValueA?: number
  percentageChangeB?: number
  usdValueB?: number
  onReverseTokens: () => void
  poolIndex: number | null
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  tokens,
  setPositionTokens,
  onAddLiquidity,
  tokenAInputState,
  tokenBInputState,
  feeTiers,
  className,
  progress,
  percentageChangeA,
  usdValueA,
  percentageChangeB,
  usdValueB,
  onReverseTokens,
  poolIndex
}) => {
  const classes = useStyles()

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)
  const [feeTierIndex, setFeeTierIndex] = useState<number>(0)

  const getButtonMessage = useCallback(() => {
    if (tokenAIndex === null || tokenBIndex === null) {
      return 'Select tokens'
    }

    if (tokenAIndex === tokenBIndex) {
      return 'Select different tokens'
    }

    if (
      !tokenAInputState.blocked &&
      printBNtoBN(tokenAInputState.value, tokens[tokenAIndex].decimals).gt(
        tokens[tokenAIndex].balance
      )
    ) {
      return "You don't have enough token A"
    }

    if (
      !tokenBInputState.blocked &&
      printBNtoBN(tokenBInputState.value, tokens[tokenBIndex].decimals).gt(
        tokens[tokenBIndex].balance
      )
    ) {
      return "You don't have enough token B"
    }

    if (
      !tokenAInputState.blocked &&
      +tokenAInputState.value === 0 &&
      !tokenBInputState.blocked &&
      +tokenBInputState.value === 0
    ) {
      return 'Liquidity must be greater than 0'
    }

    return 'Add Liquidity'
  }, [tokenAIndex, tokenBIndex, tokenAInputState.value, tokenBInputState.value, tokens])

  useEffect(() => {
    if (tokenAIndex !== null) {
      if (getScaleFromString(tokenAInputState.value) > tokens[tokenAIndex].decimals) {
        const parts = tokenAInputState.value.split('.')

        tokenAInputState.setValue(parts[0] + '.' + parts[1].slice(0, tokens[tokenAIndex].decimals))
      }
    }

    if (tokenBIndex !== null) {
      if (getScaleFromString(tokenBInputState.value) > tokens[tokenBIndex].decimals) {
        const parts = tokenBInputState.value.split('.')

        tokenAInputState.setValue(parts[0] + '.' + parts[1].slice(0, tokens[tokenBIndex].decimals))
      }
    }
  }, [poolIndex])

  return (
    <Grid container direction='column' className={classNames(classes.wrapper, className)}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>

      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 8 }}>
        <Grid container className={classes.selects} direction='row' justifyContent='space-between'>
          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenAIndex !== null ? tokens[tokenAIndex] : null}
              onSelect={name => {
                const index = tokens.findIndex(e => e.symbol === name)
                setTokenAIndex(index)
                setPositionTokens(index, tokenBIndex, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>

          <img
            className={classes.arrows}
            src={SwapList}
            alt='Arrow'
            onClick={() => {
              if (!tokenBInputState.blocked) {
                tokenAInputState.setValue(tokenBInputState.value)
              } else {
                tokenBInputState.setValue(tokenAInputState.value)
              }
              const pom = tokenAIndex
              setTokenAIndex(tokenBIndex)
              setTokenBIndex(pom)
              onReverseTokens()
            }}
          />

          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenBIndex !== null ? tokens[tokenBIndex] : null}
              onSelect={name => {
                const index = tokens.findIndex(e => e.symbol === name)
                setTokenBIndex(index)
                setPositionTokens(tokenAIndex, index, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
            />
          </Grid>
        </Grid>

        <FeeSwitch
          onSelect={fee => {
            setFeeTierIndex(fee)
            setPositionTokens(tokenAIndex, tokenBIndex, fee)
          }}
          feeTiers={feeTiers}
          showOnlyPercents
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <DepositAmountInput
          percentageChange={percentageChangeA}
          usdValue={usdValueA}
          currency={tokenAIndex !== null ? tokens[tokenAIndex].symbol : null}
          currencyIconSrc={tokenAIndex !== null ? tokens[tokenAIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenAIndex === null) {
              return
            }
            tokenAInputState.setValue(
              printBN(tokens[tokenAIndex].balance, tokens[tokenAIndex].decimals)
            )
          }}
          balanceValue={
            tokenAIndex !== null
              ? printBN(tokens[tokenAIndex].balance, tokens[tokenAIndex].decimals)
              : ''
          }
          style={{
            marginBottom: 10
          }}
          onBlur={() => {
            if (
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              tokenAInputState.value.length === 0
            ) {
              tokenAInputState.setValue('0.0')
            }
          }}
          {...tokenAInputState}
        />

        <DepositAmountInput
          percentageChange={percentageChangeB}
          usdValue={usdValueB}
          currency={tokenBIndex !== null ? tokens[tokenBIndex].symbol : null}
          currencyIconSrc={tokenBIndex !== null ? tokens[tokenBIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenBIndex === null) {
              return
            }
            tokenBInputState.setValue(
              printBN(tokens[tokenBIndex].balance, tokens[tokenBIndex].decimals)
            )
          }}
          balanceValue={
            tokenBIndex !== null
              ? printBN(tokens[tokenBIndex].balance, tokens[tokenBIndex].decimals)
              : ''
          }
          onBlur={() => {
            if (
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              tokenBInputState.value.length === 0
            ) {
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
