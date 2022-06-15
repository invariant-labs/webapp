import React from 'react'
import { InputAdornment, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './style'

export interface ISearchInput {
  name?: string
  className?: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FC<ISearchInput> = ({ handleChange, value }) => {
  const classes = useStyles()
  return (
    <>
      <InputBase
        type={'text'}
        value={value}
        classes={{ input: classes.input }}
        onChange={handleChange}
        placeholder='Search'
        inputProps={{
          style: {
            padding: '2px 24px 2px 5px'
          }
        }}
        endAdornment={
          <InputAdornment position='end'>
            <SearchIcon className={classes.endIcon} />
          </InputAdornment>
        }
      />
    </>
  )
}

export default SearchInput
