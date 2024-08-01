const fs = require('fs')
const axios = require('axios')

const run = async () => {
  const tokensObject = await (
    await axios.default.get(
      'https://tokens.jup.ag/tokens?tags=verified,community,strict,lst,birdeye-trending,clone,pump'
    )
  ).data

  const tokensList = {}
  tokensObject.forEach(({ symbol, address, decimals, name, logoURI, extensions }) => {
    tokensList[address] = {
      symbol,
      decimals,
      name,
      logoURI,
      ...(extensions?.coingeckoId ? { coingeckoId: extensions.coingeckoId } : {})
    }
  })

  fs.writeFileSync('./src/store/consts/tokenLists/mainnet.json', JSON.stringify(tokensList))
  console.log('Tokens list updated!')
}

run()
