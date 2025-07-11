'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Stack,
  Slider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import { Font } from '@/shared/constants' // Font 상수 파일 경로

import { Color } from '@/shared/constants'
import { ColorOption } from '@/shared/constants/colors'
import { RGB } from '@/shared/utils'
import { PreviewCodeInCompPage } from '@/shared/ui/preview'
import { SimpleSlider } from '@/shared/ui/slider'

const animationOptions = [
  {
    name: 'fade-in',
    label: 'Fade In',
    initial: { opacity: 0 },
    final: { opacity: 1 },
    transition: 'opacity 0.3s ease-out',
  },
  {
    name: 'slide-down',
    label: 'Slide Down',
    initial: { opacity: 0, transform: 'translateY(-50px)' },
    final: { opacity: 1, transform: 'translateY(0)' },
    transition:
      'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s',
  },
  {
    name: 'zoom-in',
    label: 'Zoom In',
    initial: { opacity: 0, transform: 'scale(0.8)' },
    final: { opacity: 1, transform: 'scale(1)' },
    transition: 'transform 0.3s ease-out, opacity 0.3s',
  },
]

const styleObjectToString = (style: React.CSSProperties): string => {
  return Object.entries(style)
    .map(([key, value]) => {
      const finalValue = typeof value === 'number' ? `${value}px` : value
      return `    ${key}: '${finalValue}'`
    })
    .join(',\n')
}

export default function ModalCreatorPage() {
  const isDark = useTheme().palette.mode === 'dark'

  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingIn, setIsAnimatingIn] = useState(false)

  // Modal Style States
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(400)
  const [padding, setPadding] = useState(24)
  const [borderRadius, setBorderRadius] = useState(16)
  const [backgroundColor, setBackgroundColor] = useState<ColorOption>(
    Color.colorOptions.find((c) => c.name === 'custom-white')!,
  )
  const [backdropColor, setBackdropColor] = useState('rgba(0, 0, 0, 0.5)')
  const [animation, setAnimation] = useState('slide-down')

  // --- 1. 폼과 푸터 옵션을 위한 새로운 state 추가 ---
  const [includeForm, setIncludeForm] = useState(true)
  const [rowCount, setRowCount] = useState(2)
  const [inputsPerRow, setInputsPerRow] = useState(1)
  const [includeFooter, setIncludeFooter] = useState(true)

  const editorStyle: React.CSSProperties = {
    fontFamily: Font.JetbrainsMono.style.fontFamily,
    fontSize: 14,
    backgroundColor: isDark ? '#272822' : '#f5f5f5',
    borderRadius: '8px',
    minHeight: '400px',
    overflow: 'auto',
    outline: 'none',
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimatingIn(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimatingIn(false)
    }
  }, [isOpen])

  const selectedAnimation = useMemo(
    () => animationOptions.find((opt) => opt.name === animation)!,
    [animation],
  )

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: backdropColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: isAnimatingIn ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  }

  const contentStyle: React.CSSProperties = {
    backgroundColor: backgroundColor.rgb,
    width: `${width}px`,
    minHeight: `${height}px`,
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    transition: selectedAnimation.transition,
    ...(isAnimatingIn ? selectedAnimation.final : selectedAnimation.initial),
  }

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsAnimatingIn(false)
    setTimeout(() => setIsOpen(false), 400)
  }

  // --- 2. 폼과 푸터의 JSX 마크업을 생성하는 로직 ---
  const formMarkup = useMemo(() => {
    if (!includeForm) return `<p>이곳에 모달의 주요 내용이 들어갑니다.</p>`

    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const inputs = Array.from(
        { length: inputsPerRow },
        (_, inputIndex) =>
          `<div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>필드 ${rowIndex * inputsPerRow + inputIndex + 1}</label>
                <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>`,
      ).join('\n')

      return `<div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>\n${inputs}\n</div>`
    }).join('\n')

    const footer = includeFooter
      ? `
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>취소</button>
              <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#1976d2', color: 'white', cursor: 'pointer' }}>제출</button>
            </div>
    `
      : ''

    return `<form onSubmit={(e) => e.preventDefault()}>\n${rows}${footer}\n</form>`
  }, [includeForm, rowCount, inputsPerRow, includeFooter])

  const exampleCode = useMemo(
    () => `
import React, { useState, useEffect } from 'react';

// 사용 예시
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // ... (useEffect, handleOpen, handleClose 함수들) ...
  
  const backdropStyle: React.CSSProperties = { /* ... */ };
  const contentStyle: React.CSSProperties = { /* ... */ };
  const modalHeaderStyle: React.CSSProperties = { /* ... */ };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      {isOpen && (
        <div style={backdropStyle} onClick={() => setIsOpen(false)}>
          <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              {/* ... header ... */}
            </div>
            <div style={{ flexGrow: 1 }}>
              ${formMarkup}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
  `,
    [formMarkup /* ... 다른 의존성들 ... */],
  )

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, flexGrow: 1 }}>
      {isOpen && (
        <div style={backdropStyle} onClick={handleClose}>
          <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                paddingBottom: '16px',
                marginBottom: '16px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Modal Title
              </h2>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div style={{ flexGrow: 1 }}>
              {includeForm ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <Box sx={{ flexGrow: 1 }}>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                      <Grid container spacing={2} key={rowIndex} sx={{ mb: 1 }}>
                        {Array.from({ length: inputsPerRow }).map(
                          (_, inputIndex) => (
                            <Grid size={12 / inputsPerRow} key={inputIndex}>
                              <TextField
                                fullWidth
                                label={`필드 ${rowIndex * inputsPerRow + inputIndex + 1}`}
                                size="small"
                              />
                            </Grid>
                          ),
                        )}
                      </Grid>
                    ))}
                  </Box>
                  {includeFooter && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                        mt: 3,
                        pt: 2,
                        borderTop: '1px solid #eee',
                      }}
                    >
                      <Button variant="outlined" onClick={handleClose}>
                        취소
                      </Button>
                      <Button variant="contained" type="submit">
                        제출
                      </Button>
                    </Box>
                  )}
                </form>
              ) : (
                <p>이곳에 모달의 주요 내용이 들어갑니다.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Typography variant="h4" component="h1" gutterBottom>
        CSS 모달 생성기 (CSS-in-JS)
      </Typography>
      <Typography paragraph color="text.secondary" sx={{ mb: 4 }}>
        React.CSSProperties 객체를 활용하여 동적으로 스타일을 제어하는
        예제입니다.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={12}>
          {' '}
          <Stack spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  미리보기
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    border: '1px dashed grey',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button variant="contained" onClick={handleOpen}>
                    모달 열기
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                  스타일 옵션
                </Typography>
                <Stack spacing={3}>
                  <SimpleSlider
                    title="너비 (Width)"
                    fontSize={width}
                    setFontSize={setWidth}
                    min={300}
                    max={1000}
                    step={10}
                  />
                  <SimpleSlider
                    title="최소 높이 (Min Height)"
                    fontSize={height}
                    setFontSize={setHeight}
                    min={200}
                    max={800}
                    step={10}
                  />
                  {/* ... (기존 옵션들) ... */}
                  <Divider />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    콘텐츠 옵션
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeForm}
                        onChange={(e) => setIncludeForm(e.target.checked)}
                      />
                    }
                    label="내부에 폼 포함하기"
                  />
                  {includeForm && (
                    <Stack
                      spacing={3}
                      sx={{ pl: 2, borderLeft: '2px solid #eee' }}
                    >
                      <SimpleSlider
                        title="폼 행 개수"
                        fontSize={rowCount}
                        setFontSize={setRowCount}
                        min={1}
                        max={5}
                      />
                      <Box>
                        <Typography gutterBottom>행 당 입력칸</Typography>
                        <ToggleButtonGroup
                          value={inputsPerRow}
                          exclusive
                          onChange={(e, val) => val && setInputsPerRow(val)}
                          size="small"
                          fullWidth
                        >
                          <ToggleButton value={1}>1개</ToggleButton>
                          <ToggleButton value={2}>2개</ToggleButton>
                        </ToggleButtonGroup>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={includeFooter}
                            onChange={(e) => setIncludeFooter(e.target.checked)}
                          />
                        }
                        label="푸터 (버튼) 포함"
                      />
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={12}>
          <PreviewCodeInCompPage examCode={exampleCode} />
        </Grid>
      </Grid>
    </Box>
  )
}
