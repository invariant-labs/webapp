import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import successGif from '@static/gif/successAnimation.gif'
import errorGif from '@static/gif/errorAnimation.gif'
import useStyles from './style'

export type ProgressState = 'progress' | 'approved' | 'success' | 'failed' | 'none'

interface Props {
  content: string
  disabled?: boolean
  progress: ProgressState
}

const timeout = async (delay: number) => {
  return await new Promise((resolve) => setTimeout(resolve, delay))
    .catch(err => console.log(err))
}

const AnimatedButton: React.FC<Props> = ({
  content,
  disabled = false,
  progress
}) => {
  const [animationState, setAnimationState] = useState<ProgressState>('none')
  const classes = useStyles()
  useEffect(() => {
    console.log(progress)
    const approvedFunc = async () => {
      if (progress === 'success' || progress === 'failed') {
        setAnimationState('approved')
        await timeout(2000)
        setAnimationState(progress)
        await timeout(2000)
        setAnimationState('none')
      }
    }
    approvedFunc()
      .then(() => {})
      .catch(() => {})
  }, [progress])
  const getMessage = () => {
    if (animationState === 'none') {
      return <p className={classes.buttonContent}>{content}</p>
    }

    if (animationState === 'progress' || animationState === 'approved') {
      return <p className={classes.buttonContent}>In progress..</p>
    }

    if (animationState === 'success') {
      return <img className={classes.gifContent} src={successGif}/>
    }

    if (animationState === 'failed') {
      return <img className={classes.gifContent} src={errorGif}/>
    }
  }

  const getClasses = () => {
    if (animationState === 'progress') {
      return `${classes.button} ${classes.backgroundRelease}`
    }
    if (animationState === 'approved') {
      return `${classes.button} ${classes.backgroundApproved}`
    }
  }
  return (
    <div>
      <Button
        disabled={disabled}
        variant='contained'
        className={animationState === 'progress' || animationState === 'approved' ? `${classes.button} ${classes.buttonRelease}` : classes.button}
        onClick={() => {
          setAnimationState('progress')
        }}
      >
        <div className={getClasses()} >
        </div>
        {getMessage()}
      </Button>
    </div>
  )
}

export default AnimatedButton
