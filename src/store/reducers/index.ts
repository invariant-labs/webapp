import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform } from 'redux-persist'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { poolsSliceName, reducer as poolsReducer } from './pools'
import { swapSliceName, reducer as swapReducer } from './swap'
import { positionsSliceName, reducer as positionsReducer } from './positions'
import { statsSliceName, reducer as statsReducer } from './stats'
import { farmsSliceName, reducer as farmsReducer } from './farms'
import { bondsSliceName, reducer as bondsReducer } from './bonds'

const transformNetwork = createTransform(
  (inboundState: any, _key) => {
    return inboundState
  },
  (outboundState, key, fullState) => {
    if (key === 'network') {
      if (Object.values(NetworkType).includes(outboundState)) {
        return outboundState
      } else {
        return NetworkType.MAINNET
      }
    }

    if (key === 'rpcAddress') {
      if (typeof outboundState !== 'undefined') {
        return outboundState
      } else {
        const network: NetworkType = Object.values(NetworkType).includes(fullState.network)
          ? fullState.network
          : NetworkType.MAINNET

        switch (network) {
          case NetworkType.DEVNET:
            return SolanaNetworks.DEV
          case NetworkType.TESTNET:
            return SolanaNetworks.TEST
          case NetworkType.LOCALNET:
            return SolanaNetworks.LOCAL
          case NetworkType.MAINNET:
            return SolanaNetworks.MAIN_NIGHTLY
        }
      }
    }
  }
)

const connectionPersistConfig = {
  key: solanaConnectionSliceName,
  storage: storage,
  whitelist: ['network', 'rpcAddress'],
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
  [farmsSliceName]: farmsReducer,
  [bondsSliceName]: bondsReducer
})

export default combinedReducers
