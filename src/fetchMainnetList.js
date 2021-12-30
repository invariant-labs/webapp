const { TokenListProvider } = require('@solana/spl-token-registry')
const fs = require('fs')

new TokenListProvider().resolve().then((tokens) => {
  const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList()
  fs.writeFileSync(
    './src/store/consts/tokenLists/mainnet.json',
    JSON.stringify(
      tokenList.filter((token) => token.chainId === 101).sort((a, b) => a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase()))
    )
  )
}).catch((error) => { console.log(error) })
