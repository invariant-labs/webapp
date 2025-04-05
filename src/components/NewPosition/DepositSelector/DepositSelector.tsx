import AnimatedButton, { ProgressState } from '@common/AnimatedButton/AnimatedButton'
import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import Select from '@components/Inputs/Select/Select'
import { ALL_FEE_TIERS_DATA, WRAPPED_SOL_ADDRESS } from '@store/consts/static'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@store/selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FeeSwitch from '../FeeSwitch/FeeSwitch'
import {
  NetworkType,
  WSOL_POOL_INIT_LAMPORTS_MAIN,
  WSOL_POOL_INIT_LAMPORTS_DEV,
  WSOL_POSITION_INIT_LAMPORTS_MAIN,
  WSOL_POSITION_INIT_LAMPORTS_DEV
} from '@store/consts/static'
import { Status } from '@store/reducers/solanaWallet'
import {
  convertBalanceToBN,
  getScaleFromString,
  parsePathFeeToFeeString,
  printBN,
  tickerToAddress,
  trimDecimalZeros
} from '@utils/utils'

import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'
import { useStyles } from './style'
import { Grid, Typography } from '@mui/material'
import { PositionOpeningMethod } from '@store/consts/types'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { createButtonActions } from '@utils/uiUtils'
import icons from '@static/icons'

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
  setShouldResetPlot: (val: boolean) => void
  isBalanceLoading: boolean
  isGetLiquidityError: boolean
  ticksLoading: boolean
  network: NetworkType
  solBalance: BN
  walletStatus: Status
  onConnectWallet: () => void
  onDisconnectWallet: () => void
  canNavigate: boolean
  isCurrentPoolExisting: boolean
  feeTiersWithTvl: Record<number, number>
  totalTvl: number
  isLoadingStats: boolean
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
  positionOpeningMethod,
  setShouldResetPlot,
  isBalanceLoading,
  isGetLiquidityError,
  ticksLoading,
  network,
  walletStatus,
  onConnectWallet,
  onDisconnectWallet,
  solBalance,
  canNavigate,
  isCurrentPoolExisting,
  feeTiersWithTvl,
  totalTvl,
  isLoadingStats
}) => {
  const { classes } = useStyles()

  const [tokenA, setTokenA] = useState<PublicKey | null>(null)
  const [tokenB, setTokenB] = useState<PublicKey | null>(null)

  const WSOL_MIN_FEE_LAMPORTS = useMemo(() => {
    if (network === NetworkType.Devnet) {
      return isCurrentPoolExisting ? WSOL_POSITION_INIT_LAMPORTS_DEV : WSOL_POOL_INIT_LAMPORTS_DEV
    } else {
      return isCurrentPoolExisting ? WSOL_POSITION_INIT_LAMPORTS_MAIN : WSOL_POOL_INIT_LAMPORTS_MAIN
    }
  }, [network, isCurrentPoolExisting])

  const [hideUnknownTokens, setHideUnknownTokens] = useState<boolean>(initialHideUnknownTokensValue)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (isLoaded || Object.keys(tokens).length === 0 || ALL_FEE_TIERS_DATA.length === 0) {
      return
    }

    const tokenAFromPath =
      tokens[tickerToAddress(network, initialTokenFrom).toString()]?.assetAddress || null
    const tokenBFromPath =
      tokens[tickerToAddress(network, initialTokenTo).toString()]?.assetAddress || null

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

  const [wasRunTokenA, setWasRunTokenA] = useState(false)
  const [wasRunTokenB, setWasRunTokenB] = useState(false)

  useEffect(() => {
    if (canNavigate) {
      const tokenA = tokens[tickerToAddress(network, initialTokenFrom)]

      if (!wasRunTokenA && !!tokenA) {
        setTokenA(tokenA.assetAddress)
        setWasRunTokenA(true)
      }

      const tokenB = tokens[tickerToAddress(network, initialTokenTo)]
      if (!wasRunTokenB && !!tokenB) {
        setTokenB(tokenB.assetAddress)
        setWasRunTokenB(true)
      }
    }
  }, [wasRunTokenA, wasRunTokenB, canNavigate, tokens.length])

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

    if (isGetLiquidityError) {
      return 'Provide a smaller amount'
    }

    if (
      !tokenAInputState.blocked &&
      convertBalanceToBN(tokenAInputState.value, tokens[tokenA.toString()].decimals).gt(
        tokens[tokenA.toString()].balance
      )
    ) {
      return `Not enough ${tokens[tokenA.toString()].symbol}`
    }

    if (
      !tokenBInputState.blocked &&
      convertBalanceToBN(tokenBInputState.value, tokens[tokenB.toString()].decimals).gt(
        tokens[tokenB.toString()].balance
      )
    ) {
      return `Not enough ${tokens[tokenB.toString()].symbol}`
    }

    const tokenABalance = convertBalanceToBN(
      tokenAInputState.value,
      tokens[tokenA.toString()].decimals
    )
    const tokenBBalance = convertBalanceToBN(
      tokenBInputState.value,
      tokens[tokenB.toString()].decimals
    )

    if (
      (tokenA.toString() === WRAPPED_SOL_ADDRESS &&
        tokens[tokenA.toString()].balance.lt(tokenABalance.add(WSOL_MIN_FEE_LAMPORTS))) ||
      (tokenB.toString() === WRAPPED_SOL_ADDRESS &&
        tokens[tokenB.toString()].balance.lt(tokenBBalance.add(WSOL_MIN_FEE_LAMPORTS))) ||
      solBalance.lt(WSOL_MIN_FEE_LAMPORTS)
    ) {
      return `Insufficient SOL`
    }

    if (
      (!tokenAInputState.blocked && +tokenAInputState.value === 0) ||
      (!tokenBInputState.blocked && +tokenBInputState.value === 0)
    ) {
      return !tokenAInputState.blocked && !tokenBInputState.blocked
        ? 'Enter token amounts'
        : 'Enter token amount'
    }

    return 'Add Position'
  }, [
    tokenA,
    tokenB,
    tokenAInputState,
    tokenBInputState,
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

  const actionsTokenA = createButtonActions({
    tokens,
    wrappedTokenAddress: WRAPPED_SOL_ADDRESS,
    minAmount: WSOL_MIN_FEE_LAMPORTS,
    onAmountSet: tokenAInputState.setValue
  })
  const actionsTokenB = createButtonActions({
    tokens,
    wrappedTokenAddress: WRAPPED_SOL_ADDRESS,
    minAmount: WSOL_MIN_FEE_LAMPORTS,
    onAmountSet: tokenBInputState.setValue
  })

  return (
    <Grid container className={classNames(classes.wrapper, className)}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>

      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 40 }}>
        <Grid container className={classes.selects}>
          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenA !== null ? tokens[tokenA.toString()] : null}
              onSelect={address => {
                setShouldResetPlot(true)
                setTokenA(address)
                setPositionTokens(address, tokenB, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={e => {
                onHideUnknownTokensChange(e)
                setHideUnknownTokens(e)
              }}
              hiddenUnknownTokens={hideUnknownTokens}
              network={network}
            />
          </Grid>

          <TooltipHover title='Reverse tokens'>
            <img
              className={classes.arrows}
              src={icons.swapListIcon}
              alt='Arrow'
              onClick={() => {
                if (ticksLoading) {
                  return
                }

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
          </TooltipHover>

          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenB !== null ? tokens[tokenB.toString()] : null}
              onSelect={address => {
                setShouldResetPlot(true)
                setTokenB(address)
                setPositionTokens(tokenA, address, feeTierIndex)
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={e => {
                onHideUnknownTokensChange(e)
                setHideUnknownTokens(e)
              }}
              hiddenUnknownTokens={hideUnknownTokens}
              network={network}
            />
          </Grid>
        </Grid>

        <FeeSwitch
          showTVL={tokenA !== null && tokenB !== null}
          onSelect={fee => {
            setPositionTokens(tokenA, tokenB, fee)
            setShouldResetPlot(true)
          }}
          feeTiers={feeTiers}
          showOnlyPercents
          currentValue={feeTierIndex}
          feeTiersWithTvl={feeTiersWithTvl}
          totalTvl={totalTvl}
          isLoadingStats={isLoadingStats}
        />
      </Grid>
      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <DepositAmountInput
          tokenPrice={priceA}
          currency={tokenA !== null ? tokens[tokenA.toString()].symbol : null}
          currencyIconSrc={tokenA !== null ? tokens[tokenA.toString()].logoURI : undefined}
          currencyIsUnknown={tokenA !== null ? tokens[tokenA.toString()].isUnknown ?? false : false}
          placeholder='0.0'
          actionButtons={[
            {
              label: 'Max',
              variant: 'max',
              onClick: () => {
                actionsTokenA.max(tokenA?.toString())
              }
            },
            {
              label: '50%',
              variant: 'half',
              onClick: () => {
                actionsTokenA.half(tokenA?.toString())
              }
            }
          ]}
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

            tokenAInputState.setValue(trimDecimalZeros(tokenAInputState.value))
          }}
          {...tokenAInputState}
          priceLoading={priceALoading}
          isBalanceLoading={isBalanceLoading}
          walletUninitialized={walletStatus !== Status.Initialized}
        />

        <DepositAmountInput
          tokenPrice={priceB}
          currency={tokenB !== null ? tokens[tokenB.toString()].symbol : null}
          currencyIconSrc={tokenB !== null ? tokens[tokenB.toString()].logoURI : undefined}
          currencyIsUnknown={tokenB !== null ? tokens[tokenB.toString()].isUnknown ?? false : false}
          placeholder='0.0'
          actionButtons={[
            {
              label: 'Max',
              variant: 'max',
              onClick: () => {
                actionsTokenB.max(tokenB?.toString())
              }
            },
            {
              label: '50%',
              variant: 'half',
              onClick: () => {
                actionsTokenB.half(tokenB?.toString())
              }
            }
          ]}
          balanceValue={
            tokenB !== null
              ? printBN(tokens[tokenB.toString()].balance, tokens[tokenB.toString()].decimals)
              : ''
          }
          onBlur={() => {
            if (tokenA !== null && tokenB !== null && tokenBInputState.value.length === 0) {
              tokenBInputState.setValue('0.0')
            }

            tokenBInputState.setValue(trimDecimalZeros(tokenBInputState.value))
          }}
          {...tokenBInputState}
          priceLoading={priceBLoading}
          isBalanceLoading={isBalanceLoading}
          walletUninitialized={walletStatus !== Status.Initialized}
        />
      </Grid>
      {walletStatus !== Status.Initialized ? (
        <ChangeWalletButton
          margin='30px 0 30px 0'
          height={48}
          name='Connect wallet'
          onConnect={onConnectWallet}
          connected={false}
          onDisconnect={onDisconnectWallet}
          className={classes.connectWalletButton}
        />
      ) : getButtonMessage() === 'Insufficient ETH' ? (
        <TooltipHover
          title='More ETH is required to cover the transaction fee. Obtain more ETH to complete this transaction.'
          top={-10}>
          <div>
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
              disabled={getButtonMessage() !== 'Add Position'}
              content={getButtonMessage()}
              progress={progress}
            />
          </div>
        </TooltipHover>
      ) : (
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
          disabled={getButtonMessage() !== 'Add Position'}
          content={getButtonMessage()}
          progress={progress}
        />
      )}
    </Grid>
  )
}

export default DepositSelector
