import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useState } from '@storybook/client-api'
import AnimateButton from '@components/AnimatedButton/AnimatedButton'
import { ProgressState } from './AnimatedButton'
import { colors } from '@static/theme'
import useStyles from './style'

storiesOf('buttons/AnimatedButtons', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    const classes = useStyles()
    const [progress, setProgress] = useState<ProgressState>('none')
    return <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AnimateButton content={'Add liquidity'} progress={progress} onClick={() => setProgress('progress')}/>
      <button className={classes.btnStories} onClick={() => { setProgress('approvedWithSuccess') }}>Approve transaction (success)</button>
      <button className={classes.btnStories} onClick={() => { setProgress('approvedWithFail') }}>Approve transaction (failes)</button>
      <button className={classes.btnStories} onClick={() => { setProgress('success') }}>Transaction end(success)</button>
      <button className={classes.btnStories} onClick={() => { setProgress('failed') }}>Transaction end(failed)</button>
    </div>
  })
