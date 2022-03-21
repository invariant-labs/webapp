import { Connection } from '@solana/web3.js'
import { MAINNET_RPCS, NetworkType, SolanaNetworks } from '@consts/static'
import { Network } from '@invariant-labs/sdk'

export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return NetworkType.DEVNET

    case SolanaNetworks.TEST:
      return NetworkType.TESTNET

    case SolanaNetworks.MAIN:
    case SolanaNetworks.MAIN_SERUM:
    case SolanaNetworks.MAIN_FIGMENT:
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

  return SolanaNetworks.MAIN_FIGMENT
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
  console.log(_connection)
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
      return Network.MAIN
  }
  return Network.DEV
}

const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export {
  getSolanaConnection,
  SolanaNetworks,
  getCurrentSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
}
