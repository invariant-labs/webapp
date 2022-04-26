import React from 'react'
import SolanaWalletEvents from '@containers/EventsHandlers/solanaWallet'
import MarketEvents from '@containers/EventsHandlers/market'
import BondsEvents from './bonds'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <MarketEvents />
      <BondsEvents />
    </>
  )
}

export default EventHandler
