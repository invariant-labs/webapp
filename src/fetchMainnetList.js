const { Generator, ProviderCoinGecko } = require('@solflare-wallet/utl-aggregator')
const { TokenListProvider } = require('@solana/spl-token-registry')
const fs = require('fs')

const run = async () => {
  const tokensObject = {}

  await new TokenListProvider()
    .resolve()
    .then(tokens => {
      tokens
        .filterByClusterSlug('mainnet-beta')
        .getList()
        .filter(token => token.chainId === 101)
        .forEach(token => {
          tokensObject[token.address] = token
        })
    })
    .catch(error => {
      console.log(error)
    })

  const generator = new Generator([
    new ProviderCoinGecko(
      null,
      'https://tame-ancient-mountain.solana-mainnet.quiknode.pro/6a9a95bf7bbb108aea620e7ee4c1fd5e1b67cc62',
      {
        throttle: 3 * 1000,
        throttleCoinGecko: 15 * 1000,
        batchAccountsInfo: 100,
        batchCoinGecko: 5
      }
    )
  ])

  await generator
    .generateTokenList()
    .then(tokens => {
      tokens.tokens
        .filter(token => token.chainId === 101)
        .forEach(token => {
          tokensObject[token.address] = {
            ...token,
            symbol: tokensObject[token.address]?.symbol ?? token.symbol
          }
        })
    })
    .catch(error => {
      console.log(error)
    })

  fs.writeFileSync(
    './src/store/consts/tokenLists/mainnet.json',
    JSON.stringify(
      Object.values(tokensObject).sort((a, b) =>
        a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
      )
    )
  )

  console.log('Tokens list updated!')
}

run()
