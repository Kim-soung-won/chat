import { Color } from '@/shared/constants'
import { ColorOption } from '@/shared/constants/colors'
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

interface BorderSelectCompProps {
  borderWidth: number
  borderColor: ColorOption
  setBorderWidth: React.Dispatch<React.SetStateAction<number>>
  setBorderColor: React.Dispatch<React.SetStateAction<ColorOption>>
}

export const BorderSelectComp = ({
  borderWidth,
  borderColor,
  setBorderWidth,
  setBorderColor,
}: BorderSelectCompProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography sx={{ minWidth: 120 }}>테두리</Typography>
      <Slider
        value={borderWidth}
        onChange={(_, v) => setBorderWidth(v as number)}
        min={0}
        max={10}
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          value={borderColor.name}
          onChange={(e) =>
            setBorderColor(
              Color.colorOptions.find((c) => c.name === e.target.value)!,
            )
          }
          MenuProps={{
            PaperProps: { style: { maxHeight: 250 } },
          }}
        >
          {Color.colorOptions.map((color) => (
            <MenuItem key={`border-${color.name}`} value={color.name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 300,
                  gap: 1.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: color.rgb,
                    borderRadius: '50%',
                    border: '1px solid rgba(0,0,0,0.2)',
                  }}
                />
                {color.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
