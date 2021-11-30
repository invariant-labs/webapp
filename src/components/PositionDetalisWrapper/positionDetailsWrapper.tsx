import React from 'react'
import SinglePositionDetails, { ILiquidityItem } from '@components/PositionDetalisWrapper/SinglePositionDetails/SinglePositionDetails'
import SinglePositionPlot from '@components/PositionDetalisWrapper/SinglePositionPlot/SinglePositionPlot'
import { Grid } from '@material-ui/core'
import useStyles from './style'

interface IProps {
  detailsData: Array<{ x: number; y: number }>
  plotMin: number
  plotMax: number
  zoomMinus: () => void
  zoomPlus: () => void
  disabled?: boolean
  style?: React.CSSProperties
  leftRangeIndex: number,
  rightRangeIndex: number,
  currentPrice: number,
  fromToken: string,
  toToken: string,
  positionData: ILiquidityItem
  liquidity: number
  unclaimedFee: number
  onClickClaimFee: () => void
  closePosition: () => void
  liqValueTokenToSwap: number
  liqValueTokenFromSwap: number
  unclaimValueTokenToSwap: number
  unclaimValueTokenFromSwap: number
}

const PositionDetailsWrapper: React.FC<IProps> = ({
  detailsData,
  plotMin,
  plotMax,
  zoomMinus,
  zoomPlus,
  style,
  leftRangeIndex,
  rightRangeIndex,
  currentPrice,
  fromToken,
  toToken,
  positionData,
  liquidity,
  unclaimedFee,
  onClickClaimFee,
  closePosition,
  liqValueTokenToSwap,
  liqValueTokenFromSwap,
  unclaimValueTokenToSwap,
  unclaimValueTokenFromSwap

}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.wrapperContainer}>
      <Grid className={classes.positionDetails}>
        <SinglePositionDetails
          data={positionData}
          liquidity={liquidity}
          unclaimedFee={unclaimedFee}
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
          style={style}
          disabled
          plotMin={plotMin}
          plotMax={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
          currentPrice={currentPrice}
          fromToken={fromToken}
          toToken={toToken}
          className={classes.zoom}
        />
      </Grid>
    </Grid>
  )
}

export default PositionDetailsWrapper
