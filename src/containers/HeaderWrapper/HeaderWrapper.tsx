import Header from '@components/Header/Header'
import { RpcErrorModal } from '@components/RpcErrorModal/RpcErrorModal'
import { RPC, CHAINS, RECOMMENDED_RPC_ADDRESS, NetworkType } from '@store/consts/static'
import { Chain, WalletType } from '@store/consts/types'
import { actions, RpcStatus } from '@store/reducers/solanaConnection'
import { Status, actions as walletActions } from '@store/reducers/solanaWallet'
import { network, rpcAddress, rpcStatus } from '@store/selectors/solanaConnection'
import { address, status } from '@store/selectors/solanaWallet'
import { nightlyConnectAdapter } from '@utils/web3/selector'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { changeToNightlyAdapter, connectStaticWallet } from '@utils/web3/wallet'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  const currentRpc = useSelector(rpcAddress)
  const location = useLocation()
  const walletAddress = useSelector(address)
  const navigate = useNavigate()

  useEffect(() => {
    const reconnectStaticWallet = async (wallet: WalletType) => {
      await connectStaticWallet(wallet)
      dispatch(walletActions.connect())
    }

    if (currentNetwork === NetworkType.Testnet) {
      dispatch(actions.setNetwork(NetworkType.Devnet))
      dispatch(actions.setRPCAddress(RPC.DEV))
    }

    const walletType = localStorage.getItem('WALLET_TYPE') as WalletType | null

    if (walletType !== null && walletType === WalletType.NIGHTLY) {
      nightlyConnectAdapter.addListener('connect', () => {
        changeToNightlyAdapter()
        dispatch(walletActions.connect())
      })

      if (nightlyConnectAdapter.connected) {
        changeToNightlyAdapter()
        dispatch(walletActions.connect())
      }

      nightlyConnectAdapter.canEagerConnect().then(
        async canEagerConnect => {
          if (canEagerConnect) {
            changeToNightlyAdapter()
            await nightlyConnectAdapter.connect()
          }
        },
        error => {
          console.log(error)
        }
      )
    } else {
      if (!walletType || walletType === null) {
        return
      }
      reconnectStaticWallet(walletType)
    }
  }, [])

  const defaultTestnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Testnet}`)

    if (lastRPC === null) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Testnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet]
      )
    }

    return lastRPC === null ? RPC.TEST : lastRPC
  }, [])

  const defaultDevnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Devnet}`)

    if (lastRPC === null) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Devnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet]
      )
    }

    return lastRPC === null ? RPC.DEV : lastRPC
  }, [])

  const defaultMainnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Mainnet}`)

    if (lastRPC === null) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Mainnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Mainnet]
      )
    }

    return lastRPC === null ? RPC.MAIN_HELIUS : lastRPC
  }, [])

  const activeChain = CHAINS.find(chain => chain.name === Chain.Solana) ?? CHAINS[0]

  const recentPriorityFee = useMemo(() => {
    const lastFee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    return lastFee === null ? '' : lastFee
  }, [])

  const recentIsDynamic = useMemo(() => {
    const lastIsDynamic = localStorage.getItem('INVARIANT_IS_DYNAMIC_FEE')

    return lastIsDynamic === null ? true : lastIsDynamic === 'true'
  }, [])

  const currentRpcStatus = useSelector(rpcStatus)

  const useDefaultRpc = () => {
    localStorage.setItem(
      `INVARIANT_RPC_SOLANA_${currentNetwork}`,
      RECOMMENDED_RPC_ADDRESS[currentNetwork]
    )
    dispatch(actions.setRPCAddress(RECOMMENDED_RPC_ADDRESS[currentNetwork]))
    dispatch(actions.setRpcStatus(RpcStatus.Uninitialized))
    localStorage.setItem('IS_RPC_WARNING_IGNORED', 'false')
    window.location.reload()
  }

  const useCurrentRpc = () => {
    dispatch(actions.setRpcStatus(RpcStatus.IgnoredWithError))
    localStorage.setItem('IS_RPC_WARNING_IGNORED', 'true')
  }

  return (
    <>
      {currentRpcStatus === RpcStatus.Error &&
        currentRpc !== RECOMMENDED_RPC_ADDRESS[currentNetwork] && (
          <RpcErrorModal
            rpcAddress={currentRpc}
            useDefaultRpc={useDefaultRpc}
            useCurrentRpc={useCurrentRpc}
          />
        )}

      <Header
        address={walletAddress}
        onNetworkSelect={(network, rpcAddress) => {
          console.log('network', network)
          console.log('rpcAddress', rpcAddress)
          if (rpcAddress !== currentRpc) {
            localStorage.setItem(`INVARIANT_RPC_SOLANA_${network}`, rpcAddress)
            dispatch(actions.setRPCAddress(rpcAddress))
            dispatch(actions.setRpcStatus(RpcStatus.Uninitialized))
            localStorage.setItem('IS_RPC_WARNING_IGNORED', 'false')
            window.location.reload()
          }

          if (network !== currentNetwork) {
            if (location.pathname.startsWith('/exchange')) {
              navigate('/exchange')
            }

            if (location.pathname.startsWith('/newPosition')) {
              navigate('/newPosition')
            }

            dispatch(actions.setNetwork(network))
          }
        }}
        onConnectWallet={() => {
          dispatch(walletActions.connect())
        }}
        landing={location.pathname.substring(1)}
        walletConnected={walletStatus === Status.Initialized}
        onDisconnectWallet={() => {
          dispatch(walletActions.disconnect())
        }}
        onFaucet={() => dispatch(walletActions.airdrop())}
        typeOfNetwork={currentNetwork}
        rpc={currentRpc}
        defaultTestnetRPC={defaultTestnetRPC}
        defaultDevnetRPC={defaultDevnetRPC}
        defaultMainnetRPC={defaultMainnetRPC}
        recentPriorityFee={recentPriorityFee}
        recentIsDynamic={recentIsDynamic}
        onPrioritySave={() => {
          dispatch(
            snackbarsActions.add({
              message: 'Priority fee updated',
              variant: 'success',
              persist: false
            })
          )
        }}
        onCopyAddress={() => {
          navigator.clipboard.writeText(walletAddress.toString())

          dispatch(
            snackbarsActions.add({
              message: 'Wallet address copied.',
              variant: 'success',
              persist: false
            })
          )
        }}
        onChangeWallet={() => {
          dispatch(walletActions.reconnect())
        }}
        activeChain={activeChain}
        onChainSelect={chain => {
          if (chain.name !== activeChain.name) {
            window.location.replace(chain.address)
          }
        }}
        network={currentNetwork}
        rpcStatus={currentRpcStatus}
      />
    </>
  )
}

export default HeaderWrapper
