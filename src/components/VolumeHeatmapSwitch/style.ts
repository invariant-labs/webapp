import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  heatmapLabel: {
    color: '#A9B6BF',
    ...typography.caption2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'default'
  },
  heatmapLabelIcon: {
    marginLeft: 5,
    height: 14,
    width: 14,
    border: '1px solid #A9B6BF',
    color: '#A9B6BF',
    borderRadius: '50%',
    fontSize: 12,
    lineHeight: '10px',
    fontWeight: 500,
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: 2,
    cursor: 'default'
  },
  switch: {
    width: 24,
    height: 12,
    padding: 0,
    marginLeft: 8,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 0,
      transitionDuration: '200ms',
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#2EE09A',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[600]
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 12,
      height: 12
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#111931',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 300
      })
    }
  }
}))

export default useStyles
