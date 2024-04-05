import { colors } from '@static/theme'
import React from 'react'

export interface ISVGHandle {
  height: number
  className?: string
  x: number
  fill: string
  textColor: string
  isReversed?: boolean
}

export const MaxText: React.FC<Pick<ISVGHandle, 'x' | 'textColor'>> = ({ x, textColor }) => (
  <svg
    width='20'
    height='7'
    viewBox='0 0 20 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={x}
    y={6}>
    <path
      d='M1.20516 0.699999H2.75516L3.75516 3.84C3.84182 4.11333 3.92182 4.38667 3.99516 4.66C4.07516 4.92667 4.14516 5.19 4.20516 5.45H4.24516C4.27182 5.33667 4.30182 5.21333 4.33516 5.08C4.37516 4.94 4.41516 4.8 4.45516 4.66C4.49516 4.51333 4.53182 4.37 4.56516 4.23C4.60516 4.09 4.64516 3.96 4.68516 3.84L5.65516 0.699999H7.20516L7.70516 7H6.53516C6.48182 6.31333 6.43182 5.63 6.38516 4.95C6.34516 4.26333 6.31849 3.57667 6.30516 2.89L6.27516 1.9H6.24516C6.14516 2.29333 6.03849 2.69667 5.92516 3.11C5.81182 3.52333 5.69849 3.9 5.58516 4.24L4.70516 7H3.71516L2.81516 4.24C2.66182 3.77333 2.53182 3.34667 2.42516 2.96C2.32516 2.56667 2.23849 2.21333 2.16516 1.9H2.14516C2.13182 2.42 2.10849 2.96333 2.07516 3.53C2.04849 4.09667 2.01849 4.62 1.98516 5.1L1.87516 7H0.725156L1.20516 0.699999ZM10.2369 4.54H11.9869L11.6569 3.61C11.5635 3.33 11.4735 3.06667 11.3869 2.82C11.3069 2.57333 11.2235 2.30333 11.1369 2.01H11.1169C11.0235 2.28333 10.9335 2.55 10.8469 2.81C10.7602 3.06333 10.6669 3.33 10.5669 3.61L10.2369 4.54ZM10.5369 0.699999H11.7569L14.1469 7H12.8569L12.2969 5.45H9.94688L9.38688 7H8.11688L10.5369 0.699999ZM15.5385 0.699999L16.9285 2.99L18.3285 0.699999H19.7185L17.6685 3.8L19.8185 7H18.3785L16.8785 4.62L15.4085 7H14.0285L16.0985 3.8L14.1185 0.699999H15.5385Z'
      fill={textColor}
    />
  </svg>
)

export const MinText: React.FC<Pick<ISVGHandle, 'x' | 'textColor'>> = ({ x, textColor }) => (
  <svg
    width='20'
    height='7'
    viewBox='0 0 20 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={x}
    y={6}>
    <path
      d='M0.601641 0.699999H2.15164L3.15164 3.84C3.23831 4.11333 3.31831 4.38667 3.39164 4.66C3.47164 4.92667 3.54164 5.19 3.60164 5.45H3.64164C3.66831 5.33667 3.69831 5.21333 3.73164 5.08C3.77164 4.94 3.81164 4.8 3.85164 4.66C3.89164 4.51333 3.92831 4.37 3.96164 4.23C4.00164 4.09 4.04164 3.96 4.08164 3.84L5.05164 0.699999H6.60164L7.10164 7H5.93164C5.87831 6.31333 5.82831 5.63 5.78164 4.95C5.74164 4.26333 5.71497 3.57667 5.70164 2.89L5.67164 1.9H5.64164C5.54164 2.29333 5.43497 2.69667 5.32164 3.11C5.20831 3.52333 5.09497 3.9 4.98164 4.24L4.10164 7H3.11164L2.21164 4.24C2.05831 3.77333 1.92831 3.34667 1.82164 2.96C1.72164 2.56667 1.63497 2.21333 1.56164 1.9H1.54164C1.52831 2.42 1.50497 2.96333 1.47164 3.53C1.44497 4.09667 1.41497 4.62 1.38164 5.1L1.27164 7H0.121641L0.601641 0.699999ZM9.39336 0.699999V7H8.17336V0.699999H9.39336ZM10.5394 0.699999H11.6394L14.0394 4.24C14.1727 4.44 14.296 4.64 14.4094 4.84C14.5227 5.03333 14.6127 5.19333 14.6794 5.32H14.6994C14.6594 4.86 14.6394 4.4 14.6394 3.94C14.6394 3.47333 14.6394 3.01 14.6394 2.55V0.699999H15.7894V7H14.6894L12.3994 3.65C12.246 3.42333 12.0994 3.18667 11.9594 2.94C11.826 2.69333 11.7227 2.49333 11.6494 2.34H11.6294C11.6627 2.83333 11.6794 3.31333 11.6794 3.78C11.686 4.24 11.6894 4.71 11.6894 5.19V7H10.5394V0.699999Z'
      fill={textColor}
    />
  </svg>
)

export const LeftHandle: React.FC<Pick<ISVGHandle, 'height' | 'fill'>> = ({ height = 0, fill }) => (
  <>
    <path d={`M36 ${height}V0`} stroke={fill} strokeWidth='2' />
    <path d='M0 4C0 1.79086 1.79086 0 4 0H37V20H4C1.79086 20 0 18.2091 0 16V4Z' fill={fill} />
    <path d='M5 5V15' stroke={colors.invariant.dark} strokeOpacity='0.5' />
    <path d='M8 5V15' stroke={colors.invariant.dark} strokeOpacity='0.5' />
  </>
)

export const RightHandle: React.FC<Pick<ISVGHandle, 'height' | 'fill'>> = ({
  height = 0,
  fill
}) => (
  <>
    <path d={`M1 ${height}V0`} stroke={fill} strokeWidth='2' />
    <path d='M37 4C37 1.79086 35.2091 0 33 0H0V20H33C35.2091 20 37 18.2091 37 16V4Z' fill={fill} />
    <path d='M29 5V15' stroke={colors.invariant.dark} strokeOpacity='0.5' />
    <path d='M32 5V15' stroke={colors.invariant.dark} strokeOpacity='0.5' />
  </>
)

export const MaxHandle: React.FC<ISVGHandle> = ({
  height,
  className,
  x,
  fill,
  textColor,
  isReversed = false
}) => (
  <svg
    className={className}
    width='37'
    height={height}
    viewBox={`0 0 37 ${height}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={x}>
    {!isReversed ? (
      <RightHandle height={height} fill={fill} />
    ) : (
      <LeftHandle height={height} fill={fill} />
    )}
    <MaxText textColor={textColor} x={isReversed ? 14 : 5} />
  </svg>
)

export const MinHandle: React.FC<ISVGHandle> = ({
  height,
  className,
  x,
  fill,
  textColor,
  isReversed = false
}) => (
  <svg
    className={className}
    width='37'
    height={height}
    viewBox={`0 0 37 ${height}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={x}>
    {!isReversed ? (
      <LeftHandle height={height} fill={fill} />
    ) : (
      <RightHandle height={height} fill={fill} />
    )}
    <MinText textColor={textColor} x={isReversed ? 5 : 14} />
  </svg>
)
