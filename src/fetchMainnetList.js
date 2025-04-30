import * as fs from 'node:fs'
import axios from 'axios'
import { BASE_JUPITER_API_URL } from '@store/consts/static.ts'
const run = async () => {
  const tokensObject = await (
    await axios.default.get(
      `${BASE_JUPITER_API_URL}/tokens/v1/tagged/verified,community,strict,lst,birdeye-trending,clone,pump`
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
