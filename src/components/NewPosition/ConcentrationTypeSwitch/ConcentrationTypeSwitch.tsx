import React, { useState } from 'react'
import { Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import { useSingleTabStyles, useTabsStyles } from './style'

export interface IProps {
  onSwitch: (isConcentrated: boolean) => void
  initialValue: number
}

export const ConcentrationTypeSwitch: React.FC<IProps> = ({ onSwitch, initialValue }) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [current, setCurrent] = useState(initialValue)

  const tabsClasses = useTabsStyles({ value: current })
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    onSwitch(!!newValue)
  }

  return (
    <Tabs
      value={current}
      onChange={handleChange}
      variant='scrollable'
      scrollButtons='off'
      TabIndicatorProps={{ children: <span /> }}
      classes={tabsClasses}>
      <Tab disableRipple label='Range' classes={singleTabClasses} />
      <Tab disableRipple label={isXs ? 'Conc.' : 'Concentr.'} classes={singleTabClasses} />
    </Tabs>
  )
}

export default ConcentrationTypeSwitch
