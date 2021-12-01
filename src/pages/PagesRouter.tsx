import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { SwapPage } from './SwapPage/SwapPage'
import { useDispatch, useSelector } from 'react-redux'
import { ListPage } from './ListPage/ListPage'
import { toBlur } from '@consts/uiUtils'
import { Status as WalletStatus } from '@reducers/solanaWallet'
import { NewPositionPage } from './NewPositionPage/NewPositionPage'
import EventsHandlers from '@containers/EventsHandlers'
import HeaderWrapper from '@containers/HeaderWrapper/HeaderWrapper'
import solanaConnectionSelector from '@selectors/solanaConnection'
import { actions as solanaConnectionActions, Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/positions'
import { status } from '@selectors/solanaWallet'
import { SinglePositionPage } from './SinglePositionPage/SinglePositionPage'
import { pools } from '@selectors/pools'

export const PagesRouter: React.FC = () => {
  const dispatch = useDispatch()
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)

  useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  useEffect(() => {
    if (signerStatus === Status.Initialized && walletStatus === WalletStatus.Initialized && allPools.length > 0) {
      dispatch(actions.getPositionsList())
    }
  }, [signerStatus, walletStatus, allPools.length])

  return (
    <Router>
      {signerStatus === Status.Initialized && <EventsHandlers />}
      <div id={toBlur}>
        <HeaderWrapper />
        <Switch>
          <Route path='/swap' component={SwapPage} />
          <Route path={'/newPosition'} component={NewPositionPage} />
          <Route path={'/pool'} component={ListPage} />
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
      </div>
    </Router>
  )
}

export default PagesRouter
