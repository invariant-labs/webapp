import React from 'react'
import SolanaWalletEvents from '@containers/EventsHandlers/solanaWallet'
import MarketEvents from '@containers/EventsHandlers/market'
import StakerEvents from './staker'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <MarketEvents />
      <StakerEvents />
    </>
  )
}

export default EventHandler
