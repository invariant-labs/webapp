import { ButtonProps, Button as MuiButton } from '@mui/material'
import classNames from 'classnames'
import useStyles from './style'

type Props = {
  scheme: 'normal' | 'green' | 'pink' | 'rainbow'
  disabled?: boolean
  margin?: string | number
  height?: string | number
  width?: string | number
  borderRadius?: string | number
  padding?: string | number
  children: React.ReactNode
} & ButtonProps

export const Button = ({
  scheme,
  disabled,
  height,
  margin,
  width,
  borderRadius,
  padding,
  children,
  ...props
}: Props) => {
  const { classes } = useStyles({ scheme, height, width, borderRadius, padding, margin })

  return (
    <MuiButton
      className={classNames(classes.button, {
        [classes.buttonDisabled]: disabled,
        [classes.buttonRainbowBorder]: scheme === 'rainbow'
      })}
      {...props}>
      {children}
    </MuiButton>
  )
}
