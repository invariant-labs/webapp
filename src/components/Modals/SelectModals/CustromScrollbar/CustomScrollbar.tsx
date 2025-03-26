import { Scrollbars } from 'rc-scrollbars'
import React, { forwardRef } from 'react'
import useStyles from './style'

export interface IProps {
  onScroll?: (e: React.UIEvent<HTMLElement>) => void
  style?: React.CSSProperties
  children: React.ReactNode
}

export const CustomScrollbar = forwardRef<React.LegacyRef<Scrollbars>, IProps>((props, ref) => {
  const { classes } = useStyles()

  return (
    <Scrollbars
      autoHide
      autoHideDuration={200}
      autoHideTimeout={200}
      classes={{
        thumbVertical: classes.scrollbarThumb,
        trackVertical: classes.scrollbarTrack,
        view: classes.scrollbarView
      }}
      className={classes.hideScroll}
      {...props}
      ref={ref as any}>
      {props.children}
    </Scrollbars>
  )
})

export default CustomScrollbar
