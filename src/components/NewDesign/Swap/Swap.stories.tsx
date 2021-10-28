import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Swap, { SwapToken, Pools } from './Swap'
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
const pools: Pools[] = [
  {
    tokenX: {
      _bn: new PublicKey('35P5P6ZGKUN6wqxrX4VdLRrGbzkrfvhyNs4iqk1vDxAx')
    },
    tokenY: {
      _bn: new PublicKey('CYPdUAp8KshzJ2a45kzgy3fr4UTiyrEGE998rA7wzFR6')
    },
    sqrtPrice: {
      v: new BN(105324532453400)
    }
  },
  {
    tokenX: {
      _bn: new PublicKey('35P5P6ZGKUN6wqxrX4VdLRrGbzkrfvhyNs4iqk1vDxAx')
    },
    tokenY: {
      _bn: new PublicKey('23AQ2kRxqT1fk47q6G8YcKrpx4VhWeUvKHuRijT61qSD')
    },
    sqrtPrice: {
      v: new BN(4004325324500)
    }
  }
]

const onSwap = (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
  console.log(fromToken, toToken, amount)
}

const tokens = 'SOL BTC USD FTT ETH'.split(' ').map(
  (i): SwapToken => {
    return { ...defaultToken, symbol: i }
  }
)

tokens[0].balance = new BN(100).mul(new BN(34786))
tokens[0].assetAddress = new PublicKey('35P5P6ZGKUN6wqxrX4VdLRrGbzkrfvhyNs4iqk1vDxAx')
tokens[1].assetAddress = new PublicKey('CYPdUAp8KshzJ2a45kzgy3fr4UTiyrEGE998rA7wzFR6')
tokens[2].assetAddress = new PublicKey('23AQ2kRxqT1fk47q6G8YcKrpx4VhWeUvKHuRijT61qSD')
tokens[1].balance = new BN(10).mul(new BN(126))
tokens[2].balance = new BN(10).mul(new BN(5342))

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Swap
        walletStatus={Status.Initialized}
        tokens={tokens}
        onSwap={onSwap}
        pools={pools}
      />
    </div>
  ))
