import React from 'react'
import useStyles from './style'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { Button, useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import YourPointsModal from '@components/Modals/YourPointsModal/YourPointsModals'
import { theme } from '@static/theme'

export interface IProps {
  disabled?: boolean
}
export const YourPointsButton: React.FC<IProps> = ({ disabled = false }) => {
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { classes } = useStyles()
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
        className={classes.pointsHeaderButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        onClick={handleClick}>
        <>{isSm ? <KeyboardArrowDownIcon id='downIcon' /> : 'Points'}</>
      </Button>
      <YourPointsModal open={openNetworks} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  )
}
