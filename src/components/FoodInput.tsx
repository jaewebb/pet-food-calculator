import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useMemo } from 'react'

import { InputAdornment, TextField } from '@mui/material'

interface InputProps {
  startAdornment: ReactElement<string, string>
  endAdornment: ReactElement<string, string>
}

function getAdornment(unit: string, unitPosition: 'left' | 'right') {
  const input = {} as InputProps
  if (unitPosition === 'left') input.startAdornment = <InputAdornment position="start">{unit}</InputAdornment>
  if (unitPosition === 'right') input.endAdornment = <InputAdornment position="start">{unit}</InputAdornment>
  return input
}

export default function FoodInput(
  { error, errorText, id, label, pattern, unit, unitPosition = 'left', value, setError, setValue, helperText, } :
  {
    error: string,
    errorText: string,
    id: string,
    label: string,
    pattern: string,
    unit: string,
    unitPosition: string,
    value: string,
    setError: Dispatch<SetStateAction<string>>,
    setValue: Dispatch<SetStateAction<string>>,
    helperText?: string,
  }
) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const input = useMemo(() => getAdornment(unit, unitPosition), [unit, unitPosition])

  return (
    <TextField
      error={error ? true : false}
      helperText={error ? error : helperText}
      id={id}
      inputMode='decimal'
      label={label}
      slotProps={{
        htmlInput: { pattern },
        input,
      }}
      value={value}
      variant="outlined"
      onChange={handleTextChange}
      onBlur={() => !Number(value) ? setError(errorText) : setError('')}
    />
  )
}
