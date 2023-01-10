const fs = require('fs')
const axios = require('axios')

const run = async () => {
  const tokensObject = await (await axios.default.get('https://cache.jup.ag/tokens')).data
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
