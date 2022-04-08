import { IBondsStore, bondsSliceName } from '../reducers/bonds'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[bondsSliceName] as IBondsStore

export const { bondsList, isLoadingBondsList, userVested, isLoadingUserVested } = keySelectors(
  store,
  ['bondsList', 'isLoadingBondsList', 'userVested', 'isLoadingUserVested']
)

export const bondsSelectors = {
  bondsList,
  isLoadingBondsList,
  userVested,
  isLoadingUserVested
}

export default bondsSelectors
