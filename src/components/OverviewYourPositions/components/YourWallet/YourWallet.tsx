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
  TableRow
} from '@mui/material'
import { StrategyConfig, TokenPool } from '@store/types/userOverview'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_FEE_TIER, STRATEGIES } from '@store/consts/userStrategies'
import icons from '@static/icons'
import { NetworkType /*USDC_MAIN, USDC_TEST, WETH_MAIN, WETH_TEST*/ } from '@store/consts/static'
import { addressToTicker, formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './styles'
import { network } from '@store/selectors/solanaConnection'
import { MobileCard } from './MobileCard'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { shortenAddress } from '@utils/uiUtils'
import { VariantType } from 'notistack'
import { EmptyStateClasses } from '../Overview/Overview'

interface YourWalletProps {
  pools: TokenPool[]
  handleSnackbar: (message: string, variant: VariantType) => void
  isLoading: boolean
  currentNetwork: NetworkType
}

type SkeletonRowClasses = Record<
  'tableCell' | 'tokenContainer' | 'tokenInfo' | 'desktopActionCell' | 'valueSkeleton',
  string
>

type MobileSkeletonCardClasses = Record<
  | 'mobileCard'
  | 'mobileCardHeader'
  | 'mobileCardHeader'
  | 'mobileActionsContainer'
  | 'mobileStatsContainer',
  string
>

const EmptyState = ({ classes }: { classes: EmptyStateClasses }) => (
  <Box className={classes.emptyState}>
    <img src={icons.assetsEmpty} alt='Empty portfolio' height={80} width={80} />
    <Typography className={classes.emptyStateText}>No assets found</Typography>
  </Box>
)

const SkeletonRow = ({ classes }: { classes: SkeletonRowClasses }) => (
  <TableRow>
    <TableCell className={classes.tableCell}>
      <Box className={classes.tokenContainer}>
        <Box className={classes.tokenInfo}>
          <Skeleton variant='circular' width={28} height={28} />
          <Skeleton variant='rectangular' width={60} sx={{ borderRadius: '6px' }} height={24} />
        </Box>
      </Box>
    </TableCell>
    <TableCell className={classes.tableCell} align='right'>
      <Skeleton variant='rectangular' height={28} className={classes.valueSkeleton} />
    </TableCell>
    <TableCell className={classes.tableCell} align='right'>
      <Skeleton variant='rectangular' width='100%' height={28} sx={{ borderRadius: '6px' }} />
    </TableCell>
    <TableCell
      className={`${classes.tableCell} ${classes.desktopActionCell}`}
      align='right'
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center'
      }}>
      <Skeleton
        variant='rectangular'
        width={24}
        height={24}
        sx={{ borderRadius: '8px', margin: '4px 0px' }}
      />
      <Skeleton
        variant='rectangular'
        width={24}
        height={24}
        sx={{ borderRadius: '8px', margin: '4px 0px' }}
      />
      <Skeleton
        variant='rectangular'
        width={24}
        height={24}
        sx={{ borderRadius: '8px', margin: '4px 0px' }}
      />
    </TableCell>
  </TableRow>
)

const MobileSkeletonCard = ({ classes }: { classes: MobileSkeletonCardClasses }) => (
  <Box className={classes.mobileCard}>
    <Box className={classes.mobileCardHeader}>
      <Box sx={{ display: 'flex', gap: '4px' }}>
        <Skeleton variant='circular' width={28} height={28} />
        <Skeleton variant='text' width={60} />
      </Box>
      <Box className={classes.mobileActionsContainer}>
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ margin: '4px', borderRadius: '8px' }}
        />
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ margin: '4px', borderRadius: '8px' }}
        />
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ margin: '4px', borderRadius: '8px' }}
        />
      </Box>
    </Box>
    <Box className={classes.mobileStatsContainer}>
      <Skeleton variant='rectangular' height={27} width={'50%'} sx={{ borderRadius: '8px' }} />
      <Skeleton variant='rectangular' height={27} width={'50%'} sx={{ borderRadius: '8px' }} />
    </Box>
  </Box>
)

export const YourWallet: React.FC<YourWalletProps> = ({
  pools = [],
  isLoading,
  handleSnackbar,
  currentNetwork
}) => {
  const navigate = useNavigate()
  const sortedPools = useMemo(() => [...pools].sort((a, b) => b.value - a.value), [pools])
  const { classes } = useStyles({
    isLoading,
    isScrollHide: sortedPools.length < 5
  })
  console.log(pools)

  const totalValue = useMemo(
    () => sortedPools.reduce((sum, pool) => sum + pool.value, 0),
    [sortedPools]
  )

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
    e.currentTarget.src = icons.unknownToken
  }

  const networkUrl = useMemo(() => {
    switch (currentNetwork) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return ''
    }
  }, [network])

  const renderMobileLoading = () => (
    <Box className={classes.mobileContainer} sx={{ marginTop: '16px' }}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <MobileSkeletonCard key={`skeleton-${index}`} classes={classes} />
        ))}
    </Box>
  )

  const renderActions = (pool: TokenPool, strategy: StrategyConfig) => (
    <>
      <TooltipHover text='Add Position'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            const sourceToken = addressToTicker(currentNetwork, strategy.tokenAddressA)
            const targetToken = '-'
            // const targetToken =
            //   sourceToken === 'ETH'
            //     ? currentNetwork === NetworkType.Mainnet
            //       ? USDC_MAIN.address
            //       : USDC_TEST.address
            //     : currentNetwork === NetworkType.Mainnet
            //       ? WETH_MAIN.address
            //       : WETH_TEST.address

            navigate(
              `/newPosition/${sourceToken}/${addressToTicker(currentNetwork, targetToken.toString())}/${strategy.feeTier}`,
              {
                state: { referer: 'portfolio' }
              }
            )
          }}>
          <img src={icons.plusIcon} height={24} width={24} alt='Add' />
        </Box>
      </TooltipHover>
      <TooltipHover text='Exchange'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            const sourceToken = addressToTicker(currentNetwork, pool.id.toString())
            const targetToken = '-'

            // const targetToken =
            //   sourceToken === 'ETH'
            //     ? currentNetwork === NetworkType.Mainnet
            //       ? USDC_MAIN.address
            //       : USDC_TEST.address
            //     : currentNetwork === NetworkType.Mainnet
            //       ? WETH_MAIN.address
            //       : WETH_TEST.address
            navigate(
              `/exchange/${sourceToken}/${addressToTicker(currentNetwork, targetToken.toString())}`,
              {
                state: { referer: 'portfolio' }
              }
            )
          }}>
          <img src={icons.horizontalSwapIcon} height={24} width={24} alt='Add' />
        </Box>
      </TooltipHover>
      <TooltipHover text='Open in explorer'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            window.open(
              `https://solscan.io/token/${pool.id.toString()}/${networkUrl}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}>
          <img width={24} height={24} src={icons.newTabBtn} alt={'Exchange'} />
        </Box>
      </TooltipHover>
    </>
  )
  return (
    <>
      <Box className={classes.desktopContainer}>
        <Box className={classes.header}>
          <Typography className={classes.headerText}>Available Balance</Typography>
          {isLoading ? (
            <Skeleton variant='text' width={100} height={32} sx={{ marginRight: '16px' }} />
          ) : (
            <Typography className={classes.headerText}>
              ${formatNumberWithoutSuffix(totalValue)}
            </Typography>
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
                  .map((_, index) => <SkeletonRow key={`skeleton-${index}`} classes={classes} />)
              ) : sortedPools.length === 0 ? (
                <TableRow sx={{ background: 'transparent !important' }}>
                  <TableCell colSpan={4} sx={{ border: 'none', padding: 0 }}>
                    <EmptyState classes={classes} />
                  </TableCell>
                </TableRow>
              ) : (
                sortedPools.map(pool => {
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
                              <img className={classes.warningIcon} src={icons.warningIcon} />
                            )}

                            <Typography className={classes.tokenSymbol}>
                              {pool.symbol.length <= 6
                                ? pool.symbol
                                : shortenAddress(pool.symbol, 2)}
                            </Typography>
                            <TooltipHover text='Copy token address'>
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
                            {renderActions(pool, strategy)}
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
                            {formatNumberWithoutSuffix(pool.value, {
                              twoDecimals: true
                            })}
                          </Typography>
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
                        {renderActions(pool, strategy)}
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
          renderMobileLoading()
        ) : sortedPools.length === 0 ? (
          <EmptyState classes={classes} />
        ) : (
          <Box className={classes.mobileCardContainer}>
            {sortedPools.map(pool => (
              <MobileCard
                key={pool.id.toString()}
                pool={pool}
                classes={classes}
                getStrategy={() => findStrategy(pool.id.toString())}
                renderActions={renderActions}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
