import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    },
    title: {
      ...typography.heading4
    },
    description: {
      ...typography.caption2,
      color: colors.invariant.textGrey
    },
    feeContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    },
    fee: {
      height: 64,
      paddingInline: 12,
      background: colors.invariant.componentBcg,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      cursor: 'pointer',

      '&:hover': {
        background: colors.invariant.light
      }
    },
    feeSelected: {
      background: colors.invariant.light
    },
    feeHeader: {
      display: 'flex',
      gap: 6
    },
    feeTitle: {
      ...typography.body1,
      color: colors.invariant.textGrey
    },
    feeTitleSelected: {
      color: colors.white.main
    },
    feeAmount: {
      ...typography.body2,
      color: colors.invariant.pink
    },
    feeDescription: {
      ...typography.caption4,
      color: colors.invariant.textGrey
    },
    feeDescriptionSelected: {
      color: colors.white.main
    },
    input: {
      height: 44,
      background: colors.invariant.newDark,
      borderRadius: 16,
      paddingInline: 8,
      ...typography.body2,
      border: `1px solid ${colors.invariant.newDark}`
    },
    inputSelected: {
      background: `${colors.invariant.pink}20`,
      border: `1px solid ${colors.invariant.pink}`
    },
    customFeeContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    customFeeText: {
      ...typography.body2,
      color: colors.invariant.textGrey,
      fontWeight: 400
    },
    button: {
      height: 36,
      width: '100%',
      background: colors.invariant.greenLinearGradient,
      borderRadius: 10,
      color: colors.invariant.dark,
      ...typography.body2,
      fontWeight: 700,
      textTransform: 'none',
      display: 'flex',
      gap: 8,

      '&:hover': {
        boxShadow: `0 0 15px ${colors.invariant.light}`
      }
    }
  }
})
