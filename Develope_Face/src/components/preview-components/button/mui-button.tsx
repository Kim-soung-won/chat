'use client'

import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  useTheme,
} from '@mui/material'
import { highlight, languages } from 'prismjs'
import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-jsx'
import { Font } from '@/shared/constants'

// --- 1. 커스텀 색상('Mint Green')을 옵션에 추가 ---
const colorOptions = [
  { name: 'primary', label: 'Primary (MUI)', rgb: 'rgb(25, 118, 210)' },
  { name: 'secondary', label: 'Secondary (MUI)', rgb: 'rgb(156, 39, 176)' },
  { name: 'error', label: 'Error (MUI)', rgb: 'rgb(211, 47, 47)' },
  { name: 'warning', label: 'Warning (MUI)', rgb: 'rgb(255, 152, 0)' },
  { name: 'info', label: 'Info (MUI)', rgb: 'rgb(2, 136, 209)' },
  { name: 'success', label: 'Success (MUI)', rgb: 'rgb(46, 125, 50)' },
  { name: 'custom-red-velvet', label: 'Red Velvet', rgb: 'rgb(183, 28, 28)' },
  { name: 'custom-deep-orange', label: 'Deep Orange', rgb: 'rgb(255, 87, 34)' },
  { name: 'custom-amber', label: 'Amber', rgb: 'rgb(255, 193, 7)' },
  { name: 'custom-lime', label: 'Lime', rgb: 'rgb(205, 220, 57)' },
  {
    name: 'custom-light-green',
    label: 'Light Green',
    rgb: 'rgb(139, 195, 74)',
  },
  { name: 'custom-teal', label: 'Teal', rgb: 'rgb(0, 150, 136)' },
  { name: 'custom-cyan', label: 'Cyan', rgb: 'rgb(0, 188, 212)' },
  { name: 'custom-light-blue', label: 'Light Blue', rgb: 'rgb(3, 169, 244)' },
  { name: 'custom-indigo', label: 'Indigo', rgb: 'rgb(63, 81, 181)' },
  {
    name: 'custom-deep-purple',
    label: 'Deep Purple',
    rgb: 'rgb(103, 58, 183)',
  },
  { name: 'custom-pink', label: 'Pink', rgb: 'rgb(233, 30, 99)' },
  { name: 'custom-brown', label: 'Brown', rgb: 'rgb(121, 85, 72)' },
  { name: 'custom-blue-grey', label: 'Blue Grey', rgb: 'rgb(96, 125, 139)' },
  { name: 'custom-black', label: 'Black', rgb: 'rgb(0, 0, 0)' },
  { name: 'custom-mint-green', label: 'Mint Green', rgb: 'rgb(102, 204, 170)' },
  { name: 'custom-lavender', label: 'Lavender', rgb: 'rgb(204, 153, 255)' },
  { name: 'custom-salmon', label: 'Salmon', rgb: 'rgb(250, 128, 114)' },
  { name: 'custom-gold', label: 'Gold', rgb: 'rgb(255, 215, 0)' },
  { name: 'custom-sky-blue', label: 'Sky Blue', rgb: 'rgb(135, 206, 235)' },
  { name: 'custom-olive', label: 'Olive', rgb: 'rgb(128, 128, 0)' },
  { name: 'custom-maroon', label: 'Maroon', rgb: 'rgb(128, 0, 0)' },
  { name: 'custom-navy', label: 'Navy', rgb: 'rgb(0, 0, 128)' },
  { name: 'custom-silver', label: 'Silver', rgb: 'rgb(192, 192, 192)' },
]

type ColorOption = (typeof colorOptions)[0]

const darkenRgb = (rgbString: string, amount = 20) => {
  const rgbValues = rgbString.match(/\d+/g)?.map(Number)
  if (!rgbValues) return rgbString
  const [r, g, b] = rgbValues.map((val) => Math.max(0, val - amount))
  return `rgb(${r}, ${g}, ${b})`
}

const lightenRgb = (rgbString: string, amount = 20) => {
  const rgbValues = rgbString.match(/\d+/g)?.map(Number)
  if (!rgbValues) return rgbString
  const [r, g, b] = rgbValues.map((val) => Math.min(255, val + amount))
  return `rgb(${r}, ${g}, ${b})`
}

const editorStyle: React.CSSProperties = {
  fontFamily: Font.JetbrainsMono.style.fontFamily,
  fontSize: 16,
  backgroundColor: '#272822',
  borderRadius: '8px',
  minHeight: '400px', // 에디터 높이 조정
  overflow: 'auto',
  outline: 'none',
}

export function MuiButtonExamplePage() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0],
  )
  const isDark: boolean = useTheme().palette.mode === 'dark'

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    const newColor = colorOptions.find((c) => c.name === event.target.value)
    if (newColor) {
      setSelectedColor(newColor)
    }
  }

  const buttonExampleCode = `
import Button from '@mui/material/Button';

// 커스텀 색상을 적용할 때는 'sx' prop을 사용합니다.
// 선택된 색상: ${selectedColor.label} (${selectedColor.rgb})
const App = () => (
  <Button
    variant="contained"
    sx={{ 
      color: "white", // 텍스트 색상은 흰색으로 설정
      backgroundColor: '${selectedColor.rgb}',
      // hover 시에 더 어두운 색상으로 변경
      '&:hover': {
        backgroundColor: '${isDark ? lightenRgb(selectedColor.rgb) : darkenRgb(selectedColor.rgb)}',
      }
    }}
  >
    Button
  </Button>
);
`

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, flexGrow: 1 }}>
      <style>{isDark ? Font.PrismDarkheme : Font.PrismLightTheme}</style>
      <Typography variant="h4" component="h1" gutterBottom>
        MUI Button (Custom Colors)
      </Typography>
      <Typography paragraph color="text.secondary" sx={{ mb: 4 }}>
        MUI의 기본 테마 색상 외에 커스텀 색상을 적용하려면 `sx` prop을
        사용하세요. 아래 메뉴에서 색상을 선택하여 실시간으로 확인해보세요.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={12}>
          <Card>
            <CardContent>
              {/* --- 1. 미리보기 라벨과 Select 메뉴를 한 줄에 배치 --- */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  미리보기
                </Typography>
                <FormControl sx={{ minWidth: 180 }} size="small">
                  <InputLabel id="color-select-label">색상 선택</InputLabel>
                  <Select
                    labelId="color-select-label"
                    value={selectedColor.name}
                    label="색상 선택"
                    onChange={handleColorChange}
                    // --- 2. MenuProps를 사용해 드롭다운 메뉴 스타일 수정 ---
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 250, // 메뉴 최대 높이 제한
                        },
                      },
                    }}
                  >
                    {colorOptions.map((color) => (
                      <MenuItem
                        key={`${color.name}-${color.label}`}
                        value={color.name}
                      >
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
              </Box>

              <Box
                sx={{
                  p: 2,
                  border: '1px dashed grey',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: selectedColor.rgb,
                    '&:hover': {
                      backgroundColor: isDark
                        ? lightenRgb(selectedColor.rgb)
                        : darkenRgb(selectedColor.rgb),
                    },
                  }}
                >
                  Button
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                코드
              </Typography>
              <Editor
                value={buttonExampleCode.trim()}
                onValueChange={() => {}}
                highlight={(code) => highlight(code, languages.jsx, 'jsx')}
                padding={16}
                style={{
                  ...editorStyle,
                  backgroundColor: isDark ? '#272822' : '#f5f5f5',
                }}
                readOnly
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
