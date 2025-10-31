import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import EventsHandlers from '@containers/EventsHandlers'
import FooterWrapper from '@containers/FooterWrapper'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import { Grid } from '@mui/material'
import { Status, actions as solanaConnectionActions } from '@store/reducers/solanaConnection'
import { status as connectionStatus } from '@store/selectors/solanaConnection'
import { toBlur } from '@utils/uiUtils'
import useStyles from './style'
import { status } from '@store/selectors/solanaWallet'
import { Status as WalletStatus } from '@store/reducers/solanaWallet'
import { actions } from '@store/reducers/positions'
import { actions as walletActions } from '@store/reducers/solanaWallet'
import PerformanceWarning from '@containers/PerformanceWarning/PerformanceWarning'
import { DEFAULT_SOL_PUBLICKEY } from '@store/consts/static'

import {
  getPhantomAccChangeTrigger,
  getSolanaWallet,
  setPhantomAccChangeTrigger
} from '@utils/web3/wallet'
import { ROUTES } from '@utils/utils'

// const BANNER_STORAGE_KEY = 'invariant-banner-state-2'
// const BANNER_HIDE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

const RootPage: React.FC = React.memo(() => {
  // const [_showHeader, setShowHeader] = useState(() => {
  //   const storedData = localStorage.getItem(BANNER_STORAGE_KEY)
  //   if (storedData) {
  //     try {
  //       const { hiddenAt } = JSON.parse(storedData)
  //       const currentTime = new Date().getTime()
  //       return currentTime - hiddenAt >= BANNER_HIDE_DURATION
  //     } catch (error) {
  //       return true
  //     }
  //   }
  //   return true
  // })

  // const [isHiding, setIsHiding] = useState(false)
  // const currentNetwork = useSelector(network)

  const dispatch = useDispatch()
  const signerStatus = useSelector(connectionStatus)
  const walletStatus = useSelector(status)
  const navigate = useNavigate()
  const location = useLocation()

  const { classes } = useStyles()

  const metaData = new Map([
    [ROUTES.EXCHANGE, 'Invariant | Exchange'],
    [ROUTES.LIQUIDITY, 'Invariant | Liquidity'],
    [ROUTES.PORTFOLIO, 'Invariant | Portfolio'],
    [ROUTES.NEW_POSITION, 'Invariant | New Position'],
    [ROUTES.POSITION, 'Invariant | Position Details'],
    [ROUTES.STATISTICS, 'Invariant | Statistics'],
    [ROUTES.POOL_DETAILS, 'Invariant | Pool Details']
  ])

  useEffect(() => {
    const title =
      metaData.get([...metaData.keys()].find(key => location.pathname.startsWith(key))!) ||
      document.title
    document.title = title
  }, [location])

  const walletAddressRef = useRef('')
  useEffect(() => {
    const intervalId = setInterval(() => {
      const solanaWallet = getSolanaWallet()
      const phantomAccChangeTrigger = getPhantomAccChangeTrigger()
      if (!solanaWallet || !solanaWallet.publicKey) return
      const addr = solanaWallet.publicKey.toString()
      if (
        !walletAddressRef.current ||
        (walletAddressRef.current === DEFAULT_SOL_PUBLICKEY.toString() &&
          addr !== DEFAULT_SOL_PUBLICKEY.toString() &&
          !phantomAccChangeTrigger)
      ) {
        walletAddressRef.current = addr
        return
      }

      if (
        (!document.hasFocus() || phantomAccChangeTrigger) &&
        walletAddressRef.current !== DEFAULT_SOL_PUBLICKEY.toString() &&
        walletAddressRef.current !== addr
      ) {
        if (phantomAccChangeTrigger && addr === DEFAULT_SOL_PUBLICKEY.toString()) return
        walletAddressRef.current = addr
        new Promise(resolve => setTimeout(resolve, 300))
          .then(() => {
            dispatch(walletActions.changeWalletInExtension())
            dispatch(actions.getPositionsList())
          })
          .finally(() => setPhantomAccChangeTrigger(false))
      }

      if (
        document.hasFocus() &&
        !phantomAccChangeTrigger &&
        walletAddressRef.current !== DEFAULT_SOL_PUBLICKEY.toString() &&
        walletAddressRef.current !== addr
      ) {
        walletAddressRef.current = addr
      }
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  const initConnection = useCallback(() => {
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === ROUTES.ROOT) {
      navigate(ROUTES.EXCHANGE)
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    initConnection()
  }, [initConnection])

  useEffect(() => {
    if (signerStatus === Status.Initialized && walletStatus === WalletStatus.Initialized) {
      dispatch(actions.getPositionsList())
    }
  }, [signerStatus, walletStatus])

  // const handleBannerClose = () => {
  //   setIsHiding(true)
  //   setTimeout(() => {
  //     setShowHeader(false)
  //     localStorage.setItem(
  //       BANNER_STORAGE_KEY,
  //       JSON.stringify({
  //         hiddenAt: new Date().getTime()
  //       })
  //     )
  //     setIsHiding(false)
  //   }, 400)
  // }

  // useLayoutEffect(() => {
  //   const checkBannerState = () => {
  //     const storedData = localStorage.getItem(BANNER_STORAGE_KEY)
  //     if (storedData) {
  //       try {
  //         const { hiddenAt } = JSON.parse(storedData)
  //         const currentTime = new Date().getTime()
  //         if (currentTime - hiddenAt < BANNER_HIDE_DURATION) {
  //           setShowHeader(false)
  //         } else {
  //           localStorage.removeItem(BANNER_STORAGE_KEY)
  //           setShowHeader(true)
  //         }
  //       } catch (e: unknown) {
  //         const error = ensureError(e)

  //         console.error('Error parsing banner state:', error)
  //         localStorage.removeItem(BANNER_STORAGE_KEY)
  //       }
  //     }
  //   }

  //   checkBannerState()
  // }, [])

  return (
    <>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <Grid className={classes.root}>
          <div className={classes.background} />

          <PerformanceWarning />
          {/* {showHeader && currentNetwork === NetworkType.Mainnet && (
            <>
              <TopBanner onClose={handleBannerClose} isHiding={isHiding} />
            </>
          )} */}
          <HeaderWrapper />
          <Grid className={classes.body}>
            <Outlet />
          </Grid>
          <FooterWrapper />
        </Grid>
      </div>
    </>
  )
})

export default RootPage
