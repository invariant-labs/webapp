import React, { useMemo, useState } from 'react'
import { Box, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { horizontalSwapIcon, plusDisabled, plusIcon } from '@static/icons'
import { colors, theme, typography } from '@static/theme'
import { commonTokensForNetworks, NetworkType } from '@store/consts/static'
import { NewTabIcon } from '@static/componentIcon/NewTabIcon'
import { CopyIcon } from '@static/componentIcon/CopyIcon'
import { SwapToken } from '@store/selectors/solanaWallet'
import useStyles from './style'
import { VariantType } from 'notistack'
import { FeeSelector } from './FeeSelector/FeeSelector'
import Select from '@components/Inputs/Select/Select'
import { Intervals as IntervalsKeys } from '@store/consts/static'
export interface IProps {
  poolAddress: string
  copyAddressHandler: (message: string, variant: VariantType) => void
  network: NetworkType
  tokenX: SwapToken | null
  tokenY: SwapToken | null
  handleOpenSwap: () => void
  handleOpenPosition: () => void
  isLoading: boolean
  selectFeeTier: (value: number) => void
  feeTiers: number[]
  feeTierIndex: number
  feeTiersWithTvl: Record<number, number>
  aggregatedStats: { tvl: number; fees: number; volume: number }
  isDisabled: boolean
  disabledFeeTiers: string[]
  tokens: SwapToken[]
  setTokens: (tokenX: SwapToken, tokenY: SwapToken) => void
  handleAddToken: (address: string) => void
  initialHideUnknownTokensValue: boolean
  setHideUnknownTokensValue: (value: boolean) => void
  noData: boolean
  interval: IntervalsKeys
}

export const ChartUpperSection: React.FC<IProps> = ({
  poolAddress,
  copyAddressHandler,
  network,
  tokenX,
  tokenY,
  handleOpenSwap,
  handleOpenPosition,
  isLoading,
  selectFeeTier,
  feeTiers,
  feeTierIndex,
  feeTiersWithTvl,
  aggregatedStats,
  isDisabled,
  disabledFeeTiers,
  tokens,
  setTokens,
  handleAddToken,
  initialHideUnknownTokensValue,
  setHideUnknownTokensValue,
  noData,
  interval
}) => {
  const { classes } = useStyles({ noData: noData })
  const isTablet = useMediaQuery(theme.breakpoints.down(1200))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const [hideUnknownTokens, setHideUnknownTokens] = useState<boolean>(initialHideUnknownTokensValue)

  const networkUrl = useMemo(() => {
    switch (network) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return '?cluster=testnet'
    }
  }, [network])

  const copyToClipboard = () => {
    if (!poolAddress || !copyAddressHandler) {
      return
    }
    navigator.clipboard
      .writeText(poolAddress)
      .then(() => {
        copyAddressHandler('Token address copied to Clipboard', 'success')
      })
      .catch(() => {
        copyAddressHandler('Failed to copy token address to Clipboard', 'error')
      })
  }

  const promotedPoolTierIndex = useMemo(() => {
    // const tierIndex =
    //   tokenX === null || tokenY === null
    //     ? undefined
    //     : promotedTiers.find(
    //         tier =>
    //           (tier.tokenX.equals(tokenX.assetAddress) &&
    //             tier.tokenY.equals(tokenY.assetAddress)) ||
    //           (tier.tokenX.equals(tokenY.assetAddress) && tier.tokenY.equals(tokenX.assetAddress))
    //       )?.index ?? undefined

    // return tierIndex

    return undefined //Removed leaderboard points
  }, [tokenX, tokenY])

  return (
    <Box className={classes.upperContainer}>
      <Grid display='flex' alignItems='center' gap='12px' width={isSm ? '100%' : 'auto'}>
        <Grid container display='flex' flexDirection={'column'} width={'100%'}>
          {
            <Box display='flex' alignItems='center' gap={'6px'} minHeight={'27px'}>
              <Typography sx={{ ...typography.body2, color: colors.invariant.textGrey }}>
                Pool address
              </Typography>
              {isLoading ? (
                <Skeleton
                  variant='rounded'
                  height={27}
                  width={100}
                  animation='wave'
                  sx={{ borderRadius: '8px' }}
                />
              ) : noData ? (
                <Typography style={typography.body1} color={colors.invariant.text}>
                  - pool not exists
                </Typography>
              ) : (
                <Box display='flex' alignItems='center' gap='8px'>
                  <TooltipHover title='Copy'>
                    <Box
                      display='flex'
                      alignItems='center'
                      gap='3px'
                      className={classes.addressIcon}
                      onClick={copyToClipboard}>
                      <Typography
                        style={(typography.body1, { textDecoration: 'underline' })}
                        color={colors.invariant.text}>
                        {poolAddress.slice(0, 4)}...
                        {poolAddress.slice(poolAddress.length - 4, poolAddress.length)}{' '}
                      </Typography>

                      <Box>
                        <CopyIcon color={colors.invariant.text} height={12} />
                      </Box>
                    </Box>
                  </TooltipHover>

                  <TooltipHover title='Open pool in explorer'>
                    <a
                      href={`https://solscan.io/account/${poolAddress}${networkUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={event => {
                        event.stopPropagation()
                      }}
                      className={classes.addressIcon}>
                      <NewTabIcon color={colors.invariant.text} height={12} width={12} />
                    </a>
                  </TooltipHover>
                </Box>
              )}
            </Box>
          }

          {
            <Box
              display='flex'
              alignItems='center'
              gap='8px'
              mt={1}
              className={classes.selectContainer}>
              <Select
                tokens={tokens}
                current={tokenX}
                onSelect={selectedAddress => {
                  const selectedToken = tokens.find(token =>
                    token.assetAddress.equals(selectedAddress)
                  )
                  if (tokenX && tokenY && selectedToken) {
                    setTokens(selectedToken, tokenY)
                  }
                }}
                centered
                className={classes.customSelect}
                handleAddToken={handleAddToken}
                sliceName
                commonTokens={commonTokensForNetworks[network]}
                initialHideUnknownTokensValue={initialHideUnknownTokensValue}
                onHideUnknownTokensChange={e => {
                  setHideUnknownTokensValue(e)
                  setHideUnknownTokens(e)
                }}
                hiddenUnknownTokens={hideUnknownTokens}
                network={network}
              />
              <Typography color={colors.invariant.text}>-</Typography>
              <Select
                tokens={tokens}
                current={tokenY}
                onSelect={selectedAddress => {
                  const selectedToken = tokens.find(token =>
                    token.assetAddress.equals(selectedAddress)
                  )
                  if (tokenX && tokenY && selectedToken) {
                    setTokens(tokenX, selectedToken)
                  }
                }}
                centered
                className={classes.customSelect}
                handleAddToken={handleAddToken}
                sliceName
                commonTokens={commonTokensForNetworks[network]}
                initialHideUnknownTokensValue={initialHideUnknownTokensValue}
                onHideUnknownTokensChange={e => {
                  setHideUnknownTokensValue(e)
                  setHideUnknownTokens(e)
                }}
                hiddenUnknownTokens={hideUnknownTokens}
                network={network}
              />
            </Box>
          }
        </Grid>
        {!isTablet && (
          <FeeSelector
            onSelect={selectFeeTier}
            feeTiers={feeTiers}
            currentFeeIndex={feeTierIndex}
            promotedPoolTierIndex={promotedPoolTierIndex}
            feeTiersWithTvl={feeTiersWithTvl}
            aggregatedStats={aggregatedStats}
            disabledFeeTiers={disabledFeeTiers}
            noData={noData}
            isLoading={isLoading}
            interval={interval}
            tokenX={tokenX}
            tokenY={tokenY}
          />
        )}
      </Grid>

      <Box className={classes.actionContainer}>
        {!noData && (
          <Box className={classes.buttons}>
            {!isTablet && (
              <Typography
                color={colors.invariant.textGrey}
                style={typography.body2}
                textAlign='right'
                mb={1}>
                Action
              </Typography>
            )}
            <Box display='flex' alignItems='center' gap='8px'>
              <TooltipHover title={isDisabled ? 'Pool disabled' : 'Add position'}>
                <button
                  className={classes.actionButton}
                  onClick={handleOpenPosition}
                  disabled={isDisabled}
                  style={isDisabled ? { cursor: 'not-allowed' } : {}}>
                  <img
                    width={isTablet ? 40 : 32}
                    src={isDisabled ? plusDisabled : plusIcon}
                    style={isDisabled ? { opacity: 0.6 } : {}}
                    alt={'Open'}
                  />
                </button>
              </TooltipHover>
              <TooltipHover title={'Exchange'}>
                <button className={classes.actionButton} onClick={handleOpenSwap}>
                  <img width={isTablet ? 40 : 32} src={horizontalSwapIcon} alt={'Exchange'} />
                </button>
              </TooltipHover>
            </Box>
          </Box>
        )}
        {isTablet && (
          <FeeSelector
            onSelect={selectFeeTier}
            feeTiers={feeTiers}
            currentFeeIndex={feeTierIndex}
            promotedPoolTierIndex={promotedPoolTierIndex}
            feeTiersWithTvl={feeTiersWithTvl}
            aggregatedStats={aggregatedStats}
            disabledFeeTiers={disabledFeeTiers}
            noData={noData}
            isLoading={isLoading}
            interval={interval}
            tokenX={tokenX}
            tokenY={tokenY}
          />
        )}
      </Box>
    </Box>
  )
}

export default ChartUpperSection
