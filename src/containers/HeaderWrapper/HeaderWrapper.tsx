import React, { useEffect, useMemo } from 'react'
import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { actions as walletActions, Status } from '@reducers/solanaWallet'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { network, rpcAddress } from '@selectors/solanaConnection'
import { nightlyConnectAdapter, openWalletSelectorModal } from '@web3/selector'

export interface IPriorityFeeOptions {
  label: string
  value: number
  description: string
}

const priorityFeeOptions: IPriorityFeeOptions[] = [
  { label: 'Normal', value: 0.000005, description: '1x Market fee' },
  {
    label: 'Market',
    value: 0.001,
    description: '85% percentile fees from last 20 blocks'
  },
  { label: 'High', value: 0.05, description: '5x Market fee' },
  { label: 'Turbo', value: 0.1, description: '10x Market fee' }
]

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  const currentRpc = useSelector(rpcAddress)
  const location = useLocation()

  useEffect(() => {
    nightlyConnectAdapter.addListener('connect', () => {
      dispatch(walletActions.connect())
    })

    if (nightlyConnectAdapter.connected) {
      dispatch(walletActions.connect())
    }

    nightlyConnectAdapter.canEagerConnect().then(
      async canEagerConnect => {
        if (canEagerConnect) {
          await nightlyConnectAdapter.connect()
        }
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  const defaultMainnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem('INVARIANT_MAINNET_RPC')

    return lastRPC === null ? SolanaNetworks.MAIN_ALCHEMY : lastRPC
  }, [])

  const recentPriorityFee = useMemo(() => {
    const lastFee = localStorage.getItem('INVARIANT_MAINNET_PRIORITY_FEE')

    return lastFee === null ? JSON.stringify(priorityFeeOptions[0]) : lastFee
  }, [])

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={(network, rpcAddress, rpcName) => {
        if (network !== currentNetwork || rpcAddress !== currentRpc) {
          if (network === NetworkType.MAINNET) {
            localStorage.setItem('INVARIANT_MAINNET_RPC', rpcAddress)
          }

          dispatch(actions.setNetwork({ network, rpcAddress, rpcName }))
        }
      }}
      onConnectWallet={openWalletSelectorModal}
      landing={location.pathname.substr(1)}
      walletConnected={walletStatus === Status.Initialized}
      onFaucet={() => {
        dispatch(walletActions.airdrop())
      }}
      onDisconnectWallet={() => {
        dispatch(walletActions.disconnect())
      }}
      typeOfNetwork={currentNetwork}
      rpc={currentRpc}
      defaultMainnetRPC={defaultMainnetRPC}
      recentPriorityFee={recentPriorityFee}
      priorityFeeOptions={priorityFeeOptions}
    />
  )
}

export default HeaderWrapper
