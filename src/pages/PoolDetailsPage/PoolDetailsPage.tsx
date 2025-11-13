import { Grid } from '@mui/material'
import React from 'react'
import useStyles from './style'
import { useParams } from 'react-router-dom'
import PoolDetailsWrapper from '@containers/PoolDetailsWrapper/PoolDetailsWrapper'

type RouteParams = {
  item1?: string
  item2?: string
  item3?: string
}

interface InitialValues {
  tokenFrom: string
  tokenTo: string
  fee: string
}

const getInitialValues = (params: RouteParams): InitialValues => {
  const initialValues: InitialValues = {
    tokenFrom: '',
    tokenTo: '',
    fee: ''
  }

  initialValues.tokenFrom = params.item1 || ''
  initialValues.tokenTo = params.item2 || ''
  initialValues.fee = params.item3 || ''

  return initialValues
}

const PoolDetailsPage: React.FC = () => {
  const { classes } = useStyles()
  const params = useParams<keyof RouteParams>()
  const { tokenFrom, tokenTo, fee } = getInitialValues(params)

  return (
    <Grid container className={classes.container}>
      <PoolDetailsWrapper initialTokenFrom={tokenFrom} initialTokenTo={tokenTo} initialFee={fee} />
    </Grid>
  )
}

export default PoolDetailsPage
