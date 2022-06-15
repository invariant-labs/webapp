import { Staker } from '@invariant-labs/staker-sdk'
import {
  getSolanaConnection,
  getSolanaNetwork,
  solanaNetworktoStakerNetwork
} from '@web3/connection'
import { getSolanaWallet } from '@web3/wallet'

let _staker: Staker
export const getCurrentStakerProgram = (): Staker => {
  return _staker
}

export const getStakerProgram = async (): Promise<Staker> => {
  if (_staker) {
    return _staker
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoStakerNetwork(solanaNetwork)

  _staker = await Staker.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
  return _staker
}

export const getStakerProgramSync = (): Staker => {
  if (_staker) {
    return _staker
  }
  const solanaNetwork = getSolanaNetwork()
  const net = solanaNetworktoStakerNetwork(solanaNetwork)

  Staker.build(net, getSolanaWallet(), getSolanaConnection(solanaNetwork))
    .then(staker => {
      _staker = staker
    })
    .catch(err => {
      console.log(err)
    })

  return _staker
}
