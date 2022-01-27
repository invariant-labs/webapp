import React, { ReactElement, useState, useEffect } from 'react'
import { Button, PropTypes } from '@material-ui/core'
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'
import logo from "/public/logo192.png";

export interface IProps {
  name?: ReactElement | string
  amount:string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: PropTypes.Color
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  startIcon?: JSX.Element
  fontWeight?: FontWeightProperty
  padding?: PaddingProperty<number>
  labelClassName?: string
  isDarkBg?:boolean
  hasBottomBorder?:boolean
  hasTopBorder?:boolean
  logoSrc?:string | null
}

export const IdoDepositSol: React.FC<IProps> = ({
  name,
  amount,
  isDarkBg=false,
  hasBottomBorder=false,
  hasTopBorder=false,
  onClick,
  color = 'primary',
  className,
  logoSrc= null,
  disabled = false,
  startIcon,
  labelClassName
}) => {
 const classes = useStyles()
  return (
 <div className= {classNames(classes.outerWrapper,className)}>
            <div><p className= {classNames(classes.depositHeader,className)}> Deposited Amount </p> </div>
         <div className={classNames(classes.secondRow, className)}> 
         
         <div style={{width: "42px", height:"52px"}}> <img src= {logo} /> </div> 
         
         <div style= {{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start", alignContent:"flex-start", marginLeft:"20px", marginTop:"-25px"}}> 
                        <div><h4 style={{color:"white",fontSize:"20px", lineHeight:"24px",}}> 46.643 xUSD </h4></div> 
                    
                    <div className={classNames(classes.priceWrapper, className)} >
                        <p className={classNames(classes.priceText, className)} >47.43 USD</p>
                        <p className={classNames(classes.priceText, className)}>0.0432 SOL</p>
                        <p className={classNames(classes.priceText, className)}>0.000 xETH</p>
                        <p className={classNames(classes.priceText, className)}>0.000 xBTC</p>
                    </div>
                    
         </div>
         </div>
        </div>

  )
}

