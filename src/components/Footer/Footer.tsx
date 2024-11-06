import { social } from '@static/links'
import icons from '@static/icons'
import useStyles from './style'
import { Grid } from '@mui/material'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'

export const Footer = () => {
  const { classes } = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem}>
        <TooltipHover text='Github'>
          <a href={social.github} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.GithubIcon} alt={'github icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover text='Telegram'>
          <a href={social.telegram} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.TelegramIcon} alt={'telegram icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover text='X'>
          <a href={social.x} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.XIcon} alt={'x icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover text='Discord'>
          <a href={social.discord} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.DiscordIcon} alt={'discord icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover text='Medium'>
          <a href={social.medium} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.mediumIcon} alt={'medium icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover text='Docs'>
          <a href={social.docs} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={icons.docsIcon} alt={'medium icon'} />
          </a>
        </TooltipHover>
      </Grid>
    </Grid>
  )
}

export default Footer
