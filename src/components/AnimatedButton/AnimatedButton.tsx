import React from 'react'
import { Button } from '@material-ui/core'
import successGif from '@static/gif/successAnimation.gif'
import errorGif from '@static/gif/errorAnimation.gif'
import loadingAnimation from '@static/gif/loading.gif'
import classNames from 'classnames'
import useStyles from './style'

export type ProgressState =
  | 'progress'
  | 'approvedWithSuccess'
  | 'approvedWithFail'
  | 'success'
  | 'failed'
  | 'none'

interface Props {
  content: string
  disabled?: boolean
  progress: ProgressState
  onClick: () => void
  className?: string
}

const AnimatedButton: React.FC<Props> = ({
  content,
  disabled = false,
  progress,
  onClick,
  className
}) => {
  const classes = useStyles()

  const getMessage = () => {
    if (progress === 'none') {
      return <p className={classes.buttonContent}>{content}</p>
    }

    if (
      progress === 'progress' ||
      progress === 'approvedWithSuccess' ||
      progress === 'approvedWithFail'
    ) {
      return <p className={classes.buttonContent}>In progress..</p>
    }

    if (progress === 'success') {
      return <img className={classes.gifContent} src={successGif} />
    }

    return <img className={classes.gifContent} src={errorGif} />
  }

  const getClasses = () => {
    if (progress === 'progress') {
      return `${classes.button} ${classes.backgroundRelease}`
    }
    if (progress === 'approvedWithSuccess') {
      return `${classes.button} ${classes.backgroundApprovedWithSuccess}`
    }
    if (progress === 'approvedWithFail') {
      return `${classes.button} ${classes.backgroundApprovedWithFail}`
    }
    return ''
  }

  const getContent = () => {
    if (content === 'Connect a wallet') {
      return `${classes.buttonSelectDisabled}`
    }
    if (content === 'Swap tokens') {
      return `${classes.ButtonSwapActive}`
    }
  }

  return (
    <div>
      <Button
        disabled={disabled}
        variant='contained'
        className={classNames(
          classes.button,
          progress === 'progress' ||
            progress === 'approvedWithSuccess' ||
            progress === 'approvedWithFail' ||
            progress === 'failed'
            ? classes.buttonRelease
            : undefined,
          getContent(),
          className
        )}
        onClick={onClick}>
        <div className={getClasses()}></div>
        {progress === 'progress' ||
        progress === 'approvedWithSuccess' ||
        progress === 'approvedWithFail' ||
        content === 'Loading' ? (
          <img src={loadingAnimation} style={{ height: '100%', width: 25, zIndex: 10 }}></img>
        ) : (
          getMessage()
        )}
      </Button>
    </div>
  )
}

export default AnimatedButton
