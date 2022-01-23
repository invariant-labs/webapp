import IDOInput from '@components/Inputs/IDOInput/IDOInput'
import React from 'react'
import useStyle from './style'

interface IProps {
  valuexUSD: number
  valueUSD: number
  valueSOL: number
  valuexETH: number | string
  valuexBTC: number | string
}

export const IDOInsides: React.FC<IProps> = ({
  valuexUSD,
  valueUSD,
  valueSOL,
  valuexETH,
  valuexBTC
}) => {
  const classes = useStyle()

  return (
    <div>
      <p className={classes.label}>Deposited amount:</p>
      <div className={classes.logoValues}>
        <img className={classes.logo} src='/src/static/svg/LogoShortGrey.svg' />
        <div className={classes.allValues}>
          <div className={classes.valueBold}>{valuexUSD} xUSD</div>
          <div className={classes.valuesBottom}>
            <div>{valueUSD} USD </div>
            <div>{valueSOL} SOL </div>
            <div>{valuexETH} xETH </div>
            <div>{valuexBTC} xBTC </div>
          </div>
        </div>
      </div>
    </div>
  )
}
