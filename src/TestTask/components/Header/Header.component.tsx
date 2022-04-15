import React from 'react'
import { Link } from 'react-router-dom'

import { NetworkType, SolanaNetworks } from '@consts/static'
import { blurContent, unblurContent } from '@consts/uiUtils'

import { WalletType } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'

import NavbarButton from '../NavbarButton/NavbarButton'
import SelectNetworkButton from '../HeaderButton/SelectNetworkButton'
import ChangeWalletButton from '../HeaderButton/ChangeWalletButton'
import NavbarQuery from '../NavbarQuery/NavbarQuery'

import { Grid, CardMedia, Button, Hidden, useMediaQuery, IconButton } from '@material-ui/core'

import { theme } from '@static/theme'

import useStyles from './Header.styles'
import useButtonStyles from '../HeaderButton/style'

import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import Hamburger from '@static/svg/Hamburger.svg'

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
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const routes = ['pool', 'swap', 'stats', 'farm', 'bond']
  const otherRoutesToHighlight: Record<string, RegExp[]> = {
    pool: [/^newPosition$/, /^position\/*/]
  }

  const [activePath, setActive] = React.useState(landing)

  const [routesModalOpen, setRoutesModalOpen] = React.useState(false)
  const [routesModalAnchor, setRoutesModalAnchor] = React.useState<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    setActive(landing)
  }, [landing])

  return (
    <Grid container>
      <Grid container className={classes.root} direction='row' alignItems='center' wrap='nowrap'>
        {/* LOGO */}
        {!isSmDown && (
          <Grid container item className={classes.leftSide} justifyContent='flex-start'>
            <CardMedia className={classes.logo} image={icons.LogoTitle} />
          </Grid>
        )}

        {/* LOGO SMALL */}
        {isSmDown && <CardMedia className={classes.logoShort} image={icons.LogoShort} />}

        {/* NAVBAR */}
        {!isSmDown && (
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
        )}

        {/* DROPDOWNS */}
        <Grid container item className={classes.buttons} wrap='nowrap'>
          {/* NETWORKS */}
          <SelectNetworkButton
            name={typeOfNetwork}
            networks={[
              { name: NetworkType.MAINNET, network: SolanaNetworks.MAIN },
              { name: NetworkType.DEVNET, network: SolanaNetworks.DEV },
              { name: NetworkType.TESTNET, network: SolanaNetworks.TEST },
              { name: NetworkType.LOCALNET, network: SolanaNetworks.LOCAL }
            ]}
            onSelect={chosen => {
              onNetworkSelect(chosen)
            }}
          />

          {/* CURRENT WALLET */}
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().slice(0, isXsDown ? 8 : 15)}...${
                    !isXsDown ? address.toString().slice(address.toString().length - 4, 4) : ''
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

        {isSmDown && (
          <>
            <IconButton
              className={classes.menuButton}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setRoutesModalAnchor(event.currentTarget)
                setRoutesModalOpen(true)
                blurContent()
              }}>
              <CardMedia className={classes.menu} image={Hamburger} />
            </IconButton>
            <NavbarQuery
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
            />
          </>
        )}
      </Grid>
    </Grid>
  )
}
