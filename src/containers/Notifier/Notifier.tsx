import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { actions } from '@reducers/snackbars'
import { snackbars } from '@selectors/snackbars'
import { network } from '@selectors/solanaConnection'
import useStyles from './style'

let displayed: string[] = []

const Notifier = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(snackbars)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const classes = useStyles()

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter(key => id !== key)]
  }
  const currentNetwork: string = useSelector(network)

  React.useEffect(() => {
    notifications.forEach(
      ({ key = '', message, open, variant, txid, isAccount, persist = true }) => {
        if (!open) {
          // dismiss snackbar using notistack
          closeSnackbar(key)
          return
        }

        // do nothing if snackbar is already displayed
        if (key && displayed.includes(key)) return
        const action = () =>
          txid && (
            <button
              className={classes.button}
              onClick={() => {
                if (
                  currentNetwork.toLocaleLowerCase() !== 'mainnet' &&
                  txid !== undefined &&
                  !isAccount
                ) {
                  window.open(
                    'https://explorer.solana.com/tx/' +
                      txid +
                      '?cluster=' +
                      currentNetwork.toLowerCase()
                  )
                } else if (
                  currentNetwork.toLocaleLowerCase() === 'mainnet' &&
                  txid !== undefined &&
                  !isAccount
                ) {
                  window.open('https://explorer.solana.com/tx/' + txid)
                } else if (currentNetwork.toLocaleLowerCase() !== 'mainnet' && isAccount) {
                  window.open(
                    'https://explorer.solana.com/address/' +
                      txid +
                      '?cluster=' +
                      currentNetwork.toLowerCase()
                  )
                } else if (currentNetwork.toLocaleLowerCase() === 'mainnet' && isAccount) {
                  window.open('https://explorer.solana.com/address/' + txid)
                }
              }}>
              <span>Details</span>
            </button>
          )

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          action: action,
          variant: variant,
          persist: persist,
          // autoHideDuration: 5000,
          onExited: (_event, myKey) => {
            dispatch(actions.remove(myKey as string))
            removeDisplayed(myKey as string)
          }
        })
        storeDisplayed(key)
      }
    )
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])

  return null
}

export default Notifier
