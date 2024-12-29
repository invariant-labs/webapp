export const trimZeros = (amount: string) => {
  try {
    return parseFloat(amount).toString()
  } catch (error) {
    return amount
  }
}
