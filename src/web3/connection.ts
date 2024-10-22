import { Connection } from '@solana/web3.js'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { Network } from '@invariant-labs/sdk'
import { Network as StakerNetwork } from '@invariant-labs/staker-sdk'
import { Network as BondsNetwork } from '@invariant-labs/bonds-sdk'

let _connection: Connection | null = null
let _network: string

const getSolanaConnection = (url: string): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url, 'processed')
  _network = url

  return _connection
}

const networkTypetoProgramNetwork = (type: NetworkType): Network => {
  switch (type) {
    case NetworkType.DEVNET:
      return Network.DEV
    case NetworkType.LOCALNET:
      return Network.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    case NetworkType.MAINNET:
      return Network.MAIN
    default:
      return Network.DEV
  }
}

const networkTypetoStakerNetwork = (type: NetworkType): StakerNetwork => {
  switch (type) {
    case NetworkType.DEVNET:
      return StakerNetwork.DEV
    case NetworkType.LOCALNET:
      return StakerNetwork.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    case NetworkType.MAINNET:
      return StakerNetwork.MAIN
    default:
      return StakerNetwork.DEV
  }
}

const networkTypetoBondsNetwork = (type: NetworkType): BondsNetwork => {
  switch (type) {
    case NetworkType.DEVNET:
      return BondsNetwork.DEV
    case NetworkType.LOCALNET:
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
  SolanaNetworks,
  getCurrentSolanaConnection,
  networkTypetoStakerNetwork,
  networkTypetoProgramNetwork,
  networkTypetoBondsNetwork
}
