'use client'

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  useTheme,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import React, { useState, useMemo } from 'react'
import { IconInfo } from '@/shared/constants/icons' // 실제 파일 경로에 맞게 수정해주세요.
import { RGB } from '@/shared/utils'
import {
  BackgroundColorSelecter,
  BorderSelectComp,
  IconSelectBlock,
  ShadowSelectComp,
} from '@/shared/ui/select'
import {
  PreviewCodeInCompPage,
  PreviewComponentBlock,
} from '@/shared/ui/preview'
import { Color } from '@/shared/constants'
import { ColorOption } from '@/shared/constants/colors'
import { SimpleSlider } from '@/shared/ui/slider'
import { RotateCw, Maximize, HeartPulse, Vibrate } from 'lucide-react'

const toRgba = (rgb: string, alpha: number) => {
  return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}

const hoverEffectOptions = [
  {
    name: 'rotate',
    label: '버튼 회전',
    icon: <RotateCw size={18} />,
    style: { button: { animation: 'rotate-animation 2s linear infinite' } },
  },
  {
    name: 'grow',
    label: '커지기',
    icon: <Maximize size={18} />,
    style: { button: { transform: 'scale(1.05)' } },
  },
  {
    name: 'shake',
    label: '흔들기',
    icon: <Vibrate size={18} />,
    style: { button: { animation: 'shake-animation 0.5s' } },
  },
  {
    name: 'pulse',
    label: '두근거리기',
    icon: <HeartPulse size={18} />,
    style: { button: { animation: 'pulse-animation 0.8s infinite' } },
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

export function HtmlCssButtonExamplePage() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    Color.colorOptions[0],
  )
  const [selectedIcon, setSelectedIcon] = useState<IconInfo>({
    name: 'NONE',
    Component: null,
    source: null,
    tags: [],
  })
  const [borderColor, setBorderColor] = useState<ColorOption>(
    Color.colorOptions[13],
  )
  const [shadowColor, setShadowColor] = useState<ColorOption>(
    Color.colorOptions[13],
  )

  const [isHovered, setIsHovered] = useState(false)
  const [shadow, setShadow] = useState(5)
  const [borderRadius, setBorderRadius] = useState(6)
  const [borderWidth, setBorderWidth] = useState(0)
  const [fontSize, setFontSize] = useState(16)

  const [selectedEffect, setSelectedEffect] = useState<string | null>(null)

  const isDark: boolean = useTheme().palette.mode === 'dark'

  const baseButtonStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: selectedColor.rgb,
      color: 'white',
      padding: '8px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      border: `${borderWidth}px solid ${borderColor.rgb}`,
      borderRadius: `${borderRadius}px`,
      fontSize: `${fontSize}px`,
      boxShadow:
        shadow > 0
          ? `0px ${10}px ${10}px ${toRgba(shadowColor.rgb, shadow / 10)}`
          : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    }),
    [
      selectedColor,
      borderWidth,
      borderColor,
      borderRadius,
      fontSize,
      shadow,
      shadowColor,
    ],
  )

  const hoverButtonStyle: React.CSSProperties = useMemo(() => {
    const baseHoverStyle: React.CSSProperties = {
      backgroundColor: isDark
        ? RGB.lightenRgb(selectedColor.rgb)
        : RGB.darkenRgb(selectedColor.rgb),
      boxShadow:
        shadow > 0
          ? `0px ${shadow + 2}px ${shadow * 2.5}px ${toRgba(shadowColor.rgb, 0.3)}`
          : 'none',
    }

    const effect = hoverEffectOptions.find((e) => e.name === selectedEffect)

    return {
      ...baseHoverStyle,
      ...(effect?.style.button || {}),
    }
  }, [selectedEffect, isDark, selectedColor.rgb, shadow, shadowColor.rgb])

  const currentButtonStyle = isHovered
    ? { ...baseButtonStyle, ...hoverButtonStyle }
    : baseButtonStyle

  const keyframesForExampleCode = useMemo(() => {
    let keyframes = ''
    if (selectedEffect === 'pulse') {
      keyframes += `
        @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
      `
    }
    if (selectedEffect === 'rotate') {
      keyframes += `
        @keyframes rotate-animation {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `
    }
    if (selectedEffect === 'shake') {
      keyframes += `
      @keyframes shake-animation {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
      }
    `
    }
    return keyframes.trim()
  }, [selectedEffect])

  // --- 3. buttonExampleCode를 useMemo를 사용해 동적으로 생성합니다. ---
  const buttonExampleCode = useMemo(
    () => `
${
  keyframesForExampleCode
    ? `const Keyframes = () => (
  <style>{\`
    ${keyframesForExampleCode}
  \`}</style>
);

`
    : ''
}
import React, { useState } from 'react';
${selectedIcon.name !== 'NONE' ? `import { ${selectedIcon.name} } from '${selectedIcon.source}';` : ''}

const StyleButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyle: React.CSSProperties = {
${styleObjectToString(baseButtonStyle)}
  };

  const hoverStyle: React.CSSProperties = {
${styleObjectToString(hoverButtonStyle)}
  };

  const currentStyle = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <>
      ${keyframesForExampleCode ? `<Keyframes />` : ''}
      <button 
        style={currentStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        ${selectedIcon.name !== 'NONE' ? `<${selectedIcon.name} ${selectedIcon.source === 'lucide-react' ? `size={${fontSize}}` : `style={{ fontSize: ${fontSize} }}`} />` : ''}
        <span>Button</span>
      </button>
    </>
  );
};
`,
    [
      baseButtonStyle,
      hoverButtonStyle,
      selectedIcon,
      fontSize,
      keyframesForExampleCode,
    ],
  )

  return (
    <Grid container spacing={4}>
      {/* Pulse 애니메이션을 위한 style 태그 추가 */}
      <style>{`
        @keyframes pulse-animation {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes rotate-animation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shake-animation {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }
      `}</style>
      <Grid size={12}>
        <Stack spacing={4}>
          <PreviewComponentBlock
            PreviewComp={
              <button
                style={currentButtonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* --- 4. 아이콘에 적용되던 style prop을 제거합니다. --- */}
                {selectedIcon.Component &&
                  (selectedIcon.source === 'lucide-react' ? (
                    <selectedIcon.Component size={fontSize} />
                  ) : (
                    <selectedIcon.Component sx={{ fontSize: fontSize }} />
                  ))}
                <span>Button</span>
              </button>
            }
          />

          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                스타일 옵션
              </Typography>
              <Grid container spacing={4}>
                <Grid size={6}>
                  <IconSelectBlock
                    selectedIcon={selectedIcon}
                    setIconState={setSelectedIcon}
                  />
                </Grid>
                <Grid size={6}>
                  <BackgroundColorSelecter
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </Grid>
                <Grid size={6}>
                  <ShadowSelectComp
                    shadow={shadow}
                    shadowColor={shadowColor}
                    setShadow={setShadow}
                    setShadowColor={setShadowColor}
                  />
                </Grid>
                <Grid size={6}>
                  <BorderSelectComp
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                    setBorderWidth={setBorderWidth}
                    setBorderColor={setBorderColor}
                  />
                </Grid>
                <Grid size={6}>
                  <SimpleSlider
                    title="테두리 둥글기"
                    fontSize={borderRadius}
                    setFontSize={setBorderRadius}
                    max={25}
                  />
                </Grid>
                <Grid size={6}>
                  <SimpleSlider
                    title="폰트 크기"
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                  />
                </Grid>
                <Grid size={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Hover 효과
                  </Typography>
                  <ToggleButtonGroup
                    // exclusive: 토글 한개만 선택할 수 있도록
                    exclusive
                    value={selectedEffect}
                    onChange={(_event, newEffects) => {
                      setSelectedEffect(newEffects)
                    }}
                    aria-label="hover effects"
                    size="small"
                    fullWidth
                  >
                    {hoverEffectOptions.map((effect) => (
                      <ToggleButton
                        key={effect.name}
                        value={effect.name}
                        aria-label={effect.label}
                      >
                        {effect.icon}
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, textTransform: 'none' }}
                        >
                          {effect.label}
                        </Typography>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Grid size={12}>
        <PreviewCodeInCompPage examCode={buttonExampleCode} />
      </Grid>
    </Grid>
  )
}
