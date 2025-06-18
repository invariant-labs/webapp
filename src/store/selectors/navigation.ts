import { INavigation, navigationSliceName } from '@store/reducers/navigation'
import { AnyProps, keySelectors } from './helpers'

const store = (s: AnyProps) => s[navigationSliceName] as INavigation

export const { navigationState } = keySelectors(store, ['navigationState'])

export const address = (s: AnyProps) => store(s).navigationState.address

export const navigationSelectors = {
  navigationState,
  address
}

export default navigationSelectors
