import SearchInput from '@components/Inputs/SearchInput/SearchInput'
import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FarmTile, { IFarm } from './FarmTile/FarmTile'
import useStyle from './style'

export interface IFarmList {
  title: string
  data: IFarm[]
}
export const FarmList: React.FC<IFarmList> = ({ title, data }) => {
  const classes = useStyle()
  const [value, setValue] = useState('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase())
  }

  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography className={classes.title}>{title}</Typography>
        <SearchInput handleChange={handleChangeInput} value={value} />
      </Grid>
      <Grid>
        {data.length > 0
          ? data
              .filter(item => {
                return (
                  item.tokenX.symbol.toLowerCase().includes(value) ||
                  item.tokenY.symbol.toLowerCase().includes(value)
                )
              })
              .map(element => (
                <div className={classes.tile}>
                  <FarmTile
                    isActive={element.isActive}
                    apyPercent={element.apyPercent}
                    totalStaked={element.totalStaked}
                    liquidity={element.liquidity}
                    farmId={element.farmId}
                    tokenX={element.tokenX}
                    tokenY={element.tokenY}
                  />
                </div>
              ))
          : null}
      </Grid>
    </Grid>
  )
}

export default FarmList
