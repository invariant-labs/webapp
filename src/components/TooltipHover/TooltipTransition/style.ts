import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<{ translate: string }>()((_theme, { translate }) => ({
  wrapper: {
    transition: 'transform 300ms',
    transform: translate,
    pointerEvents: 'none'
  }
}))

export default useStyles
