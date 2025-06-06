import { Box, Grid, Typography } from '@mui/material'
import { INavigatePosition } from '@store/consts/types'
import { colors, typography } from '@static/theme'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { swapListIcon } from '@static/icons'
import { ArrowIcon } from '@static/componentIcon/ArrowIcon'
import { useStyles } from './style'

type Props = {
  position: INavigatePosition | null
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
}

export const DesktopNavigation = ({ position, direction, onClick, disabled }: Props) => {
  const { classes } = useStyles({ direction, disabled })

  return (
    <Box className={classes.wrapper}>
      <TooltipHover
        allowEnterTooltip={!disabled}
        title={
          position && (
            <Box display='flex' flexDirection='column' alignItems='center' width={129}>
              <Typography color={colors.invariant.textGrey} style={typography.body2} mb={'4px'}>
                Next position
              </Typography>
              <Grid container item className={classes.iconContainer} mb={'4px'}>
                <img
                  className={classes.icon}
                  src={position.tokenXIcon}
                  alt={position.tokenXName}
                  width={24}
                  height={24}
                />

                <img src={swapListIcon} alt='Arrow' width={24} />

                <img
                  className={classes.icon}
                  src={position.tokenYIcon}
                  alt={position.tokenYName}
                  width={24}
                  height={24}
                />
              </Grid>

              <Typography color={colors.invariant.text} style={typography.body1}>
                {position.tokenXName + ' - ' + position.tokenYName}
              </Typography>
              <Typography color={colors.invariant.textGrey} style={typography.body1}>
                {position.fee + '% fee'}
              </Typography>
            </Box>
          )
        }
        top={'50%'}
        increasePadding>
        <ArrowIcon className={classes.arrow} onClick={onClick} />
      </TooltipHover>
    </Box>
  )
}
