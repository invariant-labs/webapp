import { Grid } from '@mui/material'
import { useStyles } from './style'

export interface IGradientBorder {
  children: React.ReactNode
  borderWidth: number
  borderColor?: string
  opacity?: number
  innerClassName?: string
  backgroundColor?: string
  borderRadius: number
}

const GradientBorder: React.FC<IGradientBorder> = ({
  children,
  borderColor,
  borderWidth,
  opacity,
  innerClassName,
  backgroundColor,
  borderRadius
}) => {
  const { classes, cx } = useStyles({
    borderWidth,
    borderColor,
    opacity,
    backgroundColor,
    borderRadius
  })

  const Content = ({ hidden, hideBackground }: { hidden?: boolean; hideBackground?: boolean }) => {
    return (
      <Grid
        container
        className={(classes.innerContainer, hideBackground && classes.noBackground, innerClassName)}
        visibility={hidden ? 'hidden' : 'visible'}>
        {children}
      </Grid>
    )
  }
  return (
    <Grid container className={classes.rootContainer}>
      <Grid overflow='hidden'>
        <Grid container className={classes.positionAbsolute}>
          <Grid
            container
            className={cx(classes.gradientContainer, classes.gradient)}
            overflow='hidden'>
            {/* <Content hidden /> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container className={cx(classes.gradientContainer, classes.noBackground)} zIndex={1}>
          <Content hideBackground />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GradientBorder
