import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

interface Props {
  content: string
  disabled?: boolean
  onClick: () => void
  className?: string
}

const PriorityButton: React.FC<Props> = ({ content, disabled = false, onClick, className }) => {
  const classes = useStyles()

  return (
    <Button
      disabled={disabled}
      variant='contained'
      className={classNames(classes.button, className)}
      onClick={onClick}>
      {content}
    </Button>
  )
}

export default PriorityButton
