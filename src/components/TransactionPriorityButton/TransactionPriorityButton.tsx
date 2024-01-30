import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

interface Props {
  selected: boolean
  index: number
  label: string
  value: number
  multiplier: number
  onClick: (index: number, value: number) => void
}

const TransactionPriorityButton: React.FC<Props> = ({
  selected,
  index,
  label,
  value,
  multiplier,
  onClick
}) => {
  const classes = useStyles()

  const handleClick = () => {
    onClick(index, value)
  }
  return (
    <Button
      className={classNames(classes.button, { [classes.selectedButton]: selected })}
      onClick={handleClick}>
      <Grid container justifyContent='flex-start' className={classNames(classes.wrapper)}>
        <Typography className={classNames(classes.label)}>
          {label}
          <span className={classNames(classes.maxFee)}>Max. {value} SOL</span>
        </Typography>
        <Typography className={classNames(classes.marketFee)}>{multiplier}x Market fee</Typography>
      </Grid>
    </Button>
  )
}

export default TransactionPriorityButton
