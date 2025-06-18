import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '../consts/types'
import { ROUTES } from '@utils/utils'

export interface INavigation {
  navigationState: INavigationState
}

export interface INavigationState {
  address: string
}

export interface SetNavigationPayload {
  address: string
}

const defaultStatus: INavigation = {
  navigationState: {
    address: ROUTES.ROOT
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
    }
  }
})

export const actions = navigationSlice.actions
export const reducer = navigationSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
