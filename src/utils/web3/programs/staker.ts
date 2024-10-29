import { Staker } from '@invariant-labs/staker-sdk'
import { NetworkType } from '@store/consts/static'
import { getSolanaConnection, networkTypetoStakerNetwork } from '../connection'
import { getSolanaWallet } from '../wallet'

let _staker: Staker
export const getCurrentStakerProgram = (): Staker => {
  return _staker
}

export const getStakerProgram = async (
  networkType: NetworkType,
  rpcAddress: string
): Promise<Staker> => {
  if (_staker) {
    return _staker
  }
  const net = networkTypetoStakerNetwork(networkType)

  _staker = await Staker.build(net, getSolanaWallet(), getSolanaConnection(rpcAddress))
  return _staker
}

export const getStakerProgramSync = (networkType: NetworkType, rpcAddress: string): Staker => {
  if (_staker) {
    return _staker
  }
  const net = networkTypetoStakerNetwork(networkType)

  Staker.build(net, getSolanaWallet(), getSolanaConnection(rpcAddress))
    .then(staker => {
      _staker = staker
    })
    .catch(err => {
      console.log(err)
    })

  return _staker
}
