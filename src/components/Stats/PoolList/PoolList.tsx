import React, { useMemo, useEffect, useState } from 'react'
import PoolListItem from '@components/Stats/PoolListItem/PoolListItem'
import { useStyles } from './style'
import { Grid, useMediaQuery } from '@mui/material'
import { BTC_DEV, NetworkType, SortTypePoolList, USDC_DEV, SOL_DEV } from '@store/consts/static'
import { PaginationList } from '@common/Pagination/Pagination'
import { VariantType } from 'notistack'
import { Keypair } from '@solana/web3.js'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import { theme } from '@static/theme'
import { TableBoundsLabel } from '@common/TableBoundsLabel/TableBoundsLabel'

export interface PoolListInterface {
  initialLength: number

  data: Array<{
    symbolFrom: string
    symbolTo: string
    iconFrom: string
    iconTo: string
    volume: number
    TVL: number
    fee: number
    // lockedX: number
    // lockedY: number
    // liquidityX: number
    // liquidityY: number
    addressFrom: string
    addressTo: string
    apy: number
    apyData: {
      fees: number
    }
    isUnknownFrom: boolean
    isUnknownTo: boolean
    poolAddress: string
  }>
  network: NetworkType
  copyAddressHandler: (message: string, variant: VariantType) => void
  isLoading: boolean
  showAPY: boolean
}

const ITEMS_PER_PAGE = 10

const tokens = [BTC_DEV, USDC_DEV, SOL_DEV]
const fees = [0.01, 0.02, 0.1, 0.3, 1]

const generateMockData = () => {
  return Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
    symbolFrom: tokens[(index * 2) % tokens.length].symbol,
    symbolTo: tokens[(index * 2 + 1) % tokens.length].symbol,
    iconFrom: tokens[(index * 2) % tokens.length].logoURI,
    iconTo: tokens[(index * 2 + 1) % tokens.length].logoURI,
    volume: Math.random() * 10000,
    TVL: Math.random() * 10000,
    fee: fees[index % fees.length],
    lockedX: Math.random() * 5000,
    lockedY: Math.random() * 5000,
    liquidityX: Math.random() * 5000,
    liquidityY: Math.random() * 5000,
    addressFrom: tokens[(index * 2) % tokens.length].address,
    addressTo: tokens[(index * 2 + 1) % tokens.length].address,
    apy: Math.random() * 100,
    apyData: {
      fees: 10
    },
    isUnknownFrom: false,
    isUnknownTo: false,
    poolAddress: Keypair.generate().publicKey.toString()
  }))
}

const PoolList: React.FC<PoolListInterface> = ({
  data,
  initialLength,
  network,
  copyAddressHandler,
  isLoading,
  showAPY
}) => {
  const [initialDataLength, setInitialDataLength] = useState(initialLength)
  const { classes } = useStyles({ initialDataLength })
  const [page, setPage] = React.useState(1)
  const [sortType, setSortType] = React.useState(SortTypePoolList.VOLUME_DESC)
  const navigate = useNavigate()

  const sortedData = useMemo(() => {
    if (isLoading) {
      return generateMockData()
    }

    switch (sortType) {
      case SortTypePoolList.NAME_ASC:
        return data.sort((a, b) =>
          `${a.symbolFrom}/${a.symbolTo}`.localeCompare(`${b.symbolFrom}/${b.symbolTo}`)
        )
      case SortTypePoolList.NAME_DESC:
        return data.sort((a, b) =>
          `${b.symbolFrom}/${b.symbolTo}`.localeCompare(`${a.symbolFrom}/${a.symbolTo}`)
        )
      case SortTypePoolList.FEE_ASC:
        return data.sort((a, b) => a.fee - b.fee)
      case SortTypePoolList.FEE_DESC:
        return data.sort((a, b) => b.fee - a.fee)
      case SortTypePoolList.VOLUME_ASC:
        return data.sort((a, b) => (a.volume === b.volume ? a.TVL - b.TVL : a.volume - b.volume))
      case SortTypePoolList.VOLUME_DESC:
        return data.sort((a, b) => (a.volume === b.volume ? b.TVL - a.TVL : b.volume - a.volume))
      case SortTypePoolList.TVL_ASC:
        return data.sort((a, b) => (a.TVL === b.TVL ? a.volume - b.volume : a.TVL - b.TVL))
      case SortTypePoolList.TVL_DESC:
        return data.sort((a, b) => (a.TVL === b.TVL ? b.volume - a.volume : b.TVL - a.TVL))
      case SortTypePoolList.APY_ASC:
        return data.sort((a, b) => a.apy - b.apy)
      case SortTypePoolList.APY_DESC:
        return data.sort((a, b) => b.apy - a.apy)
    }
  }, [data, sortType])

  useEffect(() => {
    setInitialDataLength(initialLength)
  }, [initialLength])

  const getEmptyRowsCount = () => {
    const displayedItems = paginator(page).length
    const rowNumber = initialDataLength < 10 ? initialDataLength : 10

    return Math.max(rowNumber - displayedItems, 0)
  }
  const handleChangePagination = (currentPage: number) => setPage(currentPage)

  const paginator = (currentPage: number) => {
    const page = currentPage || 1
    const perPage = 10
    const offest = (page - 1) * perPage

    return sortedData.slice(offest).slice(0, perPage)
  }

  const totalItems = useMemo(() => sortedData.length, [sortedData])
  const lowerBound = useMemo(() => (page - 1) * ITEMS_PER_PAGE + 1, [page])
  const upperBound = useMemo(() => Math.min(page * ITEMS_PER_PAGE, totalItems), [totalItems, page])

  const pages = useMemo(() => Math.ceil(data.length / ITEMS_PER_PAGE), [data])
  const isCenterAligment = useMediaQuery(theme.breakpoints.down(1280))
  const height = useMemo(
    () => (initialDataLength > ITEMS_PER_PAGE ? (isCenterAligment ? 120 : 90) : 69),
    [initialDataLength, isCenterAligment]
  )

  useEffect(() => {
    setPage(1)
  }, [data, pages])

  return (
    <Grid
      container
      classes={{ root: classes.container }}
      className={classNames({ [classes.loadingOverlay]: isLoading })}>
      <PoolListItem
        displayType='header'
        onSort={setSortType}
        sortType={sortType}
        network={network}
        showAPY={showAPY}
      />
      {data.length > 0 || isLoading ? (
        <>
          {paginator(page).map((element, index) => (
            <PoolListItem
              displayType='token'
              tokenIndex={index + 1 + (page - 1) * 10}
              symbolFrom={element.symbolFrom}
              symbolTo={element.symbolTo}
              iconFrom={element.iconFrom}
              iconTo={element.iconTo}
              volume={element.volume}
              TVL={element.TVL}
              // lockedX={element.lockedX}
              // lockedY={element.lockedY}
              // liquidityX={element.liquidityX}
              // liquidityY={element.liquidityY}
              // isLocked={element.lockedX > 0 || element.lockedY > 0}
              fee={element.fee}
              apy={element.apy}
              hideBottomLine={pages === 1 && index + 1 === data.length}
              apyData={element.apyData}
              key={index}
              addressFrom={element.addressFrom}
              addressTo={element.addressTo}
              network={network}
              isUnknownFrom={element.isUnknownFrom}
              isUnknownTo={element.isUnknownTo}
              poolAddress={element.poolAddress}
              copyAddressHandler={copyAddressHandler}
              showAPY={showAPY}
            />
          ))}
          {getEmptyRowsCount() > 0 &&
            new Array(getEmptyRowsCount()).fill('').map((_, index) => (
              <div
                key={`empty-row-${index}`}
                className={classNames(classes.emptyRow, {
                  [classes.emptyRowBorder]: index === getEmptyRowsCount() - 1
                })}
              />
            ))}
        </>
      ) : (
        <Grid container className={classes.emptyWrapper}>
          <EmptyPlaceholder
            newVersion
            height={initialDataLength < 10 ? initialDataLength * 69 : 690}
            mainTitle='Pool not found...'
            desc={initialDataLength < 3 ? '' : 'You can create it yourself!'}
            desc2={initialDataLength < 5 ? '' : 'Or try adjusting your search criteria!'}
            onAction={() => navigate('/newPosition')}
            buttonName='Create Pool'
            withButton={true}
            withImg={initialDataLength > 3}
          />
        </Grid>
      )}
      <Grid
        className={classes.pagination}
        sx={{
          height: height
        }}>
        {pages > 0 && (
          <TableBoundsLabel
            borderTop={false}
            lowerBound={lowerBound}
            totalItems={totalItems}
            upperBound={upperBound}>
            <PaginationList
              pages={pages}
              defaultPage={1}
              handleChangePage={handleChangePagination}
              variant='center'
              page={page}
            />
          </TableBoundsLabel>
        )}
      </Grid>
    </Grid>
  )
}
export default PoolList
