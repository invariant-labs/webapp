import { Grid } from '@material-ui/core'
import React from 'react'
import HeaderList from '../HeaderList/HeaderList'
import PositionsItem, { IPositionsItem } from '../PositionsItem/PositionsItem'
import { useStyles } from './style'

interface IPositionsListInterface {
  data: IPositionsItem[]
}

const PositionsList: React.FC<IPositionsListInterface> = ({ data }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <HeaderList />
      {data.map((element, index) => (
        <PositionsItem key={index} {...element} />
      ))}
    </Grid>
  )
}

export default PositionsList
