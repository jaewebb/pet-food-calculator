import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { TextField } from '@mui/material'

export default function FoodInput(
  { error, errorText, id, label, value, setError, setValue, helperText, } :
  {
    error: string,
    errorText: string,
    id: string,
    label: string,
    value: string,
    setError: Dispatch<SetStateAction<string>>,
    setValue: Dispatch<SetStateAction<string>>,
    helperText?: string,
  }
) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <TextField
      error={error ? true : false}
      helperText={error ? error : helperText}
      id={id}
      inputMode='decimal'
      label={label}
      value={value}
      variant="outlined"
      onChange={handleTextChange}
      onBlur={() => !Number(value) ? setError(errorText) : setError('')}
    />
  )
}
