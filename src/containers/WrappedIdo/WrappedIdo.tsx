import { Ido } from '@components/Ido/Ido'

import React from 'react'








export const WrappedIdo = () => {

  
    return (
    <>
        <Ido
        header={'Deposit your SOL'} // 'Deposit your SOL' / 'Claim your Sol' / 'Withdraw your SOL'
        estValue={'56.0278$'} 
        balanceValue={'1004.5 SOL'}
        xUSD={"46.643 xUSD"}
        USD={"47.43 USD"}
        SOL={"0.0432 SOL"}
        xETH={"0.0000 xET"}
        xBTC={"0.0000 xBTC"}
        //tokens
        //other props
        />
    </>
    )
  }
  
  export default WrappedIdo