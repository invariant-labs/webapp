import { colors } from '@static/theme'
import { useStyles } from './styles'

type Props = {
  size?: number | string
  isHorizontal?: boolean
  color?: string
}

export const Separator = ({
  size = 'auto',
  isHorizontal = false,
  color = colors.invariant.componentBcg
}: Props) => {
  const { classes } = useStyles({ size, isHorizontal, color })

  return <hr className={classes.separator} />
}
