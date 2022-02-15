import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import useStyle from './style'
import { colors } from '@static/theme'

interface IProps {
  TVL?: string
  volume?: string
  fee?: string
  displayType: string
  symbolFrom?: string
  symbolTo?: string
  iconFrom?: string
  iconTo?: string
  tokenIndex?: number
}

const PoolListItem: React.FC<IProps> = ({
  fee = '0',
  volume = '0',
  TVL = '0',
  displayType,
  symbolFrom,
  symbolTo,
  iconFrom,
  iconTo,
  tokenIndex
}) => {
  const classes = useStyle()
  return (
    <Grid>
      {displayType === 'token' ? (
        <Grid
          container
          classes={{ container: classes.container, root: classes.header }}
          style={{ color: colors.white.main }}>
          <Typography>{tokenIndex}</Typography>
          <Grid className={classes.imageContainer}>
            <Box>
              <img src={iconFrom} />
              <img src={iconTo} />
            </Box>
            <Box className={classes.symbolsContainer}>
              <Typography>{symbolFrom}</Typography>/<Typography>{symbolTo}</Typography>
            </Box>
          </Grid>
          <Typography>{fee}%</Typography>
          <Typography>${volume}</Typography>
          <Typography>${TVL}</Typography>
        </Grid>
      ) : (
        <Grid container classes={{ container: classes.container, root: classes.header }}>
          <Typography style={{ lineHeight: '20px' }}>
            N<sup>o</sup>
          </Typography>
          <Grid>
            <Typography>Name</Typography>
          </Grid>
          <Typography>fee</Typography>
          <Typography>Volume 24H</Typography>
          <Typography>TVL</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default PoolListItem
