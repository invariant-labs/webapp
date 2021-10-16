import React from 'react'
import { Button, CardMedia, Grid } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import icons from '@static/icons'
import classNames from 'classnames'
import SelectPairModal from '@components/Modals/SelectModals/SelectPairModal/SelectPairModal'
import useStyles from './style'

export interface ISelectModal {
  name?: string
  current: { symbol1: string; symbol2: string } | null
  centered?: boolean
  pairs: Array<{ symbol1: string; symbol2: string }>
  onSelect: (chosen: number) => void
  className?: string
}
export const SelectPair: React.FC<ISelectModal> = ({
  name = 'Select a token',
  current,
  centered,
  pairs,
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
            <Grid className={classes.dualIcon}>
              <CardMedia className={classes.icon} image={icons[current.symbol1] ?? icons.SNY} />
              <CardMedia className={classNames(classes.icon, classes.secondIcon)} image={icons[current.symbol2] ?? icons.SNY} />
            </Grid>
          )
        }
        endIcon={<ExpandMoreIcon style={{ minWidth: 20, marginLeft: -8, marginRight: -4 }} />}
      >
        <span style={{ position: 'relative', top: -1, whiteSpace: 'nowrap', color: '#562cb2' }}>{!current ? name : `${current.symbol1}/${current.symbol2}`}</span>
      </Button>
      <SelectPairModal
        pairs={pairs}
        open={open}
        centered={centered}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
      />
    </>
  )
}
export default SelectPair
