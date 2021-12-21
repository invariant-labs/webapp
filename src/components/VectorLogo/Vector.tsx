import { Box } from '@material-ui/core'
import * as React from 'react'

const Vector: React.FC = () => {
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        width='38'
        height='29'
        viewBox='0 0 38 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M10.6396 16.0365H26.9568L18.7965 28.3373L10.6396 16.0365Z'
          fill='#7F768F'
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M22.2655 12.141L14.2108 0H0L8.05478 12.141H22.2655Z'
          fill='#7F768F'
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M22.2643 0L19.8203 3.68442L25.4275 12.141H29.5418L37.5929 0H22.2643Z'
          fill='url(#paint0_linear_950_2358)'
        />
        <defs>
          <linearGradient
            id='paint0_linear_950_2358'
            x1='31.7403'
            y1='-4.38713e-07'
            x2='22.2634'
            y2='10.2126'
            gradientUnits='userSpaceOnUse'>
            <stop stop-color='#7F768F' />
            <stop offset='1' stop-color='#7F768F' stop-opacity='0' />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  )
}

export default Vector
