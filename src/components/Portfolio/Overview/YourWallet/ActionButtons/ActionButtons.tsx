import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { Box } from '@mui/material'
import { horizontalSwapIcon, newTabBtnIcon, plusIcon } from '@static/icons'
import { getAddressTickerMap, NetworkType } from '@store/consts/static'
import { StrategyConfig, WalletToken } from '@store/types/userOverview'
import { addressToTicker, ROUTES } from '@utils/utils'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './styles'
import { useMemo } from 'react'

interface IActionButtons {
  pool: WalletToken
  strategy: StrategyConfig
  currentNetwork: NetworkType
}

export const ActionButtons = ({ pool, strategy, currentNetwork }: IActionButtons) => {
  const navigate = useNavigate()
  const { classes } = useStyles()

  const networkUrl = useMemo(() => {
    switch (currentNetwork) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return '?cluster=testnet'
    }
  }, [currentNetwork])

  return (
    <>
      <TooltipHover title='Add Position'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            const sourceToken = addressToTicker(currentNetwork, strategy.tokenAddressA)
            const tickerMap = getAddressTickerMap(currentNetwork)
            const targetToken = addressToTicker(
              currentNetwork,
              sourceToken === 'SOL' ? tickerMap['USDC'] : tickerMap['SOL']
            )

            navigate(
              ROUTES.getNewPositionRoute(
                sourceToken,
                addressToTicker(currentNetwork, targetToken.toString()),
                strategy.feeTier
              ),
              {
                state: { referer: 'portfolio' }
              }
            )
          }}>
          <img src={plusIcon} height={24} width={24} alt='Add' />
        </Box>
      </TooltipHover>
      <TooltipHover title='Exchange'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            const sourceToken = addressToTicker(currentNetwork, pool.id.toString())
            const tickerMap = getAddressTickerMap(currentNetwork)
            const targetToken = addressToTicker(
              currentNetwork,
              sourceToken === 'SOL' ? tickerMap['USDC'] : tickerMap['SOL']
            )
            navigate(
              ROUTES.getExchangeRoute(
                sourceToken,
                addressToTicker(currentNetwork, targetToken.toString())
              ),
              {
                state: { referer: 'portfolio' }
              }
            )
          }}>
          <img src={horizontalSwapIcon} height={24} width={24} alt='Add' />
        </Box>
      </TooltipHover>
      <TooltipHover title='Open in explorer'>
        <Box
          className={classes.actionIcon}
          onClick={() => {
            window.open(
              `https://solscan.io/token/${pool.id.toString()}/${networkUrl}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}>
          <img width={24} height={24} src={newTabBtnIcon} alt={'Exchange'} />
        </Box>
      </TooltipHover>
    </>
  )
}
