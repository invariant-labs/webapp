// import React from 'react'
// import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
// import useStyle from './style'
// import icons from '@static/icons'
// import classNames from 'classnames'
// import Clock from '@static/svg/Clock.svg'

// interface IdoLabelInterface {
//   sale: string
//   grace: string
//   sol: string
//   estimated: string
//   invariant: string
//   solToken: string
//   estToken: string
// }

// const IdoLabel: React.FC<IdoLabelInterface> = ({
//   sale,
//   grace,
//   invariant,
//   estimated,
//   sol,
//   solToken,
//   estToken
// }) => {
//   const classes = useStyle()

//   return (
//     <Grid className={classes.lableContainer}>
//       <Grid className={classNames(classes.lightLabelContainer, classes.topLabelRadius)}>
//         <Typography component='p'>Sale period ends in</Typography>
//         <Box className={classes.timeContainer}>
//           <CardMedia className={classNames(classes.image, classes.smallImage)} image={Clock} />
//           <Typography component='h1'>{sale}</Typography>
//         </Box>
//       </Grid>
//       <Grid className={classes.DarkPanelContainer}>
//         <Typography component='p'>Grace period ends in</Typography>
//         <Box className={classes.timeContainer}>
//           <CardMedia className={classNames(classes.image, classes.smallImage)} image={Clock} />
//           <Typography component='h1'>{grace}</Typography>
//         </Box>
//       </Grid>
//       <Grid className={classes.lightLabelContainer}>
//         <Typography component='p'>SOL Contibuted</Typography>
//         <Box className={classes.timeContainer}>
//           <CardMedia className={classNames(classes.image, classes.Token)} image={solToken} />
//           <Typography component='h1'>{sol}</Typography>
//         </Box>
//       </Grid>
//       <Grid className={classes.DarkPanelContainer}>
//         <Typography component='p'>Estimated token price</Typography>
//         <Box className={classes.timeContainer}>
//           <CardMedia className={classNames(classes.image, classes.Token)} image={estToken} />
//           <Typography component='h1'>{estimated}</Typography>
//         </Box>
//       </Grid>
//       <Grid className={classNames(classes.lightLabelContainer, classes.bottomLabelRadius)}>
//         <Typography component='p'>INVARIANT for sale</Typography>
//         <Box className={classes.timeContainer}>
//           <CardMedia className={classes.image} image={icons.LogoShort} />
//           <Typography component='h1'>{invariant}</Typography>
//         </Box>
//       </Grid>
//     </Grid>
//   )
// }

// export default IdoLabel
