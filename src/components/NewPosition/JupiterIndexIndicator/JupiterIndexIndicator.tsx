import { useEffect, useState } from 'react'
import JupiterIcon from '@static/svg/JupiterIcon.svg'
import closeWin from '@static/svg/closeWin.svg'
import { jupiterIndicatorStyles } from './style.ts'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

interface IndicatorProps {
  marketId: string
}

interface ApiElementProps {
  pubkey: string
  executable: boolean
  lamports: number
  owner: string
  params: Object
  rentEpoch: number
  space: number
}

export const JupiterIndexIndicator = ({ marketId }: IndicatorProps) => {
  const [isIndexed, setIsIndexed] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleConn = async () => {
    try {
      const response = await fetch('https://cache.jup.ag/markets?v=3')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      const connection = data.some((el: ApiElementProps) => el.pubkey === marketId)
      setIsIndexed(connection)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data. Please try again later.')
    }
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      void handleConn()
    }
    return () => {
      isMounted = false
    }
  }, [marketId])

  return (
    <>
      {!error && isIndexed && (
        <>
          <Button onClick={handleOpen} variant='text'>
            <figure style={jupiterIndicatorStyles.container}>
              <img
                src={JupiterIcon}
                style={jupiterIndicatorStyles.image}
                aria-label='Indexed by Jupiter'
                title='Jupiter Icon'
                alt='Indexed by Jupiter'
              />
              <figcaption style={jupiterIndicatorStyles.caption}>Indexed by Jupiter</figcaption>
            </figure>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box style={jupiterIndicatorStyles.modal} borderRadius='20px'>
              <Grid container justifyContent='space-between'>
                <Typography
                  variant='body2'
                  style={jupiterIndicatorStyles.headerColor}
                  id='modal-modal-title'
                  variant='h5'
                  component='h2'>
                  Jupiter indexing
                </Typography>
                <Button onClick={handleClose} aria-label='close'>
                  <img src={closeWin} alt='Close modal' />
                </Button>
              </Grid>
              <Typography
                style={{
                  ...jupiterIndicatorStyles.headerColor,
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
                id='modal-modal-description'
                variant='body2'>
                Status: <span style={jupiterIndicatorStyles.detail}>Indexing active</span>
              </Typography>
              <Typography id='modal-modal-description' variant='body2'>
                An indexed pool enhances your position's accessibility across the Solana ecosystem,
                boosting profitability.
                <br />
                <br />
                If a pool is not yet indexed, meeting three requirements will enable its indexing:
                <ul>
                  <li>
                    Ensure your token exists on-chain with metadata following the{' '}
                    <a style={jupiterIndicatorStyles.link} href='https://developers.metaplex.com/'>
                      Metaplex Token Metadata
                    </a>
                  </li>
                  <li>Maintain at least $250 liquidity on both buy and sell sides.</li>
                  <li>
                    Limit buy and sell price impact to 30% to prevent single-sided liquidity markets
                  </li>
                </ul>
                Once these criteria are met, Jupiter automatically lists your token within minutes
                (usually up to ~30 min).
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  )
}
