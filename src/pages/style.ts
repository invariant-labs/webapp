import { theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'max(2400px, 100%)',
    height: '100%',
    zIndex: -1,
    background: `
    radial-gradient(circle at 900px 800px, rgba(49, 63, 107, 0.3) 0, transparent 400px),
  radial-gradient(circle at 1800px 400px, rgba(49, 63, 107, 0.3) 0, transparent 700px),
  radial-gradient(circle at -300px 3600px, rgba(49, 63, 107, 0.2) 0, transparent 1000px),
  radial-gradient(circle at 1700px 2900px, rgba(49, 63, 107, 0.3) 0, transparent 800px),
  radial-gradient(circle at 2200px 4300px, rgba(49, 63, 107, 0.3) 0, transparent 1400px),
  radial-gradient(circle at 400px 800px, rgba(49, 63, 107, 0.2) 0, transparent 550px),
  radial-gradient(circle at 1300px 300px, rgba(49, 63, 107, 0.15) 0, transparent 600px),
  radial-gradient(circle at 2000px 1200px, rgba(49, 63, 107, 0.25) 0, transparent 700px),
  radial-gradient(circle at 500px 1700px, rgba(49, 63, 107, 0.3) 0, transparent 1000px),
  radial-gradient(circle at 2100px 2100px, rgba(49, 63, 107, 0.35) 0, transparent 600px),
  radial-gradient(circle at 2700px 500px, rgba(49, 63, 107, 0.2) 0, transparent 800px),
  radial-gradient(circle at 2400px 1500px, rgba(49, 63, 107, 0.3) 0, transparent 1000px),
  radial-gradient(circle at 2800px 2300px, rgba(49, 63, 107, 0.25) 0, transparent 1100px),
  radial-gradient(circle at 500px 3100px, rgba(49, 63, 107, 0.3) 0, transparent 750px),
  radial-gradient(circle at 2300px 4900px, rgba(49, 63, 107, 0.2) 0, transparent 1300px),
  radial-gradient(circle at 1000px 1000px, rgba(0, 0, 0, 0.1) 0, transparent 500px),
  radial-gradient(circle at 1600px 3600px, rgba(0, 0, 0, 0.15) 0, transparent 700px),
  radial-gradient(circle at 2100px 800px, rgba(0, 0, 0, 0.15) 0, transparent 750px),
  radial-gradient(circle at 300px 1300px, rgba(0, 0, 0, 0.2) 0, transparent 550px),
  radial-gradient(circle at 2200px 2200px, rgba(0, 0, 0, 0.1) 0, transparent 850px),
  radial-gradient(circle at 1900px 1200px, rgba(0, 0, 0, 0.1) 0, transparent 600px),
  radial-gradient(circle at 800px 3000px, rgba(0, 0, 0, 0.2) 0, transparent 500px),
  radial-gradient(circle at 1700px 1000px, rgba(0, 0, 0, 0.1) 0, transparent 700px),
  radial-gradient(circle at 1200px 2000px, rgba(0, 0, 0, 0.1) 0, transparent 650px),
  radial-gradient(circle at 2700px 3800px, rgba(0, 0, 0, 0.1) 0, transparent 900px),
  radial-gradient(circle at 1800px 500px, rgba(0, 0, 0, 0.1) 0, transparent 750px),
  radial-gradient(circle at 1100px 4200px, rgba(0, 0, 0, 0.1) 0, transparent 800px)
  `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    pointerEvents: 'none'
  },
  body: {
    flex: 1,
    marginTop: '65px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
      overflowX: 'hidden'
    }
  }
}))

export default useStyles
