import React from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { social } from '@static/links'
import icons from '@static/icons'
import useStyles from './style'

export const Footer = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem} >
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Github' placement='top'>
          <a href={social.github} className={classes.footerLink} target='_blank'>
            <img src={icons.GithubIcon} alt={'github icon'}/>
          </a>
        </Tooltip>
      </Grid>
      {/* <Grid className={classes.footerItem} >
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Telegram' placement='top'>
          <a href={social.telegram} className={classes.footerLink} target='_blank'>
            <img src={icons.TelegramIcon} alt={'telegram icon'} />
          </a>
        </Tooltip>
      </Grid> */}
      <Grid className={classes.footerItem} >
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Twitter' placement='top'>
          <a href={social.twitter} className={classes.footerLink} target='_blank'>
            <img src={icons.TwitterIcon} alt={'twitter icon'} />
          </a>
        </Tooltip>
      </Grid>
      <Grid className={classes.footerItem} >
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Discord' placement='top'>
          <a href={social.discord} className={classes.footerLink} target='_blank'>
            <img src={icons.DiscordIcon} alt={'discord icon'} />
          </a>
        </Tooltip>
      </Grid>
      {/* <Grid className={classes.footerItem} >
        <Tooltip classes={{ tooltip: classes.tooltip }} title='Medium' placement='top'>
          <a href={social.medium} className={classes.footerLink} target='_blank'>
            <img src={icons.mediumIcon} alt={'medium icon'} />
          </a>
        </Tooltip>
      </Grid> */}
    </Grid>
  )
}

export default Footer
