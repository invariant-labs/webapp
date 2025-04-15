import { Position } from '@invariant-labs/sdk/lib/market'
import { NetworkType } from '@store/consts/static'

export interface IPositionItem {
  tokenXName: string
  tokenYName: string
  tokenXIcon: string
  tokenYIcon: string
  tokenXLiq: number
  position: Position
  tokenYLiq: number
  fee: number
  min: number
  max: number
  valueX: number
  valueY: number
  id: string
  address: string
  isActive?: boolean
  currentPrice: number
  network: NetworkType
  isFullRange: boolean
  unclaimedFeesInUSD: { value: number; loading: boolean }
}
