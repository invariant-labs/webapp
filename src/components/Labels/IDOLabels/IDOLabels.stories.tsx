import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IDOLabels } from '@components/Labels/IDOLabels/IDOLabels'
import useStyle from './style'

storiesOf('labels/IDOLabels', module)
  .addDecorator(withKnobs)
  .add('label1', () => {
    const classes = useStyle()
    return (
      <div>
        <IDOLabels
          className={classes.top}
          title='Sale period ends in'
          icon='/src/static/svg/clockWhite.svg'
          value='15:30:33'
        />
      </div>
    )
  })
  .add('label2', () => {
    const classes = useStyle()
    return (
      <div>
        <IDOLabels
          className={classes.middleDark}
          title='Grace period ends in'
          icon='src/static/svg/clockWhite.svg'
          value='32:29:27'
        />
      </div>
    )
  })
  .add('label3', () => {
    const classes = useStyle()
    return (
      <div>
        <IDOLabels
          title='SOL Contributed'
          icon='src/static/svg/blueElipse.svg'
          value='122 124 846'
        />
      </div>
    )
  })
  .add('label4', () => {
    const classes = useStyle()
    return (
      <div>
        <IDOLabels
          className={classes.middleDark}
          title='Estimated token price'
          icon='src/static/svg/blueElipse.svg'
          value='218.839'
        />
      </div>
    )
  })
  .add('label5', () => {
    const classes = useStyle()
    return (
      <div>
        <IDOLabels
          className={classes.bottom}
          title='INVARIANT for sale'
          icon='/src/static/svg/LogoShort.svg'
          value='20 000 000'
        />
      </div>
    )
  })
  .add('labelFull', () => {
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
  })
