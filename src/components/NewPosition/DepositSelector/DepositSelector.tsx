import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import Select from '@components/Inputs/Select/Select'
import {
  ALL_FEE_TIERS_DATA,
  PositionOpeningMethod,
  WRAPPED_SOL_ADDRESS,
  WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT,
  WSOL_POOL_INIT_LAMPORTS
} from '@consts/static'
import { parsePathFeeToFeeString, tickerToAddress } from '@consts/uiUtils'
import { getScaleFromString, printBN, printBNtoBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import SwapList from '@static/svg/swap-list.svg'
import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import useStyles from './style'

export interface InputState {
  value: string
  setValue: (value: string) => void
  blocked: boolean
  blockerInfo?: string
  decimalsLimit: number
}

export interface IDepositSelector {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  tokens: Record<string, SwapToken>
  setPositionTokens: (
    tokenA: PublicKey | null,
    tokenB: PublicKey | null,
    feeTierIndex: number
  ) => void
  onAddLiquidity: () => void
  tokenAInputState: InputState
  tokenBInputState: InputState
  feeTiers: number[]
  className?: string
  progress: ProgressState
  priceA?: number
  priceB?: number
  onReverseTokens: () => void
  poolIndex: number | null
  bestTierIndex?: number
  canCreateNewPool: boolean
  canCreateNewPosition: boolean
  handleAddToken: (address: string) => void
  commonTokens: PublicKey[]
  initialHideUnknownTokensValue: boolean
  onHideUnknownTokensChange: (val: boolean) => void
  priceALoading?: boolean
  priceBLoading?: boolean
  feeTierIndex: number
  concentrationArray: number[]
  concentrationIndex: number
  minimumSliderIndex: number
  positionOpeningMethod: PositionOpeningMethod
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  tokens,
  setPositionTokens,
  onAddLiquidity,
  tokenAInputState,
  tokenBInputState,
  feeTiers,
  className,
  progress,
  priceA,
  priceB,
  onReverseTokens,
  poolIndex,
  bestTierIndex,
  canCreateNewPool,
  canCreateNewPosition,
  handleAddToken,
  commonTokens,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange,
  priceALoading,
  priceBLoading,
  feeTierIndex,
  concentrationArray,
  concentrationIndex,
  minimumSliderIndex,
  positionOpeningMethod
}) => {
  const classes = useStyles()

  const [tokenA, setTokenA] = useState<PublicKey | null>(null)
  const [tokenB, setTokenB] = useState<PublicKey | null>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (isLoaded || Object.keys(tokens).length === 0 || ALL_FEE_TIERS_DATA.length === 0) {
      return
    }

    const tokenAFromPath = tokens[tickerToAddress(initialTokenFrom)]?.assetAddress || null
    const tokenBFromPath = tokens[tickerToAddress(initialTokenTo)]?.assetAddress || null
    let feeTierIndexFromPath = 0

    const parsedFee = parsePathFeeToFeeString(initialFee)

    ALL_FEE_TIERS_DATA.forEach((feeTierData, index) => {
      if (feeTierData.tier.fee.toString() === parsedFee) {
        feeTierIndexFromPath = index
      }
    })

    setTokenA(tokenAFromPath)
    setTokenB(tokenBFromPath)
    setPositionTokens(tokenAFromPath, tokenBFromPath, feeTierIndexFromPath)

    setIsLoaded(true)
  }, [tokens])

  const getButtonMessage = useCallback(() => {
    if (tokenA === null || tokenB === null) {
      return 'Select tokens'
    }

    if (tokenA.equals(tokenB)) {
      return 'Select different tokens'
    }

    if (positionOpeningMethod === 'concentration' && concentrationIndex < minimumSliderIndex) {
      return concentrationArray[minimumSliderIndex]
        ? `Set concentration to at least ${concentrationArray[minimumSliderIndex].toFixed(0)}x`
        : 'Set higher fee tier'
    }

    if (
      (poolIndex === null && !canCreateNewPool) ||
      (poolIndex !== null && !canCreateNewPosition)
    ) {
      return 'Insufficient SOL'
    }

    if (
      !tokenAInputState.blocked &&
      printBNtoBN(tokenAInputState.value, tokens[tokenA.toString()].decimals).gt(
        tokens[tokenA.toString()].balance
      )
    ) {
      return "You don't have enough token A"
    }

    if (
      !tokenBInputState.blocked &&
      printBNtoBN(tokenBInputState.value, tokens[tokenB.toString()].decimals).gt(
        tokens[tokenB.toString()].balance
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
  }, [
    tokenA,
    tokenB,
    tokenAInputState.value,
    tokenBInputState.value,
    tokens,
    positionOpeningMethod,
    concentrationIndex,
    feeTierIndex,
    minimumSliderIndex
  ])

  useEffect(() => {
    if (tokenA !== null) {
      if (getScaleFromString(tokenAInputState.value) > tokens[tokenA.toString()].decimals) {
        const parts = tokenAInputState.value.split('.')

        tokenAInputState.setValue(
          parts[0] + '.' + parts[1].slice(0, tokens[tokenA.toString()].decimals)
        )
      }
    }

    if (tokenB !== null) {
      if (getScaleFromString(tokenBInputState.value) > tokens[tokenB.toString()].decimals) {
        const parts = tokenBInputState.value.split('.')

        tokenAInputState.setValue(
          parts[0] + '.' + parts[1].slice(0, tokens[tokenB.toString()].decimals)
        )
      }
    }
  }, [poolIndex])

  return (
    <Grid container direction='column' className={classNames(classes.wrapper, className)}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>

      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 40 }}>
        <Grid container className={classes.selects} direction='row' justifyContent='space-between'>
          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenA !== null ? tokens[tokenA.toString()] : null}
              onSelect={address => {
                setTokenA(address)
                setPositionTokens(address, tokenB, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={onHideUnknownTokensChange}
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
              const pom = tokenA
              setTokenA(tokenB)
              setTokenB(pom)
              onReverseTokens()
            }}
          />

          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenB !== null ? tokens[tokenB.toString()] : null}
              onSelect={address => {
                setTokenB(address)
                setPositionTokens(tokenA, address, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={onHideUnknownTokensChange}
            />
          </Grid>
        </Grid>

        <FeeSwitch
          onSelect={fee => {
            setPositionTokens(tokenA, tokenB, fee)
          }}
          feeTiers={feeTiers}
          showOnlyPercents
          bestTierIndex={bestTierIndex}
          currentValue={feeTierIndex}
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <DepositAmountInput
          tokenPrice={priceA}
          currency={tokenA !== null ? tokens[tokenA.toString()].symbol : null}
          currencyIconSrc={tokenA !== null ? tokens[tokenA.toString()].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenA === null) {
              return
            }

            if (tokenA.equals(new PublicKey(WRAPPED_SOL_ADDRESS))) {
              if (tokenB !== null && poolIndex === null) {
                tokenAInputState.setValue(
                  printBN(
                    tokens[tokenA.toString()].balance.gt(WSOL_POOL_INIT_LAMPORTS)
                      ? tokens[tokenA.toString()].balance.sub(WSOL_POOL_INIT_LAMPORTS)
                      : new BN(0),
                    tokens[tokenA.toString()].decimals
                  )
                )

                return
              }

              tokenAInputState.setValue(
                printBN(
                  tokens[tokenA.toString()].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    ? tokens[tokenA.toString()].balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    : new BN(0),
                  tokens[tokenA.toString()].decimals
                )
              )

              return
            }
            tokenAInputState.setValue(
              printBN(tokens[tokenA.toString()].balance, tokens[tokenA.toString()].decimals)
            )
          }}
          balanceValue={
            tokenA !== null
              ? printBN(tokens[tokenA.toString()].balance, tokens[tokenA.toString()].decimals)
              : ''
          }
          style={{
            marginBottom: 10
          }}
          onBlur={() => {
            if (tokenA !== null && tokenB !== null && tokenAInputState.value.length === 0) {
              tokenAInputState.setValue('0.0')
            }
          }}
          {...tokenAInputState}
          priceLoading={priceALoading}
        />

        <DepositAmountInput
          tokenPrice={priceB}
          currency={tokenB !== null ? tokens[tokenB.toString()].symbol : null}
          currencyIconSrc={tokenB !== null ? tokens[tokenB.toString()].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenB === null) {
              return
            }

            if (tokenB.equals(new PublicKey(WRAPPED_SOL_ADDRESS))) {
              if (tokenA !== null && poolIndex === null) {
                tokenBInputState.setValue(
                  printBN(
                    tokens[tokenB.toString()].balance.gt(WSOL_POOL_INIT_LAMPORTS)
                      ? tokens[tokenB.toString()].balance.sub(WSOL_POOL_INIT_LAMPORTS)
                      : new BN(0),
                    tokens[tokenB.toString()].decimals
                  )
                )

                return
              }

              tokenBInputState.setValue(
                printBN(
                  tokens[tokenB.toString()].balance.gt(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    ? tokens[tokenB.toString()].balance.sub(WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
                    : new BN(0),
                  tokens[tokenB.toString()].decimals
                )
              )

              return
            }
            tokenBInputState.setValue(
              printBN(tokens[tokenB.toString()].balance, tokens[tokenB.toString()].decimals)
            )
          }}
          balanceValue={
            tokenB !== null
              ? printBN(tokens[tokenB.toString()].balance, tokens[tokenB.toString()].decimals)
              : ''
          }
          onBlur={() => {
            if (tokenA !== null && tokenB !== null && tokenBInputState.value.length === 0) {
              tokenBInputState.setValue('0.0')
            }
          }}
          {...tokenBInputState}
          priceLoading={priceBLoading}
        />
      </Grid>

      <AnimatedButton
        className={classNames(
          classes.addButton,
          progress === 'none' ? classes.hoverButton : undefined
        )}
        onClick={() => {
          if (progress === 'none') {
            onAddLiquidity()
          }
        }}
        disabled={getButtonMessage() !== 'Add Liquidity'}
        content={getButtonMessage()}
        progress={progress}
      />
    </Grid>
  )
}

export default DepositSelector
