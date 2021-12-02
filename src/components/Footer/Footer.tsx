import React from 'react'
import { Grid } from '@material-ui/core'
import { social } from '@static/links'
import icons from '@static/icons'
import useStyles from './style'

export const Footer = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem} >
        <a href={social.github} className={classes.footerLink} target='_blank'>
          <img src={icons.GithubIcon} alt={'github icon'}/>
        </a>
      </Grid>
      <Grid className={classes.footerItem} >
        <a href={social.telegram} className={classes.footerLink} target='_blank'>
          <img src={icons.TelegramIcon} alt={'telegram icon'} />
        </a>
      </Grid>
      <Grid className={classes.footerItem} >
        <a href={social.twitter} className={classes.footerLink} target='_blank'>
          <img src={icons.TwitterIcon} alt={'twitter icon'} />
        </a>
      </Grid>
      <Grid className={classes.footerItem} >
        <a href={social.discord} className={classes.footerLink} target='_blank'>
          <img src={icons.DiscordIcon} alt={'discord icon'} />
        </a>
      </Grid>
    </Grid>
  )
}

export default Footer
