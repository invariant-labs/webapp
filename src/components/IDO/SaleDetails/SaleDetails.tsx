import React from 'react'
import useStyles from './style'
import icons from '@static/icons'
import classNames from 'classnames'
import { colors } from '@static/theme'
import { liqTokens } from '@components/PositionDetails/PositionDetails.stories'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import { AccessTimeOutlined, SvgIconComponent } from '@material-ui/icons'

interface ITokensDetails extends liqTokens {
  value: string
}

export interface ISaleDetails {
  salePeriod: string
  gracePeriod: string
  token: ITokensDetails
  tokenPrice: string
  invariantPrice: string
}

interface ISaleDetailsList {
  title: string
  icon: string | SvgIconComponent
  value: string
}

const SaleDetails: React.FC<ISaleDetails> = ({
  salePeriod,
  gracePeriod,
  token,
  tokenPrice,
  invariantPrice
}) => {
  const classes = useStyles()

  const data: ISaleDetailsList[] = [
    { title: 'Sale period ends in', icon: AccessTimeOutlined, value: salePeriod },
    { title: 'Grace period ends in', icon: AccessTimeOutlined, value: gracePeriod },
    {
      title: `${token.symbol} conributed`,
      icon: token.logoURI,
      value: token.value
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
        const isIconURL = typeof item.icon === 'string'
        const Icon = item.icon
        return (
          <Grid
            container
            key={index}
            direction='column'
            className={classes.listItem}
            style={{
              backgroundColor:
                index % 2 ? colors.invariant.componentOut2 : colors.invariant.componentOut1
            }}>
            <Typography className={classes.inputLabel}>{item.title}</Typography>
            <Grid container direction='row' className={classes.listData}>
              {isIconURL ? (
                <CardMedia
                  component='img'
                  className={classNames(
                    classes.icon,
                    item.value === invariantPrice ? classes.invariantIcon : classes.tokenIcon
                  )}
                  src={item.icon as string}
                />
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

export default SaleDetails
