import React, { useMemo } from 'react'
import { Box, Typography, Skeleton, Grid, useMediaQuery } from '@mui/material'
import { WalletToken } from '@store/types/userOverview'
import { unknownTokenIcon, warning2Icon, warningIcon } from '@static/icons'
import { NetworkType } from '@store/consts/static'
import { findStrategy, formatNumberWithoutSuffix } from '@utils/utils'
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
import { theme } from '@static/theme'

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
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
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
        <Grid display='flex' justifyContent='space-between'>
          <Typography className={classes.headerCellTokenName}>Token {!isMd && 'Name'}</Typography>
          <Typography className={classes.headerCell}>Value</Typography>
          <Typography className={classes.headerCell}>Amount</Typography>
          <Typography className={classes.headerCell}>Action</Typography>
        </Grid>
        <Grid className={classes.tableContainer}>
          {isLoading ? (
            <Grid className={classes.zebraRow}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} />
                ))}
            </Grid>
          ) : sortedTokens.length === 0 ? (
            <EmptyState />
          ) : (
            <Grid className={classes.zebraRow}>
              {sortedTokens.map(token => {
                const poolAddress = token.id.toString()
                const strategy = findStrategy(poolAddress)

                return (
                  <Grid>
                    <Box className={classes.tokenContainer}>
                      <Box className={classes.tokenInfo}>
                        <Box display='flex' position='relative'>
                          <img
                            src={token.icon}
                            className={classes.tokenIcon}
                            onError={handleImageError}
                            alt={token.symbol}
                          />
                          {token.isUnknown && (
                            <img className={classes.warningIcon} src={warningIcon} />
                          )}
                        </Box>

                        <Typography className={classes.tokenSymbol}>
                          {token.symbol.length <= 6
                            ? token.symbol
                            : shortenAddress(token.symbol, 2)}
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
                          pool={token}
                          strategy={strategy}
                          currentNetwork={currentNetwork}
                        />
                      </Box>
                    </Box>
                    <Grid display='flex' flex={'1'} padding='12px 4px 12px 8px'>
                      <Box className={classes.statsContainer}>
                        <Typography className={classes.statsValue}>
                          $
                          {formatNumberWithoutSuffix((token.value || 0).toFixed(2), {
                            twoDecimals: true
                          })}
                        </Typography>
                        {token.isPriceWarning && (
                          <TooltipHover title='The price might not be shown correctly'>
                            <img src={warning2Icon} width={14} />
                          </TooltipHover>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      display='flex'
                      flex={'1'}
                      padding='12px 8px 12px 4px'
                      justifyContent='center'>
                      <Box className={classes.statsContainer}>
                        <Typography className={classes.statsValue}>
                          {formatNumberWithoutSuffix(token.amount)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      display='flex'
                      width={110}
                      boxSizing='border-box'
                      padding='12px 0'
                      justifyContent='flex-end'
                      paddingRight='12px'
                      gap='4px'>
                      <ActionButtons
                        pool={token}
                        strategy={strategy}
                        currentNetwork={currentNetwork}
                      />
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Grid>
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
            {sortedTokens.map(token => (
              <MobileCard
                key={token.id.toString()}
                pool={token}
                getStrategy={() => findStrategy(token.id.toString())}
                currentNetwork={currentNetwork}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
