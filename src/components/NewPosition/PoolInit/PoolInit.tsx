import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import {
  calcPrice,
  nearestTickIndex,
  formatNumbers,
  showPrefix,
  toMaxNumericPlaces
} from '@consts/utils'
import SimpleInput from '@components/Inputs/SimpleInput/SimpleInput'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { getMinTick, getMaxTick } from '@invariant-labs/sdk/lib/utils'

export interface IPoolInit {
  tokenASymbol: string
  tokenBSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
  midPrice: number
  onChangeMidPrice: (mid: number) => void
  currentPairReversed: boolean | null
  globalPrice?: number
}

export const PoolInit: React.FC<IPoolInit> = ({
  tokenASymbol,
  tokenBSymbol,
  onChangeRange,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing,
  midPrice,
  onChangeMidPrice,
  currentPairReversed,
  globalPrice
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(tickSpacing * 10 * (isXtoY ? -1 : 1))
  const [rightRange, setRightRange] = useState(tickSpacing * 10 * (isXtoY ? 1 : -1))

  const [leftInput, setLeftInput] = useState(
    calcPrice(leftRange, isXtoY, xDecimal, yDecimal).toString()
  )
  const [rightInput, setRightInput] = useState(
    calcPrice(rightRange, isXtoY, xDecimal, yDecimal).toString()
  )

  const [leftInputRounded, setLeftInputRounded] = useState((+leftInput).toFixed(12))
  const [rightInputRounded, setRightInputRounded] = useState((+rightInput).toFixed(12))

  const [midPriceInput, setMidPriceInput] = useState(
    calcPrice(midPrice, isXtoY, xDecimal, yDecimal).toString()
  )

  useEffect(() => {
    onChangeMidPrice(nearestTickIndex(+midPriceInput, tickSpacing, isXtoY, xDecimal, yDecimal))
  }, [midPriceInput])

  const setLeftInputValues = (val: string) => {
    setLeftInput(val)
    setLeftInputRounded(toMaxNumericPlaces(+val, 5))
  }

  const setRightInputValues = (val: string) => {
    setRightInput(val)
    setRightInputRounded(toMaxNumericPlaces(+val, 5))
  }

  const onLeftInputChange = (val: string) => {
    setLeftInput(val)
    setLeftInputRounded(val)
  }

  const onRightInputChange = (val: string) => {
    setRightInput(val)
    setRightInputRounded(val)
  }

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInputValues(calcPrice(left, isXtoY, xDecimal, yDecimal).toString())
    setRightInputValues(calcPrice(right, isXtoY, xDecimal, yDecimal).toString())

    onChangeRange(left, right)
  }

  const resetRange = () => {
    changeRangeHandler(tickSpacing * 10 * (isXtoY ? -1 : 1), tickSpacing * 10 * (isXtoY ? 1 : -1))
  }

  useEffect(() => {
    changeRangeHandler(leftRange, rightRange)
  }, [midPrice])

  const validateMidPriceInput = (midPriceInput: string) => {
    let minMidPriceInput = isXtoY
      ? calcPrice(getMinTick(tickSpacing), isXtoY, xDecimal, yDecimal).toString()
      : calcPrice(getMaxTick(tickSpacing), isXtoY, xDecimal, yDecimal).toString()
    let maxMidPriceInput = isXtoY
      ? calcPrice(getMaxTick(tickSpacing), isXtoY, xDecimal, yDecimal).toString()
      : calcPrice(getMinTick(tickSpacing), isXtoY, xDecimal, yDecimal).toString()

    let validatedMidPriceInput: string = midPriceInput

    if (+midPriceInput < +minMidPriceInput) {
      validatedMidPriceInput = minMidPriceInput
    } else if (+midPriceInput > +maxMidPriceInput) {
      validatedMidPriceInput = maxMidPriceInput
    }

    return validatedMidPriceInput
  }

  useEffect(() => {
    if (currentPairReversed !== null) {
      const validatedMidPrice = validateMidPriceInput((1 / +midPriceInput).toString())

      setMidPriceInput(validatedMidPrice)
      changeRangeHandler(rightRange, leftRange)
    }
  }, [currentPairReversed])

  const price = useMemo(
    () => calcPrice(midPrice, isXtoY, xDecimal, yDecimal),
    [midPrice, isXtoY, xDecimal, yDecimal]
  )

  return (
    <Grid container direction='column' className={classes.wrapper}>
      <Typography className={classes.header}>Starting price</Typography>
      <Grid
        container
        className={classes.innerWrapper}
        direction='column'
        justifyContent='flex-start'>
        <Grid className={classes.infoWrapper}>
          <Typography className={classes.info}>
            This pool does not exist yet. To create it, select the fee tier, initial price, and
            enter the amount of tokens. The estimated cost of creating a pool is 0.1 SOL.
          </Typography>
        </Grid>

        <SimpleInput
          setValue={setMidPriceInput}
          value={midPriceInput}
          decimal={isXtoY ? xDecimal : yDecimal}
          className={classes.midPrice}
          placeholder='0.0'
          globalPrice={globalPrice}
          onBlur={e => {
            setMidPriceInput(validateMidPriceInput(e.target.value))
          }}
        />

        <Grid
          className={classes.priceWrapper}
          container
          justifyContent='space-between'
          alignItems='center'>
          <Typography className={classes.priceLabel}>{tokenASymbol} starting price: </Typography>
          <Typography className={classes.priceValue}>
            <AnimatedNumber
              value={price.toFixed(isXtoY ? xDecimal : yDecimal)}
              duration={300}
              formatValue={formatNumbers()}
            />
            {showPrefix(price)} {tokenBSymbol}
          </Typography>
        </Grid>

        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
          <RangeInput
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={leftInputRounded}
            setValue={onLeftInputChange}
            decreaseValue={() => {
              const newLeft = isXtoY
                ? Math.max(getMinTick(tickSpacing), leftRange - tickSpacing)
                : Math.min(getMaxTick(tickSpacing), leftRange + tickSpacing)
              changeRangeHandler(newLeft, rightRange)
            }}
            increaseValue={() => {
              const newLeft = isXtoY
                ? Math.min(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.max(rightRange + tickSpacing, leftRange - tickSpacing)

              changeRangeHandler(newLeft, rightRange)
            }}
            onBlur={() => {
              const newLeft = isXtoY
                ? Math.min(
                    rightRange - tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.max(
                    rightRange + tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )

              changeRangeHandler(newLeft, rightRange)
            }}
            diffLabel='Min - Current price'
            percentDiff={((+leftInput - price) / price) * 100}
          />
          <RangeInput
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={rightInputRounded}
            setValue={onRightInputChange}
            decreaseValue={() => {
              const newRight = isXtoY
                ? Math.max(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.min(rightRange + tickSpacing, leftRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            increaseValue={() => {
              const newRight = isXtoY
                ? Math.min(getMaxTick(tickSpacing), rightRange + tickSpacing)
                : Math.max(getMinTick(tickSpacing), rightRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            onBlur={() => {
              const newRight = isXtoY
                ? Math.max(
                    leftRange + tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.min(
                    leftRange - tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
              changeRangeHandler(leftRange, newRight)
            }}
            diffLabel='Max - Current price'
            percentDiff={((+rightInput - price) / price) * 100}
          />
        </Grid>
        <Grid container className={classes.buttons}>
          <Button className={classes.button} onClick={resetRange}>
            Reset range
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              changeRangeHandler(
                isXtoY ? getMinTick(tickSpacing) : getMaxTick(tickSpacing),
                isXtoY ? getMaxTick(tickSpacing) : getMinTick(tickSpacing)
              )
            }}>
            Set full range
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PoolInit
