import { ChangeEvent, useMemo, useState } from 'react'

import { CssBaseline, Paper, SelectChangeEvent, ThemeProvider } from "@mui/material"
import { Box, Button, Container, Typography } from "@mui/material"

import theme from "./theme"

import FoodInput from "./components/FoodInput"
import FoodTypeForm from "./components/FoodTypeForm"
import FoodUnitForm from "./components/FoodUnitForm"

import getPluralFoodUnit from './utils/getPluralFoodUnit'
import getTotalCost from './utils/getTotalCost'

function App() {
  const [amount, setAmount] = useState('')
  const [cost, setCost] = useState('')
  const [foodType, setFoodType] = useState('can')
  const [foodUnit, setFoodUnit] = useState('ounce')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')

  const [amountError, setAmountError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [sizeError, setSizeError] = useState('')

  const foodUnitPlural = useMemo(() => getPluralFoodUnit(foodUnit), [foodUnit])

  const handleFoodTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount('')
    setAmountError('')
    setCost('')
    if ((event.target as HTMLInputElement).value === 'can' && foodUnit === 'pound') setFoodUnit('ounce')
    setSize('')
    setFoodType((event.target as HTMLInputElement).value)
  }

  const handleFoodUnitChange = (event: SelectChangeEvent) => {
    setFoodUnit((event.target as HTMLInputElement).value)
  }

  function calculateCost(size: string, price: string, amount: string, foodType: string) {
    return getTotalCost(Number(size), Number(price), foodType === 'can' ? Number(amount) : 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h1">Pet Food Calculator</Typography>
            <Typography variant="body1">Calculate the cost per {foodUnit} of {foodType === 'can' ? 'canned wet food' : 'a bag of dry kibble'}</Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <FoodTypeForm foodType={foodType} handleFoodTypeChange={handleFoodTypeChange} />
          </Box>
          <Box sx={{ m: 2 }}>
            <FoodUnitForm foodType={foodType} foodUnit={foodUnit} handleFoodUnitChange={handleFoodUnitChange} />
          </Box>
          <Box sx={{ m: 2 }}>
            <FoodInput
              error={sizeError}
              errorText={`Please provide a size of ${foodType}`}
              id="size"
              label="Size"
              pattern="^[0-9]+[.,]{1}[0-9]+$"
              unit={Number(size) > 1 ? foodUnitPlural ?? foodUnit : foodUnit}
              unitPosition='right'
              value={size}
              setError={setSizeError}
              setValue={setSize}
            />
          </Box>
          {
            foodType === 'can' ? (
              <Box sx={{ m: 2 }}>
                <FoodInput
                  error={amountError}
                  errorText='Please provide the number of cans in the package'
                  id="amount"
                  label="Number of Cans"
                  pattern="^[0-9]+$"
                  value={amount}
                  unit={Number(amount) > 1 ? 'cans' : 'can'}
                  unitPosition='right'
                  setError={setAmountError}
                  setValue={setAmount}
                />
              </Box>
            ) : <></>
          }
          <Box sx={{ m: 2 }}>
            <FoodInput
              error={priceError}
              errorText='Please provide a price for the product'
              id="price"
              label="Price"
              pattern="^[0-9]+[.,]{1}[0-9]+$"
              unit="$"
              unitPosition="left"
              value={price}
              setError={setPriceError}
              setValue={setPrice}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <Button
              disabled={(!size || (!amount && foodType === 'can') || !price || sizeError || amountError || priceError) ? true : false}
              variant="outlined"
              onClick={() => setCost(calculateCost(size, price, amount, foodType))}
            >
              <Typography variant="button">Calculate cost per {foodUnit}</Typography>
            </Button>
          </Box>
          <Box sx={{ m: 2 }}>
            { cost ? <div>Cost is {cost} per {foodUnit}</div> : <></>}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App
