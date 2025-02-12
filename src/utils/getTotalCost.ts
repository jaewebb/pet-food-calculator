export default function getTotalCost(size: number, price: number, amount = 1) {
  // size (oz) of a can of wet food * the amount of cans in a package
  // or default amount to 1 for grams in a bag of kibble
  const total = size * (amount)
  // the total cost is the price of the package of cans or bag of kibble
  // divided by the total oz or g in the package
  return total === 0 ? '0' : (price / total).toFixed(2)
}