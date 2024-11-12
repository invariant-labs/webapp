import SelectTestnetRPC from '@components/Modals/SelectTestnetRPC/SelectTestnetRPC'
import NavbarButton from '@components/Navbar/NavbarButton'
import DotIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Box, CardMedia, Grid, IconButton, useMediaQuery } from '@mui/material'
import icons from '@static/icons'
import Hamburger from '@static/svg/Hamburger.svg'
import { theme } from '@static/theme'
import { RPC, CHAINS, NetworkType } from '@store/consts/static'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ChangeWalletButton from './HeaderButton/ChangeWalletButton'
import SelectNetworkButton from './HeaderButton/SelectNetworkButton'
import SelectRPCButton from './HeaderButton/SelectRPCButton'
import useStyles from './style'
import SelectChainButton from './HeaderButton/SelectChainButton'
import SelectChain from '@components/Modals/SelectChain/SelectChain'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'
import { ISelectChain, ISelectNetwork, PriorityMode } from '@store/consts/types'
import { RpcStatus } from '@store/reducers/solanaConnection'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { PublicKey } from '@solana/web3.js'
import FaucetButton from './HeaderButton/FaucetButton'
import SelectPriorityButton from './HeaderButton/SelectPriorityButton'
import Priority from '@components/Modals/Priority/Priority'
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
  defaultTestnetRPC: string
  onCopyAddress: () => void
  onChangeWallet: () => void
  activeChain: ISelectChain
  onChainSelect: (chain: ISelectChain) => void
  network: NetworkType
  defaultDevnetRPC: string
  defaultMainnetRPC: string
  recentPriorityFee: string
  recentPriorityMode: PriorityMode
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
  defaultDevnetRPC,
  onCopyAddress,
  onChangeWallet,
  activeChain,
  onChainSelect,
  network,
  defaultMainnetRPC,
  recentPriorityFee,
  recentPriorityMode,
  onPrioritySave,
  rpcStatus
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))

  const routes = ['exchange', 'liquidity', 'statistics']

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    liquidity: [/^newPosition\/*/, /^position\/*/],
    exchange: [/^exchange\/*/]
    // creator: [/^creator\/*/]
  }

  const [activePath, setActive] = useState('exchange')
  const [routesModalOpen, setRoutesModalOpen] = useState(false)
  const [RpcsModalOpen, setRpcsModalOpen] = useState(false)
  const [chainSelectOpen, setChainSelectOpen] = useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = useState<HTMLButtonElement | null>(null)
  const [priorityModal, setPriorityModal] = useState<boolean>(false)

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

  const networks = useMemo(() => {
    switch (network) {
      case NetworkType.Testnet:
        return testnetRPCs
      case NetworkType.Mainnet:
        return mainnetRPCs
      case NetworkType.Devnet:
        return devnetRPCs
      default:
        return []
    }
  }, [network])

  return (
    <Grid container>
      <Grid container className={classes.root} direction='row' alignItems='center' wrap='nowrap'>
        <Grid
          container
          item
          className={classes.leftSide}
          justifyContent='flex-start'
          sx={{ display: { xs: 'none', md: 'block' } }}>
          <CardMedia
            className={classes.logo}
            image={icons.LogoTitle}
            onClick={() => {
              if (!activePath.startsWith('exchange')) {
                navigate('/exchange')
              }
            }}
          />
        </Grid>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Grid container item className={classes.leftSide} justifyContent='flex-start'>
            <Grid container>
              <CardMedia
                className={classes.logoShort}
                image={icons.LogoShort}
                onClick={() => {
                  if (!activePath.startsWith('exchange')) {
                    navigate('/exchange')
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          item
          className={classes.routers}
          wrap='nowrap'
          sx={{ display: { xs: 'none', lg: 'block' } }}>
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

        <Grid container item className={classes.buttons} wrap='nowrap'>
          <Grid container className={classes.leftButtons}>
            {typeOfNetwork !== NetworkType.Mainnet && (
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <FaucetButton onFaucet={onFaucet}>Faucet</FaucetButton>
              </Box>
            )}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {typeOfNetwork === NetworkType.Mainnet ? (
                <SelectPriorityButton
                  recentPriorityFee={recentPriorityFee}
                  recentPriorityMode={recentPriorityMode}
                  onPrioritySave={onPrioritySave}
                />
              ) : null}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <SelectRPCButton
                rpc={rpc}
                networks={networks}
                onSelect={onNetworkSelect}
                network={network}
                rpcStatus={rpcStatus}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <SelectChainButton
                activeChain={activeChain}
                chains={CHAINS}
                onSelect={onChainSelect}
              />
            </Box>
            <SelectNetworkButton
              name={typeOfNetwork}
              networks={[
                {
                  networkType: NetworkType.Mainnet,
                  rpc: defaultMainnetRPC,
                  rpcName:
                    mainnetRPCs.find(data => data.rpc === defaultMainnetRPC)?.rpcName ?? 'Custom'
                },
                // {
                //   networkType: NetworkType.Testnet,
                //   rpc: defaultTestnetRPC,
                //   rpcName:
                //     testnetRPCs.find(data => data.rpc === defaultTestnetRPC)?.rpcName ?? 'Custom'
                // }
                {
                  networkType: NetworkType.Devnet,
                  rpc: defaultDevnetRPC,
                  rpcName:
                    devnetRPCs.find(data => data.rpc === defaultDevnetRPC)?.rpcName ?? 'Custom'
                }
              ]}
              onSelect={onNetworkSelect}
            />
          </Grid>
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().slice(0, 4)}...${
                    !isMdDown
                      ? address
                          .toString()
                          .slice(address.toString().length - 4, address.toString().length)
                      : ''
                  }`
                : 'Connect wallet'
            }
            onConnect={onConnectWallet}
            connected={walletConnected}
            onDisconnect={onDisconnectWallet}
            startIcon={
              walletConnected ? <DotIcon className={classes.connectedWalletIcon} /> : undefined
            }
            onCopyAddress={onCopyAddress}
            onChangeWallet={onChangeWallet}
          />
        </Grid>

        <Grid sx={{ display: { xs: 'block', lg: 'none' } }}>
          <IconButton
            className={classes.menuButton}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setRoutesModalAnchor(event.currentTarget)
              setRoutesModalOpen(true)
              blurContent()
            }}>
            <CardMedia className={classes.menu} image={Hamburger} />
          </IconButton>
          <RoutesModal
            routes={routes}
            anchorEl={routesModalAnchor}
            open={routesModalOpen}
            current={activePath}
            onSelect={(selected: string) => {
              setActive(selected)
              setRoutesModalOpen(false)
              unblurContent()
            }}
            handleClose={() => {
              setRoutesModalOpen(false)
              unblurContent()
            }}
            onFaucet={isMdDown && typeOfNetwork === NetworkType.Testnet ? onFaucet : undefined}
            onRPC={
              isMdDown
                ? () => {
                    setRoutesModalOpen(false)
                    setRpcsModalOpen(true)
                  }
                : undefined
            }
            onChainSelect={
              isMdDown
                ? () => {
                    setRoutesModalOpen(false)
                    setChainSelectOpen(true)
                  }
                : undefined
            }
            onPriority={
              typeOfNetwork === NetworkType.Mainnet && isMdDown
                ? () => {
                    setRoutesModalOpen(false)
                    setPriorityModal(true)
                  }
                : undefined
            }
          />
          {typeOfNetwork === NetworkType.Mainnet ? (
            <Priority
              open={priorityModal}
              anchorEl={routesModalAnchor}
              recentPriorityFee={recentPriorityFee}
              recentPriorityMode={recentPriorityMode}
              handleClose={() => {
                unblurContent()
                setPriorityModal(false)
              }}
              onPrioritySave={onPrioritySave}
            />
          ) : null}
          {typeOfNetwork === NetworkType.Testnet ? (
            <SelectTestnetRPC
              networks={testnetRPCs}
              open={RpcsModalOpen}
              anchorEl={routesModalAnchor}
              onSelect={onNetworkSelect}
              handleClose={() => {
                setRpcsModalOpen(false)
                unblurContent()
              }}
              activeRPC={rpc}
              rpcStatus={rpcStatus}
            />
          ) : (
            <SelectMainnetRPC
              networks={mainnetRPCs}
              open={RpcsModalOpen}
              anchorEl={routesModalAnchor}
              onSelect={onNetworkSelect}
              handleClose={() => {
                setRpcsModalOpen(false)
                unblurContent()
              }}
              activeRPC={rpc}
              rpcStatus={rpcStatus}
            />
          )}
          <SelectChain
            chains={CHAINS}
            open={chainSelectOpen}
            anchorEl={routesModalAnchor}
            onSelect={onChainSelect}
            handleClose={() => {
              setChainSelectOpen(false)
              unblurContent()
            }}
            activeChain={activeChain}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Header
