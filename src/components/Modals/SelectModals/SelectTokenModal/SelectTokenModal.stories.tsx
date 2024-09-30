import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SelectTokenModal from '@components/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'

const tokens: Record<string, SwapToken> = {
  So11111111111111111111111111111111111111112: {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E': {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
}

storiesOf('newModals/selectToken', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectTokenModal
      tokens={tokens}
      commonTokens={[
        new PublicKey('So11111111111111111111111111111111111111112'),
        new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
        new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
      ]}
      open={true}
      handleClose={() => {}}
      anchorEl={null}
      onSelect={() => {}}
      handleAddToken={() => {}}
      initialHideUnknownTokensValue={false}
      onHideUnknownTokensChange={() => {}}
    />
  ))
