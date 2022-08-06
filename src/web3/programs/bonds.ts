import { NetworkType } from '@consts/static'
import { Bonds } from '@invariant-labs/bonds-sdk'
import { getSolanaConnection, getSolanaNetwork, networkTypetoBondsNetwork } from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'

let _bonds: Bonds
export const getCurrentBondsProgram = (): Bonds => {
  return _bonds
}

export const getBondsProgram = async (networkType: NetworkType): Promise<Bonds> => {
  if (_bonds) {
    return _bonds
  }
  const solanaNetwork = getSolanaNetwork()
  const net = networkTypetoBondsNetwork(networkType)

  _bonds = await Bonds.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
  return _bonds
}

export const getBondsProgramSync = (networkType: NetworkType): Bonds => {
  if (_bonds) {
    return _bonds
  }
  const solanaNetwork = getSolanaNetwork()
  const net = networkTypetoBondsNetwork(networkType)

  Bonds.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
    .then(market => {
      _bonds = market
    })
    .catch(err => {
      console.log(err)
    })

  return _bonds
}
