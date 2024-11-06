import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties
  }
}

// Update the TypographyProps interface if you plan to use the variant in the Typography component
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
  }
}
