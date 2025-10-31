import { alpha } from '@mui/material'
import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.invariant.light}`,
    padding: '10px 8px',
    borderRadius: 12,
    minWidth: 88,
    flex: 1,
    color: colors.invariant.text
  },
  green: {
    color: colors.invariant.green,
    background: alpha(colors.invariant.green, 0.2),
    border: `1px solid ${colors.invariant.green}`
  }
}))

export default useStyles
