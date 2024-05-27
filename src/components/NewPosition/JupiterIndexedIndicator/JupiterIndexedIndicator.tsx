import jupiter from '@static/svg/jupiter.svg'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/pools'
import { jupiterIndexedPools } from '@selectors/pools'
import useStyles from '.././style'
import { IconButton } from '@material-ui/core'
import { JupiterIndexedModal } from './JupiterIndexedModal/JupiterIndexedModal'
import { blurContent, unblurContent } from '@consts/uiUtils'

interface IProps {
  poolAddress: string
  isCurrentPoolExisting: boolean
  showNoConnected: boolean
}

export const JupiterIndexedIndicator: React.FC<IProps> = ({
  poolAddress,
  isCurrentPoolExisting,
  showNoConnected
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const indexedPools = useSelector(jupiterIndexedPools)
  const isPoolIndexed = indexedPools[poolAddress]
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    dispatch(actions.getJupiterIndexedPools())
  }, [dispatch])

  if (!isCurrentPoolExisting || showNoConnected) return <></>
  return (
    <>
      <IconButton
        onClick={() => {
          blurContent()
          setIsModalOpen(true)
        }}>
        {isPoolIndexed && poolAddress ? (
          <img src={jupiter} alt='Indexed by Jupiter icon' />
        ) : (
          <img src={jupiter} className={classes.jupiterOff} alt='Not indexed by Jupiter icon' />
        )}
      </IconButton>
      <JupiterIndexedModal
        open={isModalOpen}
        hasError={indexedPools.hasError}
        handleClose={() => {
          unblurContent()
          setIsModalOpen(false)
        }}
        status={isPoolIndexed}
      />
    </>
  )
}
