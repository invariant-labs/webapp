import '@material-ui/core/styles'

declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    body3?: Typography['body1']
    label1?: Typography['body1']
    label2?: Typography['body1']
    label3?: Typography['body1']
  }

  interface TypographyOptions {
    body3?: Typography['body2']
    label1?: Typography['body1']
    label2?: Typography['body1']
    label3?: Typography['body1']
  }
}
