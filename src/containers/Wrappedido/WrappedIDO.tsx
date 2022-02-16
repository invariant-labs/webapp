import React from 'react'
import IDO from '@components/IDO/IDO'
import IDOLabel from '@components/IDOLabel/IDOLabel'

const WrappedIDO = () => {
  return (
    <>
      <IDO xBTC='0.0 xBTC' xETH='0.0 xETH' sol='0.0432 SOL' usd='47.43 USD' xUSD='46.643 xUSD' />
      <IDOLabel />
    </>
  )
}

export default WrappedIDO
