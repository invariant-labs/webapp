import { Grid, Typography } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import React, { useState, useRef } from 'react'
import PositionSettings from '../Modals/PositionSettings/PositionSettings'
import DepositSelector from './DepositSelector/DepositSelector'
import RangeSelector from './RangeSelector/RangeSelector'
import settingsIcon from '@static/svg/settings_ic.svg'
import useStyles from './style'

export interface INewPosition {
  tokens: Array<{ symbol: string, name: string, icon: string, walletAmount: number, address: PublicKey }>
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  addLiquidityHandler: (
    token1: PublicKey,
    token2: PublicKey,
    token1Amount: number,
    token2Amount: number,
    leftTickIndex: number,
    rightTickIndex: number,
    feeTier: number,
    slippageTolerance: number
  ) => void
}

export const INewPosition: React.FC<INewPosition> = ({
  tokens,
  data,
  midPriceIndex,
  addLiquidityHandler
}) => {
  const classes = useStyles()

  const settingsRef = useRef<HTMLDivElement>(null)

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1)
  const [feeTier, setFeeTier] = useState<number>(0.05)

  const [leftRange, setLeftRange] = useState(0)
  const [rightRange, setRightRange] = useState(0)

  const [token1Index, setToken1Index] = useState<number | null>(null)
  const [token2Index, setToken2Index] = useState<number | null>(null)

  return (
    <Grid container className={classes.wrapper}>
      <Grid container className={classes.top} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography className={classes.title}>Add new liquidity position</Typography>

        <Grid
          className={classes.settings}
          ref={settingsRef}
          onClick={() => { setSettingsOpen(true) }}
          container
          item
          alignItems='center'
        >
          <img className={classes.settingsIcon} src={settingsIcon} />
          <Typography className={classes.settingsText}>Position settings</Typography>
        </Grid>
      </Grid>

      <Grid container direction='row' justifyContent='space-between'>
        <DepositSelector
          tokens={tokens}
          setPositionTokens={(index1, index2) => {
            setToken1Index(index1)
            setToken2Index(index2)
          }}
          setFeeValue={setFeeTier}
          token1Max={token1Index !== null ? tokens[token1Index].walletAmount : 0}
          token2Max={token2Index !== null ? tokens[token2Index].walletAmount : 0}
          onAddLiquidity={
            (token1Amount, token2Amount) => {
              if (token1Index !== null && token2Index !== null) {
                addLiquidityHandler(
                  tokens[token1Index].address,
                  tokens[token2Index].address,
                  token1Amount,
                  token2Amount,
                  leftRange,
                  rightRange,
                  feeTier,
                  slippageTolerance
                )
              }
            }
          }
        />

        <RangeSelector
          data={data}
          midPriceIndex={midPriceIndex}
          tokenFromSymbol={token1Index !== null ? tokens[token1Index].symbol : 'ABC'}
          tokenToSymbol={token2Index !== null ? tokens[token2Index].symbol : 'XYZ'}
          onChangeRange={
            (left, right) => {
              setLeftRange(left)
              setRightRange(right)
            }
          }
        />
      </Grid>

      <PositionSettings
        open={settingsOpen}
        anchorEl={settingsRef.current}
        handleClose={() => { setSettingsOpen(false) }}
        slippageTolerance={slippageTolerance}
        onChangeSlippageTolerance={setSlippageTolerance}
        autoSetSlippageTolerance={() => { setSlippageTolerance(1) }}
      />
    </Grid>
  )
}

export default INewPosition
