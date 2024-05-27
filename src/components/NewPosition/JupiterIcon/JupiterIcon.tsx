import React from 'react'
import { useLabelStyles } from './style'
import GlowingJupiterIcon from '../../../../public/GlowingJupiterIcon.png'

export interface JupiterIconProps {
  isIndexed: boolean
}

export const JupiterIcon: React.FC<JupiterIconProps> = ({ isIndexed }) => {
  const classes = useLabelStyles()
  return (
    <div>
      <img
        src={GlowingJupiterIcon}
        alt='Jupiter Icon'
        className={`${classes.jupiter} ${isIndexed ? classes.glowing : ''}`}
      />
    </div>
  )
}
