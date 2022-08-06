import { NetworkType } from '@consts/static'
import { Staker } from '@invariant-labs/staker-sdk'
import { getSolanaConnection, getSolanaNetwork, networkTypetoStakerNetwork } from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'

let _staker: Staker
export const getCurrentStakerProgram = (): Staker => {
  return _staker
}

export const getStakerProgram = async (networkType: NetworkType): Promise<Staker> => {
  if (_staker) {
    return _staker
  }
  const solanaNetwork = getSolanaNetwork()
  const net = networkTypetoStakerNetwork(networkType)

  _staker = await Staker.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
  return _staker
}

export const getStakerProgramSync = (networkType: NetworkType): Staker => {
  if (_staker) {
    return _staker
  }
  const solanaNetwork = getSolanaNetwork()
  const net = networkTypetoStakerNetwork(networkType)

  Staker.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
    .then(staker => {
      _staker = staker
    })
    .catch(err => {
      console.log(err)
    })

  return _staker
}
