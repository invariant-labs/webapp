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
            path={'/newPosition/:item1?/:item2?/:item3?/:item4?/:item5?'}
            render={({ match, history }) => {
              let initialTokenFrom = ''
              let initialTokenTo = ''
              let initialFee = ''
              let initialLeftRange = ''
              let initialRightRange = ''

              if (match.params.item5 && match.params.item4) {
                initialTokenFrom = match.params.item1 as string
                initialTokenTo = match.params.item2 as string
                initialFee = match.params.item3 as string
                initialLeftRange = match.params.item4
                initialRightRange = match.params.item5
              } else if (match.params.item3) {
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
                  initialLeftRange={initialLeftRange}
                  initialRightRange={initialRightRange}
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
