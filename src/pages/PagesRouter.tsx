import Footer from '@components/Footer/Footer'
import { toBlur } from '@consts/uiUtils'
import EventsHandlers from '@containers/EventsHandlers'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import PerformanceWarning from '@containers/PerformanceWarning/PerformanceWarning'
import { actions } from '@reducers/positions'
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

  return (
    <Router>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <PerformanceWarning />
        <HeaderWrapper />
        <Switch>
          <Route path='/swap' component={SwapPage} />
          <Route
            path={'/newPosition/:initialTokenFrom?/:initialTokenTo?/:initialFee?'}
            render={({ match }) => (
              <NewPositionPage
                initialTokenFrom={match.params.initialTokenFrom ?? ''}
                initialTokenTo={match.params.initialTokenTo ?? ''}
                initialFee={match.params.initialFee ?? ''}
              />
            )}
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
