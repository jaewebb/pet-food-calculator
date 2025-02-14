export default function getPluralFoodUnit(foodUnit: string) {
  switch (foodUnit) {
    case 'gram':
      return 'grams'
    case 'ounce':
      return 'ounces'
    case 'pound':
      return 'pounds'
  
    default:
      break;
  }
}