import Priority from '@components/Modals/Priority/Priority'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Button } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import React, { useState } from 'react'
import useStyles from './style'

export interface Props {
  recentPriorityFee: string
}

export const SelectPriorityButton: React.FC<Props> = ({ recentPriorityFee }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [priorityModal, setPriorityModal] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setPriorityModal(true)
  }

  const handleClose = () => {
    unblurContent()
    setPriorityModal(false)
  }

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        endIcon={<KeyboardArrowDownIcon id='downIcon' />}
        onClick={handleClick}>
        Set priority
      </Button>
      <Priority
        open={priorityModal}
        anchorEl={anchorEl}
        recentPriorityFee={recentPriorityFee}
        handleClose={handleClose}
      />
    </>
  )
}

export default SelectPriorityButton
