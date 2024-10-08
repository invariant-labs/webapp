import { storiesOf } from '@storybook/react'
import ExchangeAmountInput from './ExchangeAmountInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
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

storiesOf('inputs/exchangeAmount', module)
  .addDecorator(withKnobs)
  .add('token', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ExchangeAmountInput
        setValue={() => {}}
        decimal={6}
        placeholder={'0.0'}
        onMaxClick={() => {}}
        tokens={tokens}
        current={tokens[0]}
        onSelect={() => {}}
        disabled={false}
        handleAddToken={() => {}}
        commonTokens={[
          new PublicKey('So11111111111111111111111111111111111111112'),
          new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
          new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
        ]}
        initialHideUnknownTokensValue={false}
        onHideUnknownTokensChange={() => {}}
        isBalanceLoading={false}
      />
    </div>
  ))
  .add('balance loading', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ExchangeAmountInput
        setValue={() => {}}
        decimal={6}
        placeholder={'0.0'}
        onMaxClick={() => {}}
        tokens={tokens}
        current={tokens[0]}
        onSelect={() => {}}
        disabled={false}
        handleAddToken={() => {}}
        commonTokens={[
          new PublicKey('So11111111111111111111111111111111111111112'),
          new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
          new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
        ]}
        initialHideUnknownTokensValue={false}
        onHideUnknownTokensChange={() => {}}
        isBalanceLoading={true}
      />
    </div>
  ))
