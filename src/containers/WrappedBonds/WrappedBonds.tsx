import React, { useEffect, useMemo, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/bonds'
import { status, swapTokensDict } from '@selectors/solanaWallet'
import loader from '@static/gif/loader.gif'
import { Status } from '@reducers/solanaWallet'
import { bondsList, isLoadingBondsList, userVested } from '@selectors/bonds'
import BondList from '@components/Bonds/BondList/BondList'
import PositionsList from '@components/Bonds/UserList/PositionsList/PositionsList'
import { BN } from '@project-serum/anchor'
import BuyBondModal from '@components/Modals/BuyBondModal/BuyBondModal'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { USDC_DEV } from '@consts/static'
import { actions as snackbarsActions } from '@reducers/snackbars'
import {
  calculateAmountToClaim,
  getPriceAfterSlippage
} from '@invariant-labs/bonds-sdk/lib/math'
import { calculateBondPrice, printBN } from '@consts/utils'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import useStyles from './styles'

export const WrappedBonds: React.FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const walletStatus = useSelector(status)
  const bondsListLoading = useSelector(isLoadingBondsList)
  const allBonds = useSelector(bondsList)
  const allUserVested = useSelector(userVested)
  const allTokens = useSelector(swapTokensDict)

  useEffect(() => {
    dispatch(actions.getBondsList())
  }, [])

  useEffect(() => {
    if (walletStatus === Status.Initialized && Object.values(allBonds).length > 0) {
      dispatch(actions.getUserVested())
    }
  }, [walletStatus, Object.values(allBonds).length])

  const [modalBondIndex, setModalBondIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalPrice, setModalPrice] = useState<BN>(new BN(0))

  const bondsData = useMemo(() => {
    return Object.values(allBonds).map((bond, index) => {
      return {
        address: bond.address,
        bondToken: allTokens[bond.tokenBond.toString()],
        quoteToken: allTokens[bond.tokenQuote.toString()],
        roiPercent: 0,
        supply: +printBN(bond.supply.v, allTokens[bond.tokenBond.toString()].decimals),
        remaining: +printBN(bond.remainingAmount.v, allTokens[bond.tokenBond.toString()].decimals),
        vesting: bond.vestingTime.div(new BN(60 * 60 * 24)).toString() + ' days',
        onBondClick: () => {
          if (walletStatus === Status.Initialized) {
            setModalBondIndex(index)
            blurContent()
            setModalPrice(new BN(0))
            setModalOpen(true)
          } else {
            dispatch(
              snackbarsActions.add({
                message: 'Connect wallet to buy bonds',
                variant: 'warning',
                persist: false
              })
            )
          }
        }
      }
    })
  }, [allBonds, allTokens])

  const userVestedData = useMemo(() => {
    return Object.values(allUserVested).map(vested => {
      const sale = allBonds[vested.bondSale.toString()]

      const now = Date.now() / 1000
      const progress =
        now < vested.vestingStart.toNumber()
          ? '0%'
          : now > vested.vestingEnd.toNumber()
          ? '100%'
          : `${(
              ((now - vested.vestingStart.toNumber()) /
                (vested.vestingEnd.toNumber() - vested.vestingStart.toNumber())) *
              100
            ).toFixed(1)}%`

      return {
        bondToken: allTokens[sale.tokenBond.toString()],
        quoteToken: allTokens[sale.tokenQuote.toString()],
        bought: +printBN(vested.bondAmount.v, allTokens[sale.tokenBond.toString()].decimals),
        redeemable: +printBN(
          calculateAmountToClaim(vested),
          allTokens[sale.tokenBond.toString()].decimals
        ),
        vestingProgress: progress,
        onRedeemClick: () => {
          dispatch(
            actions.redeemBond({
              bondSale: sale.address,
              bondId: vested.id
            })
          )
        }
      }
    })
  }, [allUserVested, allTokens])

  const placeholderToken = {
    ...USDC_DEV,
    assetAddress: USDC_DEV.address,
    balance: new BN(0)
  }

  return (
    <Grid container className={classes.wrapper} direction='column'>
      {bondsListLoading ? (
        <img src={loader} className={classes.loading} />
      ) : (
        <>
          <Typography className={classes.header}>Bonds</Typography>
          <Typography className={classes.desc}>
            Thanks to bonds mechanism, you can obtain newly introduced tokens at low price. There
            are various vesting options you can choose to filter available bonds and find the
            desired one. In the bottom part you can see how many tokens you are eligible to withdraw
            and how much time is left that you can claim the remaining part.
          </Typography>
          <BondList data={bondsData} />
          {walletStatus === Status.Initialized && userVestedData.length > 0 ? (
            <>
              <Typography className={classes.header} style={{ marginTop: 16 }}>
                Your vested positions
              </Typography>
              <PositionsList data={userVestedData} />
            </>
          ) : null}
          <BuyBondModal
            open={modalOpen}
            bondToken={
              modalBondIndex === null ? placeholderToken : bondsData[modalBondIndex].bondToken
            }
            quoteToken={
              modalBondIndex === null ? placeholderToken : bondsData[modalBondIndex].quoteToken
            }
            roi={modalBondIndex === null ? 0 : +bondsData[modalBondIndex].roiPercent}
            price={modalPrice}
            supply={modalBondIndex === null ? 0 : +bondsData[modalBondIndex].supply}
            vestingTerm={modalBondIndex === null ? '' : bondsData[modalBondIndex].vesting}
            handleClose={() => {
              setModalOpen(false)
              unblurContent()
            }}
            onBuy={(amount, slippage) => {
              if (modalBondIndex !== null) {
                dispatch(
                  actions.buyBond({
                    bondSale: bondsData[modalBondIndex].address,
                    amount,
                    priceLimit: getPriceAfterSlippage(
                      { v: modalPrice },
                      {
                        v: fromFee(new BN(Number(slippage * 1000)))
                      }
                    )
                  })
                )
              }
              setModalOpen(false)
              unblurContent()
            }}
            onAmountChange={(amount, byAmountBond) => {
              if (modalBondIndex !== null) {
                setModalPrice(
                  calculateBondPrice(allBonds[bondsData[modalBondIndex].address.toString()], amount, byAmountBond)
                )
              }
            }}
          />
        </>
      )}
    </Grid>
  )
}

export default WrappedBonds