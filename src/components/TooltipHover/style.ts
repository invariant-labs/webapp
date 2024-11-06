import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<{ top?: number }>()((_theme, { top }) => ({
  tooltip: {
    color: colors.invariant.textGrey,
    ...typography.caption4,
    lineHeight: '24px',
    background: colors.black.full,
    borderRadius: 12,
    width: 'max-content',
    textAlign: 'center',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: top ? top : -30
  }
}))

export default useStyles
