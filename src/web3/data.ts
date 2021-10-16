import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

export function parseTokenAccountData(data: Buffer) {
    const amountData = data.slice(64, 74)
    const amount = amountData.readUInt32LE(0) + amountData.readUInt32LE(4) * 2 ** 32
    return {
        token: new PublicKey(data.slice(0, 32)),
        owner: new PublicKey(data.slice(32, 64)),
        amount: new BN(amount)
    }
}
