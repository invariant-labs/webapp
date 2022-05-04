import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import SearchInput from '@components/Inputs/SearchInput/SearchInput'
import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FarmTile, { IFarm } from './FarmTile/FarmTile'
import useStyle from './style'

export interface IFarmList {
  data: IFarm[]
  isLoadingTotals: boolean
}
export const FarmList: React.FC<IFarmList> = ({ data, isLoadingTotals }) => {
  const classes = useStyle()
  const [value, setValue] = useState('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase())
  }

  const filteredActive = data.filter(item => {
    return (
      !!item.isActive &&
      (item.tokenX.symbol.toLowerCase().includes(value) ||
        item.tokenY.symbol.toLowerCase().includes(value))
    )
  })

  const filteredInactive = data.filter(item => {
    return (
      !item.isActive &&
      (item.tokenX.symbol.toLowerCase().includes(value) ||
        item.tokenY.symbol.toLowerCase().includes(value))
    )
  })

  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.search}
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='center'>
        <SearchInput handleChange={handleChangeInput} value={value} />
      </Grid>
      {!filteredActive.length && !filteredInactive.length ? (
        <Grid container direction='column' alignItems='center'>
          <EmptyPlaceholder
            className={classes.empty}
            desc={
              value.length
                ? 'There are no farms matching this case'
                : 'There are no existing farms at this moment'
            }
          />
        </Grid>
      ) : null}
      {filteredActive.length > 0 ? (
        <>
          <Grid
            className={classes.header}
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.title}>Active farms</Typography>
          </Grid>
          <Grid container direction='column' alignItems='center'>
            {filteredActive.map((element, index) => (
              <div className={classes.tile}>
                <FarmTile key={index} {...element} isLoadingTotals={isLoadingTotals} />
              </div>
            ))}
          </Grid>
        </>
      ) : null}

      {filteredInactive.length > 0 ? (
        <>
          <Grid
            className={classes.header}
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.title}>Inactive farms</Typography>
          </Grid>
          <Grid container direction='column' alignItems='center'>
            {filteredInactive.map((element, index) => (
              <div className={classes.tile}>
                <FarmTile key={index} {...element} isLoadingTotals={isLoadingTotals} />
              </div>
            ))}
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}

export default FarmList
