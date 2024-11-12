import Priority from '@components/Modals/Priority/Priority'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import React, { useState } from 'react'
import useStyles from './style'
import { Button } from '@mui/material'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { PriorityMode } from '@store/consts/types'

export interface Props {
  recentPriorityFee: string
  recentPriorityMode: PriorityMode
  onPrioritySave: () => void
}

export const SelectPriorityButton: React.FC<Props> = ({
  recentPriorityFee,
  recentPriorityMode,
  onPrioritySave
}) => {
  const { classes } = useStyles()

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
        Fee
      </Button>
      <Priority
        open={priorityModal}
        anchorEl={anchorEl}
        recentPriorityFee={recentPriorityFee}
        recentPriorityMode={recentPriorityMode}
        handleClose={handleClose}
        onPrioritySave={onPrioritySave}
      />
    </>
  )
}

export default SelectPriorityButton
