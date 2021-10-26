import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectNetwork, {
  ISelectNetwork
} from '@components/NewDesign/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NetworkType } from '@consts/static'

export interface IProps {
  name: string
  networks: ISelectNetwork[]
  onSelect: (chosen: NetworkType) => void
  disabled?: boolean
}
export const SelectNetworkButton: React.FC<IProps> = ({
  name,
  networks,
  onSelect,
  disabled = false
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const [activeNetwork, setActiveNetwork] = React.useState(NetworkType.DEVNET)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        endIcon={<KeyboardArrowDownIcon id='downIcon' />}
        onClick={handleClick}>
        {name}
      </Button>
      <SelectNetwork
        networks={networks}
        open={open}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
        active={activeNetwork}
        setActive={setActiveNetwork}
      />
    </>
  )
}
export default SelectNetworkButton
