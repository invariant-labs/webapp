import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { typography } from '@static/theme'
import {
  TokenColorOverride,
  useAverageLogoColor
} from '@store/hooks/userOverview/useAverageLogoColor'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './styles'

interface Position {
  token: string
  logo?: string
  value: number
}

interface LegendOverviewProps {
  sortedPositions: Position[]
  logoColors: Record<string, string>
  tokenColorOverrides: TokenColorOverride[]
}

const getContainerHeight = (length: number): string => {
  if (length <= 2) return '70px'
  if (length <= 3) return '100px'
  if (length <= 4) return '130px'
  return '160px'
}

export const LegendOverview: React.FC<LegendOverviewProps> = ({
  sortedPositions,
  logoColors,
  tokenColorOverrides
}) => {
  const { getTokenColor } = useAverageLogoColor()
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Typography className={classes.tokenHeaderLabel}>Tokens</Typography>

      <Grid
        container
        spacing={1}
        className={classes.scrollContainer}
        sx={{
          height: getContainerHeight(sortedPositions.length),
          overflowY: sortedPositions.length <= 5 ? 'hidden' : 'auto'
        }}>
        {sortedPositions.map(position => {
          const textColor = getTokenColor(
            position.token,
            logoColors[position.logo ?? ''] ?? '',
            tokenColorOverrides
          )
          return (
            <Grid key={position.token} item container className={classes.tokenRow}>
              <Grid item xs={2} alignContent='center' className={classes.logoContainer}>
                <img src={position.logo} alt={`${position.token} logo`} className={classes.logo} />
              </Grid>

              <Grid item xs={3} alignContent='center'>
                <Typography style={{ ...typography.heading4, color: textColor }}>
                  {position.token}
                </Typography>
              </Grid>

              <Grid item xs={7} alignContent='center'>
                <Typography className={classes.valueText}>
                  ${formatNumberWithoutSuffix(position.value, { twoDecimals: true })}
                </Typography>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
