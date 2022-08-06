import { ISolanaConnectionStore, solanaConnectionSliceName } from '@reducers/solanaConnection'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaConnectionSliceName] as ISolanaConnectionStore

export const { network, status, slot, rpcAddress } = keySelectors(store, ['network', 'status', 'slot', 'rpcAddress'])

export const solanaConnectionSelectors = { network, status, slot, rpcAddress }

export default solanaConnectionSelectors
