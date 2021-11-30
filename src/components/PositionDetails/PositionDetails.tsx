import React from 'react'
import SinglePositionInfo, { ILiquidityItem } from '@components/PositionDetails/SinglePositionInfo/SinglePositionInfo'
import SinglePositionPlot from '@components/PositionDetails/SinglePositionPlot/SinglePositionPlot'
import { Grid } from '@material-ui/core'
import useStyles from './style'

interface IProps {
  detailsData: Array<{ x: number; y: number }>
  style?: React.CSSProperties
  leftRangeIndex: number
  rightRangeIndex: number
  midPriceIndex: number
  currentPrice: number
  fromToken: string
  toToken: string
  positionData: ILiquidityItem
  onClickClaimFee: () => void
  closePosition: () => void
  liqValueTokenToSwap: number
  liqValueTokenFromSwap: number
  unclaimValueTokenToSwap: number
  unclaimValueTokenFromSwap: number
  onZoomOutOfData: (min: number, max: number) => void
}

const PositionDetails: React.FC<IProps> = ({
  detailsData,
  style,
  leftRangeIndex,
  rightRangeIndex,
  midPriceIndex,
  currentPrice,
  fromToken,
  toToken,
  positionData,
  onClickClaimFee,
  closePosition,
  liqValueTokenToSwap,
  liqValueTokenFromSwap,
  unclaimValueTokenToSwap,
  unclaimValueTokenFromSwap,
  onZoomOutOfData

}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.wrapperContainer}>
      <Grid className={classes.positionDetails}>
        <SinglePositionInfo
          data={positionData}
          onClickClaimFee={onClickClaimFee}
          closePosition={closePosition}
          liqValueTokenToSwap={liqValueTokenToSwap}
          liqValueTokenFromSwap={liqValueTokenFromSwap}
          unclaimValueTokenToSwap={unclaimValueTokenToSwap}
          unclaimValueTokenFromSwap={unclaimValueTokenFromSwap}
        />
      </Grid>
      <Grid>
        <SinglePositionPlot
          data={detailsData}
          leftRangeIndex={leftRangeIndex}
          rightRangeIndex={rightRangeIndex}
          midPriceIndex={midPriceIndex}
          style={style}
          currentPrice={currentPrice}
          fromToken={fromToken}
          toToken={toToken}
          onZoomOutOfData={onZoomOutOfData}
        />
      </Grid>
    </Grid>
  )
}

export default PositionDetails
