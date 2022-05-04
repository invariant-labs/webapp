import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import { Grid } from '@material-ui/core'
import React from 'react'
import BondHeader from './BondHeader/BondHeader'
import BondItem, { IBondItem } from './BondItem/BondItem'
import { useStyles } from './style'

interface IBondListInterface {
  data: IBondItem[]
}

const BondList: React.FC<IBondListInterface> = ({ data }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <BondHeader />
      {data.length > 0 ? (
        data.map((element, index) => <BondItem key={index} {...element} />)
      ) : (
        <Grid className={classes.empty} container justifyContent='center'>
          <EmptyPlaceholder desc='There are no bonds for sale at the moment' />
        </Grid>
      )}
    </Grid>
  )
}

export default BondList
