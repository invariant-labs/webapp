import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { snackbarsSelectors } from '@store/selectors/snackbars'
import { actions } from '@store/reducers/snackbars'
import useStyles from './style'
import { network } from '@store/selectors/solanaConnection'

let displayed: string[] = []

const Notifier = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(snackbarsSelectors.snackbars)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { classes } = useStyles()
  const currentNetwork = useSelector(network)

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({ key = '', message, open, persist = true, ...props }) => {
      if (!open) {
        closeSnackbar(key)
        return
      }

      if (key && displayed.includes(key)) return

      enqueueSnackbar(message || '', {
        key,
        persist: persist,
        onExited: (_event, myKey) => {
          dispatch(actions.remove(myKey as string))
          removeDisplayed(myKey as string)
        },
        network: currentNetwork,
        snackbarId: key,
        ...props
      })
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch, classes])

  return null
}

export default Notifier
