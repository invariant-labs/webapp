import React from 'react'
import useStyles from './style'
import { Input, Button } from '@material-ui/core'

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
    <div className={classes.container}>
      <div className={classes.spaceBetween}>
        <Input className={classes.input}></Input>
        <span className={classes.value}>{value}</span>
      </div>
      <div className={classes.spaceBetween}>
        <div className={classes.balance}>
          Balance: {balanceValue} SNY
          <button name='Max' onClick={onMaxClick} className={classes.maxButton}>
            Max
          </button>
        </div>
        <div className={classes.rightBottom}>
          <div
            className={`${classes.percentGeneral} ${
              changePercent > 0 ? classes.percentPlus : classes.percentMinus
            }`}
          >
            {changePercent.toString().replace('-', '- ')}%
          </div>
          <span className={classes.bigNumberRightBottom}>~ ${bigNumberRightBottom}</span>
        </div>
      </div>
    </div>
  )
}

export default IDOInput
