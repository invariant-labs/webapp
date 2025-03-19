import icons from '@static/icons'
import { useStyles } from './style'
import { Button } from '@mui/material'

type Props = {
  onFaucet: () => void
}

export const FaucetButton = ({ onFaucet }: Props) => {
  const { classes } = useStyles()

  return (
    <Button className={classes.claimFaucetButton} onClick={() => onFaucet()}>
      <img className={classes.buttonIcon} src={icons.faucet} alt='Faucet icon' /> Claim faucet
    </Button>
  )
}
