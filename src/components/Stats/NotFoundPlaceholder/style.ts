import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

interface StyleProps {
  isStats: boolean
}

const useStyles = makeStyles<StyleProps>()((theme, { isStats }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isStats ? 0 : theme.spacing(5),
    marginBottom: isStats ? 0 : theme.spacing(5),
    minHeight: isStats ? '690px' : '220px',
    ...(isStats && {
      background:
        'linear-gradient(360deg, rgba(32, 41, 70, 0.8) 0%, rgba(17, 25, 49, 0.8) 100%), linear-gradient(180deg, #010514 0%, rgba(1, 5, 20, 0) 100%)',
      borderBottom: `1px solid ${colors.invariant.light}`
    })
  },
  title: {
    ...typography.body2,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightHover
  },
  subtitle: {
    ...typography.body2,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightHover
  },
  img: {
    paddingBottom: 25
  }
}))

export default useStyles
