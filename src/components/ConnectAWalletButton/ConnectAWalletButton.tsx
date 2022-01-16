import React from 'react'
import { Button } from '@material-ui/core'
import successGif from '@static/gif/successAnimation.gif'
import errorGif from '@static/gif/errorAnimation.gif'
import classNames from 'classnames'
import useStyles from './style'

export type ProgressState = 'progress' | 'approvedWithSuccess' | 'approvedWithFail' | 'success' | 'failed' | 'none'

interface Props {
  content: string
  className?: string
}

const AnimatedButton: React.FC<Props> = ({
  content,
  className
}) => {
  const classes = useStyles()

  return (
    <div>
      <Button
        variant='contained'
        className={classNames(
          classes.button)}
      >
        Connect a Wallet
      </Button>
    </div>
  )
}

export default AnimatedButton
