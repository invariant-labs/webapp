import React from 'react'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import YourPointsModal from '@components/Modals/YourPointsModal/YourPointsModals'
import { theme } from '@static/theme'
import { Button } from '@common/Button/Button'

export interface IProps {
  disabled?: boolean
}
export const YourPointsButton: React.FC<IProps> = ({ disabled = false }) => {
  const isXs = useMediaQuery(theme.breakpoints.down(450))
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openNetworks, setOpenNetworks] = React.useState<boolean>(false)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpenNetworks(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpenNetworks(false)
  }

  return (
    <>
      <Button
        padding={isXs ? `0 2px` : undefined}
        scheme='rainbow'
        disabled={disabled}
        onClick={handleClick}>
        <>{isXs ? <KeyboardArrowDownIcon id='downIcon' /> : 'Points'}</>
      </Button>
      <YourPointsModal open={openNetworks} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  )
}
