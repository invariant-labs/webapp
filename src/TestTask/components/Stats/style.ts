import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 24,
    backgroundColor: colors.invariant.component,
    minWidth: 256,
    position: 'relative',
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: '100%',

    ['@media(max-width: 308px)']: {
      minWidth: 228
    }
  },
  plot: {
    width: '100%',
    height: 190
  },
  statsTitle: {
    fontFamily: 'Mukta',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '20px',
    color: '#fff',
    margin: '0 0 0 16px'
  },
  infoTitle: {
    margin: '16px 0 0px 24px'
  }
}))

export default useStyles
