import { IWallet, Staker } from '@invariant-labs/staker-sdk'
import { NetworkType } from '@store/consts/static'
import { getSolanaConnection, networkTypetoStakerNetwork } from '../connection'

let _staker: Staker
export const getCurrentStakerProgram = (): Staker => {
  return _staker
}

export const getStakerProgram = async (
  networkType: NetworkType,
  rpcAddress: string,
  solWallet: IWallet
): Promise<Staker> => {
  if (_staker) {
    return _staker
  }
  const net = networkTypetoStakerNetwork(networkType)

  _staker = await Staker.build(net, solWallet, getSolanaConnection(rpcAddress))
  return _staker
}

export const getStakerProgramSync = (
  networkType: NetworkType,
  rpcAddress: string,
  solWallet: IWallet
): Staker => {
  if (_staker) {
    return _staker
  }
  const net = networkTypetoStakerNetwork(networkType)

  Staker.build(net, solWallet, getSolanaConnection(rpcAddress))
    .then(staker => {
      _staker = staker
    })
    .catch(err => {
      console.log(err)
    })

  return _staker
}
