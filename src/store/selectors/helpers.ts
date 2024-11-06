import { createSelector } from 'reselect'

export interface AnyProps {
  [k: string]: any
}

type Selected<S> = {
  [k in keyof S]: (s: S) => S[k]
}
export const keySelectors = <S extends object>(store: (s: AnyProps) => S, keys: Array<keyof S>) =>
  keys.reduce((acc, k) => {
    acc[k] = createSelector(store, (s: S) => s[k])
    return acc
  }, {} as Selected<S>)
