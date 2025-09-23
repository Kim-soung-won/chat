import React, { useState, useRef, useEffect, MouseEvent } from 'react'
import './AngleDial.css'

// Props 타입 정의
interface AngleDialProps {
  angle: number
  onAngleChange: (angle: number) => void
  size?: number // 다이얼 크기 (선택 사항)
}

export function AngleDial({
  angle,
  onAngleChange,
  size = 150,
}: AngleDialProps) {
  const dialRef = useRef<SVGSVGElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // 다이얼의 기하학적 속성 계산
  const radius = size / 2
  const strokeWidth = 15
  const innerRadius = radius - strokeWidth
  const center = { x: radius, y: radius }

  // 마우스 이벤트 핸들러 (드래그 시작)
  const handleMouseDown = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // 마우스 이벤트 핸들러 (드래그 종료)
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 각도 계산 및 업데이트 함수
  const updateAngle = (e: globalThis.MouseEvent) => {
    if (!dialRef.current) return

    // SVG 요소의 위치와 크기 정보 가져오기
    const rect = dialRef.current.getBoundingClientRect()
    // 문서 기준의 마우스 좌표를 SVG 내부 좌표로 변환
    const x = e.clientX - rect.left - center.x
    const y = e.clientY - rect.top - center.y

    // 아크탄젠트2 함수로 각도(라디안) 계산 후, 180도를 더해 0-360 범위로 변환
    let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 180

    // 0~180도 범위의 반원만 사용하도록 제한
    if (newAngle < 0) newAngle = 0
    if (newAngle > 180) newAngle = 180

    onAngleChange(Math.round(newAngle))
  }

  // 드래그 중 마우스 움직임을 감지하여 각도 업데이트
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        updateAngle(e)
      }
    }

    // 전역 이벤트 리스너 등록
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, onAngleChange])

  // 각도에 따른 핸들(점)의 위치 계산
  const handleX =
    center.x + innerRadius * Math.cos((angle - 180) * (Math.PI / 180))
  const handleY =
    center.y + innerRadius * Math.sin((angle - 180) * (Math.PI / 180))

  return (
    <div className="angle-dial-container">
      <svg
        ref={dialRef}
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        className="angle-dial-svg"
        onMouseDown={handleMouseDown}
      >
        {/* 반원 배경 트랙 */}
        <path
          d={`M ${strokeWidth / 2} ${radius} A ${innerRadius} ${innerRadius} 0 0 1 ${size - strokeWidth / 2} ${radius}`}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* 현재 각도를 표시하는 핸들(점) */}
        <circle
          cx={handleX}
          cy={handleY}
          r={strokeWidth / 2 + 2}
          fill="#3f51b5"
        />
      </svg>
      <div className="angle-display">{angle}°</div>
    </div>
  )
}
