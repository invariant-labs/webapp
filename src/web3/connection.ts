import { Connection } from '@solana/web3.js'
import { MAINNET_RPCS, NetworkType, SolanaNetworks } from '@consts/static'
import { Network } from '@invariant-labs/sdk'
import { Network as StakerNetwork } from '@invariant-labs/staker-sdk'
import { Network as BondsNetwork } from '@invariant-labs/bonds-sdk'

export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return NetworkType.DEVNET

    case SolanaNetworks.TEST:
      return NetworkType.TESTNET

    case SolanaNetworks.MAIN:
    case SolanaNetworks.MAIN_SERUM:
    case SolanaNetworks.MAIN_FIGMENT:
    case SolanaNetworks.MAIN_GENESYSGO:
    case SolanaNetworks.MAIN_NIGHTLY:
      return NetworkType.MAINNET
    case SolanaNetworks.LOCAL:
      return NetworkType.LOCALNET

    default:
      return NetworkType.DEVNET
  }
}
let _mainnet: SolanaNetworks
export const getRandomMainnetRPC = () => {
  if (_mainnet) {
    return _mainnet
  }
  const rand = Math.random()
  let threshold = 0
  for (const rpc of MAINNET_RPCS) {
    threshold += rpc.probability

    if (rand <= threshold) {
      _mainnet = rpc.rpc
      return rpc.rpc
    }
  }

  return SolanaNetworks.MAIN
}
export const getNetworkFromType = (type: NetworkType) => {
  switch (type) {
    case NetworkType.DEVNET:
      return SolanaNetworks.DEV
    case NetworkType.TESTNET:
      return SolanaNetworks.TEST
    case NetworkType.LOCALNET:
      return SolanaNetworks.LOCAL
    case NetworkType.MAINNET:
      return getRandomMainnetRPC()
  }
}
let _connection: Connection | null = null
let _network: SolanaNetworks

const getSolanaConnection = (url: SolanaNetworks): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url, 'recent')
  _network = url

  return _connection
}
const getSolanaNetwork = (): SolanaNetworks => {
  if (_network) {
    return _network
  } else {
    throw new Error('Network not defined')
  }
}
const solanaNetworktoProgramNetwork = (solanaNetwork: SolanaNetworks): Network => {
  switch (solanaNetwork) {
    case SolanaNetworks.DEV:
      return Network.DEV
    case SolanaNetworks.LOCAL:
      return Network.LOCAL
    // case SolanaNetworks.TEST:
    //   return Network.TEST
    case SolanaNetworks.MAIN:
    case SolanaNetworks.MAIN_SERUM:
    case SolanaNetworks.MAIN_FIGMENT:
    case SolanaNetworks.MAIN_GENESYSGO:
    case SolanaNetworks.MAIN_NIGHTLY:
      return Network.MAIN
  }
  return Network.DEV
}

const solanaNetworktoStakerNetwork = (solanaNetwork: SolanaNetworks): StakerNetwork => {
  switch (solanaNetwork) {
    case SolanaNetworks.DEV:
      return StakerNetwork.DEV
    case SolanaNetworks.LOCAL:
      return StakerNetwork.LOCAL
    // case SolanaNetworks.TEST:
    //   return StakerNetwork.TEST
    case SolanaNetworks.MAIN:
    case SolanaNetworks.MAIN_SERUM:
    case SolanaNetworks.MAIN_FIGMENT:
    case SolanaNetworks.MAIN_GENESYSGO:
    case SolanaNetworks.MAIN_NIGHTLY:
      return StakerNetwork.MAIN
    default:
      return StakerNetwork.DEV
  }
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
const solanaNetworktoBondsNetwork = (solanaNetwork: SolanaNetworks): BondsNetwork => {
  switch (solanaNetwork) {
    case SolanaNetworks.DEV:
      return BondsNetwork.DEV
    case SolanaNetworks.LOCAL:
      return BondsNetwork.LOCAL
    // case SolanaNetworks.TEST:
    //   return BondsNetwork.TEST
    // case SolanaNetworks.MAIN:
    // case SolanaNetworks.MAIN_SERUM:
    // case SolanaNetworks.MAIN_FIGMENT:
    // case SolanaNetworks.MAIN_GENESYSGO:
    // case SolanaNetworks.MAIN_NIGHTLY:
    //   return BondsNetwork.MAIN
  }
  return BondsNetwork.DEV
}

const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export {
  getSolanaConnection,
  SolanaNetworks,
  getCurrentSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork,
  solanaNetworktoStakerNetwork,
  networkTypetoStakerNetwork,
  networkTypetoProgramNetwork,
  solanaNetworktoBondsNetwork
}
