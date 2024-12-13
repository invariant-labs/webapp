import WrappedPositionsList from '@containers/WrappedPositionsList/WrappedPositionsList'
import { Grid } from '@mui/material'
import useStyles from './styles'

const PortfolioPage: React.FC = () => {
  const { classes } = useStyles()
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <WrappedPositionsList />
      </Grid>
    </Grid>
  )
}

export default PortfolioPage
