import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import SearchInput from './SearchInput'
import { colors } from '@static/theme'

storiesOf('inputs/searchInput', module).add('default', () => {
  const [value, setValue] = useState('')
  const searchFarm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase())
  }
  return (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SearchInput handleChange={searchFarm} />
    </div>
  )
})
