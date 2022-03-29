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
import useStyles from './style'

export interface IHeader {
  address: PublicKey
  onNetworkSelect: (chosen: NetworkType) => void
  onWalletSelect: (chosen: WalletType) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: WalletType
  typeOfNetwork: NetworkType
  onFaucet?: () => void
  onDisconnectWallet: () => void
}

export const Header: React.FC<IHeader> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = WalletType.PHANTOM,
  typeOfNetwork,
  onFaucet,
  onDisconnectWallet
}) => {
  const classes = useStyles({ connected: walletConnected })
  const buttonClasses = useButtonStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const routes = ['swap', 'pool', 'stats', 'farms']

  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    pool: [/^newPosition$/, /^position\/*/]
  }

  const [activePath, setActive] = React.useState(landing)

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

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

        <Grid container item className={classes.buttons} wrap='nowrap'>
          <Hidden xsDown>
            {(typeOfNetwork === NetworkType.DEVNET || typeOfNetwork === NetworkType.TESTNET) && (
              <Button
                className={buttonClasses.headerButton}
                variant='contained'
                classes={{ label: buttonClasses.label }}
                onClick={onFaucet}>
                Faucet
              </Button>
            )}
          </Hidden>
          <SelectNetworkButton
            name={typeOfNetwork}
            networks={[
              { name: NetworkType.MAINNET, network: SolanaNetworks.MAIN },
              { name: NetworkType.DEVNET, network: SolanaNetworks.DEV }
            ]}
            onSelect={chosen => {
              onNetworkSelect(chosen)
            }}
          />
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().substr(0, isXsDown ? 8 : 15)}...${
                    !isXsDown ? address.toString().substr(address.toString().length - 4, 4) : ''
                  }`
                : 'Connect wallet'
            }
            options={[
              WalletType.PHANTOM,
              WalletType.SOLLET,
              WalletType.MATH,
              WalletType.SOLFLARE,
              WalletType.COIN98,
              WalletType.SLOPE,
              WalletType.CLOVER
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
          />
        </Hidden>
      </Grid>
    </Grid>
  )
}
export default Header
