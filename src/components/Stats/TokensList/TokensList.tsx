import TokenListItem, { SortType } from '../TokenListItem/TokenListItem'
import React, { useEffect, useMemo, useState } from 'react'
import { PaginationList } from '@components/Pagination/Pagination'
import { Grid, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import useStyles from './style'

export interface ITokensListData {
  icon: string
  name: string
  symbol: string
  price: number
  priceChange?: number
  volume: number
  TVL: number
}

export interface ITokensList {
  data: ITokensListData[]
}

const TokensList: React.FC<ITokensList> = ({ data }) => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const [sortType, setSortType] = React.useState(SortType.VOLUME_DESC)

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const isPriceChangeDefined = data.find(token => token.symbol === 'SOL')?.priceChange !== undefined

  const sortedData = useMemo(() => {
    switch (sortType) {
      case SortType.NAME_ASC:
        return data.sort((a, b) =>
          isXsDown
            ? a.symbol.localeCompare(b.symbol)
            : `${a.name} (${a.symbol})`.localeCompare(`${b.name} (${b.symbol})`)
        )
      case SortType.NAME_DESC:
        return data.sort((a, b) =>
          isXsDown
            ? b.symbol.localeCompare(a.symbol)
            : `${b.name} (${b.symbol})`.localeCompare(`${a.name} (${a.symbol})`)
        )
      case SortType.PRICE_ASC:
        return data.sort((a, b) => a.price - b.price)
      case SortType.PRICE_DESC:
        return data.sort((a, b) => b.price - a.price)
      case SortType.CHANGE_ASC:
        return data.sort((a, b) => {
          if (!a.priceChange || !b.priceChange) {
            return 0
          }
          return a.priceChange - b.priceChange
        })
      case SortType.CHANGE_DESC:
        return data.sort((a, b) => {
          if (!a.priceChange || !b.priceChange) {
            return 0
          }
          return b.priceChange - a.priceChange
        })
      case SortType.VOLUME_ASC:
        return data.sort((a, b) => (a.volume === b.volume ? a.TVL - b.TVL : a.volume - b.volume))
      case SortType.VOLUME_DESC:
        return data.sort((a, b) => (a.volume === b.volume ? b.TVL - a.TVL : b.volume - a.volume))
      case SortType.TVL_ASC:
        return data.sort((a, b) => (a.TVL === b.TVL ? a.volume - b.volume : a.TVL - b.TVL))
      case SortType.TVL_DESC:
        return data.sort((a, b) => (a.TVL === b.TVL ? b.volume - a.volume : b.TVL - a.TVL))
    }
  }, [data, sortType, isXsDown])

  useEffect(() => {
    setPage(1)
  }, [data])

  const handleChangePagination = (page: number): void => {
    setPage(page)
  }
  function paginator(currentPage: number) {
    const page = currentPage || 1
    const perPage = 10
    const offset = (page - 1) * perPage
    const paginatedItems = sortedData.slice(offset).slice(0, 10)
    const totalPages = Math.ceil(data.length / perPage)

    return {
      page: page,
      totalPages: totalPages,
      data: paginatedItems
    }
  }

  const pages = Math.ceil(data.length / 10)

  return (
    <Grid container direction='column' classes={{ root: classes.container }} wrap='nowrap'>
      <TokenListItem
        displayType='header'
        onSort={setSortType}
        sortType={sortType}
        isPriceChangeDefined={isPriceChangeDefined}
      />
      {paginator(page).data.map((token, index) => {
        return (
          <TokenListItem
            key={index}
            displayType='tokens'
            itemNumber={index + 1 + (page - 1) * 10}
            icon={token.icon}
            name={token.name}
            symbol={token.symbol}
            price={token.price}
            priceChange={token.priceChange}
            volume={token.volume}
            TVL={token.TVL}
            hideBottomLine={pages === 1 && index + 1 === data.length}
          />
        )
      })}
      {pages > 1 ? (
        <Grid className={classes.pagination}>
          <PaginationList
            pages={Math.ceil(data.length / 10)}
            defaultPage={1}
            handleChangePage={handleChangePagination}
            variant='flex-end'
          />
        </Grid>
      ) : null}
    </Grid>
  )
}

export default TokensList
