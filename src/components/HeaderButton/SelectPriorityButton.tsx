import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'
import Priority from '@components/Modals/Priority/Priority'
import { IPriorityFeeOptions } from '@containers/HeaderWrapper/HeaderWrapper'

interface Props {
  content: string
  open: boolean
  anchorEl: HTMLButtonElement | null
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClose: () => void
  recentPriorityFee: string
  priorityFeeOptions: IPriorityFeeOptions[]
}

const SelectPriorityButton: React.FC<Props> = ({
  content,
  open,
  anchorEl,
  onClick,
  handleClose,
  recentPriorityFee,
  priorityFeeOptions
}) => {
  const classes = useStyles()

  return (
    <>
      <Button className={classNames(classes.headerButton)} onClick={onClick}>
        {content}
      </Button>
      <Priority
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        recentPriorityFee={recentPriorityFee}
        priorityFeeOptions={priorityFeeOptions}></Priority>
    </>
  )
}

export default SelectPriorityButton
