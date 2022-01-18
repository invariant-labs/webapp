import { CardMedia, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import { AccessTimeOutlined } from '@material-ui/icons'
import useStyles from './style'
import React from 'react'
import { colors } from '@static/theme'
import { liqTokens } from '@components/PositionDetails/PositionDetails.stories'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

interface ITokensDetails extends liqTokens {
  value?: string
}

export interface ISaleDetails {
  salePeriod: string
  gracePeriod: string
  tokens: ITokensDetails[]
  tokenPrice: string
  invariantPrice: string
}

interface ISaleDetailsList {
  title?: string
  icon?: string | ReactNode
  value?: string
}

export const SaleDetails: React.FC<ISaleDetails> = ({
  salePeriod,
  gracePeriod,
  tokens,
  tokenPrice,
  invariantPrice
}) => {
  const classes = useStyles()

  const data: ISaleDetailsList[] = [
    { title: 'Sale period ends in', icon: AccessTimeOutlined, value: salePeriod },
    { title: 'Grace period ends in', icon: AccessTimeOutlined, value: gracePeriod },
    {
      title: `${tokens[2].symbol} conributed`,
      icon: tokens[2].logoURI,
      value: tokens[2].value
    },
    {
      title: 'Estimated token price',
      icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png',
      value: tokenPrice
    },
    { title: 'INVARIANT for sale', icon: icons.LogoShort, value: invariantPrice }
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
