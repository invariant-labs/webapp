import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material'
import { PositionTableRow } from './PositionsTableRow'
import { IPositionItem } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { usePositionTableStyle } from './styles/positionTable'
import { EmptyPlaceholder } from '@components/EmptyPlaceholder/EmptyPlaceholder'
import { generatePositionTableLoadingData, ROUTES } from '@utils/utils'

interface IPositionsTableProps {
  positions: Array<IPositionItem>
  noInitialPositions?: boolean
  onAddPositionClick?: () => void
  isLoading?: boolean
  handleClosePosition: (index: number) => void
  handleClaimFee: (index: number) => void
}

export const PositionsTable: React.FC<IPositionsTableProps> = ({
  positions,
  noInitialPositions,
  onAddPositionClick,
  isLoading = false,
  handleClosePosition,
  handleClaimFee
}) => {
  const { classes } = usePositionTableStyle({ isScrollHide: positions.length <= 5 || isLoading })
  const navigate = useNavigate()

  const displayData = isLoading ? generatePositionTableLoadingData() : positions

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.headerRow}>
            <TableCell className={`${classes.headerCell} ${classes.pairNameCell}`}>
              Pair name
            </TableCell>
            <TableCell className={`${classes.headerCell} ${classes.feeTierCell}`}>
              Fee tier
            </TableCell>
            <TableCell className={`${classes.headerCell} ${classes.tokenRatioCell}`}>
              Token ratio
            </TableCell>
            <TableCell className={`${classes.headerCell} ${classes.valueCell}`}>Value</TableCell>
            <TableCell className={`${classes.headerCell} ${classes.feeCell}`}>Fee</TableCell>
            <TableCell className={`${classes.headerCell} ${classes.chartCell}`}>Chart</TableCell>
            <TableCell className={`${classes.headerCell} ${classes.actionCell}`}>Action</TableCell>
          </TableRow>
        </TableHead>
        {!isLoading && positions.length === 0 ? (
          <Box className={classes.tableBody}>
            <Box className={classes.emptyContainer}>
              <Box className={classes.emptyWrapper}>
                <EmptyPlaceholder
                  newVersion
                  height={408}
                  desc={
                    noInitialPositions
                      ? 'Add your first position by pressing the button and start earning!'
                      : 'Did not find any matching positions'
                  }
                  onAction={onAddPositionClick}
                  withButton={noInitialPositions}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <TableBody className={classes.tableBody}>
            {displayData.map((position, index) => (
              <TableRow
                onClick={e => {
                  if (!isLoading && !(e.target as HTMLElement).closest('.action-button')) {
                    navigate(ROUTES.getPositionRoute(position.id))
                  }
                }}
                key={position.address + index}
                className={classes.tableBodyRow}>
                <PositionTableRow
                  {...position}
                  loading={isLoading}
                  handleClosePosition={handleClosePosition}
                  handleClaimFee={handleClaimFee}
                />
              </TableRow>
            ))}
          </TableBody>
        )}
        <TableFooter className={classes.tableFooter}>
          <TableRow className={classes.footerRow}>
            <TableCell className={`${classes.cellBase} ${classes.pairNameCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.feeTierCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.tokenRatioCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.valueCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.feeCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.chartCell}`} />
            <TableCell className={`${classes.cellBase} ${classes.actionCell}`} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
