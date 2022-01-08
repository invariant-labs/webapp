import React, { useRef } from 'react'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import classNames from 'classnames'
import useStyles from './style'

export interface ISearchInput {
  name?: string
  centered?: boolean
  className?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FC<ISearchInput> = ({ className, handleChange }) => {
  const classes = useStyles()
  const inputEl = useRef<HTMLInputElement>(null)
  const onButtonClick = () => {
    if (inputEl.current !== null) {
      inputEl.current.focus()
    }
  }
  return (
    <>
      <Button
        className={classNames(classes.button, className)}
        color='primary'
        variant='contained'
        onClick={onButtonClick}
        endIcon={<SearchIcon className={classes.endIcon} />}
        classes={{
          endIcon: 'selectArrow'
        }}
        disableRipple>
        <input
          type={'text'}
          className={classes.input}
          placeholder={'Search'}
          onChange={handleChange}
          ref={inputEl}></input>
      </Button>
    </>
  )
}

export default SearchInput
