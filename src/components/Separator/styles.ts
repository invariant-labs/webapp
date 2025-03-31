import { colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

type Props = {
  size: number | string
  isHorizontal: boolean
}

export const useStyles = makeStyles<Props>()((_theme, { size, isHorizontal }) => {
  return {
    separator: {
      width: isHorizontal ? size : 'auto',
      height: isHorizontal ? 'auto' : size,
      margin: 0,
      border: 0,
      borderRight: isHorizontal ? 0 : `1px solid ${colors.invariant.componentBcg}`,
      borderBottom: isHorizontal ? `1px solid ${colors.invariant.componentBcg}` : 0
    }
  }
})
