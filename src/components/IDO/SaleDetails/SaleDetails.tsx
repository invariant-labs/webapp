import { CardMedia, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import { AccessTimeOutlined } from '@material-ui/icons'
import useStyles from './style'
import React from 'react'
import { colors } from '@static/theme'

export const SaleDetails = () => {
  const classes = useStyles()

  const data = [
    { title: 'Sale period ends in', icon: AccessTimeOutlined, value: '15:30:33' },
    { title: 'Grace period ends in', icon: AccessTimeOutlined, value: '32:13:45' },
    {
      title: 'SOL conributed',
      icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      value: '122 452 443'
    },
    {
      title: 'Estimated token price',
      icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png',
      value: '211.345'
    },
    { title: 'INVARIANT for sale', icon: icons.LogoShort, value: '20 000 000' }
  ]
  return (
    <Grid className={classes.list}>
      {data.map((item, index) => {
        const isStringIcon = typeof item.icon === 'string'
        const Icon = !isStringIcon && item.icon
        return (
          <Grid
            container
            key={index}
            direction='column'
            className={classes.listItem}
            style={{
              backgroundColor:
                index % 2 ? colors.invariant.componentOut2 : colors.invariant.componentOut1,
              borderTopLeftRadius: index === 0 ? 10 : 0,
              borderTopRightRadius: index === 0 ? 10 : 0,
              borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
              borderBottomLeftRadius: index === data.length - 1 ? 10 : 0
            }}>
            <Typography className={classes.inputLabel}>{item.title}</Typography>
            <Grid container direction='row' className={classes.listData}>
              {isStringIcon ? (
                <CardMedia component='img' className={classes.icon} src={item.icon} />
              ) : (
                <Icon className={classes.icon} />
              )}
              <Typography className={classes.title}>{item.value}</Typography>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
