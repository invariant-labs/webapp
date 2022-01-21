import React, { ReactElement } from 'react'
import { Button, PropTypes } from '@material-ui/core'
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: ReactElement | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: PropTypes.Color
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  startIcon?: JSX.Element
  fontWeight?: FontWeightProperty
  padding?: PaddingProperty<number>
  labelClassName?: string
}

export const IdoInput: React.FC<IProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
  disabled = false,
  startIcon,
  labelClassName
}) => {
  const classes = useStyles()
  return (
    <div className= {classNames(classes.inputWrapper, className)}>
    <div className={classNames(classes.firstRow, className)}> <div className= {classNames(classes.coinName, className)} > <div className= {classNames(classes.ellipse, className)}> </div> <h1 className={classNames(classes.SNY, className)}> SNY </h1>         </div> <div className= {classNames(classes.displayValue, className)}> <h1> 0000001 </h1> </div> </div>

    <div className = {classNames(classes.firstRow, className)}> <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}> <p className={classNames(classes.balanceText, className)}> Balance: 102 460.3445 SNY </p> <button className= {classNames(classes.maxButton, className)} children ="Max" /> </div> <div className = {classNames(classes.firstRow, className)}> <p className = {classNames(classes.valueChange, className)} children ="-2.41%"/> <p> ~$205.4345 </p> </div> </div>

      </div>
  )
}

