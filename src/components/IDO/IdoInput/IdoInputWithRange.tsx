import React, { ReactElement, useState, useEffect } from 'react'
import { Button, PropTypes } from '@material-ui/core'
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: ReactElement | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  balance: number
  conversionRate: number
  valueChange: number
  color?: PropTypes.Color
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  startIcon?: JSX.Element
  fontWeight?: FontWeightProperty
  padding?: PaddingProperty<number>
  labelClassName?: string
}

export const IdoInputWithRange: React.FC<IProps> = ({
  name,
  onClick,
  balance,
  conversionRate,
  valueChange,
  color = 'primary',
  className,
  disabled = false,
  startIcon,
  labelClassName
}) => {


let [chosenAmount, setChosenAmount] = useState(0.0001)
let [usdValue, setUsdValue] = useState(0)

useEffect( () =>  { 
if (balance >=chosenAmount){
let multiplication:number = chosenAmount*conversionRate; 
setUsdValue(parseFloat(multiplication.toFixed(4)))
} 
},[chosenAmount,conversionRate])

  const classes = useStyles()
  return (
    <div className= {classNames(classes.inputWrapper, className)}>
    <div className={classNames(classes.firstRow, className)}> <div className= {classNames(classes.coinName, className)} > <div className= {classNames(classes.ellipse, className)}> </div> <h1 className={classNames(classes.SNY, className)}> SNY </h1>         </div> <div className= {classNames(classes.displayValue, className)}> <input className ={classNames(classes.displayValue,className)} type="number" placeholder= "0.00001" min= "0.0000" max={balance} step="0.0001" onChange={(el) => balance >= parseInt(el.target.value) && setChosenAmount(parseFloat(el.target.value))} value= {parseFloat(chosenAmount.toString())} autoFocus={false} /> </div> </div> 

<div className= "rangeSelector" style={{display:"flex", flexDirection: "row",justifySelf:"flex-end", alignSelf:"flex-end" }}> <input type="range" min= "0.0000" max = {balance} onChange ={(el) => balance >= parseInt(el.target.value) && setChosenAmount(parseFloat(el.target.value))} value= {parseFloat(chosenAmount.toString())} /> </div>

    <div className = {classNames(classes.firstRow, className)}> <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}> <p className={classNames(classes.balanceText, className)}> Balance: {balance} SNY </p> <button className= {classNames(classes.maxButton, className)} children ="Max" onClick= {()=> setChosenAmount(balance)} /> </div> <div className = {classNames(classes.firstRow, className)}> <p className = {valueChange>=0 ? classNames(classes.posValueChange, className) : classNames(classes.negValueChange, className)}> {valueChange}% </p> <p> ~${ balance >=chosenAmount ? usdValue : "Insufficient Funds"} </p> </div> </div>

      </div>
  )
}
