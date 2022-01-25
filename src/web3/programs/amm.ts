import { getMarketAddress, Market } from '@invariant-labs/sdk'
import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoProgramNetwork
} from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
let _market: Market
export const getCurrentMarketProgram = (): Market => {
  return _market
}

export const getMarketProgram = async (): Promise<Market> => {
  if (_market) {
    return _market
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)

  _market = await Market.build(
    net,
    getSolanaWallet(),
    getSolanaConnection(solanaNetwork),
    new PublicKey(getMarketAddress(net))
  )
  return _market
}

export const getMarketProgramSync = (): Market => {
  if (_market) {
    return _market
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoProgramNetwork(solanaNetwork)

  Market.build(
    net,
    getSolanaWallet(),
    getSolanaConnection(solanaNetwork),
    new PublicKey(getMarketAddress(net))
  )
    .then(market => {
      _market = market
    })
    .catch(err => {
      console.log(err)
    })

  return _market
}
