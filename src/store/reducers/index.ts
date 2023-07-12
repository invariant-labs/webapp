import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform, createMigrate, MigrationManifest } from 'redux-persist'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import {
  ISolanaConnectionStore,
  reducer as solanaConnectionReducer,
  solanaConnectionSliceName
} from './solanaConnection'
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
  (outboundState, key) => {
    if (key === 'network' && !Object.values(NetworkType).includes(outboundState)) {
      return NetworkType.MAINNET
    }

    return outboundState
  }
)

const migrations: MigrationManifest = {
  // @ts-expect-error
  1: (state: ISolanaConnectionStore) => {
    const network =
      typeof state?.network !== 'undefined' && Object.values(NetworkType).includes(state.network)
        ? state.network
        : NetworkType.MAINNET

    let rpcAddress

    switch (network) {
      case NetworkType.DEVNET:
        rpcAddress = SolanaNetworks.DEV
        break
      case NetworkType.TESTNET:
        rpcAddress = SolanaNetworks.TEST
        break
      case NetworkType.LOCALNET:
        rpcAddress = SolanaNetworks.LOCAL
        break
      case NetworkType.MAINNET:
        rpcAddress = SolanaNetworks.MAIN_ALCHEMY
        break
    }

    return {
      ...state,
      rpcAddress
    }
  }
}

const connectionPersistConfig = {
  key: solanaConnectionSliceName,
  version: 1,
  storage: storage,
  whitelist: ['network', 'rpcAddress'],
  transforms: [transformNetwork],
  migrate: createMigrate(migrations, { debug: false })
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
