import React, { ReactElement } from 'react';
import { CardMedia, PropTypes } from '@material-ui/core';
import { AccessTime } from "@material-ui/icons";
import { FontWeightProperty, PaddingProperty } from 'csstype';
import { Panel } from "/src/components/IDO/Panel/Panel";
import useStyles from "./style";


import { IdoDepositSol } from "/src/components/IDO/IdoDepositSol/IdoDepositSol"
import { ConnectWalletButton } from "/src/components/IDO/ConnectWalletButton/ConnectWalletButton"
import { IdoInputWithRange } from "/src/components/IDO/IdoInput/IdoInputWithRange"

import classNames from 'classnames';
import { ClassNames } from '@emotion/core';
import { Meta } from '@storybook/react';
import invariantLogo from "/src/static/png/invariant-logo.png";
import { colors } from '@static/theme'
import { boolean } from 'yup';


export interface IProps {
  name: ReactElement | string
  amount:string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onHover?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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
  endSalePeriod : string 
  endGracePeriod: string 
  solAmountContributed :string 
  estimatedTokenPrice:string 
  invariantForSale: string

}




export const IdoTwoPanelWithRange: React.FC<IProps> = ({
  name,
  amount,
  isDarkBg=false,
  hasBottomBorder=false,
  hasTopBorder=false,
  onClick,
  onHover,
  color = 'primary',
  className,
  logoSrc= null,
  disabled = false,
  startIcon,
  labelClassName,
  endSalePeriod, 
  endGracePeriod, 
  solAmountContributed, 
  estimatedTokenPrice, 
  invariantForSale,
}) => {

const classes = useStyles()

return(

  <div style={{display:"flex", flexDirection: "row",gap: "20px"}}>
      
<div style={{display:"flex", flexDirection:"column", alignContent:"flex-start", justifyContent:"space-around", backgroundColor: "#3A466B", padding:"2%", borderRadius:"24px", width:"416px"}}>
<div style={{color:"white", marginTop:"-30px"}}> 

<h2 className= {classNames(classes.IdoHeader,className)}> Deposit your SOL</h2>
</div>


<div style={{ backgroundColor: "#111931",  borderRadius:"24px",padding:"0px 10px" }}>
<IdoInputWithRange name="Ido Input" color='secondary' balance ={5000} conversionRate = {15.5} valueChange={2.41} />
</div>

<IdoDepositSol/>

<div style={{display:"grid", placeItems:"center" }}><ConnectWalletButton name='Connect Wallet' color='secondary' /></div>
</div> 

<div style={{width:"240px" }}>
<Panel endSalePeriod = "22 Feb 2022 23:59:00 GMT" endGracePeriod = "2 Feb 2022 21:45:50 GMT" solAmountContributed="122 124 846" estimatedTokenPrice= "218.839" invariantForSale = "20 000 000" />
</div>    

    </div>




)}
