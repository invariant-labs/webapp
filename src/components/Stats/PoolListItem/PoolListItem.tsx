import React from 'react'
import { Grid, Typography, Box, useMediaQuery } from '@material-ui/core'
import useStyle from './style'
import { colors, theme } from '@static/theme'
import { formatNumbers, showPrefix } from '@consts/utils'

export enum SortType {
  NAME_ASC,
  NAME_DESC,
  FEE_ASC,
  FEE_DESC,
  VOLUME_ASC,
  VOLUME_DESC,
  TVL_ASC,
  TVL_DESC
}

interface IProps {
  TVL?: number
  volume?: number
  fee?: number
  displayType: string
  symbolFrom?: string
  symbolTo?: string
  iconFrom?: string
  iconTo?: string
  tokenIndex?: number
  sortType?: SortType
  onSort?: (type: SortType) => void
}

const PoolListItem: React.FC<IProps> = ({
  fee = 0,
  volume = 0,
  TVL = 0,
  displayType,
  symbolFrom,
  symbolTo,
  iconFrom,
  iconTo,
  tokenIndex,
  sortType,
  onSort
}) => {
  const classes = useStyle()

  const hideTokenImage = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid>
      {displayType === 'token' ? (
        <Grid
          container
          classes={{ container: classes.container }}
          style={{ color: colors.white.main }}>
          <Typography>{tokenIndex}</Typography>
          <Grid className={classes.imageContainer}>
            {!hideTokenImage && (
              <Box className={classes.iconsWrapper}>
                <img src={iconFrom} />
                <img src={iconTo} />
              </Box>
            )}
            <Grid className={classes.symbolsContainer}>
              <Typography>
                {symbolFrom}/{symbolTo}
              </Typography>
            </Grid>
          </Grid>
          <Typography>{fee}%</Typography>
          <Typography>{`$${formatNumbers()(volume.toString())}${showPrefix(volume)}`}</Typography>
          <Typography>{`$${formatNumbers()(TVL.toString())}${showPrefix(TVL)}`}</Typography>
        </Grid>
      ) : (
        <Grid container classes={{ container: classes.container, root: classes.header }}>
          <Typography style={{ lineHeight: '11px' }}>
            N<sup>o</sup>
          </Typography>
          <Grid>
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
            </Typography>
          </Grid>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (sortType === SortType.FEE_ASC) {
                onSort?.(SortType.FEE_DESC)
              } else {
                onSort?.(SortType.FEE_ASC)
              }
            }}>
            Fee
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
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default PoolListItem
