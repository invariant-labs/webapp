import React, { useEffect, useCallback } from 'react'
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
import PerformanceWarning from '@containers/PerformanceWarning/PerformanceWarning'

const blockedCountries = [
  'BY',
  'CF',
  'CD',
  'KP',
  'CU',
  'IR',
  'LY',
  'SO',
  'SD',
  'SS',
  'SY',
  'YE',
  'ZW'
]

const RootPage: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const signerStatus = useSelector(connectionStatus)
  const walletStatus = useSelector(status)
  const navigate = useNavigate()
  const location = useLocation()

  const { classes } = useStyles()

  const initConnection = useCallback(() => {
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/exchange')
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

  useEffect(() => {
    const validateIP = async () => {
      const response = await fetch('http://ip-api.com/json')
      const data = await response.json()

      if (
        blockedCountries.includes(data.countryCode) ||
        (data.countryCode === 'UA' && data.region === '43')
      ) {
        window.location.assign('https://google.com/')
      }
    }

    validateIP()
  }, [])

  return (
    <>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <Grid className={classes.root}>
          <PerformanceWarning />
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
