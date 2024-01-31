import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

interface Props {
  selected: boolean
  index: number
  label: string
  value: number
  saveValue: number
  description: string
  onClick: (index: number, value: number) => void
}

const TransactionPriorityButton: React.FC<Props> = ({
  selected,
  index,
  label,
  value,
  saveValue,
  description,
  onClick
}) => {
  const classes = useStyles()

  const handleClick = () => {
    onClick(index, saveValue)
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
        <Typography className={classNames(classes.marketFee)}>{description}</Typography>
      </Grid>
    </Button>
  )
}

export default TransactionPriorityButton
