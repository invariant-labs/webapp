import Header from '@components/Header/Header'
import { RpcErrorModal } from '@components/RpcErrorModal/RpcErrorModal'
import { RPC, CHAINS, RECOMMENDED_RPC_ADDRESS, NetworkType } from '@store/consts/static'
import { Chain, WalletType, PriorityMode } from '@store/consts/types'
import { actions, RpcStatus } from '@store/reducers/solanaConnection'
import { Status, actions as walletActions } from '@store/reducers/solanaWallet'
import { network, rpcAddress, rpcStatus } from '@store/selectors/solanaConnection'
import { address, status } from '@store/selectors/solanaWallet'
import { nightlyConnectAdapter } from '@utils/web3/selector'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { changeToNightlyAdapter, connectStaticWallet, getSolanaWallet } from '@utils/web3/wallet'
import { sleep } from '@invariant-labs/sdk'
import { ROUTES } from '@utils/utils'

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
      dispatch(walletActions.connect(true))
    }

    const eagerConnectToNightly = async () => {
      try {
        changeToNightlyAdapter()
        const nightlyAdapter = getSolanaWallet()

        await nightlyAdapter.connect()
        await sleep(500)
        if (!nightlyAdapter.connected) {
          await nightlyAdapter.connect()
          await sleep(500)
        }
        dispatch(walletActions.connect(true))
      } catch (error) {
        console.error('Error during Nightly eager connection:', error)
      }
    }

    ;(async () => {
      if (currentNetwork === NetworkType.Testnet) {
        dispatch(actions.setNetwork(NetworkType.Devnet))
        dispatch(actions.setRPCAddress(RPC.DEV))
      }

      const walletType = localStorage.getItem('WALLET_TYPE') as WalletType | null

      if (walletType === WalletType.NIGHTLY) {
        const canEagerConnect = await nightlyConnectAdapter.canEagerConnect().catch(error => {
          console.error('Error checking eager connect:', error)
          return false
        })
        if (canEagerConnect) {
          await eagerConnectToNightly()
        }
      } else if (walletType) {
        await reconnectStaticWallet(walletType)
      }
    })()
  }, [])

  const shouldResetRpc = useMemo(() => {
    const defaultRpcNumber = localStorage.getItem(`INVARIANT_DEFAULT_RPC_NUMBER`)

    const currentRpcNumber =
      RECOMMENDED_RPC_ADDRESS[NetworkType.Mainnet].slice(-12, -1) +
      RECOMMENDED_RPC_ADDRESS[NetworkType.Testnet].slice(-15, -5) +
      RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet].slice(-15, -5)

    if (defaultRpcNumber === null || currentRpcNumber !== defaultRpcNumber) {
      localStorage.setItem(`INVARIANT_DEFAULT_RPC_NUMBER`, currentRpcNumber)
      return true
    } else {
      return false
    }
  }, [])

  const defaultTestnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Testnet}`)

    if (lastRPC === null || shouldResetRpc) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Testnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet]
      )
    }

    return lastRPC === null || shouldResetRpc ? RPC.TEST : lastRPC
  }, [shouldResetRpc])

  const defaultDevnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Devnet}`)

    if (lastRPC === null || shouldResetRpc) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Devnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet]
      )
    }

    return lastRPC === null || shouldResetRpc ? RPC.DEV : lastRPC
  }, [shouldResetRpc])

  const defaultMainnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem(`INVARIANT_RPC_SOLANA_${NetworkType.Mainnet}`)

    if (lastRPC === null || shouldResetRpc) {
      localStorage.setItem(
        `INVARIANT_RPC_SOLANA_${NetworkType.Mainnet}`,
        RECOMMENDED_RPC_ADDRESS[NetworkType.Mainnet]
      )
    }

    return lastRPC === null || shouldResetRpc ? RPC.MAIN_HELIUS : lastRPC
  }, [shouldResetRpc])

  const activeChain = CHAINS.find(chain => chain.name === Chain.Solana) ?? CHAINS[0]

  const recentPriorityFee = useMemo(() => {
    const lastFee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    return lastFee === null ? '' : lastFee
  }, [])

  const recentPriorityMode = useMemo(() => {
    const lastPriorityMode = localStorage.getItem('INVARIANT_PRIORITY_MODE')

    return lastPriorityMode === null ? PriorityMode.Dynamic : (lastPriorityMode as PriorityMode)
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
          if (rpcAddress !== currentRpc) {
            localStorage.setItem(`INVARIANT_RPC_SOLANA_${network}`, rpcAddress)
            dispatch(actions.setRPCAddress(rpcAddress))
            dispatch(actions.setRpcStatus(RpcStatus.Uninitialized))
            localStorage.setItem('IS_RPC_WARNING_IGNORED', 'false')
            window.location.reload()
          }

          if (network !== currentNetwork) {
            if (location.pathname.startsWith(ROUTES.EXCHANGE)) {
              navigate(ROUTES.EXCHANGE)
            }

            if (location.pathname.startsWith(ROUTES.NEW_POSITION)) {
              navigate(ROUTES.NEW_POSITION)
            }

            dispatch(actions.setNetwork(network))
          }
        }}
        onConnectWallet={() => {
          dispatch(walletActions.connect(false))
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
        recentPriorityMode={recentPriorityMode}
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
              message: 'Wallet address copied',
              variant: 'success',
              persist: false
            })
          )
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
