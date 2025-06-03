import React, { useMemo } from 'react'
import {
  Box,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid
} from '@mui/material'
import { WalletToken } from '@store/types/userOverview'
import { DEFAULT_FEE_TIER, STRATEGIES } from '@store/consts/userStrategies'
import { unknownTokenIcon, warning2Icon, warningIcon } from '@static/icons'
import { NetworkType } from '@store/consts/static'
import { addressToTicker, formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './styles'
import { MobileCard } from './MobileCard'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { shortenAddress } from '@utils/uiUtils'
import { VariantType } from 'notistack'
import { SkeletonRow } from './Skeletons/SekeletonRow'
import { EmptyState } from './EmptyState/EmptyState'
import { MobileSkeletonCard } from './Skeletons/MobileSkeletonCard'
import { ActionButtons } from './ActionButtons/ActionButtons'

interface YourWalletProps {
  tokens: WalletToken[]
  handleSnackbar: (message: string, variant: VariantType) => void
  isLoading: boolean
  currentNetwork: NetworkType
}

export const YourWallet: React.FC<YourWalletProps> = ({
  tokens = [],
  isLoading,
  handleSnackbar,
  currentNetwork
}) => {
  const sortedTokens = useMemo(() => [...tokens].sort((a, b) => b.value - a.value), [tokens])
  const { classes } = useStyles({
    isLoading,
    isScrollHide: sortedTokens.length < 5
  })

  const totalValue = useMemo(() => {
    const value = sortedTokens.reduce((acc, position) => acc + (position.value || 0), 0)
    const isPriceWarning = sortedTokens.some(token => token.isPriceWarning) && value > 0

    return { value, isPriceWarning }
  }, [sortedTokens])

  const findStrategy = (poolAddress: string) => {
    const poolTicker = addressToTicker(currentNetwork, poolAddress)
    let strategy = STRATEGIES.find(s => {
      const tickerA = addressToTicker(currentNetwork, s.tokenAddressA)
      const tickerB = s.tokenAddressB ? addressToTicker(currentNetwork, s.tokenAddressB) : undefined
      return tickerA === poolTicker || tickerB === poolTicker
    })
    if (!strategy) {
      strategy = {
        tokenAddressA: poolAddress,
        feeTier: DEFAULT_FEE_TIER
      }
    }

    return {
      ...strategy,
      tokenSymbolA: addressToTicker(currentNetwork, strategy.tokenAddressA),
      tokenSymbolB: strategy.tokenAddressB
        ? addressToTicker(currentNetwork, strategy.tokenAddressB)
        : '-'
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = unknownTokenIcon
  }

  return (
    <>
      <Box className={classes.desktopContainer}>
        <Box className={classes.header}>
          <Typography className={classes.headerText}>Available Balance</Typography>
          {isLoading ? (
            <Skeleton variant='text' width={100} height={32} sx={{ marginRight: '16px' }} />
          ) : (
            <Grid display={'flex'} gap={'8px'}>
              <Typography className={classes.headerText}>
                ${formatNumberWithoutSuffix(totalValue.value)}
              </Typography>
            </Grid>
          )}
        </Box>

        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell} sx={{ width: '25%' }} align='left'>
                  Token Name
                </TableCell>
                <TableCell className={classes.headerCell} sx={{ width: '22%' }} align='left'>
                  Value
                </TableCell>
                <TableCell className={classes.headerCell} sx={{ width: '37%' }} align='left'>
                  Amount
                </TableCell>
                <TableCell
                  className={`${classes.headerCell} ${classes.desktopActionCell}`}
                  align='right'>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.zebraRow}>
              {isLoading ? (
                Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonRow key={`skeleton-${index}`} />)
              ) : sortedTokens.length === 0 ? (
                <TableRow sx={{ background: 'transparent !important' }}>
                  <TableCell colSpan={4} sx={{ border: 'none', padding: 0 }}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                sortedTokens.map(pool => {
                  const poolAddress = pool.id.toString()
                  const strategy = findStrategy(poolAddress)

                  return (
                    <TableRow key={pool.id.toString()}>
                      <TableCell className={classes.tableCell}>
                        <Box className={classes.tokenContainer}>
                          <Box className={classes.tokenInfo} sx={{ position: 'relative' }}>
                            <img
                              src={pool.icon}
                              className={classes.tokenIcon}
                              onError={handleImageError}
                              alt={pool.symbol}
                            />
                            {pool.isUnknown && (
                              <img className={classes.warningIcon} src={warningIcon} />
                            )}

                            <Typography className={classes.tokenSymbol}>
                              {pool.symbol.length <= 6
                                ? pool.symbol
                                : shortenAddress(pool.symbol, 2)}
                            </Typography>
                            <TooltipHover title='Copy token address'>
                              <FileCopyOutlinedIcon
                                onClick={() => {
                                  navigator.clipboard.writeText(poolAddress)

                                  handleSnackbar('Token address copied.', 'success')
                                }}
                                classes={{ root: classes.clipboardIcon }}
                              />
                            </TooltipHover>
                          </Box>
                          <Box className={classes.mobileActions}>
                            <ActionButtons
                              pool={pool}
                              strategy={strategy}
                              currentNetwork={currentNetwork}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        align='right'
                        sx={{ width: '102px' }}>
                        <Box className={classes.statsContainer}>
                          <Typography className={classes.statsValue}>
                            $
                            {formatNumberWithoutSuffix(pool.value.toFixed(2), {
                              twoDecimals: true
                            })}
                          </Typography>
                          {pool.isPriceWarning && (
                            <TooltipHover title='The price might not be shown correctly'>
                              <img src={warning2Icon} width={14} />
                            </TooltipHover>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell} align='right'>
                        <Box className={classes.statsContainer}>
                          <Typography className={classes.statsValue}>
                            {formatNumberWithoutSuffix(pool.amount)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        className={`${classes.tableCell} ${classes.desktopActionCell}`}
                        align='right'
                        sx={{ display: 'flex' }}>
                        <ActionButtons
                          pool={pool}
                          strategy={strategy}
                          currentNetwork={currentNetwork}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className={classes.mobileContainer}>
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <MobileSkeletonCard key={`skeleton-${index}`} />)
        ) : sortedTokens.length === 0 ? (
          <EmptyState />
        ) : (
          <Box className={classes.mobileCardContainer}>
            {sortedTokens.map(pool => (
              <MobileCard
                key={pool.id.toString()}
                pool={pool}
                getStrategy={() => findStrategy(pool.id.toString())}
                currentNetwork={currentNetwork}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
