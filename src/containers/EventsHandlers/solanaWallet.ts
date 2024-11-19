import React, { useState } from 'react'
import * as R from 'remeda'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, address, status as walletStatus } from '@store/selectors/solanaWallet'
import { status } from '@store/selectors/solanaConnection'
import { actions } from '@store/reducers/solanaWallet'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@utils/web3/connection'
import { Status } from '@store/reducers/solanaConnection'
import { parseTokenAccountData } from '@utils/web3/data'
import { BN } from '@project-serum/anchor'

const SolanaWalletEvents = () => {
  const dispatch = useDispatch()
  const publicKey = useSelector(address)
  const networkStatus = useSelector(status)
  // Solana Main Wallet
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!publicKey || !connection || networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      connection.onAccountChange(new PublicKey(publicKey), (accountInfo: AccountInfo<Buffer>) => {
        dispatch(actions.setBalance(new BN(accountInfo.lamports)))
        // console.log(accountInfo)
      })
    }
    connectEvents()
  }, [dispatch, publicKey, networkStatus])

  // Solana Tokens

  // TODO refactor
  const tokensAccounts = useSelector(accounts)
  const walletStat = useSelector(walletStatus)
  const [initializedAccount, setInitializedAccount] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!connection || walletStat !== Status.Initialized || networkStatus !== Status.Initialized) {
      return
    }
    const connectEvents = () => {
      const tempSet = new Set<string>()
      R.forEachObj(tokensAccounts, account => {
        tempSet.add(account.address.toString())
        if (initializedAccount.has(account.address.toString())) {
          return
        }
        connection.onAccountChange(account.address, (accountInfo: AccountInfo<Buffer>) => {
          const parsedData = parseTokenAccountData(accountInfo.data)
          dispatch(
            actions.setTokenBalance({
              address: account.address.toString(),
              programId: parsedData.token.toString(),
              balance: parsedData.amount
            })
          )
        })
      })
      setInitializedAccount(tempSet)
    }
    connectEvents()
  }, [dispatch, tokensAccounts, networkStatus, walletStat])

  return null
}

export default SolanaWalletEvents
