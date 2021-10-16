import { Market } from '@invariant-labs/sdk'
import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
} from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
let _market: Market
const MarketProgramId: PublicKey = new PublicKey('5TwbVzTeNzJmkpav9SyxLSs1wmsBoUYoM3L97tbMRFnE')
export const getCurrentMarketProgram = (): Market => {
  return _market
}

export const getMarketProgram = async (): Promise<Market> => {
  if (_market) {
    return _market
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)

  _market = new Market(net, getSolanaWallet(), getSolanaConnection(solanaNetwork), MarketProgramId)

  return _market
}

export const getMarketProgramSync = (): Market => {
  if (_market) {
    return _market
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)

  _market = new Market(net, getSolanaWallet(), getSolanaConnection(solanaNetwork), MarketProgramId)

  return _market
}
