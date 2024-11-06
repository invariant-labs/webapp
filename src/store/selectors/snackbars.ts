import { ISnackbarStore, snackbarsSliceName } from '../reducers/snackbars'
import { AnyProps, keySelectors } from './helpers'

const store = (s: AnyProps) => s[snackbarsSliceName] as ISnackbarStore

export const { snackbars } = keySelectors(store, ['snackbars'])

export const snackbarsSelectors = { snackbars }

export default snackbarsSelectors
