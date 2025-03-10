import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import refreshIcon from '@static/svg/refresh.svg'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import { PositionItemMobile } from './PositionItem/variants/PositionMobileCard/PositionItemMobile'
import { IPositionItem } from './types'
import { PositionsTable } from './PositionItem/variants/PositionTables/PositionsTable'
import { EmptyPlaceholder } from '@components/EmptyPlaceholder/EmptyPlaceholder'
import PositionCardsSkeletonMobile from './PositionItem/variants/PositionTables/skeletons/PositionCardsSkeletonMobile'
import { FilterSearch, ISearchToken } from '@components/FilterSearch/FilterSearch'
import { NetworkType } from '@store/consts/static'
import { theme } from '@static/theme'

interface IProps {
  initialPage: number
  setLastPage: (page: number) => void
  data: IPositionItem[]
  onAddPositionClick: () => void
  loading?: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
  itemsPerPage: number
  handleRefresh: () => void
  length: number
  noInitialPositions: boolean
  currentNetwork: NetworkType
  handleClosePosition: (index: number) => void
  handleClaimFee: (index: number) => void
}

export const PositionsList: React.FC<IProps> = ({
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps,
  handleRefresh,
  currentNetwork,
  // pageChanged,
  // length,
  // lockedLength,
  // loadedPages,
  // getRemainingPositions,
  noInitialPositions,
  handleClosePosition,
  handleClaimFee
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [selectedFilters, setSelectedFilters] = useState<ISearchToken[]>([])
  const isLg = useMediaQuery('@media (max-width: 1360px)')
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return data

    return data.filter(position => {
      const tokenX = position.tokenXName.toLowerCase()
      const tokenY = position.tokenYName.toLowerCase()

      if (selectedFilters.length === 1) {
        const filterToken = selectedFilters[0].symbol.toLowerCase()
        return tokenX === filterToken || tokenY === filterToken
      }

      if (selectedFilters.length === 2) {
        const filterToken1 = selectedFilters[0].symbol.toLowerCase()
        const filterToken2 = selectedFilters[1].symbol.toLowerCase()
        return (
          (tokenX === filterToken1 && tokenY === filterToken2) ||
          (tokenX === filterToken2 && tokenY === filterToken1)
        )
      }

      return true
    })
  }, [data, selectedFilters])

  const [allowPropagation, setAllowPropagation] = useState(true)

  const renderContent = () => {
    if (showNoConnected) {
      return <NoConnected {...noConnectedBlockerProps} />
    }

    if (!isLg) {
      return (
        <PositionsTable
          positions={filteredData}
          isLoading={loading}
          noInitialPositions={noInitialPositions}
          onAddPositionClick={onAddPositionClick}
          handleClosePosition={handleClosePosition}
          handleClaimFee={handleClaimFee}
        />
      )
    } else if (isLg && loading) {
      return <PositionCardsSkeletonMobile />
    }

    if (data.length === 0 && !loading) {
      return (
        <EmptyPlaceholder
          newVersion
          desc={
            noInitialPositions
              ? 'Add your first position by pressing the button and start earning!'
              : 'Did not find any matching positions'
          }
          onAction={onAddPositionClick}
          withButton={noInitialPositions}
        />
      )
    }

    return filteredData.map((element, index) => (
      <Grid
        onClick={() => {
          if (allowPropagation) {
            navigate(`/position/${element.id}`)
          }
        }}
        key={element.id}
        className={classes.itemLink}>
        <PositionItemMobile
          key={index}
          {...element}
          setAllowPropagation={setAllowPropagation}
          handleClosePosition={handleClosePosition}
          handleClaimFee={handleClaimFee}
        />
      </Grid>
    ))
  }

  return (
    <Grid container direction='column' className={classes.root}>
      {!isMd ? (
        <Grid
          className={classes.header}
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Grid className={classes.searchRoot}>
            <Grid className={classes.titleBar}>
              <Typography className={classes.title}>Your Positions</Typography>
              <TooltipHover text='Total number of your positions'>
                <Typography className={classes.positionsNumber}>{String(data.length)}</Typography>
              </TooltipHover>
            </Grid>

            <Grid className={classes.searchWrapper}>
              <Grid className={classes.filtersContainer}>
                <FilterSearch
                  loading={loading}
                  bp='md'
                  networkType={currentNetwork}
                  filtersAmount={2}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </Grid>

              <Grid
                display='flex'
                columnGap={2}
                justifyContent='space-between'
                className={classes.fullWidthWrapper}>
                <TooltipHover text='Refresh'>
                  <Grid display='flex' alignItems='center'>
                    <Button
                      disabled={showNoConnected}
                      onClick={showNoConnected ? () => {} : handleRefresh}
                      className={classes.refreshIconBtn}>
                      <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
                    </Button>
                  </Grid>
                </TooltipHover>
                <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
                  <span className={classes.buttonText}>+ Add Position</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          className={classes.header}
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Grid className={classes.searchRoot}>
            <Grid className={classes.titleBar}>
              <Typography className={classes.title}>Your Positions</Typography>
              <TooltipHover text='Total number of your positions'>
                <Typography className={classes.positionsNumber}>{String(data.length)}</Typography>
              </TooltipHover>
            </Grid>

            <Grid className={classes.searchWrapper}>
              <Grid className={classes.filtersContainer}>
                <Grid
                  display='flex'
                  columnGap={2}
                  justifyContent='space-between'
                  className={classes.fullWidthWrapper}>
                  <TooltipHover text='Refresh'>
                    <Grid display='flex' alignItems='center'>
                      <Button
                        disabled={showNoConnected}
                        onClick={showNoConnected ? () => {} : handleRefresh}
                        className={classes.refreshIconBtn}>
                        <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
                      </Button>
                    </Grid>
                  </TooltipHover>
                  <Button
                    className={classes.button}
                    variant='contained'
                    onClick={onAddPositionClick}>
                    <span className={classes.buttonText}>+ Add Position</span>
                  </Button>
                </Grid>
              </Grid>

              <FilterSearch
                bp='md'
                loading={loading}
                networkType={currentNetwork}
                filtersAmount={2}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container direction='column' className={classes.list} justifyContent='flex-start'>
        {renderContent()}
      </Grid>
    </Grid>
  )
}
