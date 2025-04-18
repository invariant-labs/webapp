import { social } from '@static/links'
import useStyles from './style'
import { Grid } from '@mui/material'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { discordIcon, docsIcon, githubIcon, mediumIcon, telegramIcon, xIcon } from '@static/icons'

export const Footer = () => {
  const { classes } = useStyles()
  return (
    <Grid className={classes.footer}>
      <Grid className={classes.footerItem}>
        <TooltipHover title='Github'>
          <a href={social.github} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={githubIcon} alt={'github icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover title='Telegram'>
          <a href={social.telegram} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={telegramIcon} alt={'telegram icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover title='X'>
          <a href={social.x} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={xIcon} alt={'x icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover title='Discord'>
          <a href={social.discord} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={discordIcon} alt={'discord icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover title='Medium'>
          <a href={social.medium} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={mediumIcon} alt={'medium icon'} />
          </a>
        </TooltipHover>
      </Grid>
      <Grid className={classes.footerItem}>
        <TooltipHover title='Docs'>
          <a href={social.docs} className={classes.footerLink} target='_blank'>
            <img className={classes.icon} src={docsIcon} alt={'medium icon'} />
          </a>
        </TooltipHover>
      </Grid>
    </Grid>
  )
}

export default Footer
