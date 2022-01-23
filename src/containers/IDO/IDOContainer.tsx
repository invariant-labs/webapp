import React from 'react'
import IDOInput from '@components/Inputs/IDOInput/IDOInput'
import { IDOInsides } from '../../components/IDO/Insides/IDOInsides'
import ConnectButton from '@components/ConnectButton/ConnectButton'
import useStyles from './style'

export const IDOContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.idoContainer}>
      <h1 className={classes.header}>Deposit your SOL</h1>
      <IDOInput
        value={0.000001}
        balanceValue={'102 460.3445'}
        changePercent={-4.14}
        bigNumberRightBottom={'205 341.4361'}
        onMaxClick={() => {}}
      />

      <IDOInsides
        valuexUSD={46.643}
        valueUSD={47.43}
        valueSOL={0.0432}
        valuexETH={'0.0000'}
        valuexBTC={'0.0000'}
      />
      <ConnectButton name={'Connect a wallet'} />
    </div>
  )
}
