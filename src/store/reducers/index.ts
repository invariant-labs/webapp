import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform } from 'redux-persist'
import { NetworkType } from '@consts/static'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { poolsSliceName, reducer as poolsReducer } from './pools'
import { swapSliceName, reducer as swapReducer } from './swap'
import { positionsSliceName, reducer as positionsReducer } from './positions'
import { statsSliceName, reducer as statsReducer } from './stats'
import { bondsSliceName, reducer as bondsReducer } from './bonds'

const transformNetwork = createTransform(
  (inboundState: any, _key) => {
    return inboundState
  },
  (outboundState, _key) => {
    if (Object.values(NetworkType).includes(outboundState)) {
      return outboundState
    } else {
      return NetworkType.MAINNET
    }
  }
)
const connectionPersistConfig = {
  key: solanaConnectionSliceName,
  storage: storage,
  whitelist: ['network'],
  transforms: [transformNetwork]
}

const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [solanaConnectionSliceName]: persistReducer(connectionPersistConfig, solanaConnectionReducer),
  [solanaWalletSliceName]: solanaWalletReducer,
  [poolsSliceName]: poolsReducer,
  [swapSliceName]: swapReducer,
  [positionsSliceName]: positionsReducer,
  [statsSliceName]: statsReducer,
  [bondsSliceName]: bondsReducer
})

export default combinedReducers
