import { ISolanaConnectionStore, solanaConnectionSliceName } from '@reducers/solanaConnection'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaConnectionSliceName] as ISolanaConnectionStore

export const { network, status, slot, rpcAddress, rpcStatus } = keySelectors(store, [
  'network',
  'status',
  'slot',
  'rpcAddress',
  'rpcStatus'
])

export const solanaConnectionSelectors = { network, status, slot, rpcAddress, rpcStatus }

export default solanaConnectionSelectors
