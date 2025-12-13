import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ListPage from '@pages/ListPage/ListPage'
import NewPositionPage from '@pages/NewPositionPage/NewPositionPage'
import RootPage from './RootPage'
import SinglePositionPage from '@pages/SinglePositionPage/SinglePositionPage'
import StatsPage from '@pages/StatsPage/StatsPage'
import SwapPage from '@pages/SwapPage/SwapPage'
import PortfolioPage from './PortfolioPage/PortfolioPage'
import { ROUTES } from '@utils/utils'
import PoolDetailsPage from './PoolDetailsPage/PoolDetailsPage'
import TermsPage from './TermsOfUse/TermsPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.ROOT} element={<RootPage />}>
      <Route path={ROUTES.EXCHANGE_WITH_PARAMS} element={<SwapPage />} />
      <Route path={ROUTES.LIQUIDITY} element={<ListPage />} />
      <Route path={ROUTES.STATISTICS} element={<StatsPage />} />
      <Route path={ROUTES.NEW_POSITION_WITH_PARAMS} element={<NewPositionPage />} />
      <Route path={ROUTES.POSITION_WITH_ID} element={<SinglePositionPage />} />
      <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
      <Route path={ROUTES.POOL_DETAILS_WITH_PARAMS} element={<PoolDetailsPage />} />

      <Route path='*' element={<Navigate to={ROUTES.EXCHANGE} replace />} />
      <Route path={ROUTES.TERMS} element={<TermsPage />} />
    </Route>
  )
)
