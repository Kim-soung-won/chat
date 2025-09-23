'use client'
import { set } from 'node_modules/zod/v3/external.cjs'
import './card.css'
import { useState } from 'react'
import { AngleDial } from './angle/AngleDial'
import { useTheme } from '@mui/material'

const colorOptions = [
  { label: '파란색 계열', value: 220 },
  { label: '빨간색 계열', value: 0 },
  { label: '녹색 계열', value: 120 },
  { label: '노란색 계열', value: 60 },
  { label: '보라색 계열', value: 280 },
]

interface CustomCardProps {
  children?: React.ReactNode
}

export function CustomCard({ children }: CustomCardProps) {
  const [angle, setAngle] = useState(135) // 기본값: 135deg
  const [leftHue, setLeftHue] = useState(colorOptions[0].value) // 기본값: 파란색
  const [rightHue, setRightHue] = useState(colorOptions[0].value) // 기본값: 파란색
  const [leftSaturation, setLeftSaturation] = useState(75) // 기본값: 75%
  const [rightSaturation, setRightSaturation] = useState(75) // 기본값: 75%
  const isDark = useTheme().palette.mode === 'dark'

  const lightness1 = isDark ? 45 : 65
  const lightness2 = isDark ? 30 : 50

  // 2. CSS 사용자 정의 속성을 동적으로 설정하기 위한 스타일 객체
  const cardStyle: React.CSSProperties = {
    //@ts-ignore
    '--angle': `${angle}deg`,
    '--card-left-hue': leftHue,
    '--card-right-hue': rightHue,
    '--card-left-saturation': `${leftSaturation}%`,
    '--card-right-saturation': `${rightSaturation}%`,

    '--card-lightness-1': `${lightness1}%`,
    '--card-lightness-2': `${lightness2}%`,

    '--text-color': isDark ? 'rgba(255, 255, 255, 0.9)' : '#FFFFFF',
    '--text-shadow': isDark
      ? '0 2px 4px rgba(0, 0, 0, 0.5)'
      : '0 2px 4px rgba(0, 0, 0, 0.25)',
  }

  return (
    <div className="card-container">
      <div className="style-info-container">
        {/* --- 현재 스타일 정보 표시 --- */}
        <h3>현재 카드 스타일 정보</h3>
        <p>각도: {angle}°</p>
        <p>
          왼쪽 색상: HSL({leftHue}, {leftSaturation}%, {lightness1}%)
        </p>
        <p>
          오른쪽 색상: HSL({rightHue}, {rightSaturation}%, {lightness2}%)
        </p>
        <h4>{`linear-gradient(${angle}deg, hsl(${leftHue}, ${leftSaturation}%, ${lightness1}%), hsl(${rightHue}, ${rightSaturation}%, ${lightness2}%))`}</h4>
      </div>
      <AngleDial angle={angle} onAngleChange={setAngle} />
      <div className="controls-container">
        {/* --- 색상 컨트롤러 UI --- */}
        <div className="controls">
          <div className="control-group">
            <label htmlFor="color-select">색상 계열 선택:</label>
            <select
              id="color-select"
              value={leftHue}
              onChange={(e) => setLeftHue(Number(e.target.value))}
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="saturation-slider">
              채도 조절: {leftSaturation}%
            </label>
            <input
              id="saturation-slider"
              type="range"
              min="0"
              max="100"
              value={leftSaturation}
              onChange={(e) => setLeftSaturation(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="controls">
          <div className="control-group">
            <label htmlFor="color-select">색상 계열 선택:</label>
            <select
              id="color-select"
              value={rightHue}
              onChange={(e) => setRightHue(Number(e.target.value))}
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="saturation-slider">
              채도 조절: {rightSaturation}%
            </label>
            <input
              id="saturation-slider"
              type="range"
              min="0"
              max="100"
              value={rightSaturation}
              onChange={(e) => setRightSaturation(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* --- 스타일이 적용될 카드 --- */}
      <div className="custom-card" style={cardStyle}>
        <h2>색상이 변경되는 카드</h2>
        <p>UI 컨트롤러를 조작하여 카드의 배경 Gradient를 변경해보세요.</p>
      </div>
    </div>
  )
}
