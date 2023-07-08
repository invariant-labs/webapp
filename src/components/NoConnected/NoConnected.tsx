import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import useStyles from './style'

export interface INoConnected {
  onConnect: () => void
  descCustomText?: string
}
export const NoConnected: React.FC<INoConnected> = ({
  onConnect,
  descCustomText
}) => {
  const classes = useStyles()

  return (
    <>
      <Grid className={classNames(classes.blur, 'noConnectedLayer')} />
      <Grid className={classNames(classes.container, 'noConnectedLayer')}>
        <Grid className={classNames(classes.root, 'noConnectedInfo')}>
          <img className={classes.img} src={icons.NoConnected} />
          <Typography className={classes.desc}>Wallet is not connected.</Typography>
          {descCustomText?.length && (
            <Typography className={classes.desc}>{descCustomText}</Typography>
          )}
          <Button className={classes.button} onClick={onConnect} variant='contained'>
            Connect a wallet
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
