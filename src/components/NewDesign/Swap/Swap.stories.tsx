import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Swap, { SwapToken } from './Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { toBlur } from '@consts/uiUtils'
import { Status } from '@reducers/solanaWallet'

const defaultToken = {
  symbol: '',
  balance: new BN(0),
  decimal: 6,
  assetAddress: new PublicKey(0)
}

const onSwap = (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
  console.log(fromToken, toToken, amount)
}

const tokens = 'SOL BTC USD FTT ETH'.split(' ').map(
  (i): SwapToken => {
    return { ...defaultToken, symbol: i }
  }
)

tokens[0].balance = new BN(100).mul(new BN(34786))
tokens[1].balance = new BN(10).mul(new BN(126))

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Swap
        walletStatus={Status.Initialized}
        tokens={tokens}
        onSwap={onSwap}
        isPairExisting={() => true}
        getPriceProportion={() => new BN(1)}
        getIsXToY={() => true}
      />
    </div>
  ))
