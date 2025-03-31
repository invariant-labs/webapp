import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    claimFaucetButton: {
      display: 'flex',

      gap: 8
    },
    buttonIcon: {
      width: 18,
      height: 18
    }
  }
})
