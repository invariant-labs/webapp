import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { SnackbarVariant } from '@components/Snackbar/Snackbar'
import { createLoaderKey } from '@consts/utils'

export interface ISnackbar {
  message: string
  key?: string
  variant: SnackbarVariant
  open: boolean
  action?: (key: number) => JSX.Element
  persist?: boolean
  txid?: string
  isAccount?: boolean
}

export interface ISnackbarStore {
  snackbars: ISnackbar[]
}

const defaultStatus: ISnackbarStore = {
  snackbars: []
}
export const snackbarsSliceName = 'snackbars'
const snackbarsSlice = createSlice({
  name: snackbarsSliceName,
  initialState: defaultStatus,
  reducers: {
    add(state, action: PayloadAction<Omit<ISnackbar, 'open'>>) {
      state.snackbars.push({
        key: action.payload.key ? action.payload.key : createLoaderKey(),
        ...action.payload,
        open: true
      })
      return state
    },
    hide(state, action: PayloadAction<string>) {
      const index = state.snackbars.findIndex(snack => snack.key === action.payload)
      if (index === -1) {
        return state
      }
      state.snackbars[index].open = false
      return state
    },
    remove(state, action: PayloadAction<string>) {
      state.snackbars = state.snackbars.filter(snack => snack.key !== action.payload)
      return state
    }
  }
})

export const actions = snackbarsSlice.actions
export const reducer = snackbarsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
