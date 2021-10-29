import { TokenListProvider } from '@solana/spl-token-registry'

const tokens = new TokenListProvider().resolve().then((tokens) => {
  const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList()
  console.log(tokenList)
})
  .catch(err => console.log(err))

export default tokens
