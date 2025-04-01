import { useStyles } from './style'
import icons from '@static/icons'
import { Switch } from '@common/Switch/Switch'
import { SelectNetworkAndRPC } from './SelectNetworkAndRPC/SelectNetworkAndRPC'
import { NetworkType } from '@store/consts/static'
import { ISelectNetwork } from '@store/consts/types'
import { Modal } from '../Modal/Modal'
import { FaucetButton } from './FaucetButton/FaucetButton'
import { Separator } from '@common/Separator/Separator'
import { useModal } from '../Modal/useModal'
import { useState } from 'react'
import { SelectTransactionPriorityFee } from './SelectTransactionPriorityFee/SelectTransactionPriorityFee'

type Props = {
  rpcs: ISelectNetwork[]
  activeNetwork: NetworkType
  activeRPC: string
  dynamicFee: number
  onNetworkChange: (network: NetworkType, rpc: string) => void
  onFaucet: () => void
}

export const SettingsModal = ({
  rpcs,
  activeNetwork,
  activeRPC,
  dynamicFee,
  onNetworkChange,
  onFaucet
}: Props) => {
  const { classes } = useStyles()

  const [selectedTab, setSelectedTab] = useState('RPC')

  const { open, handleOpen, handleClose } = useModal()

  return (
    <Modal
      icon={<img className={classes.barButtonIcon} src={icons.settings3} alt='Settings icon' />}
      title='Settings'
      showTitle
      open={open}
      onOpen={handleOpen}
      onClose={() => {
        handleClose()
        setSelectedTab('RPC')
      }}>
      <Switch
        items={['RPC', 'Priority Fee']}
        onChange={item => setSelectedTab(item)}
        defalutValue={selectedTab}
      />
      {selectedTab === 'RPC' && (
        <>
          <SelectNetworkAndRPC
            rpcs={rpcs}
            activeNetwork={activeNetwork}
            activeRPC={activeRPC}
            onNetworkChange={(network, activeRPC) => {
              onNetworkChange(network, activeRPC)
              setSelectedTab('RPC')
              handleClose()
            }}
          />
          {activeNetwork === NetworkType.Devnet && (
            <>
              <Separator isHorizontal />
              <FaucetButton
                onFaucet={() => {
                  onFaucet()
                  setSelectedTab('RPC')
                  handleClose()
                }}
              />
            </>
          )}
        </>
      )}
      {selectedTab === 'Priority Fee' && (
        <SelectTransactionPriorityFee dynamicFee={dynamicFee} handleClose={handleClose} />
      )}
    </Modal>
  )
}
