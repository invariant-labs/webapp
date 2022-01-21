import { Ido } from '@components/IDO/Ido'
import React from 'react'
import { useSelector } from 'react-redux'
import { swapTokens } from '@selectors/solanaWallet'

export const WrappedIdo = () => {
  const tokensList = useSelector(swapTokens)

  return (
    <>
      <Ido tokens={tokensList} />
    </>
  )
}
