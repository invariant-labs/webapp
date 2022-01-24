import React, { ReactElement } from 'react'
import classNames from 'classnames'
import useStyle from './style'

export interface IIDOLabelsProps {
  className?: string
  style?: React.CSSProperties
  title: ReactElement | string
  icon: string
  value: string
}
export const IDOLabels: React.FC<IIDOLabelsProps> = ({ className, title, icon, value }) => {
  const classes = useStyle()

  return (
    <div className={classNames(classes.general, className)}>
      <label className={classes.title}>{title}</label>
      <div>
        <img className={classes.icon} src={icon} />
        <span className={classes.value}>{value}</span>
      </div>
    </div>
  )
}

export default IDOLabels
