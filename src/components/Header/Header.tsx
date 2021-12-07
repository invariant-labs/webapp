import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, Button, Hidden } from '@material-ui/core'
import NavbarButton from '@components/Navbar/Button'
import ChangeWalletButton from '@components/HeaderButton/ChangeWalletButton'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { Link } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import useButtonStyles from '@components/HeaderButton/style'
import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import useStyles from './style'
import SelectNetworkButton from '@components/HeaderButton/SelectNetworkButton'

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
  const classes = useStyles()
  const buttonClasses = useButtonStyles()
  const routes = ['swap', 'pool']
  const [activePath, setActive] = React.useState(landing)

  React.useEffect(() => {
    // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  const routesRef = React.useRef<HTMLButtonElement>(null)

  return (
    <>
      <Grid container className={classes.root} alignItems='center' justifyContent='space-between'>
        <CardMedia className={classes.logo} image={icons.LogoTitle} />

        <Hidden smDown>
          <Grid className={classes.routers} innerRef={routesRef} style={{ position: 'absolute', left: `calc(50% - ${(routesRef.current?.offsetWidth ?? 0) / 2}px)` }}>
            {routes.map(path => (
              <Link key={`path-${path}`} to={`/${path}`} className={classes.link}>
                <NavbarButton
                  name={path}
                  onClick={() => {
                    setActive(path)
                  }}
                  active={path === activePath}
                />
              </Link>
            ))}
          </Grid>
        </Hidden>

        <Grid item className={classes.buttons}>
          {(typeOfNetwork === NetworkType.DEVNET || typeOfNetwork === NetworkType.TESTNET) && (
            <Button
              className={buttonClasses.headerButton}
              variant='contained'
              classes={{ disabled: buttonClasses.disabled, label: buttonClasses.label }}
              onClick={onFaucet}>
              Faucet
            </Button>
          )}
          <SelectNetworkButton
            name={typeOfNetwork}
            networks={[{ name: NetworkType.DEVNET, network: SolanaNetworks.DEV }]}
            onSelect={chosen => {
              onNetworkSelect(chosen)
            }}
          />
          <ChangeWalletButton
            name={
              walletConnected
                ? `${address.toString().substr(0, 15)}...${address
                    .toString()
                    .substr(address.toString().length - 4, 4)}`
                : 'Connect wallet'
            }
            options={[
              WalletType.PHANTOM,
              WalletType.SOLLET,
              WalletType.MATH,
              WalletType.SOLFLARE
            ]}
            onSelect={onWalletSelect}
            connected={walletConnected}
            onDisconnect={onDisconnectWallet}
            startIcon={walletConnected ? <DotIcon className={classes.connectedWalletIcon} /> : undefined}
            activeWallet={walletConnected ? typeOfWallet : undefined}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default Header
