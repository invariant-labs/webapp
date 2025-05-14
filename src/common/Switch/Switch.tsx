import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useStyles } from './style'

type Props = {
  items: string[]
  onChange?: (item: string) => void
  defalutValue?: string
}

export const Switch = ({ items, onChange, defalutValue }: Props) => {
  const { classes, cx } = useStyles()

  const [selectedItem, setSelectedItem] = useState<string>(defalutValue || items[0])

  const handleChange = (item: string) => {
    setSelectedItem(item)
    onChange?.(item)
  }

  return (
    <Box className={classes.switch}>
      {items.map(item => (
        <Button
          className={cx(classes.button, { [classes.buttonActive]: item === selectedItem })}
          key={item}
          onClick={() => handleChange(item)}>
          {item}
        </Button>
      ))}
    </Box>
  )
}
