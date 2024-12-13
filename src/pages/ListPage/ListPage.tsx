import { Grid } from '@mui/material'
import useStyles from './styles'
import PopularPoolsWrapper from '@containers/PopularPoolsWrapper/PopularPoolsWrapper'
import { WrappedPoolList } from '@containers/WrappedPoolList/WrappedPoolList'

const ListPage: React.FC = () => {
  const { classes } = useStyles()
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <PopularPoolsWrapper />
        <WrappedPoolList />
      </Grid>
    </Grid>
  )
}

export default ListPage
