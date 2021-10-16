import { ISolanaConnectionStore, solanaConnectionSliceName } from '@reducers/solanaConnection'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaConnectionSliceName] as ISolanaConnectionStore

export const { network, status, slot } = keySelectors(store, ['network', 'status', 'slot'])

export const solanaConnectionSelectors = { network, status, slot }

export default solanaConnectionSelectors
