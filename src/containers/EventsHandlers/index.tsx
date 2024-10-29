import SolanaWalletEvents from '@containers/EventsHandlers/solanaWallet'
import MarketEvents from '@containers/EventsHandlers/market'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <MarketEvents />
      {/* <StakerEvents /> */}
      {/* <BondsEvents /> */}
    </>
  )
}

export default EventHandler
