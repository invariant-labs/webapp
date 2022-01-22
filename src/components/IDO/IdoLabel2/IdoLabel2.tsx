import React, { ReactElement } from 'react'
import { CardMedia, PropTypes } from '@material-ui/core';
import { AccessTime } from "@material-ui/icons";
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'
import { ClassNames } from '@emotion/core'
import invariantLogo from "public/logo192.png";
import { Meta } from '@storybook/react';
import { boolean } from 'yup'



export interface IProps {
  name: ReactElement | string
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

export const IdoLabel2: React.FC<IProps> = ({
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
      
      <div className= {isDarkBg ? classNames(classes.outerCardCenterDark, className) :classNames(classes.outerCardCenter, className)} style={hasBottomBorder && hasTopBorder ? {borderRadius:"24px 24px 24px 24px"} : hasTopBorder ? {borderRadius:"24px 24px 0px 0px"}: hasBottomBorder ? {borderRadius:"0px 0px 24px 24px"}: {borderRadius:"0px 0px 0px 0px"} } >
    <div className = {classNames(classes.grayText, className)}><p> {name} </p></div>
   <div className = {classNames(classes.whiteDisplay, className)} style={{display:"flex", flexDirection:"row", justifyContent:"center",alignItems:"center"}}> { !logoSrc ? <div className={classNames(classes.ellipse, className)}/> : logoSrc== "clock" ? <AccessTime/> : <img className= {classNames(classes.logoImg,className)}src={logoSrc}/> } <h1> {amount}</h1>
   </div> </div>
  


  )
}
