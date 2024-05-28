import Footer from '@components/Footer/Footer'
import { toBlur } from '@consts/uiUtils'
import EventsHandlers from '@containers/EventsHandlers'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import PerformanceWarning from '@containers/PerformanceWarning/PerformanceWarning'
import { actions } from '@reducers/positions'
import { actions as jupiterActions } from '@reducers/jupiter'
import { Status, actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { Status as WalletStatus } from '@reducers/solanaWallet'
import solanaConnectionSelector from '@selectors/solanaConnection'
import { status } from '@selectors/solanaWallet'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import BondsPage from './BondsPage/BondsPage'
import FarmsPage from './FarmsPage/FarmsPage'
import { ListPage } from './ListPage/ListPage'
import { NewPositionPage } from './NewPositionPage/NewPositionPage'
import SingleFarmPage from './SingleFarmPage/SingleFarmPage'
import { SinglePositionPage } from './SinglePositionPage/SinglePositionPage'
import StatsPage from './StatsPage/StatsPage'
import { SwapPage } from './SwapPage/SwapPage'
import { fetchJupiterPoolList } from '../store/consts/utils'

export const PagesRouter: React.FC = () => {
  const dispatch = useDispatch()
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const walletStatus = useSelector(status)

  useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  useEffect(() => {
    if (signerStatus === Status.Initialized && walletStatus === WalletStatus.Initialized) {
      dispatch(actions.getPositionsList())
    }
  }, [signerStatus, walletStatus])

  useEffect(() => {
    const fetchJupiterData = async () => {
      const list = await fetchJupiterPoolList()
      dispatch(jupiterActions.addJupiterList(list))
    }
    fetchJupiterData()
    setInterval(fetchJupiterData, 30 * 60 * 1000) // The cache is updated every 30 minutes
  }, [])

  return (
    <Router>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <PerformanceWarning />
        <HeaderWrapper />
        <Switch>
          <Route path='/swap' component={SwapPage} />
          <Route
            path={'/newPosition/:item1?/:item2?/:item3?'}
            render={({ match, history }) => {
              let initialTokenFrom = ''
              let initialTokenTo = ''
              let initialFee = ''

              if (match.params.item3) {
                initialTokenFrom = match.params.item1 as string
                initialTokenTo = match.params.item2 as string
                initialFee = match.params.item3
              } else if (match.params.item2) {
                initialTokenFrom = match.params.item1 as string
                initialFee = match.params.item2
              } else if (match.params.item1) {
                initialFee = match.params.item1
              }

              return (
                <NewPositionPage
                  initialTokenFrom={initialTokenFrom}
                  initialTokenTo={initialTokenTo}
                  initialFee={initialFee}
                  history={history}
                />
              )
            }}
          />
          <Route path={'/pool'} component={ListPage} />
          <Route path={'/farms'} component={FarmsPage} />
          <Route
            path={'/farm/:id'}
            render={({ match }) => <SingleFarmPage id={match.params.id} />}
          />
          <Route path={'/stats'} component={StatsPage} />
          <Route path={'/bonds'} component={BondsPage} />
          <Route
            path={'/position/:id'}
            render={({ match }) => <SinglePositionPage id={match.params.id} />}
          />
          <Route path='*'>
            <Redirect to='/swap'>
              <SwapPage />
            </Redirect>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default PagesRouter
