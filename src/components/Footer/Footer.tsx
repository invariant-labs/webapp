import React, { useEffect, useState } from 'react'
import { Fade, Grid, Tooltip } from '@material-ui/core'
import { social } from '@static/links'
import icons from '@static/icons'
import useStyles from './style'
import { TransitionProps } from '@material-ui/core/transitions'

export const FooterTransition: React.FC<
  TransitionProps & {
    children?: React.ReactElement<any, any> | undefined
  }
> = ({ children, ...props }) => {
  const [translate, setTranslate] = useState('translateY(50px)')

  useEffect(() => {
    setTranslate(props.in ? 'translateY(0)' : 'translateY(50px)')
  }, [props.in])

  return (
    <Fade
      {...props}
      timeout={{
        appear: 500,
        enter: 500,
        exit: 400
      }}>
      <div>
        <div
          style={{
            transition: 'transform 400ms',
            transform: translate
          }}>
          {children}
        </div>
      </div>
    </Fade>
  )
}

export const Footer = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Github'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.github} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.GithubIcon} alt={'github icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Telegram'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.telegram} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.TelegramIcon} alt={'telegram icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Twitter'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.twitter} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.TwitterIcon} alt={'twitter icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Discord'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.discord} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.DiscordIcon} alt={'discord icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Medium'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.medium} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.mediumIcon} alt={'medium icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title='Docs'
          placement='top'
          TransitionComponent={FooterTransition}>
          <a href={social.docs} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.docsIcon} alt={'medium icon'} />
          </a>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default Footer
