import { colors } from '@static/theme'
import { useStyles } from './styles'

type Props = {
  size?: number | string
  isHorizontal?: boolean
  color?: string
  margin?: string
  width?: number
}

export const Separator = ({
  size = 'auto',
  isHorizontal = false,
  margin = '0',
  color = colors.invariant.componentBcg,
  width
}: Props) => {
  const { classes } = useStyles({ size, isHorizontal, color, margin, width })

  return <hr className={classes.separator} />
}
