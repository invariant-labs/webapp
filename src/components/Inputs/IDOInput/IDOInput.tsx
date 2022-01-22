import React from 'react'
import useStyles from './style'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Input } from '@material-ui/core'

interface IProps {
  value: number
  balanceValue: number | string
  changePercent: number
  bigNumberRightBottom: number | string
  onMaxClick: () => void
  className?: string
}

export const IDOInput: React.FC<IProps> = ({
  value,
  balanceValue,
  changePercent,
  bigNumberRightBottom,
  onMaxClick,
  className
}) => {
  const classes = useStyles()

  return (
    <>
      <div>
        <Input></Input>
        <p>{value}</p>
      </div>
      <div>
        <div>
          Balance: {balanceValue.toLocaleString()} SNY
          <OutlinedButton
            name='Max'
            color='primary'
            onClick={onMaxClick}
            className={classes.maxButton}
            labelClassName={classes.label}
          />
        </div>
        <div>
          <div>{changePercent}</div>
          ~${bigNumberRightBottom.toLocaleString()}
        </div>
      </div>
    </>
  )
}

export default IDOInput
