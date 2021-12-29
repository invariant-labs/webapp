import { Box } from '@material-ui/core'
import React from 'react'
// prototype
export const WrappedIdo = () => {
  return (<>
    <Box sx={{ color: 'white' }}>IDO</Box>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        marginRight: '3px',
        width: '30vw',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '50vh',
        background: '#222126'
      }}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </Box>
      <Box sx={{
        marginLeft: '3px',
        width: '15vw',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '50vh',
        background: '#222126'
      }}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
      </Box>
    </Box>
 </>)
}

export default WrappedIdo
