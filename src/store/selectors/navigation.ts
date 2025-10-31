import { AnyProps, keySelectors } from './helpers'
import { INavigation, navigationSliceName } from '@store/reducers/navigation'

const store = (s: AnyProps) => s[navigationSliceName] as INavigation

export const { navigationState } = keySelectors(store, ['navigationState'])

export const address = (s: AnyProps) => store(s).navigationState.address
export const showFavourites = (s: AnyProps) => store(s).navigationState.showFavourites
export const showFavouritesTokens = (s: AnyProps) => store(s).navigationState.showFavouritesTokens
export const liquiditySearch = (s: AnyProps) => store(s).navigationState.liquidityPool
export const poolSearch = (s: AnyProps) => store(s).navigationState.statsPool
export const tokenSearch = (s: AnyProps) => store(s).navigationState.statsTokens

export const navigationSelectors = {
  navigationState,
  address,
  showFavourites,
  liquiditySearch,
  poolSearch,
  tokenSearch,
  showFavouritesTokens
}

export default navigationSelectors
