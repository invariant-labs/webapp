import NavbarButton from '@components/Navbar/NavbarButton'
import DotIcon from '@mui/icons-material/FiberManualRecordRounded'
import { CardMedia, Grid, useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import { RPC, NetworkType, DEFAULT_PRIORITY_FEE } from '@store/consts/static'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ChangeWalletButton from './HeaderButton/ChangeWalletButton'
import useStyles from './style'
import { ISelectChain, ISelectNetwork, PriorityMode } from '@store/consts/types'
import { RpcStatus } from '@store/reducers/solanaConnection'
import { PublicKey } from '@solana/web3.js'
import { Bar } from '@components/Bar/Bar'
import { calculatePriorityFee, getCurrentDynamicFee, ROUTES } from '@utils/utils'
import { logoShortIcon, logoTitleIcon } from '@static/icons'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  onConnectWallet: () => void
  walletConnected: boolean
  landing: string
  typeOfNetwork: NetworkType
  rpc: string
  onFaucet: () => void
  onDisconnectWallet: () => void
  onCopyAddress: () => void
  onChainSelect: (chain: ISelectChain) => void
  onPrioritySave: () => void
  rpcStatus: RpcStatus
}

export const Header: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onConnectWallet,
  walletConnected,
  landing,
  typeOfNetwork,
  rpc,
  onFaucet,
  onDisconnectWallet,
  onCopyAddress,
  onChainSelect
  // onPrioritySave,
  // rpcStatus
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const routes = ['exchange', 'liquidity', 'portfolio', 'statistics']
  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    liquidity: [/^liquidity\/*/],
    exchange: [/^exchange\/*/],
    portfolio: [/^portfolio\/*/, /^newPosition\/*/, /^position\/*/]
    // creator: [/^creator\/*/]
  }

  const [activePath, setActive] = useState('exchange')

  useEffect(() => {
    setActive(landing)
  }, [landing])

  const testnetRPCs: ISelectNetwork[] = []

  const mainnetRPCs: ISelectNetwork[] = [
    {
      networkType: NetworkType.Mainnet,
      rpc: RPC.MAIN_HELIUS,
      rpcName: 'Helius'
    },
    {
      networkType: NetworkType.Mainnet,
      rpc: RPC.MAIN_HELLOMOON,
      rpcName: 'Hello Moon'
    },
    {
      networkType: NetworkType.Mainnet,
      rpc: RPC.MAIN_ALCHEMY,
      rpcName: 'Alchemy'
    },
    {
      networkType: NetworkType.Mainnet,
      rpc: RPC.MAIN_QUICKNODE,
      rpcName: 'Quicknode'
    },
    { networkType: NetworkType.Mainnet, rpc: RPC.MAIN, rpcName: 'Solana' }
  ]

  const devnetRPCs: ISelectNetwork[] = [
    {
      networkType: NetworkType.Devnet,
      rpc: RPC.DEV,
      rpcName: 'Devnet'
    }
  ]

  const rpcs = [...testnetRPCs, ...mainnetRPCs, ...devnetRPCs]

  const currentPriorityMode = localStorage.getItem('INVARIANT_PRIORITY_MODE') as PriorityMode
  const [dynamicFee, setDynamicFee] = useState(DEFAULT_PRIORITY_FEE)

  useEffect(() => {
    const loadDynamicFee = async () => {
      const dynamicFee = await getCurrentDynamicFee()
      const fee = +(dynamicFee / 10 ** 9).toFixed(9)
      setDynamicFee(fee)

      if (!currentPriorityMode) {
        localStorage.setItem('INVARIANT_PRIORITY_MODE', PriorityMode.Market)
        localStorage.setItem(
          'INVARIANT_PRIORITY_FEE',
          calculatePriorityFee(fee, PriorityMode.Market).toString()
        )
      } else {
        if (currentPriorityMode !== PriorityMode.Custom) {
          localStorage.setItem(
            'INVARIANT_PRIORITY_FEE',
            calculatePriorityFee(fee, currentPriorityMode).toString()
          )
        }
      }
    }

    loadDynamicFee()

    const interval = setInterval(() => {
      loadDynamicFee()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Grid container>
      <Grid container className={classes.root}>
        <Grid container item className={classes.leftSide}>
          <CardMedia
            className={classes.logo}
            image={logoTitleIcon}
            onClick={() => {
              if (!activePath.startsWith('exchange')) {
                navigate(ROUTES.EXCHANGE)
              }
            }}
          />
        </Grid>
        <Grid
          container
          item
          className={classes.routers}
          wrap='nowrap'
          sx={{
            display: { lg: 'block' },

            [theme.breakpoints.down(1200)]: {
              display: 'none'
            }
          }}>
          {routes.map(path => (
            <Link key={`path-${path}`} to={`/${path}`} className={classes.link}>
              <NavbarButton
                name={path}
                onClick={e => {
                  if (path === 'exchange' && activePath.startsWith('exchange')) {
                    e.preventDefault()
                  }

                  setActive(path)
                }}
                active={
                  path === activePath ||
                  (!!otherRoutesToHighlight[path] &&
                    otherRoutesToHighlight[path].some(pathRegex => pathRegex.test(activePath)))
                }
              />
            </Link>
          ))}
        </Grid>

        <Grid container className={classes.buttons}>
          <CardMedia
            className={classes.logoShort}
            image={logoShortIcon}
            onClick={() => {
              if (!activePath.startsWith('exchange')) {
                navigate('/exchange')
              }
            }}
          />
          <Grid display='flex' gap='12px'>
            <Bar
              rpcs={rpcs}
              activeNetwork={typeOfNetwork}
              activeRPC={rpc}
              dynamicFee={dynamicFee}
              onNetworkChange={onNetworkSelect}
              onChainChange={onChainSelect}
              onFaucet={onFaucet}
            />
          </Grid>
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().slice(0, 4)}...${
                    !isSmDown
                      ? address
                          .toString()
                          .slice(address.toString().length - 4, address.toString().length)
                      : ''
                  }`
                : isSmDown
                  ? 'Connect'
                  : 'Connect wallet'
            }
            onConnect={onConnectWallet}
            connected={walletConnected}
            onDisconnect={onDisconnectWallet}
            startIcon={
              walletConnected ? <DotIcon className={classes.connectedWalletIcon} /> : undefined
            }
            onCopyAddress={onCopyAddress}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Header
