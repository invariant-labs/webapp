import React from 'react'
import SinglePositionInfo, {
  ILiquidityItem
} from '@components/PositionDetails/SinglePositionInfo/SinglePositionInfo'
import SinglePositionPlot from '@components/PositionDetails/SinglePositionPlot/SinglePositionPlot'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import backIcon from '@static/svg/back-arrow.svg'
import AddIcon from '@material-ui/icons/AddOutlined'
import useStyles from './style'
import { PlotTickData } from '@reducers/positions'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'

interface IProps {
  detailsData: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  currentPrice: number
  tokenY: string
  tokenX: string
  positionData: ILiquidityItem
  onClickClaimFee: () => void
  closePosition: () => void
  tokenXLiqValue: number
  tokenYLiqValue: number
  tokenXClaimValue: number
  tokenYClaimValue: number
  onZoomOut: (min: number, max: number) => void
  ticksLoading: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
}

const PositionDetails: React.FC<IProps> = ({
  detailsData,
  leftRange,
  rightRange,
  midPrice,
  currentPrice,
  tokenY,
  tokenX,
  positionData,
  onClickClaimFee,
  closePosition,
  tokenXLiqValue,
  tokenYLiqValue,
  tokenXClaimValue,
  tokenYClaimValue,
  onZoomOut,
  ticksLoading,
  xDecimal,
  yDecimal,
  tickSpacing
}) => {
  const classes = useStyles()

  const history = useHistory()

  return (
    <Grid container className={classes.wrapperContainer} wrap='nowrap'>
      <Grid className={classes.positionDetails} container item direction='column'>
        <Link to='/pool' style={{ textDecoration: 'none' }}>
          <Grid className={classes.back} container item alignItems='center'>
            <img className={classes.backIcon} src={backIcon} />
            <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
          </Grid>
        </Link>

        <SinglePositionInfo
          data={positionData}
          onClickClaimFee={onClickClaimFee}
          closePosition={closePosition}
          tokenXLiqValue={tokenXLiqValue}
          tokenYLiqValue={tokenYLiqValue}
          tokenXClaimValue={tokenXClaimValue}
          tokenYClaimValue={tokenYClaimValue}
        />
      </Grid>
      <Grid
        container
        item
        direction='column'
        alignItems='flex-end'
        className={classes.right}
        wrap='nowrap'>
        <Button
          className={classes.button}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => {
            history.push('/newPosition')
          }}>
          <span className={classes.buttonText}>Add Liquidity</span>
        </Button>

        <SinglePositionPlot
          data={
            detailsData.length
              ? detailsData
              : Array(100)
                  .fill(1)
                  .map((_e, index) => ({ x: index, y: index, index }))
          }
          leftRange={leftRange}
          rightRange={rightRange}
          midPrice={midPrice}
          currentPrice={currentPrice}
          tokenY={tokenY}
          tokenX={tokenX}
          onZoomOut={onZoomOut}
          positionData={positionData}
          ticksLoading={ticksLoading}
          tickSpacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
        />
      </Grid>
    </Grid>
  )
}

export default PositionDetails
