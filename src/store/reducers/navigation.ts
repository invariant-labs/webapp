import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '../consts/types'
import { ROUTES } from '@utils/utils'
import { ISearchToken } from '@common/FilterSearch/FilterSearch'
import { SortTypePoolList, SortTypeTokenList } from '@store/consts/static'

export interface INavigation {
  navigationState: INavigationState
}

export interface INavigationState {
  showFavourites: boolean
  showFavouritesTokens: boolean
  address: string
  liquidityPool: {
    filteredTokens: ISearchToken[]
    sortType: SortTypePoolList
    pageNumber: number
  }
  statsPool: {
    filteredTokens: ISearchToken[]
    sortType: SortTypePoolList
    pageNumber: number
  }
  statsTokens: {
    filteredTokens: ISearchToken[]
    sortType: SortTypeTokenList
    pageNumber: number
  }
}

export interface SetNavigationPayload {
  address: string
}

export interface SetSearchPayload {
  filteredTokens?: ISearchToken[]
  sortType?: SortTypePoolList | SortTypeTokenList
  pageNumber?: number
  type: 'sortType' | 'pageNumber' | 'filteredTokens'
  section: 'liquidityPool' | 'statsPool' | 'statsTokens'
}
const defaultStatus: INavigation = {
  navigationState: {
    address: ROUTES.ROOT,
    showFavourites: false,
    showFavouritesTokens: false,
    liquidityPool: {
      filteredTokens: [],
      sortType: SortTypePoolList.FEE_24_DESC,
      pageNumber: 1
    },
    statsPool: {
      filteredTokens: [],
      sortType: SortTypePoolList.FEE_24_DESC,
      pageNumber: 1
    },
    statsTokens: {
      filteredTokens: [],
      sortType: SortTypeTokenList.VOLUME_DESC,
      pageNumber: 1
    }
  }
}

export const navigationSliceName = 'navigation'

const navigationSlice = createSlice({
  name: navigationSliceName,
  initialState: defaultStatus,
  reducers: {
    setNavigation(state, action: PayloadAction<SetNavigationPayload>) {
      state.navigationState.address = action.payload.address
      return state
    },
    setSearch(state, action: PayloadAction<SetSearchPayload>) {
      const { type, section, ...updateData } = action.payload

      switch (section) {
        case 'liquidityPool':
        case 'statsPool':
          state.navigationState[section] = {
            ...state.navigationState[section],
            [type]: updateData[type]
          }
          break
        case 'statsTokens':
          state.navigationState.statsTokens = {
            ...state.navigationState.statsTokens,
            [type]: updateData[type]
          }
          break
      }
    },
    setShowFavourites(state, action: PayloadAction<boolean>) {
      state.navigationState.showFavourites = action.payload
      return state
    },
    setShowFavouritesTokens(state, action: PayloadAction<boolean>) {
      state.navigationState.showFavouritesTokens = action.payload
      return state
    }
  }
})

export const actions = navigationSlice.actions
export const reducer = navigationSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
