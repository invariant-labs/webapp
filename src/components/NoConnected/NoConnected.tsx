import { Button, Grid, Typography } from '@mui/material'
import icons from '@static/icons'
import classNames from 'classnames'
import { useStyles } from './style'
import { useNavigate } from 'react-router-dom'
import ChangeWalletButton from '@components/Header/HeaderButton/ChangeWalletButton'

export interface INoConnected {
  onConnect: () => void
  onDisconnect: () => void
  title?: string
  descCustomText?: string
}

export const NoConnected: React.FC<INoConnected> = ({
  onConnect,
  title,
  descCustomText,
  onDisconnect
}) => {
  const { classes } = useStyles()

  const navigate = useNavigate()

  return (
    <>
      <Grid className={classNames(classes.blur, 'blurLayer')} />
      <Grid className={classNames(classes.container, 'blurLayer')}>
        <Grid className={classNames(classes.root, 'blurInfo')}>
          <img className={classes.img} src={icons.NoConnected} alt='Not connected' />
          {!!title && <Typography className={classes.desc}>{title}</Typography>}

          {descCustomText?.length && (
            <Typography className={classes.desc}>{descCustomText}</Typography>
          )}
          <Button
            className={classes.buttonPrimary}
            onClick={() => {
              navigate('/newPosition/0_01')
            }}
            variant='contained'>
            Explore pools
          </Button>

          <ChangeWalletButton
            name='Connect wallet'
            onConnect={onConnect}
            connected={false}
            onDisconnect={onDisconnect}
            className={classes.buttonSecondary}
            textClassName={classes.buttonText}
          />
        </Grid>
      </Grid>
    </>
  )
}
