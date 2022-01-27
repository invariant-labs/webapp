import React, { ReactElement, useState, useEffect } from 'react'
import { CardMedia, PropTypes } from '@material-ui/core';
import { AccessTime } from "@material-ui/icons";
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'
import { ClassNames } from '@emotion/core'
import logo from "public/logo192.png";
import { Meta } from '@storybook/react';
import { boolean } from 'yup'



export interface IProps {
  name: ReactElement | string
  periodEnd:string,
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

export const IdoLabelTimer: React.FC<IProps> = ({
  name,
  periodEnd,
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
    
    let [loading, setLoading] = useState(true)
    let [finished, setFinished]= useState(false)
    let [day, setDay] = useState<number>(0) 
    let [hour, setHour] = useState<number>(0) 
    let [minute, setMinute] = useState<number>(0) 
    let [second, setSecond] = useState<number>(0)

let timePeriod = Date.parse(periodEnd)

function countDown(chosenTime){

       
        let currentTime= Date.now()
        if(chosenTime <=currentTime ){

        setFinished(true)

        }else{ 
        setTimeout( () => setLoading(false) ,2000)
        let period = chosenTime-currentTime
        
        setDay(Math.floor(period / (1000*24*60*60)))
        setHour(Math.floor((period / (1000*60*60)) %24))
        setMinute(Math.floor((period / (1000*60)) % 60 ))
        setSecond(Math.floor((period /1000)%60))
        
        }
        }

    useEffect( () => {
    let timer = setInterval(() => countDown(timePeriod), 1000) 
    return () => clearInterval(timer)

}, [])





  return (
      
      <div className= {isDarkBg ? classNames(classes.outerCardCenterDark, className) :classNames(classes.outerCardCenter, className)} style={hasBottomBorder && hasTopBorder ? {borderRadius:"24px 24px 24px 24px"} : hasTopBorder ? {borderRadius:"24px 24px 0px 0px"}: hasBottomBorder ? {borderRadius:"0px 0px 24px 24px"}: {borderRadius:"0px 0px 0px 0px"} } >
    <div className = {classNames(classes.grayText, className)}><p> {name} </p></div>
   <div className = {classNames(classes.whiteDisplay, className)} style={{display:"flex", flexDirection:"row", justifyContent:"center",alignItems:"center"}}> { !logoSrc ? <div className={classNames(classes.ellipse, className)}/> : logoSrc== "clock" ? <AccessTime/> : <img className= {classNames(classes.logoImg,className)}src={logoSrc}/> }  {loading ? <h1> Loading... </h1> :

!finished ?
            <h1> {day<10 ? `0${day}`: `${day}`}:{hour<10 ? `0${hour}`: `${hour}`}:{minute<10 ? `0${minute}`: `${minute}`}:{second<10 ? `0${second}`: `${second}`} </h1>
        :  <h1> Finished </h1> }
   </div> </div>
  


  )
}
