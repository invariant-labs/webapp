import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'
import Priority from '@components/Modals/Priority/Priority'

interface Props {
  content: string
  open: boolean
  anchorEl: HTMLButtonElement | null
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClose: () => void
}

const SelectPriorityButton: React.FC<Props> = ({
  content,
  open,
  anchorEl,
  onClick,
  handleClose
}) => {
  const classes = useStyles()

  return (
    <>
      <Button className={classNames(classes.headerButton)} onClick={onClick}>
        {content}
      </Button>
      <Priority open={open} handleClose={handleClose} anchorEl={anchorEl}></Priority>
    </>
  )
}

export default SelectPriorityButton
