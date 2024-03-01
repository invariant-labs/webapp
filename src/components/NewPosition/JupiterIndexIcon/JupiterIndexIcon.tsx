import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  IconButton,
  Grid
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import icons from '@static/icons'

export interface IJupiterIndexIcon {
  address: string
}

interface IPool {
  pubkey: string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    backgroundColor: '#202946',
    borderRadius: '20px',
    width: '312px'
  }
}))

export const JupiterIndexIcon: React.FC<IJupiterIndexIcon> = ({ address }) => {
  const [isGlowing, setIsGlowing] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (address === '') {
      setIsGlowing(false)
    } else {
      void fetchJupiterData()
    }
  }, [address])

  const fetchJupiterData = async (): Promise<void> => {
    const apiUrl = 'https://cache.jup.ag/markets?v=3'

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      const hasMatchingPool = data.some((pool: IPool) => pool.pubkey === address)

      setIsGlowing(hasMatchingPool)

      console.log('done')
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const iconOpacity = {
    opacity: isGlowing ? 1 : 0.3
  }

  const contentStyle = {
    color: '#a9b6bf',
    fontSize: '14px',
    lineHeight: '17px'
  }

  return (
    <>
      <img
        src={icons.jupiterIcon}
        alt='jupiter-icon'
        onClick={() => setIsOpen(!isOpen)}
        style={iconOpacity}
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={isOpen}>
        <Grid container justifyContent='space-between'>
          <DialogTitle style={{ paddingBottom: '0' }} id='customized-dialog-title'>
            Jupiter indexing
          </DialogTitle>
          <IconButton aria-label='close' onClick={handleClose} style={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Grid>

        <DialogContent>
          <p style={{ fontSize: '14px', lineHeight: '17px', paddingTop: '0' }}>
            Status:{' '}
            {isGlowing ? (
              <span style={{ color: '#2ee09a' }}>Indexing active</span>
            ) : (
              <span style={{ color: '#FB555F' }}>Indexing not active</span>
            )}
          </p>
          <p style={contentStyle}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </p>
          <p style={contentStyle}>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
            <ul>
              <li>
                Ensure your token exists on-chain with metadata following the <a href='https://developers.metaplex.com/' style={{color: '#EF84F5'}}>Metaplex Token Metadata</a>
              </li>
              <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
              <li>
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
              </li>
            </ul>
          </p>
          <p style={contentStyle}>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </p>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default JupiterIndexIcon
