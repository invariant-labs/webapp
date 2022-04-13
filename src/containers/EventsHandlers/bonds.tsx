import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getBondsProgramSync } from '@web3/programs/bonds'
import { BondSaleStruct, Bonds } from '@invariant-labs/bonds-sdk/lib/sale'
import { PublicKey } from '@solana/web3.js'

const onBondSaleChange = async (bondsProgram: Bonds, bondSale: PublicKey, fn: (sale: BondSaleStruct) => void) => {
  bondsProgram.program.account.bondSale
    .subscribe(bondSale, 'singleGossip')
    .on('change', (sale: BondSaleStruct) => {
      fn(sale)
    })
}

const BondsEvents = () => {
  const dispatch = useDispatch()
  const bondsProgram = getBondsProgramSync()
  const networkStatus = useSelector(status)

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !bondsProgram) {
      return
    }

    const connectEvents = () => {}

    connectEvents()
  }, [dispatch, networkStatus])
  return null
}

export default BondsEvents
