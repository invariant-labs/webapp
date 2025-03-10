import { Connection } from '@solana/web3.js'
import { NetworkType, RPC } from '@store/consts/static'
import { Network } from '@invariant-labs/sdk'
import { Network as StakerNetwork } from '@invariant-labs/staker-sdk'
import { Network as BondsNetwork } from '@invariant-labs/bonds-sdk'

let _connection: Connection | null = null
let _network: string

const getSolanaConnection = (url: string): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url, 'confirmed')
  _network = url

  return _connection
}

const networkTypetoProgramNetwork = (type: NetworkType): Network => {
  switch (type) {
    case NetworkType.Devnet:
      return Network.DEV
    case NetworkType.Local:
      return Network.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    case NetworkType.Mainnet:
      return Network.MAIN
    default:
      return Network.DEV
  }
}

const networkTypetoStakerNetwork = (type: NetworkType): StakerNetwork => {
  switch (type) {
    case NetworkType.Devnet:
      return StakerNetwork.DEV
    case NetworkType.Local:
      return StakerNetwork.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    case NetworkType.Mainnet:
      return StakerNetwork.MAIN
    default:
      return StakerNetwork.DEV
  }
}

const networkTypetoBondsNetwork = (type: NetworkType): BondsNetwork => {
  switch (type) {
    case NetworkType.Devnet:
      return BondsNetwork.DEV
    case NetworkType.Local:
      return BondsNetwork.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    // case NetworkType.MAINNET:
    //   return BondsNetwork.MAIN
    default:
      return BondsNetwork.DEV
  }
}

const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export {
  getSolanaConnection,
  RPC,
  getCurrentSolanaConnection,
  networkTypetoStakerNetwork,
  networkTypetoProgramNetwork,
  networkTypetoBondsNetwork
}
