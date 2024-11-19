import { Bonds, IWallet } from '@invariant-labs/bonds-sdk'
import { getSolanaConnection, networkTypetoBondsNetwork } from '../connection'
import { NetworkType } from '@store/consts/static'

let _bonds: Bonds
export const getCurrentBondsProgram = (): Bonds => {
  return _bonds
}

export const getBondsProgram = async (
  networkType: NetworkType,
  rpcAddress: string,
  solWallet: IWallet
): Promise<Bonds> => {
  if (_bonds) {
    return _bonds
  }
  const net = networkTypetoBondsNetwork(networkType)

  _bonds = await Bonds.build(net, solWallet, getSolanaConnection(rpcAddress))
  return _bonds
}

export const getBondsProgramSync = (
  networkType: NetworkType,
  rpcAddress: string,
  solWallet: IWallet
): Bonds => {
  if (_bonds) {
    return _bonds
  }
  const net = networkTypetoBondsNetwork(networkType)

  Bonds.build(net, solWallet, getSolanaConnection(rpcAddress))
    .then(market => {
      _bonds = market
    })
    .catch(err => {
      console.log(err)
    })

  return _bonds
}
