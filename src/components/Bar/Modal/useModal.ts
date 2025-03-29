import { blurContent, unblurContent } from '@utils/uiUtils'
import { useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    blurContent()
  }

  const handleClose = () => {
    setOpen(false)
    unblurContent()
  }

  return { open, handleOpen, handleClose }
}
