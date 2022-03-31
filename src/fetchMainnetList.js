const { TokenListProvider } = require('@solana/spl-token-registry')
const fs = require('fs')

const coingeckoIdOverwrites = {
  '9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i': 'terrausd',
  '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj': 'lido-staked-sol'
}

new TokenListProvider()
  .resolve()
  .then(tokens => {
    const tokenList = tokens
      .filterByClusterSlug('mainnet-beta')
      .getList()
      .map(token =>
        coingeckoIdOverwrites[token.address]
          ? {
              ...token,
              extensions: {
                ...token.extensions,
                coingeckoId: coingeckoIdOverwrites[token.address]
              }
            }
          : token
      )
    fs.writeFileSync(
      './src/store/consts/tokenLists/mainnet.json',
      JSON.stringify(
        tokenList
          .filter(token => token.chainId === 101)
          .sort((a, b) => a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase()))
      )
    )

    console.log('Tokens list updated!')
  })
  .catch(error => {
    console.log(error)
  })
