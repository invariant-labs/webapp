import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { Grid, CardMedia, Hidden, Button } from '@material-ui/core'

import NavbarButton from '@components/NewDesign/Navbar/Button'
import ChangeWalletButton from '@components/NewDesign/HeaderButton/ChangeWalletButton'
import { NetworkType } from '@consts/static'
import { Link } from 'react-router-dom'
import { WalletType } from '@web3/wallet'
import useButtonStyles from '../HeaderButton/style'
import icons from '@static/icons'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
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
  const classes = useStyles()
  const buttonClasses = useButtonStyles()
  const routes = ['swap', 'pool']
  const [activePath, setActive] = React.useState(landing)

  React.useEffect(() => {
    // if there will be no redirects, get rid of this
    setActive(landing)
  }, [landing])

  const names = {
    [WalletType.PHANTOM]: 'phantom',
    [WalletType.SOLLET]: 'sollet',
    [WalletType.MATH]: 'math wallet',
    [WalletType.SOLFLARE]: 'solflare'
  }

  return (
    <>
      <Grid container className={classes.root} alignItems='center'>
        <Grid className={classes.left} alignItems='center'>
          <CardMedia className={classes.logo} image={icons.Logo_Title} />
        </Grid>
        <Hidden smDown>
          <Grid alignItems='center' className={classes.routers}>
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

        <Grid item className={classes.buttons} wrap='nowrap' alignItems='center'>
          {(typeOfNetwork === NetworkType.DEVNET || typeOfNetwork === NetworkType.TESTNET) && (
            <Button
              className={buttonClasses.headerButton}
              variant='contained'
              classes={{ disabled: buttonClasses.disabled }}
              onClick={onFaucet}>
              Faucet
            </Button>
          )}
          <Button
            className={buttonClasses.headerButton}
            variant='contained'
            classes={{ disabled: buttonClasses.disabled }}
            endIcon={<KeyboardArrowDownIcon id='downIcon' />}>
            Devnet
          </Button>
          {!walletConnected ? (
            <ChangeWalletButton
              name={'Connect wallet'}
              options={[
                WalletType.PHANTOM,
                WalletType.SOLLET,
                WalletType.MATH,
                WalletType.SOLFLARE
              ]}
              onSelect={onWalletSelect}
              connected={walletConnected}
              onDisconnect={onDisconnectWallet}
            />
          ) : (
            <ChangeWalletButton
              name={`${address.toString()}...${address
                .toString()
                .substr(address.toString().length - 3, 3)}`}
              options={[
                WalletType.PHANTOM,
                WalletType.SOLLET,
                WalletType.MATH,
                WalletType.SOLFLARE
              ]}
              onSelect={onWalletSelect}
              connected={walletConnected}
              onDisconnect={onDisconnectWallet}
              startIcon={
                <CardMedia
                  className={classes.connectedWalletIcon}
                  image={icons[names[typeOfWallet]]}
                />
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
export default Header
