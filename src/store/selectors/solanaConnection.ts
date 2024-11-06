import { ISolanaConnectionStore, solanaConnectionSliceName } from '@store/reducers/solanaConnection'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaConnectionSliceName] as ISolanaConnectionStore

export const { network, status, slot, rpcAddress, rpcStatus, timeoutError } = keySelectors(store, [
  'network',
  'status',
  'slot',
  'rpcAddress',
  'rpcStatus',
  'timeoutError'
])

export const solanaConnectionSelectors = {
  network,
  status,
  slot,
  rpcAddress,
  rpcStatus,
  timeoutError
}

export default solanaConnectionSelectors
