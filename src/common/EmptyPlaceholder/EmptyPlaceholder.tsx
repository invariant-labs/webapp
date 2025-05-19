import { Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useStyles } from './style'
import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'
import { Button } from '@common/Button/Button'
import { theme } from '@static/theme'
import { emptyIcon } from '@static/icons'

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
  withImg?: boolean
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
  img = emptyIcon,
  desc2,
  themeDark = false,
  style,
  connectButton,
  withImg = true
}) => {
  const { classes, cx } = useStyles({ newVersion, themeDark, roundedCorners, height })
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container className={classes.wrapperContainer}>
      <Grid className={cx(classes.blur, 'blurLayer')} />
      <Grid sx={style} className={cx(classes.container, 'blurLayer')}>
        <Grid className={cx(classes.root, 'blurInfo')} gap='24px'>
          {withImg && <img height={80} src={img} alt='Not connected' />}
          <Grid container flexDirection='column' gap='10px'>
            <Typography className={classes.title}>{mainTitle}</Typography>
            {desc?.length > 0 && <Typography className={classes.desc}>{desc}</Typography>}
          </Grid>
          <Grid container flexDirection='column' alignContent='center'>
            {withButton && (
              <Button scheme='pink' padding='0 48px' onClick={onAction}>
                {buttonName ? buttonName : 'Add a position'}
              </Button>
            )}
            {onAction2 && connectButton && (
              <ChangeWalletButton
                name={isSm ? 'Connect' : 'Connect wallet'}
                onConnect={onAction2}
                connected={false}
                onDisconnect={() => {}}
              />
            )}
          </Grid>

          {desc2 && <Typography className={classes.desc}>{desc2}</Typography>}
        </Grid>
      </Grid>
    </Grid>
  )
}
