import React, { useEffect, useMemo } from 'react'
import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { actions as walletActions, Status } from '@reducers/solanaWallet'
import { address, status, walletType } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'
import { network, rpcAddress } from '@selectors/solanaConnection'
import { getNCSelector, initNCSelector } from '@web3/selector'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  const currentRpc = useSelector(rpcAddress)
  const location = useLocation()
  const typeOfWallet = useSelector(walletType)

  useEffect(() => {
    initNCSelector(() => {
      dispatch(walletActions.connect(WalletType.STANDARD))
    }).then(
      () => {},
      () => {}
    )
  }, [])

  const defaultMainnetRPC = useMemo(() => {
    const lastRPC = localStorage.getItem('INVARIANT_MAINNET_RPC')

    return lastRPC === null ? SolanaNetworks.MAIN_SHAKUDO : lastRPC
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
      onWalletSelect={async chosen => {
        if (chosen === WalletType.STANDARD) {
          const selector = await getNCSelector()
          selector?.openModal()
          return
        }

        dispatch(walletActions.connect(chosen))
      }}
      landing={location.pathname.substr(1)}
      walletConnected={walletStatus === Status.Initialized}
      onFaucet={() => {
        dispatch(walletActions.airdrop())
      }}
      onDisconnectWallet={() => {
        dispatch(walletActions.disconnect())
      }}
      typeOfNetwork={currentNetwork}
      typeOfWallet={typeOfWallet}
      rpc={currentRpc}
      defaultMainnetRPC={defaultMainnetRPC}
    />
  )
}

export default HeaderWrapper
