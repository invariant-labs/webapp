import { BN } from '@project-serum/anchor'
import TokenListItem from '../TokenListItem/TokenListItem'
import React, { useState } from 'react'
import { PaginationList } from '@components/PositionsList/Pagination/Pagination'
import { Grid } from '@material-ui/core'
import useStyles from './style'

export interface ITokensListData {
  icon: string
  name: string
  symbol: string
  price: BN
  decimals: number
  priceChange: string
  volume: string
  TVL: string
}

export interface ITokensList {
  data: ITokensListData[]
}

const TokensList: React.FC<ITokensList> = ({ data }) => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const handleChangePagination = (page: number): void => {
    setPage(page)
  }
  return (
    <Grid classes={{ root: classes.container }}>
      <TokenListItem displayType='header' />
      {data.map((token, index) => {
        return (
          <TokenListItem
            displayType='tokens'
            itemNumber={index + 1}
            icon={token.icon}
            name={token.name}
            symbol={token.symbol}
            price={token.price}
            decimals={token.decimals}
            priceChange={token.priceChange}
            volume={token.volume}
            TVL={token.TVL}
          />
        )
      })}
      <Grid className={classes.pagination}>
        <PaginationList
          pages={Math.ceil(data.length / 7)}
          defaultPage={1}
          handleChangePage={handleChangePagination}
        />
      </Grid>
    </Grid>
  )
}

export default TokensList
