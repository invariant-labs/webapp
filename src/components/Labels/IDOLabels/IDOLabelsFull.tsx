import React, { ReactElement } from 'react'
import useStyle from './style'
import IDOLabels from './IDOLabels'

export const IDOLabelsFull = () => {
  const classes = useStyle()
  return (
    <div>
      <div>
        <IDOLabels
          className={classes.top}
          title='Sale period ends in'
          icon='/src/static/svg/clockWhite.svg'
          value='15:30:33'
        />
      </div>
      <div>
        <IDOLabels
          className={classes.middleDark}
          title='Grace period ends in'
          icon='src/static/svg/clockWhite.svg'
          value='32:29:27'
        />
      </div>
      <div>
        <IDOLabels
          title='SOL Contributed'
          icon='src/static/svg/blueElipse.svg'
          value='122 124 846'
        />
      </div>
      <div>
        <IDOLabels
          className={classes.middleDark}
          title='Estimated token price'
          icon='src/static/svg/blueElipse.svg'
          value='218.839'
        />
      </div>
      <div>
        <IDOLabels
          className={classes.bottom}
          title='INVARIANT for sale'
          icon='/src/static/svg/LogoShort.svg'
          value='20 000 000'
        />
      </div>
    </div>
  )
}
