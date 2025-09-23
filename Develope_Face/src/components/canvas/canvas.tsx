'use client'

import { useRef, useEffect, useState } from 'react'

export default function CanvasExam() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // 이제 canvas는 HTMLCanvasElement | null 타입입니다.

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2

    const context = canvas.getContext('2d')
    if (!context) return // getContext는 null을 반환할 수 있습니다.

    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  // 2. 이벤트 객체의 타입을 React.MouseEvent로 지정합니다.
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const context = contextRef.current
    if (!context) return

    const { offsetX, offsetY } = event.nativeEvent
    context.beginPath()
    context.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    const context = contextRef.current
    if (!context) return

    context.closePath()
    setIsDrawing(false)
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const context = contextRef.current
    if (!context) return

    const { offsetX, offsetY } = event.nativeEvent
    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  return (
    <>
      <h1>마우스로 그림을 그려보세요! (TypeScript) ✍️</h1>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        ref={canvasRef}
        style={{ border: '1px solid black', touchAction: 'none' }}
      />
    </>
  )
}
