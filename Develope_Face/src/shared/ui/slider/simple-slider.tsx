import { Slider, Stack, Typography } from '@mui/material'

interface SimpleSliderProps {
  title?: string
  fontSize: number
  setFontSize: React.Dispatch<React.SetStateAction<number>>
  min?: number
  max?: number
  step?: number
}

export const SimpleSlider = ({
  title,
  fontSize,
  setFontSize,
  min = 1,
  max = 100,
  step = 1,
}: SimpleSliderProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {title && <Typography sx={{ minWidth: 120 }}>{title}</Typography>}
      <Slider
        value={fontSize}
        onChange={(_, v) => setFontSize(v as number)}
        min={min}
        max={max}
        step={step}
      />
    </Stack>
  )
}
