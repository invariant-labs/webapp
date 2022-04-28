import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import SearchInput from '@components/Inputs/SearchInput/SearchInput'
import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FarmTile, { IFarm } from './FarmTile/FarmTile'
import useStyle from './style'

export interface IFarmList {
  title: string
  data: IFarm[]
  emptyDesc: string
  isLoadingTotals: boolean
}
export const FarmList: React.FC<IFarmList> = ({ title, data, emptyDesc, isLoadingTotals }) => {
  const classes = useStyle()
  const [value, setValue] = useState('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase())
  }

  const filteredData = data.filter(item => {
    return (
      item.tokenX.symbol.toLowerCase().includes(value) ||
      item.tokenY.symbol.toLowerCase().includes(value)
    )
  })

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
      <Grid container direction='column' alignItems='center'>
        {filteredData.length > 0 ? (
          filteredData.map((element, index) => (
            <div className={classes.tile}>
              <FarmTile key={index} {...element} isLoadingTotals={isLoadingTotals} />
            </div>
          ))
        ) : (
          <EmptyPlaceholder
            className={classes.empty}
            desc={data.length === 0 ? emptyDesc : 'There are no farms matching this case'}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default FarmList
