import '@material-ui/core/styles'

declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    body3?: Typography['body1']
    label1?: Typography['body1']
    label2?: Typography['body1']
    label3?: Typography['body1']
    newTypography?: {
      fontFamily?: string,
      fontWeight?: number,
      h1?: Typography['h1']
      h2?: Typography['h2']
      h3?: Typography['h3']
      h4?: Typography['h4']
      body1?: Typography['body1']
      body2?: Typography['body1']
      body3?: Typography['body1']
      subTitle1?: Typography['subtitle1']
      subTitle2?: Typography['subtitle1']
      caption?: Typography['caption']
      label1?: Typography['body1']
      label2?: Typography['body1']
      label3?: Typography['body1']
    }
  }

  interface TypographyOptions {
    body3?: Typography['body2']
    label1?: Typography['body1']
    label2?: Typography['body1']
    label3?: Typography['body1']
    newTypography?: {
      fontFamily?: string,
      fontWeightRegular?: number,
      h1?: Typography['h1']
      h2?: Typography['h2']
      h3?: Typography['h3']
      h4?: Typography['h4']
      body1?: Typography['body1']
      body2?: Typography['body1']
      body3?: Typography['body1']
      subtitle1?: Typography['subtitle1']
      subtitle2?: Typography['subtitle1']
      caption?: Typography['caption']
      label1?: Typography['body1']
      label2?: Typography['body1']
      label3?: Typography['body1']
    }
  }
}
