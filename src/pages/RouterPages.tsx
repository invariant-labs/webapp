import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ListPage from '@pages/ListPage/ListPage'
import NewPositionPage from '@pages/NewPositionPage/NewPositionPage'
import RootPage from './RootPage'
import SinglePositionPage from '@pages/SinglePositionPage/SinglePositionPage'
import StatsPage from '@pages/StatsPage/StatsPage'
import SwapPage from '@pages/SwapPage/SwapPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootPage />}>
      <Route path='/exchange/:item1?/:item2?' element={<SwapPage />} />
      <Route path='/liquidity' element={<ListPage />} />
      <Route path='/statistics' element={<StatsPage />} />
      <Route path='/newPosition/:item1?/:item2?/:item3?' element={<NewPositionPage />} />
      <Route path='/position/:id' element={<SinglePositionPage />} />
      <Route path='*' element={<Navigate to='/exchange' replace />} />
    </Route>
  )
)
