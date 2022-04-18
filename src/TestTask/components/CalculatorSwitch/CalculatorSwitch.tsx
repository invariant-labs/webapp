import React from 'react'
import { Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import { useSingleTabStyles, useTabsStyles } from './style'

export interface IProps {
  onSwitch: (isConcentrated: boolean) => void
  className?: string
  style?: React.CSSProperties
  currentCurrency: number
  setCurrentCurrency: (currentCurrency: number) => void
}

export const CalculatorSwitch: React.FC<IProps> = ({
  onSwitch,
  className,
  style,
  currentCurrency,
  setCurrentCurrency
}) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const tabsClasses = useTabsStyles({ value: currentCurrency })
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentCurrency(newValue)
    onSwitch(!newValue)
  }

  return (
    <Tabs
      className={className}
      style={style}
      value={currentCurrency}
      onChange={handleChange}
      variant='scrollable'
      scrollButtons='off'
      TabIndicatorProps={{ children: <span /> }}
      classes={tabsClasses}>
      <Tab disableRipple label={'USD'} classes={singleTabClasses} style={{ cursor: 'pointer' }} />
      <Tab disableRipple label={'ETH'} classes={singleTabClasses} style={{ cursor: 'pointer' }} />
      <Tab disableRipple label={'BTC'} classes={singleTabClasses} style={{ cursor: 'pointer' }} />
    </Tabs>
  )
}

export default CalculatorSwitch
