import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { typography } from '@static/theme'
import {
  TokenColorOverride,
  useAverageLogoColor
} from '@store/hooks/userOverview/useAverageLogoColor'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './styles'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { warning2Icon } from '@static/icons'
import { TokenPositionEntry } from '@store/types/userOverview'

interface LegendOverviewProps {
  sortedTokens: TokenPositionEntry[]
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
  sortedTokens,
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
          height: getContainerHeight(sortedTokens.length),
          overflowY: sortedTokens.length <= 5 ? 'hidden' : 'auto'
        }}>
        {sortedTokens.map(token => {
          const textColor = getTokenColor(
            token.token,
            logoColors[token.logo ?? ''] ?? '',
            tokenColorOverrides
          )
          return (
            <Grid item container className={classes.tokenRow} key={token.token}>
              <Grid item xs={2} alignContent='center' className={classes.logoContainer}>
                <img src={token.logo} alt={`${token.token} logo`} className={classes.logo} />
              </Grid>

              <Grid item xs={3} alignContent='center'>
                <Typography style={{ ...typography.heading4, color: textColor }}>
                  {token.token}
                </Typography>
              </Grid>

              <Grid
                display='flex'
                item
                justifyContent='flex-end'
                xs={7}
                alignContent='center'
                gap={'8px'}>
                <Typography className={classes.valueText}>
                  ${formatNumberWithoutSuffix(token.value, { twoDecimals: true })}
                </Typography>
                {token.isPriceWarning && (
                  <TooltipHover title='The price might not be shown correctly'>
                    <img src={warning2Icon} width={14} />
                  </TooltipHover>
                )}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
