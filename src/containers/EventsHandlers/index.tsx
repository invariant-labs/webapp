import React from 'react'
import SolanaWalletEvents from '@containers/EventsHandlers/solanaWallet'
import MarketEvents from '@containers/EventsHandlers/market'
import StakerEvents from './staker'
import BondsEvents from './bonds'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <MarketEvents />
      <StakerEvents />
      <BondsEvents />
    </>
  )
}

export default EventHandler
