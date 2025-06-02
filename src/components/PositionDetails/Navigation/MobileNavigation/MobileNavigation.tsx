import { Box } from '@mui/material'
import { INavigatePosition } from '@store/consts/types'
import { ArrowIcon2 } from '@static/componentIcon/ArrowIcon2'
import { ReverseTokensIcon } from '@static/componentIcon/ReverseTokensIcon'
import { useStyles } from './style'
import { colors } from '@static/theme'

type Props = {
  position: INavigatePosition | null
  direction: 'left' | 'right'
  onClick: () => void
}

export const MobileNavigation = ({ position, direction, onClick }: Props) => {
  const { classes } = useStyles({ disabled: !position })

  return (
    <Box
      className={classes.wrapper}
      flexDirection={direction === 'left' ? 'row' : 'row-reverse'}
      onClick={onClick}
      minHeight={20}>
      {position ? (
        <>
          <ArrowIcon2
            color={colors.invariant.text}
            width={16}
            style={direction === 'right' ? { transform: 'scale(-1)' } : {}}
          />
          <Box className={classes.iconContainer}>
            <img className={classes.icon} src={position.tokenXIcon} alt={position.tokenXName} />

            <ReverseTokensIcon color={colors.invariant.text} width={16} />

            <img className={classes.icon} src={position.tokenYIcon} alt={position.tokenYName} />
          </Box>
        </>
      ) : (
        <Box width={62} />
      )}
    </Box>
  )
}
