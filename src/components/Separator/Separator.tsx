import { useStyles } from './styles'

type Props = {
  size?: number | string
  isHorizontal?: boolean
}

export const Separator = ({ size = 'auto', isHorizontal = false }: Props) => {
  const { classes } = useStyles({ size, isHorizontal })

  return <hr className={classes.separator} />
}
