import * as fs from 'node:fs'
import axios from 'axios'

const run = async () => {
  const tokensObject = await (
    await axios.default.get(`https://lite-api.jup.ag/tokens/v2/tag?query=verified`)
  ).data

  const tokensList = {}
  tokensObject.forEach(({ symbol, id, decimals, name, icon }) => {
    tokensList[id] = {
      symbol,
      decimals,
      name,
      logoURI: icon
    }
  })

  fs.writeFileSync('./src/store/consts/tokenLists/mainnet.json', JSON.stringify(tokensList))
  console.log('Tokens list updated!')
}

run()
