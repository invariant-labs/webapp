export const calculatePercentageRatio = (
  tokenXLiq: number,
  tokenYLiq: number,
  currentPrice: number,
  xToY: boolean
) => {
  const firstTokenPercentage =
    ((tokenXLiq * currentPrice) / (tokenYLiq + tokenXLiq * currentPrice)) * 100
  const tokenXPercentageFloat = xToY ? firstTokenPercentage : 100 - firstTokenPercentage
  const tokenXPercentage =
    tokenXPercentageFloat > 50
      ? Math.floor(tokenXPercentageFloat)
      : Math.ceil(tokenXPercentageFloat)

  return {
    tokenXPercentage,
    tokenYPercentage: 100 - tokenXPercentage
  }
}
