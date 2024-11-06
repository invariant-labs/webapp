import { Bonds } from '@invariant-labs/bonds-sdk'
import { getSolanaConnection, networkTypetoBondsNetwork } from '../connection'
import { NetworkType } from '@store/consts/static'
import { getSolanaWallet } from '../wallet'

let _bonds: Bonds
export const getCurrentBondsProgram = (): Bonds => {
  return _bonds
}

export const getBondsProgram = async (
  networkType: NetworkType,
  rpcAddress: string
): Promise<Bonds> => {
  if (_bonds) {
    return _bonds
  }
  const net = networkTypetoBondsNetwork(networkType)

  _bonds = await Bonds.build(net, getSolanaWallet(), getSolanaConnection(rpcAddress))
  return _bonds
}

export const getBondsProgramSync = (networkType: NetworkType, rpcAddress: string): Bonds => {
  if (_bonds) {
    return _bonds
  }
  const net = networkTypetoBondsNetwork(networkType)

  Bonds.build(net, getSolanaWallet(), getSolanaConnection(rpcAddress))
    .then(market => {
      _bonds = market
    })
    .catch(err => {
      console.log(err)
    })

  return _bonds
}
