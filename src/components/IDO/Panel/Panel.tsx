import React, { ReactElement } from 'react'
import { CardMedia, PropTypes } from '@material-ui/core';
import { AccessTime } from "@material-ui/icons";
import { FontWeightProperty, PaddingProperty } from 'csstype'
import { IdoLabel } from "src/components/IDO/IdoLabel/IdoLabel"
import classNames from 'classnames'
import { ClassNames } from '@emotion/core'
import invariantLogo from "public/logo192.png";
import { Meta } from '@storybook/react';
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
  logoSrc?:string | null
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
  labelClassName
}) => {

return(
    <div>

<IdoLabel name="Sale period ends in" amount= "15:30:33" logoSrc="clock" hasTopBorder={true} />
<IdoLabel name="Grace period ends in" amount= "32:29:27" logoSrc="clock" isDarkBg={true} />
<IdoLabel name="SOL Contributed" amount= "122 124 846" />
<IdoLabel name="Estimated token price" amount= "218.839" isDarkBg={true}/>
<IdoLabel name="Invariant for sale" amount= "20 000 000" logoSrc = {invariantLogo} hasBottomBorder={true} />
</div>
)
}