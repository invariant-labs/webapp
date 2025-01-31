import { Grid } from '@mui/material'
import React from 'react'
import useStyles from './styles'
import { useParams, useSearchParams } from 'react-router-dom'
import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'

type RouteParams = {
  item1?: string
  item2?: string
  item3?: string
  concentration?: string
  range?: string
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

  if (params.item3) {
    initialValues.tokenFrom = params.item1 || ''
    initialValues.tokenTo = params.item2 || ''
    initialValues.fee = params.item3
  } else if (params.item2) {
    initialValues.tokenFrom = params.item1 || ''
    initialValues.fee = params.item2
  } else if (params.item1) {
    initialValues.fee = params.item1
  }

  return initialValues
}

const NewPositionPage: React.FC = () => {
  const { classes } = useStyles()
  const params = useParams<keyof RouteParams>()
  const { tokenFrom, tokenTo, fee } = getInitialValues(params)
  const [searchParams] = useSearchParams()
  const concentration = searchParams?.get('conc')
  const isRange = searchParams?.get('range')

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper
          initialTokenFrom={tokenFrom}
          initialTokenTo={tokenTo}
          initialFee={fee}
          initialConcentration={concentration && +concentration ? concentration : '34'}
          initialIsRange={isRange ? isRange?.toLocaleLowerCase() === 'true' : null}
        />
      </Grid>
    </Grid>
  )
}

export default NewPositionPage
