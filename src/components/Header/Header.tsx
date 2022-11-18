import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, Button, Hidden, useMediaQuery, IconButton } from '@material-ui/core'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { Link } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import useButtonStyles from '@components/HeaderButton/style'
import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'
import { theme } from '@static/theme'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { blurContent, unblurContent } from '@consts/uiUtils'
import Hamburger from '@static/svg/Hamburger.svg'
import classNames from 'classnames'
import useStyles from './style'
import SelectRPCButton from '@components/HeaderButton/SelectRPCButton'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  onWalletSelect: (chosen: WalletType) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: WalletType
  typeOfNetwork: NetworkType
  rpc: string
  onFaucet?: () => void
  onDisconnectWallet: () => void
  defaultMainnetRPC: string
}

export const Header: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = WalletType.PHANTOM,
  typeOfNetwork,
  rpc,
  onFaucet,
  onDisconnectWallet,
  defaultMainnetRPC
}) => {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const routes =
    typeOfNetwork === NetworkType.MAINNET
      ? ['swap', 'pool', 'stats', 'farms']
      : ['swap', 'pool', 'stats', 'farms', 'bonds']

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    pool: [/^newPosition$/, /^position\/*/],
    farms: [/^farms$/, /^farm\/*/]
  }

  const [activePath, setActive] = React.useState(landing)

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [mainnetRpcsOpen, setMainnetRpcsOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  const mainnetRPCs = [
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_INVARIANT,
      rpcName: 'Invariant'
    },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_QUICKNODE,
      rpcName: 'Quicknode'
    },
    { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN, rpcName: 'Solana' },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_SERUM,
      rpcName: 'Serum'
    },
    {
      networkType: NetworkType.MAINNET,
      rpc: SolanaNetworks.MAIN_GENESYSGO,
      rpcName: 'GenesysGo'
    }
  ]

  return (
    <Grid container>
      <Grid container className={classes.root} direction='row' alignItems='center' wrap='nowrap'>
        <Hidden smDown>
          <Grid container item className={classes.leftSide} justifyContent='flex-start'>
            <CardMedia className={classes.logo} image={icons.LogoTitle} />
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <CardMedia className={classes.logoShort} image={icons.LogoShort} />
        </Hidden>

        <Hidden smDown>
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
                ? `${address.toString().slice(0, 8)}...${
                    !isXsDown
                      ? address
                          .toString()
                          .slice(address.toString().length - 4, address.toString().length)
                      : ''
                  }`
                : 'Connect wallet'
            }
            options={[
              WalletType.PHANTOM,
              WalletType.NIGHTLY,
              WalletType.SOLLET,
              WalletType.MATH,
              WalletType.SOLFLARE,
              WalletType.COIN98,
              WalletType.SLOPE,
              WalletType.CLOVER,
              WalletType.EXODUS
            ]}
            onSelect={onWalletSelect}
            connected={walletConnected}
            onDisconnect={onDisconnectWallet}
            startIcon={
              walletConnected ? <DotIcon className={classes.connectedWalletIcon} /> : undefined
            }
            activeWallet={walletConnected ? typeOfWallet : undefined}
          />
        </Grid>

        <Hidden mdUp>
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
          />
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
