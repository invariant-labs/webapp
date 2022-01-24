import React from 'react'
import IDOInput, { IIDOInputProps } from '@components/Inputs/IDOInput/IDOInput'
import { IDOInsides, IIDOInsidesProps } from '../../components/IDO/Insides/IDOInsides'
import WideButton, { IWideButtonProps } from '@components/WideButton/WideButton'
import useStyles from './style'

export interface IIDOContainerProps {
  IDOInput: IIDOInputProps
  IDOInsides: IIDOInsidesProps
  IWideButton: IWideButtonProps
}

export const IDOContainer: React.FC<IIDOContainerProps> = container => {
  const classes = useStyles()

  return (
    <div className={classes.idoContainer}>
      <h1 className={classes.header}>Deposit your SOL</h1>
      <IDOInput
        currencyIcon={container.IDOInput.currencyIcon}
        currencyShort={container.IDOInput.currencyShort}
        inputValue={container.IDOInput.inputValue}
        onChange={container.IDOInput.onChange}
        balanceValue={container.IDOInput.balanceValue}
        balanceCurrency={container.IDOInput.balanceCurrency}
        changePercent={container.IDOInput.changePercent}
        bigNumberRightBottom={container.IDOInput.bigNumberRightBottom}
        onMaxClick={container.IDOInput.onMaxClick}
      />

      <IDOInsides
        valuexUSD={container.IDOInsides.valuexUSD}
        valueUSD={container.IDOInsides.valueUSD}
        valueSOL={container.IDOInsides.valueSOL}
        valuexETH={container.IDOInsides.valuexETH}
        valuexBTC={container.IDOInsides.valuexBTC}
      />
      <WideButton name={container.IWideButton.name} />
    </div>
  )
}
