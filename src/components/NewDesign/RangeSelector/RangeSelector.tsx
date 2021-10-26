import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PriceRangePlot from '@components/NewDesign/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/NewDesign/RangeInput/RangeInput'
import useStyles from './style'

export interface IRangeSelector {
  data: Array<{ x: number; y: number }>
  midPriceIndex: number
  tokenFromSymbol: string
  tokenToSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPriceIndex,
  tokenFromSymbol,
  tokenToSymbol,
  onChangeRange
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.wrapper}>
      <Typography className={classes.header}>Price range</Typography>
      <Grid className={classes.innerWrapper}>
        <PriceRangePlot
          className={classes.plot}
          data={data}
          currentIndex={midPriceIndex}
          onChangeRange={onChangeRange}
        />
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid className={classes.inputs}>
          <RangeInput
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenFromSymbol}
            tokenToSymbol={tokenToSymbol}
          />
          <RangeInput
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenFromSymbol}
            tokenToSymbol={tokenToSymbol}
          />
        </Grid>
        <Grid>
          <Button className={classes.button}>Reset range</Button>
          <Button className={classes.button}>Set full range</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RangeSelector
