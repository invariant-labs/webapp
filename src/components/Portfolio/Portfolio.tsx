import { Button } from '@common/Button/Button'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import { FilterSearch, ISearchToken } from '@common/FilterSearch/FilterSearch'
import { INoConnected, NoConnected } from '@common/NoConnected/NoConnected'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  Button as MuiButton,
  Skeleton,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { theme } from '@static/theme'
import { NetworkType } from '@store/consts/static'
import { ROUTES } from '@utils/utils'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
import { SwapToken } from '@store/selectors/solanaWallet'
import { useProcessedTokens } from '@store/hooks/userOverview/useProcessedToken'
import { Overview } from './Overview/Overview/Overview'
import { YourWallet } from './Overview/YourWallet/YourWallet'
import { VariantType } from 'notistack'
import { IPositionItem, OverviewSwitcher } from '@store/consts/types'
import { PositionsTable } from './PositionItem/variants/PositionTables/PositionTable/PositionsTable'
import PositionCardsSkeletonMobile from './PositionItem/variants/PositionTables/skeletons/PositionCardsSkeletonMobile'
import { PositionItemMobile } from './PositionItem/variants/PositionMobileCard/PositionItemMobile'
import { refreshIcon } from '@static/icons'

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
  handleSnackbar: (message: string, variant: VariantType) => void
  isBalanceLoading: boolean
  tokensList: SwapToken[]
}

const Portfolio: React.FC<IProps> = ({
  isBalanceLoading,
  handleSnackbar,
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps,
  handleRefresh,
  noInitialPositions,
  currentNetwork,
  handleClosePosition,
  handleClaimFee,
  tokensList
}) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()
  const [selectedFilters, setSelectedFilters] = useState<ISearchToken[]>([])
  const isLg = useMediaQuery('@media (max-width: 1360px)')
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { processedPools, isProcesing } = useProcessedTokens(tokensList, isBalanceLoading)
  const [activePanel, setActivePanel] = useState<OverviewSwitcher>(OverviewSwitcher.Overview)

  const handleToggleChange =
    <T,>(setter: React.Dispatch<React.SetStateAction<T>>) =>
    (_: React.MouseEvent<HTMLElement>, newValue: T | null) => {
      if (newValue !== null) {
        setter(newValue)
      }
    }
  const initialHideUnknownTokensValue =
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === 'true' ||
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === null
  const [hideUnknownTokens, setHideUnknownTokens] = useState<boolean>(initialHideUnknownTokensValue)

  const setHideUnknownTokensValue = (val: boolean) => {
    localStorage.setItem('HIDE_UNKNOWN_TOKENS', val ? 'true' : 'false')
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHideUnknownTokens(e.target.checked)
    setHideUnknownTokensValue(e.target.checked)
  }

  const positionsDetails = useMemo(() => {
    const positionsAmount = data.length
    const inRageAmount = data.reduce((count, item) => (item.isActive ? count + 1 : count), 0)

    const outOfRangeAmount = positionsAmount - inRageAmount
    return { positionsAmount, inRageAmount, outOfRangeAmount }
  }, [data])

  const finalTokens = useMemo(() => {
    if (hideUnknownTokens) {
      return processedPools.filter(item => item.isUnknown !== true)
    }
    return processedPools.filter(item => item.decimal > 0)
  }, [processedPools, hideUnknownTokens])

  const renderPositionDetails = () => (
    <Box
      className={classes.footerCheckboxContainer}
      width={'100%'}
      justifyContent={'space-between'}>
      {loading ? (
        <>
          <Skeleton width={120} height={24} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton width={100} height={24} />
            <Skeleton width={100} height={24} />
          </Box>
        </>
      ) : (
        <>
          <Typography className={cx(classes.greyText, classes.footerPositionDetails)}>
            All Positions: {positionsDetails.positionsAmount}
          </Typography>
          <Box gap={1} display={'flex'}>
            <Typography className={cx(classes.greenText, classes.footerPositionDetails)}>
              Within Range: {positionsDetails.inRageAmount}
            </Typography>
            <Typography className={cx(classes.pinkText, classes.footerPositionDetails)}>
              Outside Range: {positionsDetails.outOfRangeAmount}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )

  const renderTokensFound = () => (
    <Typography className={cx(classes.footerText, classes.greyText)}>
      {isBalanceLoading || loading ? (
        <Skeleton width={100} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
      ) : (
        `Tokens Found: ${finalTokens.length}`
      )}
    </Typography>
  )

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

    if (filteredData.length === 0 && !loading) {
      return (
        <EmptyPlaceholder
          newVersion
          themeDark
          roundedCorners
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
            navigate(ROUTES.getPositionRoute(element.id))
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
    <>
      <Box className={classes.overviewContainer}>
        <Box>
          <Grid display={'flex'} marginBottom={isDownLg ? '12px' : '20px'}>
            <Typography className={classes.overviewHeaderTitle}>Overview</Typography>
          </Grid>
        </Box>

        {isDownLg && !isMd && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Overview poolAssets={data} />
              <Box className={classes.footer}>
                <Box className={classes.footerItem}>{renderPositionDetails()}</Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <YourWallet
                currentNetwork={currentNetwork}
                handleSnackbar={handleSnackbar}
                pools={finalTokens}
                isLoading={loading || isBalanceLoading || isProcesing}
              />
              <Box className={classes.footer}>
                <Box className={classes.footerItem}>
                  <Box className={classes.footerCheckboxContainer}>
                    <FormGroup>
                      <FormControlLabel
                        className={classes.checkBoxLabel}
                        control={
                          <Checkbox
                            checked={hideUnknownTokens}
                            className={classes.checkBox}
                            onChange={e => handleCheckbox(e)}
                          />
                        }
                        label='Hide unknown tokens'
                      />
                    </FormGroup>
                  </Box>
                  {renderTokensFound()}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}

        {isMd && (
          <>
            <Grid className={classes.filtersContainerOverview}>
              <Box className={classes.switchPoolsContainerOverview}>
                <Box
                  className={classes.switchPoolsMarker}
                  sx={{
                    left: activePanel === OverviewSwitcher.Overview ? 0 : '50%'
                  }}
                />
                <ToggleButtonGroup
                  value={activePanel}
                  exclusive
                  onChange={handleToggleChange(setActivePanel)}
                  className={classes.switchPoolsButtonsGroupOverview}>
                  <ToggleButton
                    value={OverviewSwitcher.Overview}
                    disableRipple
                    className={classes.switchPoolsButtonOverview}
                    style={{ fontWeight: activePanel === OverviewSwitcher.Overview ? 700 : 400 }}>
                    Liquidity
                  </ToggleButton>
                  <ToggleButton
                    value={OverviewSwitcher.Wallet}
                    disableRipple
                    className={classes.switchPoolsButtonOverview}
                    classes={{ disabled: classes.disabledSwitchButton }}
                    style={{ fontWeight: activePanel === OverviewSwitcher.Wallet ? 700 : 400 }}>
                    Your Wallet
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>

            <Box>
              {activePanel === OverviewSwitcher.Overview && (
                <>
                  <Overview poolAssets={data} />
                  <Box className={classes.footer}>
                    <Box className={classes.footerItem}>{renderPositionDetails()}</Box>
                  </Box>
                </>
              )}
              {activePanel === OverviewSwitcher.Wallet && (
                <>
                  <YourWallet
                    handleSnackbar={handleSnackbar}
                    currentNetwork={currentNetwork}
                    pools={finalTokens}
                    isLoading={loading || isBalanceLoading || isProcesing}
                  />
                  <Box className={classes.footer}>
                    <Box className={classes.footerItem}>
                      <Box className={classes.footerCheckboxContainer}>
                        <FormGroup>
                          <FormControlLabel
                            className={classes.checkBoxLabel}
                            control={
                              <Checkbox
                                checked={hideUnknownTokens}
                                className={classes.checkBox}
                                onChange={e => handleCheckbox(e)}
                              />
                            }
                            label='Hide unknown tokens'
                          />
                        </FormGroup>
                      </Box>
                      {renderTokensFound()}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}

        {!isDownLg && (
          <>
            <Box display={'flex'}>
              <Overview poolAssets={data} />
              <YourWallet
                currentNetwork={currentNetwork}
                handleSnackbar={handleSnackbar}
                pools={finalTokens}
                isLoading={loading || isBalanceLoading || isProcesing}
              />
            </Box>
            <Grid className={classes.footer}>
              <Grid item xs={6} className={classes.footerItem}>
                {renderPositionDetails()}
              </Grid>
              <Grid item xs={6} className={classes.footerItem}>
                <Box className={classes.footerCheckboxContainer}>
                  <FormGroup>
                    <FormControlLabel
                      className={classes.checkBoxLabel}
                      control={
                        <Checkbox
                          checked={hideUnknownTokens}
                          className={classes.checkBox}
                          onChange={e => handleCheckbox(e)}
                        />
                      }
                      label='Hide unknown tokens'
                    />
                  </FormGroup>
                </Box>
                {renderTokensFound()}
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <Grid container direction='column' className={classes.root}>
        <Grid className={classes.header} container>
          <Grid className={classes.searchRoot}>
            <Grid className={classes.titleBar}>
              <Typography className={classes.title}>Your Positions</Typography>
              <TooltipHover title='Total number of your positions'>
                <Typography className={classes.positionsNumber}>
                  {String(filteredData.length)}
                </Typography>
              </TooltipHover>
            </Grid>

            <Grid className={classes.searchWrapper}>
              <Grid className={classes.filtersContainer}>
                <Grid className={classes.fullWidthWrapper}>
                  <TooltipHover removeOnMobile title='Refresh'>
                    <Grid width={26} display='flex' alignItems='center'>
                      <MuiButton
                        disabled={showNoConnected}
                        onClick={showNoConnected ? () => {} : handleRefresh}
                        className={classes.refreshIconBtn}>
                        <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
                      </MuiButton>
                    </Grid>
                  </TooltipHover>
                  <Button width={isSm ? '100%' : 'auto'} scheme='pink' onClick={onAddPositionClick}>
                    + Add Position
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

        <Grid container className={classes.list}>
          {renderContent()}
        </Grid>
      </Grid>
    </>
  )
}

export default Portfolio
