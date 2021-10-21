import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  name: string
  disabled?: boolean
}
export const HeaderButton: React.FC<IProps> = ({ name, disabled = false }) => {
  const classes = useStyles()

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}>
        {name}
      </Button>
    </>
  )
}
export default HeaderButton
