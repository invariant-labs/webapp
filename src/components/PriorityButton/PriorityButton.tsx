import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

interface Props {
  content: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const PriorityButton: React.FC<Props> = ({ content, onClick }) => {
  const classes = useStyles()

  return (
    <Button className={classNames(classes.button)} onClick={onClick}>
      {content}
    </Button>
  )
}

export default PriorityButton
