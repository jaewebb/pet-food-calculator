import { ChangeEvent, useMemo, useState } from 'react'

import { CssBaseline, ThemeProvider } from "@mui/material"
import { Box, Button, Typography } from "@mui/material"

import theme from "./theme"

import FoodInput from "./components/FoodInput"
import FoodTypeForm from "./components/FoodTypeForm"

import getTotalCost from './utils/getTotalCost'

function App() {
  const [amount, setAmount] = useState('')
  const [cost, setCost] = useState('')
  const [foodType, setFoodType] = useState('can')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')

  const [amountError, setAmountError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [sizeError, setSizeError] = useState('')

  const unit = useMemo(() => foodType === 'can' ? 'ounce' : 'gram', [foodType])
  const unitPlural = useMemo(() => foodType === 'can' ? 'ounces' : 'grams', [foodType])

  const handleFoodTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount('')
    setAmountError('')
    setFoodType((event.target as HTMLInputElement).value)
  }

  function calculateCost(size: string, price: string, amount: string, foodType: string) {
    if (foodType === 'can') return getTotalCost(Number(size), Number(price), Number(amount))
    return getTotalCost(Number(size), Number(price))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 2 }}>
        <Typography variant="h1">Pet Food Calculator</Typography>
        <Typography variant="body1">Calculate the cost per {unit} of {foodType === 'can' ? 'canned wet food' : 'a bag of dry kibble'}</Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <FoodTypeForm foodType={foodType} handleFoodTypeChange={handleFoodTypeChange} />
      </Box>
      <Box sx={{ m: 2 }}>
        <FoodInput
          error={sizeError}
          errorText={`Please provide a size of ${foodType}`}
          helperText={`in ${unitPlural}`}
          id="size"
          label="Size"
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
              helperText={`in ${unitPlural}`}
              id="amount"
              label="Number of Cans"
              value={amount}
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
          <Typography variant="button">Calculate cost per {unit}</Typography>
        </Button>
      </Box>
      <Box sx={{ m: 2 }}>
        { cost ? <div>Cost is {cost} per {unit}</div> : <></>}
      </Box>
    </ThemeProvider>
  )
}

export default App
