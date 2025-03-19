import { useStyles } from './style'
import icons from '@static/icons'
import { Box, Typography } from '@mui/material'
import { CHAINS } from '@store/consts/static'
import classNames from 'classnames'
import { Chain, ISelectChain } from '@store/consts/types'
import { Modal } from '../Modal/Modal'
import { useModal } from '../Modal/useModal'

type Props = {
  onChainChange: (chain: ISelectChain) => void
}

export const ChainModal = ({ onChainChange }: Props) => {
  const { classes } = useStyles()

  const { open, handleOpen, handleClose } = useModal()

  return (
    <Modal
      icon={<img className={classes.barButtonIcon} src={icons.solana} alt='Chain icon' />}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      width={160}>
      <Box className={classes.container}>
        <Typography className={classes.title}>Select a chain</Typography>
        <Box className={classes.chainContainer}>
          {CHAINS.map(chain => (
            <Box
              className={classNames(classes.chain, {
                [classes.chainActive]: chain.name === Chain.Solana
              })}
              key={chain.name}
              onClick={() => {
                onChainChange(chain)
                handleClose()
              }}>
              <img
                className={classes.icon}
                src={icons[chain.iconGlow]}
                alt={`${chain.name} icon`}
              />
              <Typography className={classes.name}>{chain.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  )
}
