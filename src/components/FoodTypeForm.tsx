import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'

export default function FoodTypeForm(
  { foodType, handleFoodTypeChange }:
  { foodType: string, handleFoodTypeChange: (event: ChangeEvent<HTMLInputElement>) => void }
) {
  return (
    <FormControl>
      <FormLabel id="food-type-label">Type of Food</FormLabel>
      <RadioGroup
        aria-labelledby="food-type-label"
        defaultValue="true"
        name="food-type-choice"
        value={foodType}
        onChange={handleFoodTypeChange}
      >
        <FormControlLabel value="can" control={<Radio />} label="Canned" />
        <FormControlLabel value="bag" control={<Radio />} label="Kibble" />
      </RadioGroup>
    </FormControl>
  )
}