import { Box, Button, Input, Typography } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import IconJupiter from '../../../public/Group.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import useStyles from './styles'
import { PaginationList } from '@components/Pagination/Pagination'

const Position = () => {
  const classes = useStyles()
  return (
    <Box className={classes.positionContainer}>
      <Box className={classes.swapOptionDisplay}>
        <Box className={classes.backgroundCircle} />
        <SwapHorizIcon className={classes.horizonIconSwap} />
        <Box className={classes.backgroundCircle} />
      </Box>
      <Typography className={classes.titleCurrency}>sny - btc</Typography>
      <Box className={classes.poolFeeDisplay}>
        <img className={classes.iconJupiter} src={IconJupiter} alt='Jupiter Indexed' />
        <Box className={classes.containerInfoFee}>
          <Typography className={classes.feeText}>0.05% fee</Typography>
        </Box>
      </Box>
      <Box className={classes.exchangeRateValue}>
        <Typography className={classes.exchangeRateValueText}>5.45K SNY - 325.2BTC</Typography>
      </Box>
      <Box className={classes.valueDisplayBox}>
        <Typography className={classes.valueText}>Value</Typography>
        <Typography className={classes.greenText}>145.53 sny</Typography>
      </Box>
      <Box className={classes.minMaxValueBox}>
        <Typography className={classes.greenText}>min - max</Typography>
        <Box className={classes.valueBox}>
          <Typography className={classes.valueText}>2149.6 SNY per xUSD</Typography>
        </Box>
      </Box>
    </Box>
  )
}
interface iButtonSetItemPage {
  value: number
  onClick: () => void
  isActive: boolean
}

const ButtonSetItemPage = ({ value, onClick, isActive }: iButtonSetItemPage) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.buttonSetItemPage}
      variant='contained'
      size='small'
      style={{
        backgroundColor: isActive ? '#3A466B' : '#111931',
        color: isActive ? 'white' : '#A9B6BF'
      }}
      onClick={onClick}>
      {value}
    </Button>
  )
}

export const PoolPage = () => {
  const [page, setPage] = useState(1)
  const [showOptionPage, setShowOptionPage] = useState(false)
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [customValue, setCustomValue] = useState<number | ''>('')

  const itemsPerPage = selectedValue || 5
  const totalItems = 1
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (page - 1) * (selectedValue || 5)
  const endIndex = Math.min(startIndex + (selectedValue || 5), totalItems)
  const classes = useStyles()
  const handleButtonClick = (value: number) => {
    setSelectedValue(value)
    setShowOptionPage(false)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomValue(value === '' ? '' : parseInt(value))
  }
  const handleCustomInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSelectedValue(customValue)
      setShowOptionPage(false)
    }
  }
  const handleChangePagination = (currentPage: number) => setPage(currentPage)

  return (
    <Box className={classes.container}>
      <Box className={classes.liquidotyPositionBox}>
        <Typography className={classes.liquidotyPositionText}>Your Liquidoty Positions</Typography>
        <Typography className={classes.liquidottPositionNumber}>{totalItems}</Typography>
      </Box>
      <Box className={classes.actionItems}>
        <Box className={classes.interactiveUIBox}>
          <Button
            onClick={() => setShowOptionPage(!showOptionPage)}
            endIcon={<KeyboardArrowDownIcon />}
            className={classes.optionToggleButton}>
            Show: {selectedValue || 5}
          </Button>
          {showOptionPage && (
            <Box className={classes.optionBox}>
              {[5, 10, 15, 20, 25, 50].map(value => (
                <ButtonSetItemPage
                  key={value}
                  value={value}
                  onClick={() => handleButtonClick(value)}
                  isActive={value === selectedValue}
                />
              ))}
              <Box className={classes.inputContainer}>
                <Input
                  placeholder='Custom'
                  onChange={handleInputChange}
                  onKeyPress={handleCustomInputKeyPress}
                  style={{
                    fontWeight: 300
                  }}
                />
              </Box>
            </Box>
          )}
          <Input placeholder='Search' className={classes.inputStyles} />
        </Box>
        <Button
          variant='contained'
          href='/newPosition'
          startIcon={<AddIcon />}
          className={classes.addPositionButton}>
          Add to position
        </Button>
      </Box>
      <Box>
        {totalItems > 0 ? (
          [...Array(endIndex - startIndex)].map((_, index) => <Position key={startIndex + index} />)
        ) : (
          <Box className={classes.noPositionOpenedbox}>
            <Typography className={classes.noPositionOpenedText}>No position opened</Typography>
          </Box>
        )}
      </Box>
      <PaginationList
        pages={totalPages}
        defaultPage={1}
        handleChangePage={handleChangePagination}
        variant='flex-end'
      />
    </Box>
  )
}
