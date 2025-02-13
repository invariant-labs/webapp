import React from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { Box, useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import useStyles from './style'

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  return React.cloneElement(data[index] as React.ReactElement, {
    style: {
      ...style
    }
  })
}

interface ListboxComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ListboxComponent = React.forwardRef<HTMLDivElement, ListboxComponentProps>(
  function ListboxComponent(props, ref) {
    const { children, style, ...other } = props
    const { classes } = useStyles()
    const itemData = React.Children.toArray(children)
    const itemCount = itemData.length
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    return (
      <Box
        ref={ref}
        {...other}
        style={{
          maxHeight: 'none',
          width: '100%'
        }}>
        <FixedSizeList
          className={classes.fixedList}
          height={isSmall ? 486 : 306}
          width='100%'
          itemCount={itemCount}
          itemSize={isSmall ? 70 : 40}
          itemData={itemData}
          overscanCount={5}>
          {renderRow}
        </FixedSizeList>
      </Box>
    )
  }
)

export default ListboxComponent
