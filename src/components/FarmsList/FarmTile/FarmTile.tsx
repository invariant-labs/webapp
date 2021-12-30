import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbers, showPrefix } from '@consts/utils'
import useStyle from './style'
import { Token } from '@consts/static'
import { Link } from 'react-router-dom'

export interface IFarm {
  isActive: boolean
  apyPercent: number
  totalStaked: number
  liquidity: number
  tokenX: Token
  tokenY: Token
  farmId: string
}

export const FarmTile: React.FC<IFarm> = ({
  isActive,
  apyPercent,
  totalStaked,
  liquidity,
  tokenX,
  tokenY,
  farmId
}) => {
  const classes = useStyle()

  return (
    <Grid>
      <Grid>
        <Grid>
          <img src={tokenX.logoURI} />
          <img src={tokenY.logoURI} />
        </Grid>
        <Typography>{tokenX.symbol}-{tokenY.symbol}</Typography>
        <Grid>
          <Typography>{isActive ? 'Active' : 'Inactive'}</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Typography>APY:</Typography>
        <Typography>{apyPercent}%</Typography>
      </Grid>
      <Grid>
        <Typography>Total Staked:</Typography>
        <Typography>{totalStaked}</Typography>
      </Grid>
      <Grid>
        <Typography>Liquidity:</Typography>
        <Typography>{liquidity}</Typography>
      </Grid>
      <Link to={`/farms/${farmId}`}>
        <a>
          <Button>Stake</Button>
        </a>
      </Link>
    </Grid>
  )
}

export default FarmTile
