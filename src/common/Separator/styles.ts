import { makeStyles } from 'tss-react/mui'

type Props = {
  size: number | string
  isHorizontal: boolean
  color: string
  margin: string
}

export const useStyles = makeStyles<Props>()((_theme, { size, isHorizontal, color, margin }) => {
  return {
    separator: {
      width: isHorizontal ? size : 'auto',
      height: isHorizontal ? 'auto' : size,
      margin: margin,
      border: 0,
      borderRight: isHorizontal ? 0 : `1px solid ${color}`,
      borderBottom: isHorizontal ? `1px solid ${color}` : 0
    }
  }
})
