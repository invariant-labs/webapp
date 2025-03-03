import { Button, Grid, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useStyles } from './style'
import icons from '@static/icons'

export interface IEmptyPlaceholder {
  desc: string
  onAction?: () => void
  className?: string
  style?: React.CSSProperties
  withButton?: boolean
  mainTitle?: string
  roundedCorners?: boolean
  blurWidth?: string
  buttonName?: string
  height?: string
  newVersion?: boolean
}

export const EmptyPlaceholder: React.FC<IEmptyPlaceholder> = ({
  desc,
  onAction,
  withButton = true,
  buttonName,
  mainTitle,
  height,
  newVersion = false,
  roundedCorners = false
}) => {
  const { classes } = useStyles({ newVersion, roundedCorners, height })

  return (
    <>
      <Grid className={classNames(classes.blur, 'blurLayer')} />
      <Grid className={classNames(classes.container, 'blurLayer')}>
        <Grid className={classNames(classes.root, 'blurInfo')}>
          <img className={classes.img} src={icons.empty} alt='Not connected' />
          <Typography className={classes.desc}>
            {mainTitle ? mainTitle : `It's empty here...`}
          </Typography>
          {desc?.length && <Typography className={classes.desc}>{desc}</Typography>}
          {withButton && (
            <Button className={classes.button} onClick={onAction} variant='contained'>
              {buttonName ? buttonName : 'Add a position'}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}
