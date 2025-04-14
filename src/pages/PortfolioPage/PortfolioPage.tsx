import { Grid } from '@mui/material'
import useStyles from './styles'
import PortfolioWrapper from '@containers/PortfolioWrapper/PortfolioWrapper'

const PortfolioPage: React.FC = () => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <PortfolioWrapper />
      </Grid>
    </Grid>
  )
}

export default PortfolioPage
