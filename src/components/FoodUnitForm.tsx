import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function FoodUnitForm(
  { foodType, foodUnit, handleFoodUnitChange }:
  { foodType: string, foodUnit: string, handleFoodUnitChange: (event: SelectChangeEvent) => void }
) {
  return (
    <FormControl fullWidth>
      <InputLabel id="food-unit-label">Unit</InputLabel>
      <Select
        id="food-unit-select"
        label="Select"
        labelId="food-unit-label"
        value={foodUnit}
        onChange={handleFoodUnitChange}
      >
        <MenuItem value='gram'>gram</MenuItem>
        <MenuItem value='ounce'>ounce</MenuItem>
        { foodType !== 'can' ? <MenuItem value='pound'>pound</MenuItem> : null }
      </Select>
    </FormControl>
  )
}
