import * as fs from 'node:fs'
import axios from 'axios'

const run = async () => {
  const tokensObject = await (
    await axios.default.get(
      'https://tokens.jup.ag/tokens?tags=verified,community,strict,lst,birdeye-trending,clone,pump'
    )
  ).data

  const tokensList = {}
  tokensObject.forEach(({ symbol, address, decimals, name, logoURI }) => {
    tokensList[address] = {
      symbol,
      decimals,
      name,
      logoURI
    }
  })

  fs.writeFileSync('./src/store/consts/tokenLists/mainnet.json', JSON.stringify(tokensList))
  console.log('Tokens list updated!')
}

run()
