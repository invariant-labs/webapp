import { Grid } from '@material-ui/core'
import React from 'react'
import { useStyles } from './style'

interface PositionsItem {
  icon: string
  decimals: number
  value: number
  symbol: string
  secondIcon: string
  secondValue: number
  secondSymbol: string
  vestPeriod: string
}

const PositionsItem: React.FC<PositionsItem> = ({
  icon,
  decimals,
  value,
  symbol,
  secondIcon,
  secondValue,
  secondSymbol,
  vestPeriod
}) => {
  const classes = useStyles

  return <Grid></Grid>
}
