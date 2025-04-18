import { useStyles } from './style'
import { Button } from '@common/Button/Button'
import { Box } from '@mui/material'
import { faucetIcon } from '@static/icons'

type Props = {
  onFaucet: () => void
}

export const FaucetButton = ({ onFaucet }: Props) => {
  const { classes } = useStyles()

  return (
    <Button scheme='green' onClick={() => onFaucet()}>
      <Box className={classes.claimFaucetButton}>
        <img className={classes.buttonIcon} src={faucetIcon} alt='Faucet icon' /> Claim faucet
      </Box>
    </Button>
  )
}
