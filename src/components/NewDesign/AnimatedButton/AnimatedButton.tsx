import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@material-ui/core'
import successGif from '@static/gif/successAnimation.gif'
import errorGif from '@static/gif/errorAnimation.gif'
import useStyles from './style'

interface Props {
  content: string
  disabled?: boolean
  result: boolean
  approve: boolean
}

const timeout = async (delay: number) => {
  return await new Promise((resolve) => setTimeout(resolve, delay))
    .catch(err => console.log(err))
}

const AnimatedButton: React.FC<Props> = ({
  content,
  disabled = false,
  result: resault = false,
  approve
}) => {
  const [animation, setAnimation] = useState<boolean>(false)
  const [approved, setApproved] = useState<boolean>(approve)
  const classes = useStyles()
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    const approvedFunc = async () => {
      console.log(approved)
      if (approved) {
        await timeout(2000)
        setAnimation(false)
        await timeout(2000)
        setApproved(false)
      }
    }
    approvedFunc()
  }, [approved])
  const getMessage = () => {
    if (!animation && !approved) {
      return <p className={classes.buttonContent}>{content}</p>
    }

    if (!animation && approved && resault) {
      return <img className={classes.gifContent} src={successGif}/>
    } else if (!animation && approved && !resault) {
      return <img className={classes.gifContent} src={errorGif}/>
    }

    if ((animation && !approved) || (animation && approved)) {
      return <p className={classes.buttonContent}>In progress..</p>
    }
  }

  const getClasses = () => {
    if (approved) {
      return `${classes.button} ${classes.backgroundApproved}`
    } else if (animation) {
      return `${classes.button} ${classes.backgroundRelease}`
    }
  }
  return (
    <div>
      <Button
        disabled={disabled}
        variant='contained'
        className={animation ? `${classes.button} ${classes.buttonRelease}` : classes.button}
        onClick={async () => {
          setAnimation(true)
        }}
      >
        <div className={getClasses()} ref={elRef}>
        </div>
        {getMessage()}
      </Button>
    </div>
  )
}

export default AnimatedButton
