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

interface ShadowSelectCompProps {
  shadow: number
  shadowColor: ColorOption
  setShadow: React.Dispatch<React.SetStateAction<number>>
  setShadowColor: React.Dispatch<React.SetStateAction<ColorOption>>
}

export const ShadowSelectComp = ({
  shadow,
  shadowColor,
  setShadow,
  setShadowColor,
}: ShadowSelectCompProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography sx={{ minWidth: 120 }}>그림자</Typography>
      <Slider
        value={shadow}
        onChange={(_, v) => setShadow(v as number)}
        min={0}
        max={10}
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          value={shadowColor.name}
          onChange={(e) =>
            setShadowColor(
              Color.colorOptions.find((c) => c.name === e.target.value)!,
            )
          }
          MenuProps={{
            PaperProps: { style: { maxHeight: 250 } },
          }}
        >
          {Color.colorOptions.map((color) => (
            <MenuItem key={`shadow-${color.name}`} value={color.name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '300px',
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
