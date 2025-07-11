import { Color } from '@/shared/constants'
import { ColorOption } from '@/shared/constants/colors'
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'

interface BackgroundColorSeleterProps {
  selectedColor: ColorOption
  setSelectedColor: React.Dispatch<React.SetStateAction<ColorOption>>
}

/**
 * 색상 선택 Select UI
 */
export const BackgroundColorSelecter = ({
  selectedColor,
  setSelectedColor,
}: BackgroundColorSeleterProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography sx={{ minWidth: 120 }}>배경 색상</Typography>
      <FormControl fullWidth size="small">
        <Select
          value={selectedColor.name}
          onChange={(e) =>
            setSelectedColor(
              Color.colorOptions.find((c) => c.name === e.target.value)!,
            )
          }
          MenuProps={{
            PaperProps: { style: { maxHeight: 250 } },
          }}
        >
          {Color.colorOptions.map((color) => (
            <MenuItem key={color.name} value={color.name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
