import Header from '@components/Header/Header'
import { RpcErrorModal } from '@components/RpcErrorModal/RpcErrorModal'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions, RpcStatus } from '@reducers/solanaConnection'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { network, rpcAddress, rpcStatus } from '@selectors/solanaConnection'
import { address, status } from '@selectors/solanaWallet'
import { nightlyConnectAdapter, openWalletSelectorModal } from '@web3/selector'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export interface IPriorityFeeOptions {
  label: string
  value: number
  saveValue: number
  description: string
}

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

    return lastFee === null ? '' : lastFee
  }, [])

  const currentRpcStatus = useSelector(rpcStatus)

  const useDefaultRpc = () => {
    dispatch(
      actions.setNetwork({
        network: currentNetwork,
        rpcAddress:
          currentNetwork === NetworkType.MAINNET ? SolanaNetworks.MAIN_HELIUS : SolanaNetworks.DEV
      })
    )
  }

  const useCurrentRpc = () => {
    dispatch(actions.setRpcStatus(RpcStatus.IgnoredWithError))
    localStorage.setItem('IS_RPC_WARNING_IGNORED', 'true')
  }

  return (
    <>
      {currentRpcStatus === RpcStatus.Error && (
        <RpcErrorModal
          rpcAddress={currentRpc}
          useDefaultRpc={useDefaultRpc}
          useCurrentRpc={useCurrentRpc}
        />
      )}
      <Header
        address={walletAddress}
        onNetworkSelect={(network, rpcAddress, rpcName) => {
          if (network !== currentNetwork || rpcAddress !== currentRpc) {
            if (network === NetworkType.MAINNET) {
              localStorage.setItem('INVARIANT_MAINNET_RPC', rpcAddress)
            }

            dispatch(actions.setNetwork({ network, rpcAddress, rpcName }))
            localStorage.setItem('IS_RPC_WARNING_IGNORED', 'false')
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
        onPrioritySave={() => {
          dispatch(
            snackbarsActions.add({
              message: 'Priority fee updated',
              variant: 'success',
              persist: false
            })
          )
        }}
        rpcStatus={currentRpcStatus}
      />
    </>
  )
}

export default HeaderWrapper
