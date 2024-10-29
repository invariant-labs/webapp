import type { Meta, StoryObj } from '@storybook/react'
import SelectTokenModal from './SelectTokenModal'
import { fn } from '@storybook/test'
import { NetworkType } from '@store/consts/static'
import { SwapToken } from '@store/selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

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

const meta = {
  title: 'Modals/SelectTokenModal',
  component: SelectTokenModal
} satisfies Meta<typeof SelectTokenModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    anchorEl: null,
    handleClose: () => {},
    onSelect: () => {},
    open: true,
    commonTokens: [],
    handleAddToken: fn(),
    initialHideUnknownTokensValue: false,
    onHideUnknownTokensChange: fn(),
    tokens: tokens,
    hiddenUnknownTokens: false,
    network: NetworkType.Testnet
  }
}
