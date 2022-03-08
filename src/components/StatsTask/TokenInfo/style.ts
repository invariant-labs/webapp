import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  volumeHeader: {
    color: colors.white.main,
    ...typography.heading4,
    fontWeight: 700,
    margin: '0 0 24px 24px'
  },
  infoContainer: {
    width: 256,
    hight: 386
  }
}))

export default useStyles
