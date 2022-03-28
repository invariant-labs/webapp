import React from 'react'
import SingleFarmwrapper from '@containers/SingleFarmWrapper/SingleFarmWrapper'
import { Grid } from '@material-ui/core'

interface IProps {
    id: string
}

const SingleFarmPage: React.FC<IProps> = ({id}) => {
  return (
    <Grid><SingleFarmwrapper id={id}/></Grid>
  )
}

export default SingleFarmPage