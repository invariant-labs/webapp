import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import useStyle from './style'
import icons from '@static/icons'
import classNames from 'classnames'
import Clock from '@static/svg/Clock.svg'

interface IDOLabelInterface {
  Sale: string
  Grace: string
  SOL: string
  Estimated: string
  Invariant: string
  SolToken: string
  EstToken: string
}

const IDOLabel: React.FC<IDOLabelInterface> = ({
  Sale,
  Grace,
  Invariant,
  Estimated,
  SOL,
  SolToken,
  EstToken
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.lableContainer}>
      <Grid className={classes.lightLabelContainer}>
        <Typography component='p'>Sale period ends in</Typography>
        <Box className={classes.timeContainer}>
          <CardMedia className={classes.image} image={Clock} />
          <Typography component='h1'>{Sale}</Typography>
        </Box>
      </Grid>
      <Grid className={classes.DarkPanelContainer}>
        <Typography component='p'>Grace period ends in</Typography>
        <Box className={classes.timeContainer}>
          <CardMedia className={classes.image} image={Clock} />
          <Typography component='h1'>{Grace}</Typography>
        </Box>
      </Grid>
      <Grid className={classes.lightLabelContainer}>
        <Typography component='p'>SOL Contibuted</Typography>
        <Box className={classes.timeContainer}>
          <CardMedia className={classNames(classes.image, classes.Token)} image={SolToken} />
          <Typography component='h1'>{SOL}</Typography>
        </Box>
      </Grid>
      <Grid className={classes.DarkPanelContainer}>
        <Typography component='p'>Estimated token price</Typography>
        <Box className={classes.timeContainer}>
          <CardMedia className={classNames(classes.image, classes.Token)} image={EstToken} />
          <Typography component='h1'>{Estimated}</Typography>
        </Box>
      </Grid>
      <Grid className={classes.lightLabelContainer}>
        <Typography component='p'>INVARIANT for sale</Typography>
        <Box className={classes.timeContainer}>
          <CardMedia className={classes.image} image={icons.LogoShort} />
          <Typography component='h1'>{Invariant}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDOLabel
