import { Account } from '@solana/web3.js'
// Admin account to use for test minting test tokens + adding assets
const airdropAdmin = new Account([
  85, 51, 81, 126, 224, 250, 233, 174, 133, 40, 112, 237, 109, 244, 6, 62, 193, 121, 239, 246, 11,
  77, 215, 9, 0, 18, 83, 91, 115, 65, 112, 238, 60, 148, 118, 6, 224, 47, 54, 140, 167, 188, 182,
  74, 237, 183, 242, 77, 129, 107, 155, 20, 229, 130, 251, 93, 168, 162, 156, 15, 152, 163, 229, 119
])
export default airdropAdmin
