import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles'
import WrappedIdo from '../../containers/WrappedIdo/WrappedIdo'
import IdoTable from '../../containers/IdoTable/IdoTable'

export const IdoPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
            <WrappedIdo/>
            <IdoTable
              saleTime={'15:30:33'}
              graceTime={'32:29:27'}
              sol={'122 124 846'}
              estPrice={'218.839'}
              invariant={'20 000 0000'}
            />
    </Grid>
    )
}