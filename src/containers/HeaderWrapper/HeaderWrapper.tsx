import React, { useEffect, useState } from 'react'
import Header from '@components/NewDesign/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import { DEFAULT_PUBLICKEY, NetworkType } from '@consts/static'
import { actions as walletActions, Status } from '@reducers/solanaWallet'
import { address, status } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaConnection'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(address)
  const walletStatus = useSelector(status)
  // const currentNetwork = useSelector(network)
  const location = useLocation()
  const [typeOfWallet, setTypeOfWallet] = useState<WalletType>(WalletType.PHANTOM)
  useEffect(() => {
    let enumWallet = WalletType.PHANTOM
    const sessionWallet = sessionStorage.getItem('INVARIANT_SESSION_WALLET')
    if (
      sessionWallet === 'phantom' ||
      sessionWallet === 'sollet' ||
      sessionWallet === 'math' ||
      sessionWallet === 'solflare'
    ) {
      switch (sessionWallet) {
        case 'phantom':
          enumWallet = WalletType.PHANTOM
          break
        case 'sollet':
          enumWallet = WalletType.SOLLET
          break
        case 'math':
          enumWallet = WalletType.MATH
          break
        case 'solflare':
          enumWallet = WalletType.SOLFLARE
          break
        default:
          enumWallet = WalletType.PHANTOM
      }
      setTypeOfWallet(enumWallet)
      dispatch(walletActions.connect(enumWallet))
    }
  }, [])

  return (
    <Header
      address={walletAddress}
      onNetworkSelect={chosen => {
        dispatch(actions.setNetwork(chosen))
      }}
      onWalletSelect={chosen => {
        if (walletAddress.equals(DEFAULT_PUBLICKEY)) {
          setTypeOfWallet(chosen)
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
      typeOfNetwork={NetworkType.DEVNET}
      typeOfWallet={typeOfWallet}
    />
  )
}

export default HeaderWrapper
