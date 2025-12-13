import { social } from '@static/links'
import useStyles from './style'
import { Box, Grid, Typography } from '@mui/material'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { discordIcon, docsIcon, githubIcon, telegramIcon, xIcon } from '@static/icons'
import { ROUTES } from '@utils/utils'

export const Footer = () => {
  const { classes } = useStyles()

  const handleOpenTerms = () => {
    window.open(ROUTES.TERMS, '_blank', 'noopener,noreferrer')
  }
  return (
    <Grid className={classes.footer}>
      <Grid textAlign={'center'}>
        <Grid display='flex'>
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
            <TooltipHover title='Docs'>
              <a href={social.docs} className={classes.footerLink} target='_blank'>
                <img className={classes.icon} src={docsIcon} alt={'medium icon'} />
              </a>
            </TooltipHover>
          </Grid>
        </Grid>
        <Box mt={2}>
          <a onClick={handleOpenTerms} className={classes.link}>
            <Typography>Terms of Use</Typography>
          </a>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Footer
