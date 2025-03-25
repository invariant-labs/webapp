import TokenListItem from '../TokenListItem/TokenListItem'
import React, { useEffect, useMemo, useState } from 'react'
import { theme } from '@static/theme'
import useStyles from './style'
import { Grid, useMediaQuery } from '@mui/material'
import { BTC_DEV, NetworkType, SortTypeTokenList, USDC_DEV, SOL_DEV } from '@store/consts/static'
import { PaginationList } from '@components/Pagination/Pagination'
import NotFoundPlaceholder from '../NotFoundPlaceholder/NotFoundPlaceholder'
import { VariantType } from 'notistack'
import { Keypair } from '@solana/web3.js'
import classNames from 'classnames'

export interface ITokensListData {
  icon: string
  name: string
  symbol: string
  price: number
  volume: number
  TVL: number
  address: string
  isUnknown: boolean
}

export interface ITokensList {
  data: ITokensListData[]
  network: NetworkType
  copyAddressHandler: (message: string, variant: VariantType) => void
  isLoading: boolean
}

const ITEMS_PER_PAGE = 10

const tokens = [BTC_DEV, USDC_DEV, SOL_DEV]

const generateMockData = () => {
  return Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
    icon: tokens[index % tokens.length].logoURI,
    name: tokens[index % tokens.length].name,
    symbol: tokens[index % tokens.length].symbol,
    price: Math.random() * 100,
    volume: Math.random() * 10000,
    TVL: Math.random() * 10000,
    address: Keypair.generate().publicKey.toString(),
    isUnknown: false
  }))
}

const TokensList: React.FC<ITokensList> = ({ data, network, copyAddressHandler, isLoading }) => {
  const { classes } = useStyles()
  const [page, setPage] = useState(1)
  const [sortType, setSortType] = React.useState(SortTypeTokenList.VOLUME_DESC)

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const sortedData = useMemo(() => {
    if (isLoading) {
      return generateMockData()
    }

    switch (sortType) {
      case SortTypeTokenList.NAME_ASC:
        return data.sort((a, b) =>
          isXsDown
            ? a.symbol.localeCompare(b.symbol)
            : `${a.name} (${a.symbol})`.localeCompare(`${b.name} (${b.symbol})`)
        )
      case SortTypeTokenList.NAME_DESC:
        return data.sort((a, b) =>
          isXsDown
            ? b.symbol.localeCompare(a.symbol)
            : `${b.name} (${b.symbol})`.localeCompare(`${a.name} (${a.symbol})`)
        )
      case SortTypeTokenList.PRICE_ASC:
        return data.sort((a, b) => a.price - b.price)
      case SortTypeTokenList.PRICE_DESC:
        return data.sort((a, b) => b.price - a.price)
      // case SortTypeTokenList.CHANGE_ASC:
      //   return data.sort((a, b) => a.priceChange - b.priceChange)
      // case SortTypeTokenList.CHANGE_DESC:
      //   return data.sort((a, b) => b.priceChange - a.priceChange)
      case SortTypeTokenList.VOLUME_ASC:
        return data.sort((a, b) => (a.volume === b.volume ? a.TVL - b.TVL : a.volume - b.volume))
      case SortTypeTokenList.VOLUME_DESC:
        return data.sort((a, b) => (a.volume === b.volume ? b.TVL - a.TVL : b.volume - a.volume))
      case SortTypeTokenList.TVL_ASC:
        return data.sort((a, b) => (a.TVL === b.TVL ? a.volume - b.volume : a.TVL - b.TVL))
      case SortTypeTokenList.TVL_DESC:
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
    <Grid
      container
      classes={{ root: classes.container }}
      className={classNames({ [classes.loadingOverlay]: isLoading })}>
      <>
        <TokenListItem displayType='header' onSort={setSortType} sortType={sortType} />
        {data.length > 0 || isLoading ? (
          <>
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
                  // priceChange={token.priceChange}
                  volume={token.volume}
                  TVL={token.TVL}
                  hideBottomLine={pages === 1 && index + 1 === data.length}
                  address={token.address}
                  isUnknown={token.isUnknown}
                  network={network}
                  copyAddressHandler={copyAddressHandler}
                />
              )
            })}
            {new Array(10 - paginator(page).data.length).fill('').map((_, index) => (
              <div
                className={classNames(classes.emptyRow, {
                  [classes.emptyRowBorder]: index === 10 - paginator(page).data.length - 1
                })}></div>
            ))}
          </>
        ) : (
          <NotFoundPlaceholder title='No tokens found...' isStats />
        )}
        <Grid className={classes.pagination}>
          {pages > 1 && (
            <PaginationList
              pages={Math.ceil(data.length / 10)}
              defaultPage={1}
              handleChangePage={handleChangePagination}
              variant='flex-end'
            />
          )}
        </Grid>
      </>
    </Grid>
  )
}

export default TokensList
