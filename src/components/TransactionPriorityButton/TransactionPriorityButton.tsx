import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useStyles } from './style'

interface Props {
  areButtonsSelected: boolean
  selected: boolean
  index: number
  label: string
  value: number
  saveValue: number
  description: string
  onClick: (index: number, value: number) => void
}

const TransactionPriorityButton: React.FC<Props> = ({
  areButtonsSelected,
  selected,
  index,
  label,
  value,
  saveValue,
  description,
  onClick
}) => {
  const { classes, cx } = useStyles()

  const handleClick = () => {
    onClick(index, saveValue)
  }

  return (
    <Button
      className={cx(classes.button, { [classes.selectedButton]: selected })}
      onClick={handleClick}>
      <Grid container className={classes.wrapper}>
        <Typography className={classes.label}>
          {label}
          <span className={cx(classes.maxFee, { [classes.maxFeeColored]: areButtonsSelected })}>
            Max. {value} SOL
          </span>
        </Typography>
        <Typography className={classes.marketFee}>{description}</Typography>
      </Grid>
    </Button>
  )
}

export default TransactionPriorityButton
