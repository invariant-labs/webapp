import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useMediaQuery,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { theme } from '@static/theme'
import { Overview } from './components/Overview/Overview'
import { YourWallet } from './components/YourWallet/YourWallet'
import { useDispatch, useSelector } from 'react-redux'
import { balanceLoading, swapTokens } from '@store/selectors/solanaWallet'
import { isLoadingPositionsList, positionsWithPoolsData } from '@store/selectors/positions'
import { ProcessedPool } from '@store/types/userOverview'
import { useProcessedTokens } from '@store/hooks/userOverview/useProcessedToken'
import { useStyles } from './style'
import { actions as snackbarsActions } from '@store/reducers/snackbars'

import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { VariantType } from 'notistack'
import { network } from '@store/selectors/solanaConnection'
import { printBN } from '@utils/utils'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'

export enum CardSwitcher {
  Overview = 'Overview',
  Wallet = 'Wallet'
}
export const UserOverview = () => {
  const { classes } = useStyles()
  const tokensList = useSelector(swapTokens)
  const isBalanceLoading = useSelector(balanceLoading)
  const { processedPools, isProcesing } = useProcessedTokens(tokensList, isBalanceLoading)
  const isLoadingList = useSelector(isLoadingPositionsList)
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'))
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const list = useSelector(positionsWithPoolsData)
  const [activePanel, setActivePanel] = useState<CardSwitcher>(CardSwitcher.Overview)
  const dispatch = useDispatch()
  const currentNetwork = useSelector(network)
  const handleSwitchPools = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: CardSwitcher | null
  ) => {
    if (newAlignment !== null) {
      setActivePanel(newAlignment)
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

  const handleSnackbar = (message: string, variant: VariantType) => {
    dispatch(
      snackbarsActions.add({
        message: message,
        variant: variant,
        persist: false
      })
    )
  }

  const data: Pick<
    ProcessedPool,
    'id' | 'fee' | 'tokenX' | 'poolData' | 'tokenY' | 'lowerTickIndex' | 'upperTickIndex'
  >[] = list.map(position => {
    return {
      id: position.id.toString() + '_' + position.pool.toString(),
      poolData: position.poolData,
      lowerTickIndex: position.lowerTickIndex,
      upperTickIndex: position.upperTickIndex,
      fee: +printBN(position.poolData.fee, DECIMAL - 2),
      tokenX: {
        decimal: position.tokenX.decimals,
        coingeckoId: position.tokenX.coingeckoId,
        assetsAddress: position.tokenX.assetAddress.toString(),
        balance: position.tokenX.balance,
        icon: position.tokenX.logoURI,
        name: position.tokenX.symbol
      },
      tokenY: {
        decimal: position.tokenY.decimals,
        balance: position.tokenY.balance,
        assetsAddress: position.tokenY.assetAddress.toString(),
        coingeckoId: position.tokenY.coingeckoId,
        icon: position.tokenY.logoURI,
        name: position.tokenY.symbol
      }
    }
  })

  const positionsDetails = useMemo(() => {
    const positionsAmount = data.length
    const inRageAmount = data.filter(
      item =>
        item.poolData.currentTickIndex >= Math.min(item.lowerTickIndex, item.upperTickIndex) &&
        item.poolData.currentTickIndex < Math.max(item.lowerTickIndex, item.upperTickIndex)
    ).length
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
      {isLoadingList ? (
        <>
          <Skeleton width={120} height={24} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton width={100} height={24} />
            <Skeleton width={100} height={24} />
          </Box>
        </>
      ) : (
        <>
          <Typography className={classNames(classes.greyText, classes.footerPositionDetails)}>
            All Positions: {positionsDetails.positionsAmount}
          </Typography>
          <Box gap={1} display={'flex'}>
            <Typography className={classNames(classes.greenText, classes.footerPositionDetails)}>
              Within Range: {positionsDetails.inRageAmount}
            </Typography>
            <Typography className={classNames(classes.pinkText, classes.footerPositionDetails)}>
              Outside Range: {positionsDetails.outOfRangeAmount}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )

  const renderTokensFound = () => (
    <Typography className={classNames(classes.footerText, classes.greyText)}>
      {isBalanceLoading || isLoadingList ? (
        <Skeleton width={150} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
      ) : (
        `Tokens Found: ${finalTokens.length}`
      )}
    </Typography>
  )

  return (
    <Box className={classes.overviewContainer}>
      <Box>
        <Grid display={'flex'} marginBottom={isDownLg ? '12px' : '20px'}>
          <Typography className={classes.overviewHeaderTitle}>Overview</Typography>
        </Grid>
      </Box>

      {isDownLg && !isDownMd && (
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
              isLoading={isLoadingList || isBalanceLoading || isProcesing}
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

      {isDownMd && (
        <>
          <Grid className={classes.filtersContainer}>
            <Box className={classes.switchPoolsContainer}>
              <Box
                className={classes.switchPoolsMarker}
                sx={{
                  left: activePanel === CardSwitcher.Overview ? 0 : '50%'
                }}
              />
              <ToggleButtonGroup
                value={activePanel}
                exclusive
                onChange={handleSwitchPools}
                className={classes.switchPoolsButtonsGroup}>
                <ToggleButton
                  value={CardSwitcher.Overview}
                  disableRipple
                  className={classes.switchPoolsButton}
                  style={{ fontWeight: activePanel === CardSwitcher.Overview ? 700 : 400 }}>
                  Liquidity
                </ToggleButton>
                <ToggleButton
                  value={CardSwitcher.Wallet}
                  disableRipple
                  className={classes.switchPoolsButton}
                  classes={{ disabled: classes.disabledSwitchButton }}
                  style={{ fontWeight: activePanel === CardSwitcher.Wallet ? 700 : 400 }}>
                  Your Wallet
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>

          <Box>
            {activePanel === CardSwitcher.Overview && (
              <>
                <Overview poolAssets={data} />
                <Box className={classes.footer}>
                  <Box className={classes.footerItem}>{renderPositionDetails()}</Box>
                </Box>
              </>
            )}
            {activePanel === CardSwitcher.Wallet && (
              <>
                <YourWallet
                  handleSnackbar={handleSnackbar}
                  currentNetwork={currentNetwork}
                  pools={finalTokens}
                  isLoading={isLoadingList || isBalanceLoading || isProcesing}
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
              isLoading={isLoadingList || isBalanceLoading || isProcesing}
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
  )
}
