import React from 'react'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { colors, theme } from '@static/theme'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { useStyles } from './style'

export enum SortType {
  NAME_ASC,
  NAME_DESC,
  PRICE_ASC,
  PRICE_DESC,
  VOLUME_ASC,
  VOLUME_DESC,
  TVL_ASC,
  TVL_DESC
}

interface IProps {
  displayType: string
  itemNumber?: number
  icon?: string
  name?: string
  symbol?: string
  price?: number
  volume?: number
  TVL?: number
  sortType?: SortType
  onSort?: (type: SortType) => void
  hideBottomLine?: boolean
}

const TokenListItem: React.FC<IProps> = ({
  displayType,
  itemNumber = 0,
  icon = 'BTCIcon',
  name = 'Bitcoin',
  symbol = 'BTCIcon',
  price = 0,
  volume = 0,
  TVL = 0,
  sortType,
  onSort,
  hideBottomLine = false
}) => {
  const classes = useStyles()

  const isXDown = useMediaQuery(theme.breakpoints.down('sm'))
  const hideName = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid>
      {displayType === 'tokens' ? (
        <Grid
          container
          classes={{ container: classes.container, root: classes.tokenList }}
          style={{
            ...(hideBottomLine ? { border: 'none' } : {})
          }}>
          {!hideName && <Typography component='p'>{itemNumber}</Typography>}
          <Grid className={classes.tokenName}>
            {!isXDown && <img src={icon}></img>}
            <Typography>
              {hideName ? symbol : name}
              {!hideName && <span className={classes.tokenSymbol}>{` (${symbol})`}</span>}
            </Typography>
          </Grid>
          <Typography>{`~$${formatNumbers()(price.toString())}${showPrefix(price)}`}</Typography>
          <Typography>{`$${formatNumbers()(volume.toString())}${showPrefix(volume)}`}</Typography>
          <Typography>{`$${formatNumbers()(TVL.toString())}${showPrefix(TVL)}`}</Typography>
        </Grid>
      ) : (
        <Grid
          container
          classes={{ container: classes.container, root: classes.header }}
          style={{
            color: colors.invariant.textGrey,
            fontWeight: 400
          }}>
          {!hideName && (
            <Typography style={{ lineHeight: '12px' }}>
              N<sup>o</sup>
            </Typography>
          )}
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.NAME_ASC) {
                onSort?.(SortType.NAME_DESC)
              } else {
                onSort?.(SortType.NAME_ASC)
              }
            }}>
            Name
            {sortType === SortType.NAME_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortType.NAME_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.PRICE_ASC) {
                onSort?.(SortType.PRICE_DESC)
              } else {
                onSort?.(SortType.PRICE_ASC)
              }
            }}>
            Price
            {sortType === SortType.PRICE_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortType.PRICE_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.VOLUME_DESC) {
                onSort?.(SortType.VOLUME_ASC)
              } else {
                onSort?.(SortType.VOLUME_DESC)
              }
            }}>
            Volume 24H
            {sortType === SortType.VOLUME_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortType.VOLUME_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.TVL_DESC) {
                onSort?.(SortType.TVL_ASC)
              } else {
                onSort?.(SortType.TVL_DESC)
              }
            }}>
            TVL
            {sortType === SortType.TVL_ASC ? (
              <ArrowDropUpIcon className={classes.icon} />
            ) : sortType === SortType.TVL_DESC ? (
              <ArrowDropDownIcon className={classes.icon} />
            ) : null}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
export default TokenListItem
