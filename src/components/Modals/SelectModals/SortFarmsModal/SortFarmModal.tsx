import React from 'react'
import { Popover, Grid, CardMedia, Box, Button } from '@material-ui/core'
import useStyles from '../style'
import { SortItem } from '@components/Inputs/SortSelect/SortSelect'
import CustomScrollbar from '../CustomScrollbar'

export interface ISelectSortFarmsModal {
  sortItems: SortItem[]
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (name: string) => void
  onlyText: boolean
}

export const SelectSortFarmsModal: React.FC<ISelectSortFarmsModal> = ({
  sortItems,
  open,
  handleClose,
  onSelect,
  onlyText,
  anchorEl
}) => {
  const classes = useStyles()
  const buttons = sortItems?.map(sortItem => (
    <Grid
      container
      key={sortItem ? `sortItem-${sortItem.name}` : ''}
      className={onlyText ? classes.filterItemText : classes.filterItem}
      alignItems='center'
      wrap='nowrap'
      onClick={() => {
        handleClose()
        onSelect(sortItem.name)
      }}>
      <Button
        className={classes.button}
        color='primary'
        variant='contained'
        startIcon={
          !sortItem ? null : <CardMedia image={sortItem.icon} className={classes.filterIcon} />
        }
        disableRipple>
        <span
          style={{ whiteSpace: 'nowrap' }}
          className={onlyText ? classes.filterNameText : classes.filterName}>
          {sortItem.name}
        </span>
      </Button>
    </Grid>
  ))

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      classes={{ paper: classes.popoverSort }}
      open={open}
      onClose={handleClose}>
      <Box className={onlyText ? classes.filterListText : classes.filterList}>
        {buttons.length > 3 ? <CustomScrollbar>{buttons}</CustomScrollbar> : buttons}
      </Box>
    </Popover>
  )
}
export default SelectSortFarmsModal
