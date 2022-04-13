import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getBondsProgramSync } from '@web3/programs/bonds'
import { BondSaleStruct, Bonds } from '@invariant-labs/bonds-sdk/lib/sale'
import { PublicKey } from '@solana/web3.js'
import { bondsList } from '@selectors/bonds'
import { actions } from '@reducers/bonds'
import * as R from 'remeda'

const onBondSaleChange = async (
  bondsProgram: Bonds,
  bondSale: PublicKey,
  fn: (sale: BondSaleStruct) => void
) => {
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
  const allBonds = useSelector(bondsList)

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !bondsProgram) {
      return
    }

    const connectEvents = () => {
      R.forEachObj(allBonds, bond => {
        onBondSaleChange(bondsProgram, bond.address, bondData => {
          dispatch(
            actions.updateBond({
              ...bondData,
              address: bond.address
            })
          )
        })
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
      })
    }

    connectEvents()
  }, [dispatch, networkStatus, Object.values(allBonds).length])

  return null
}

export default BondsEvents
