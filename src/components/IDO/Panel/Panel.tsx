import React, { ReactElement } from 'react'
import { CardMedia, PropTypes } from '@material-ui/core';
import { AccessTime } from "@material-ui/icons";
import { FontWeightProperty, PaddingProperty } from 'csstype';
import { IdoLabel } from "/src/components/IDO/IdoLabel/IdoLabel";
import { IdoLabelTimer } from "/src/components/IDO/IdoLabelTimer/IdoLabelTimer"
import classNames from 'classnames';
import { ClassNames } from '@emotion/core';
import { Meta } from '@storybook/react';
import invariantLogo from "/src/static/png/invariant-logo.png";
import { boolean } from 'yup';




export interface IProps {
  name: ReactElement | string
  amount:string,
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
  logoSrc?:string | null,
  endSalePeriod : string, 
  endGracePeriod: string, 
  solAmountContributed :string, 
  estimatedTokenPrice:string, 
  invariantForSale: string,

}

export const Panel: React.FC<IProps> = ({
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

return(
    <div>

<IdoLabelTimer name ="End Sale Period" periodEnd= {endSalePeriod} logoSrc= "clock" hasTopBorder={true}/>
<IdoLabelTimer name ="End Grace Period" periodEnd= {endGracePeriod} logoSrc= "clock" isDarkBg={true} />
<IdoLabel name= "Sol Contributed" amount= {solAmountContributed} />
<IdoLabel name= "Estimated Token Price"  amount= {estimatedTokenPrice} isDarkBg={true}/>
<IdoLabel name ="Invariant For Sale" amount= {invariantForSale} logoSrc= {invariantLogo} hasBottomBorder={true}/>
</div>
)
}
