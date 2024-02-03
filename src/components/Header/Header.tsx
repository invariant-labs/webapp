import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'
import SelectPriorityButton from '@components/HeaderButton/SelectPriorityButton'
import SelectRPCButton from '@components/HeaderButton/SelectRPCButton'
import useButtonStyles from '@components/HeaderButton/style'
import Priority from '@components/Modals/Priority/Priority'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'
import NavbarButton from '@components/Navbar/Button'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Button, CardMedia, Grid, Hidden, IconButton, useMediaQuery } from '@material-ui/core'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import { PublicKey } from '@solana/web3.js'
import icons from '@static/icons'
import Hamburger from '@static/svg/Hamburger.svg'
import { theme } from '@static/theme'
import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './style'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  onConnectWallet: () => void
  walletConnected: boolean
  landing: string
  typeOfNetwork: NetworkType
  rpc: string
  onFaucet?: () => void
  onDisconnectWallet: () => void
  defaultMainnetRPC: string
  recentPriorityFee: string
  onPrioritySave: () => void
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
  defaultMainnetRPC,
  recentPriorityFee,
  onPrioritySave
}) => {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const routes =
    typeOfNetwork === NetworkType.MAINNET
      ? ['swap', 'pool', 'stats', 'farms']
      : ['swap', 'pool', 'stats', 'farms', 'bonds']

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    pool: [/^newPosition\/*/, /^position\/*/],
    farms: [/^farms$/, /^farm\/*/]
  }

  const [activePath, setActive] = React.useState(landing)

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [mainnetRpcsOpen, setMainnetRpcsOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)
  const [priorityModal, setPriorityModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  const mainnetRPCs = [
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_NIGHTLY,
      rpcName: 'Nightly'
    },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_HELLOMOON,
      rpcName: 'Hello Moon'
    },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_ALCHEMY,
      rpcName: 'Alchemy'
    },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_QUICKNODE,
      rpcName: 'Quicknode'
    },
    { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN, rpcName: 'Solana' }
  ]

  return (
    <Grid container>
      <Grid container className={classes.root} direction='row' alignItems='center' wrap='nowrap'>
        <Hidden mdDown>
          <Grid container item className={classes.leftSide} justifyContent='flex-start'>
            <CardMedia className={classes.logo} image={icons.LogoTitle} />
          </Grid>
        </Hidden>

        <Hidden lgUp>
          <CardMedia className={classes.logoShort} image={icons.LogoShort} />
        </Hidden>

        <Hidden mdDown>
          <Grid container item className={classes.routers} wrap='nowrap'>
            {routes.map(path => (
              <Link key={`path-${path}`} to={`/${path}`} className={classes.link}>
                <NavbarButton
                  name={path}
                  onClick={() => {
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
        </Hidden>

        <Grid
          container
          item
          className={classNames(
            classes.buttons,
            walletConnected ? classes.buttonsLgConnected : undefined
          )}
          wrap='nowrap'>
          <Hidden xsDown>
            {typeOfNetwork === NetworkType.DEVNET || typeOfNetwork === NetworkType.TESTNET ? (
              <Button
                className={buttonClasses.headerButton}
                variant='contained'
                classes={{ label: buttonClasses.label }}
                onClick={onFaucet}>
                Faucet
              </Button>
            ) : null}
          </Hidden>
          <Hidden xsDown>
            {typeOfNetwork === NetworkType.MAINNET ? (
              <SelectPriorityButton
                recentPriorityFee={recentPriorityFee}
                onPrioritySave={onPrioritySave}
              />
            ) : null}
          </Hidden>
          <Hidden xsDown>
            {typeOfNetwork === NetworkType.MAINNET ? (
              <SelectRPCButton rpc={rpc} networks={mainnetRPCs} onSelect={onNetworkSelect} />
            ) : null}
          </Hidden>
          <SelectNetworkButton
            name={typeOfNetwork}
            networks={[
              {
                networkType: NetworkType.MAINNET,
                rpc: defaultMainnetRPC,
                rpcName:
                  mainnetRPCs.find(data => data.rpc === defaultMainnetRPC)?.rpcName ?? 'Custom'
              },
              { networkType: NetworkType.DEVNET, rpc: SolanaNetworks.DEV }
            ]}
            onSelect={onNetworkSelect}
          />
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().slice(0, 4)}...${
                    !isXsDown
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
          />
        </Grid>

        <Hidden lgUp>
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
            onFaucet={
              (typeOfNetwork === NetworkType.DEVNET || typeOfNetwork === NetworkType.TESTNET) &&
              isXsDown
                ? onFaucet
                : undefined
            }
            onRPC={
              typeOfNetwork === NetworkType.MAINNET && isXsDown
                ? () => {
                    setRoutesModalOpen(false)
                    setMainnetRpcsOpen(true)
                  }
                : undefined
            }
            onPriority={
              typeOfNetwork === NetworkType.MAINNET && isXsDown
                ? () => {
                    setRoutesModalOpen(false)
                    setPriorityModal(true)
                  }
                : undefined
            }
          />
          {typeOfNetwork === NetworkType.MAINNET ? (
            <Priority
              open={priorityModal}
              anchorEl={routesModalAnchor}
              recentPriorityFee={recentPriorityFee}
              handleClose={() => {
                unblurContent()
                setPriorityModal(false)
              }}
              onPrioritySave={onPrioritySave}
            />
          ) : null}
          {typeOfNetwork === NetworkType.MAINNET ? (
            <SelectMainnetRPC
              networks={mainnetRPCs}
              open={mainnetRpcsOpen}
              anchorEl={routesModalAnchor}
              onSelect={onNetworkSelect}
              handleClose={() => {
                setMainnetRpcsOpen(false)
                unblurContent()
              }}
              activeRPC={rpc}
            />
          ) : null}
        </Hidden>
      </Grid>
    </Grid>
  )
}
export default Header
