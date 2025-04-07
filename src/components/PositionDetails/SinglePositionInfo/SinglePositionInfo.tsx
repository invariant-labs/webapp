import { Box, Button } from '@mui/material'
import { useState } from 'react'
import useStyles from './style'
import { ILiquidityToken, TokenPriceData } from '@store/consts/types'
import { Section } from './Section/Section'
import { PoolDetails } from './PoolDetails/PoolDetails'
import { UnclaimedFees } from './UnclaimedFees/UnclaimedFees'
import { Liquidity } from './Liquidity/Liquidity'
import { Separator } from '@common/Separator/Separator'
import { PositionStats } from './PositionStats/PositionStats'
import { colors } from '@static/theme'
import { PoolDetails as PoolDetailsType } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { calculateAPYAndAPR } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'

interface IProp {
  onClickClaimFee: () => void
  tokenX: ILiquidityToken
  tokenY: ILiquidityToken
  tokenXPriceData?: TokenPriceData
  tokenYPriceData?: TokenPriceData
  xToY: boolean
  showFeesLoader?: boolean
  poolDetails: PoolDetailsType | null
  showPoolDetailsLoader?: boolean
  showBalanceLoader?: boolean
  arePointsDistributed: boolean
  poolAddress: PublicKey
  isPreview: boolean
}

const SinglePositionInfo: React.FC<IProp> = ({
  onClickClaimFee,
  tokenX,
  tokenY,
  tokenXPriceData,
  tokenYPriceData,
  xToY,
  showFeesLoader = false,
  showPoolDetailsLoader = false,
  poolDetails,
  showBalanceLoader = false,
  arePointsDistributed,
  poolAddress,
  isPreview
}) => {
  const [isFeeTooltipOpen, setIsFeeTooltipOpen] = useState(false)
  const { classes } = useStyles()

  const Overlay = () => (
    <div
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        setIsFeeTooltipOpen(false)
      }}
      className={classes.overlay}
    />
  )
  const { convertedApr } = calculateAPYAndAPR(
    poolDetails?.apy ?? 0,
    poolAddress.toString(),
    poolDetails?.volume24 ?? 0,
    poolDetails?.fee,
    poolDetails?.tvl ?? 0
  )

  return (
    <>
      {isFeeTooltipOpen && <Overlay />}
      <Box className={classes.container}>
        <PositionStats
          value={
            tokenX.liqValue * (tokenXPriceData?.price ?? 0) +
            tokenY.liqValue * (tokenYPriceData?.price ?? 0)
          }
          pendingFees={
            tokenX.claimValue * (tokenXPriceData?.price ?? 0) +
            tokenY.claimValue * (tokenYPriceData?.price ?? 0)
          }
          poolApr={convertedApr}
          arePointsDistributed={arePointsDistributed}
          isLoading={showFeesLoader}
        />
        <Separator size='100%' isHorizontal color={colors.invariant.light} />
        <Section title='Liquidity'>
          <Liquidity
            tokenA={
              xToY
                ? {
                    icon: tokenX.icon,
                    ticker: tokenX.name,
                    amount: tokenX.liqValue,
                    decimal: tokenX.decimal,
                    price: tokenXPriceData?.price
                  }
                : {
                    icon: tokenY.icon,
                    ticker: tokenY.name,
                    amount: tokenY.liqValue,
                    decimal: tokenY.decimal,
                    price: tokenYPriceData?.price
                  }
            }
            tokenB={
              xToY
                ? {
                    icon: tokenY.icon,
                    ticker: tokenY.name,
                    amount: tokenY.liqValue,
                    decimal: tokenY.decimal,
                    price: tokenYPriceData?.price
                  }
                : {
                    icon: tokenX.icon,
                    ticker: tokenX.name,
                    amount: tokenX.liqValue,
                    decimal: tokenX.decimal,
                    price: tokenXPriceData?.price
                  }
            }
            isLoadingBalance={showBalanceLoader}
          />
        </Section>
        <Section
          title='Unclaimed fees'
          item={
            <TooltipHover title={isPreview ? "Can't claim fees in preview" : ''}>
              <Button
                className={classes.claimButton}
                disabled={tokenX.claimValue + tokenY.claimValue === 0 || isPreview}
                variant='contained'
                onClick={() => onClickClaimFee()}>
                Claim
              </Button>
            </TooltipHover>
          }>
          <UnclaimedFees
            tokenA={
              xToY
                ? {
                    icon: tokenX.icon,
                    ticker: tokenX.name,
                    amount: tokenX.claimValue,
                    decimal: tokenX.decimal,
                    price: tokenXPriceData?.price
                  }
                : {
                    icon: tokenY.icon,
                    ticker: tokenY.name,
                    amount: tokenY.claimValue,
                    decimal: tokenY.decimal,
                    price: tokenYPriceData?.price
                  }
            }
            tokenB={
              xToY
                ? {
                    icon: tokenY.icon,
                    ticker: tokenY.name,
                    amount: tokenY.claimValue,
                    decimal: tokenY.decimal,
                    price: tokenYPriceData?.price
                  }
                : {
                    icon: tokenX.icon,
                    ticker: tokenX.name,
                    amount: tokenX.claimValue,
                    decimal: tokenX.decimal,
                    price: tokenXPriceData?.price
                  }
            }
            isLoading={showFeesLoader}
          />
        </Section>
        <Section title='Pool details'>
          <PoolDetails
            tvl={poolDetails?.tvl ?? 0}
            volume24={poolDetails?.volume24 ?? 0}
            fee24={poolDetails?.fee24 ?? 0}
            showPoolDetailsLoader={showPoolDetailsLoader}
          />
        </Section>
      </Box>
    </>
  )
}

export default SinglePositionInfo
