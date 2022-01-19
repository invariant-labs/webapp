import React from 'react'

export interface ISVGHandle {
  height: number
  className?: string
  x: number
  fill: string
  textColor: string
  isReversed?: boolean
}

export const MaxText: React.FC<Pick<ISVGHandle, 'x' | 'textColor'>> = ({ textColor }) => (
  <svg
    width='23'
    height='8'
    viewBox='0 0 23 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={7}
    y={6}>
    <path
      d='M0.974937 0.439999H2.41494L3.99894 5.264C4.07894 5.496 4.15494 5.724 4.22694 5.948C4.29894 6.164 4.36694 6.384 4.43094 6.608H4.45494C4.51894 6.384 4.58294 6.168 4.64694 5.96C4.71894 5.752 4.79894 5.52 4.88694 5.264L6.43494 0.439999H7.87494L8.53494 8H7.43094L7.11894 3.992C7.08694 3.6 7.06294 3.212 7.04694 2.828C7.03094 2.436 7.01494 2.04 6.99894 1.64H6.97494C6.86294 2.032 6.74694 2.424 6.62694 2.816C6.51494 3.208 6.39494 3.6 6.26694 3.992L4.93494 8H3.92694L2.59494 3.98C2.45894 3.572 2.33494 3.184 2.22294 2.816C2.11094 2.44 1.99894 2.048 1.88694 1.64H1.86294C1.84694 2.032 1.82294 2.424 1.79094 2.816C1.76694 3.208 1.73894 3.6 1.70694 3.992L1.41894 8H0.338937L0.974937 0.439999ZM12.0095 0.439999H12.9935L16.0055 8H14.8535L14.0255 5.9H10.9175L10.1015 8H8.9615L12.0095 0.439999ZM11.2175 5.024H13.7015L13.1975 3.716C13.0615 3.372 12.9375 3.04 12.8255 2.72C12.7135 2.4 12.6015 2.072 12.4895 1.736H12.4655C12.3535 2.072 12.2375 2.396 12.1175 2.708C11.9975 3.02 11.8695 3.356 11.7335 3.716L11.2175 5.024ZM17.33 0.439999L19.142 3.392L21.038 0.439999H22.25L19.766 4.16L22.37 8H21.098L19.142 4.928L17.174 8H15.962L18.482 4.16L16.07 0.439999H17.33Z'
      fill={textColor}
    />
  </svg>
)

export const MinText: React.FC<Pick<ISVGHandle, 'x' | 'textColor'>> = ({ textColor }) => (
  <svg
    width='20'
    height='8'
    viewBox='0 0 20 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    x={9}
    y={6}>
    <path
      d='M1.36361 0.439999H2.80361L4.38761 5.264C4.46761 5.496 4.54361 5.724 4.61561 5.948C4.68761 6.164 4.75561 6.384 4.81961 6.608H4.84361C4.90761 6.384 4.97161 6.168 5.03561 5.96C5.10761 5.752 5.18761 5.52 5.27561 5.264L6.82361 0.439999H8.26361L8.92361 8H7.81961L7.50761 3.992C7.47561 3.6 7.45161 3.212 7.43561 2.828C7.41961 2.436 7.40361 2.04 7.38761 1.64H7.36361C7.25161 2.032 7.13561 2.424 7.01561 2.816C6.90361 3.208 6.78361 3.6 6.65561 3.992L5.32361 8H4.31561L2.98361 3.98C2.84761 3.572 2.72361 3.184 2.61161 2.816C2.49961 2.44 2.38761 2.048 2.27561 1.64H2.25161C2.23561 2.032 2.21161 2.424 2.17961 2.816C2.15561 3.208 2.12761 3.6 2.09561 3.992L1.80761 8H0.727609L1.36361 0.439999ZM11.3902 0.439999V8H10.2862V0.439999H11.3902ZM12.9379 0.439999H13.8979L17.3419 5.228C17.4699 5.404 17.5939 5.584 17.7139 5.768C17.8339 5.952 17.9419 6.132 18.0379 6.308H18.0619C18.0459 6.028 18.0339 5.748 18.0259 5.468C18.0179 5.188 18.0139 4.908 18.0139 4.628V0.439999H19.0939V8H18.1339L14.7259 3.272C14.6059 3.104 14.4819 2.916 14.3539 2.708C14.2259 2.492 14.1059 2.28 13.9939 2.072H13.9699C13.9859 2.408 13.9979 2.744 14.0059 3.08C14.0139 3.416 14.0179 3.752 14.0179 4.088V8H12.9379V0.439999Z'
      fill={textColor}
    />
  </svg>
)

export const LeftHandle: React.FC<Pick<ISVGHandle, 'height' | 'fill'>> = ({ height, fill }) => (
  <>
    <path d={`M36 ${height}V0`} stroke={fill} strokeWidth='2' />
    <path
      d='M0 4C0 1.79087 1.79086 0 4 0H36.2402V19.5893H4C1.79086 19.5893 0 17.7985 0 15.5893V4Z'
      fill={fill}
    />
    {/* <path d="M5 5V15" stroke="white" strokeOpacity="0.5"/>
    <path d="M8 5V15" stroke="white" strokeOpacity="0.5"/> */}
  </>
)

export const RightHandle: React.FC<Pick<ISVGHandle, 'height' | 'fill'>> = ({ height, fill }) => (
  <>
    <path d={`M1 ${height}V0`} stroke={fill} strokeWidth='2' />
    <path
      d='M36.2402 4C36.2402 1.79087 34.4494 0 32.2402 0H-1.14441e-05V19.5893H32.2402C34.4494 19.5893 36.2402 17.7985 36.2402 15.5893V4Z'
      fill={fill}
    />
    {/* <path d="M29 5V15" stroke="white" strokeOpacity="0.5"/>
    <path d="M32 5V15" stroke="white" strokeOpacity="0.5"/> */}
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
