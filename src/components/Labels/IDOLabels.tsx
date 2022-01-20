import React, { ReactElement } from 'react'
import classNames from 'classnames'
import useStyle from './style'

export interface IProps {
  className?: string
  style?: React.CSSProperties
  title: ReactElement | string
  icon: string
  someValue: string
}
export const IDOLabels: React.FC<IProps> = ({ className, title, icon, someValue }) => {
  const classes = useStyle()

  return (
    <div className={classNames(classes.general, className)}>
      <label className={classes.title}>{title}</label>
      <div>
        <img className={classes.icon} src={icon} />
        <span className={classes.value}>{someValue}</span>
      </div>
    </div>
  )
}
