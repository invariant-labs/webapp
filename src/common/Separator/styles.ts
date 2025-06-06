import { makeStyles } from 'tss-react/mui'

type Props = {
  size: number | string
  isHorizontal: boolean
  color: string
  margin: string
  width?: number
}

export const useStyles = makeStyles<Props>()((
  _theme,
  { size, isHorizontal, color, margin, width = 1 }
) => {
  return {
    separator: {
      width: isHorizontal ? size : 'auto',
      height: isHorizontal ? 'auto' : size,
      margin: margin,
      border: 0,
      borderRight: isHorizontal ? 0 : `${width}px solid ${color}`,
      borderBottom: isHorizontal ? `${width}px solid ${color}` : 0
    }
  }
})
