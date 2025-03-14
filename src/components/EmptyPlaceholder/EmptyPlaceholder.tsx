import { Button, Grid, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useStyles } from './style'
import icons from '@static/icons'
import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'

export interface IEmptyPlaceholder {
  desc: string
  onAction?: () => void
  onAction2?: () => void

  className?: string
  style?: React.CSSProperties
  withButton?: boolean
  mainTitle?: string
  roundedCorners?: boolean
  buttonName?: string
  height?: number
  newVersion?: boolean
  img?: string
  desc2?: string
  connectButton?: boolean
  themeDark?: boolean
}

export const EmptyPlaceholder: React.FC<IEmptyPlaceholder> = ({
  desc,
  onAction,
  onAction2,
  withButton = true,
  buttonName,
  mainTitle = `It's empty here...`,
  height,
  newVersion = false,
  roundedCorners = false,
  img = icons.empty,
  desc2,
  themeDark = false,
  style,
  connectButton
}) => {
  const { classes } = useStyles({ newVersion, themeDark, roundedCorners, height })

  return (
    <Grid container className={classes.wrapperContainer}>
      <Grid className={classNames(classes.blur, 'blurLayer')} />
      <Grid sx={style} className={classNames(classes.container, 'blurLayer')}>
        <Grid className={classNames(classes.root, 'blurInfo')} gap='24px'>
          <img src={img} alt='Not connected' />
          <Grid container flexDirection='column' gap='10px'>
            <Typography sx={{ opacity: 0.8 }} className={classes.title}>
              {mainTitle}
            </Typography>
            {desc?.length > 0 && <Typography className={classes.desc}>{desc}</Typography>}
          </Grid>
          <Grid container flexDirection='column' alignContent='center'>
            {withButton && (
              <Button className={classes.button} onClick={onAction} variant='contained'>
                {buttonName ? buttonName : 'Add a position'}
              </Button>
            )}
            {onAction2 && connectButton && (
              <ChangeWalletButton
                name='Connect wallet'
                onConnect={onAction2}
                connected={false}
                onDisconnect={() => {}}
                className={classes.buttonSecondary}
                textClassName={classes.buttonText}
              />
            )}
          </Grid>

          {desc2 && <Typography className={classes.desc}>{desc2}</Typography>}
        </Grid>
      </Grid>
    </Grid>
  )
}
