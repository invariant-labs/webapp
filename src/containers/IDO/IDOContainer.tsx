import React from 'react'
import useStyles from './style'

export interface IIDOContainerProps {
  containerTitle?: string
}

export const IDOContainer: React.FC<React.PropsWithChildren<IIDOContainerProps>> = props => {
  const classes = useStyles()

  return (
    <div className={classes.idoContainer}>
      <h1 className={classes.header}>{props.containerTitle}</h1>
      {props.children}
    </div>
  )
}
