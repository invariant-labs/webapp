import React from 'react'
import { Button, CardMedia } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectTokenModal from '@components/NewDesign/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyles from './style'

export interface ISelectModal {
  name?: string
  current: string | null
  centered?: boolean
  tokens: Array<{ symbol: string, name: string, icon: string }> | null
  onSelect: (name: string) => void
  className?: string
}
export const Select: React.FC<ISelectModal> = ({
  name = 'Select',
  current,
  centered,
  tokens,
  onSelect,
  className
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

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
        className={classNames(classes.button, className)}
        color='primary'
        variant='contained'
        onClick={handleClick}
        startIcon={
          !current ? null : (
            <CardMedia className={classes.icon} image={icons[current] ?? icons.SNY} />
          )
        }
        endIcon={<ExpandMoreIcon className={classes.endIcon} />}
      >
        <span style={{ whiteSpace: 'nowrap' }}>{!current ? name : current}</span>
      </Button>
      <SelectTokenModal
        tokens={tokens}
        commonTokens={tokens ? tokens.slice(0, 4)
          : [{ symbol: 'SOL', name: 'Solana', icon: 'solana' }]}
        open={open}
        centered={centered}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
      />
    </>
  )
}
export default Select
