import React from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { social } from '@static/links'
import icons from '@static/icons'
import { Transition } from 'react-transition-group'
import useStyles from './style'
import { TransitionProps } from '@material-ui/core/transitions'

export const FooterTransition: React.FC<TransitionProps & {
  children?: React.ReactElement<any, any> | undefined;
}> = ({ in: inProp, children, ...props }) => {
  const duration = 300
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 }
  }

  return (
    <Transition in={inProp} {...props}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>{children}</div>
      )}
    </Transition>
  )
}

export const Footer = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem}>
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Github' placement='top' TransitionComponent={FooterTransition}>
          <a href={social.github} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.GithubIcon} alt={'github icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Telegram' placement='top'>
          <a href={social.telegram} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.TelegramIcon} alt={'telegram icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Twitter' placement='top'>
          <a href={social.twitter} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.TwitterIcon} alt={'twitter icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Discord' placement='top'>
          <a href={social.discord} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.DiscordIcon} alt={'discord icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Medium' placement='top'>
          <a href={social.medium} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.mediumIcon} alt={'medium icon'} />
          </a>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default Footer
