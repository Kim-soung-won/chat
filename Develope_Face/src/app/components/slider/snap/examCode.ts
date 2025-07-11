export const SliderPageExamCode = `import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  CSSProperties,
} from 'react'
import { Box, styled } from '@mui/material'
import { motion, PanInfo } from 'framer-motion'

const SliderViewport = styled(Box)({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'grab',
  '&:active': { cursor: 'grabbing' },
  marginTop: 10,
})

const SliderTrack = styled(motion.div)({
  display: 'flex',
  gap: '12px',
  width: 'max-content',
})

interface SnapSliderProps {
  contents: React.ReactNode[]
  selectedIndex: number
  onItemClick: (index: number) => void
  boxStyle?: CSSProperties
  style?: CSSProperties
}

/**
 * Drag&Drop 슬라이더 (모바일 특화)
 * @param contents: 각 Slide의 구성요소 컴포넌트 배열
 * @param selectedIndex: 선택된 슬라이더 요소
 * @param onItemclick: 슬라이더 구성요소 클릭 이벤트
 * @param boxStyle: 슬라이더 전체 스타일
 * @param style: 각 껍데기 슬라이더 스타일
 */
export const SnapSlider = ({
  contents,
  selectedIndex,
  onItemClick,
  boxStyle,
  style,
}: SnapSliderProps) => {
  const [xOffset, setXOffset] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [itemMeasurements, setItemMeasurements] = useState<
    { left: number; width: number }[]
  >([])

  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  useLayoutEffect(() => {
    const measureItems = () => {
      if (!viewportRef.current) return
      const measurements = itemRefs.current.map((item) => ({
        left: item?.offsetLeft || 0,
        width: item?.offsetWidth || 0,
      }))
      setItemMeasurements(measurements)

      if (measurements.length > 0) {
        const viewportWidth = viewportRef.current.offsetWidth
        const lastItem = measurements[measurements.length - 1]
        const firstItem = measurements[0]

        const leftConstraint =
          viewportWidth / 2 - (lastItem.left + lastItem.width / 2)
        const rightConstraint =
          viewportWidth / 2 - (firstItem.left + firstItem.width / 2)

        setDragConstraints({ left: leftConstraint, right: rightConstraint })
      }
    }

    measureItems()
    window.addEventListener('resize', measureItems)
    return () => window.removeEventListener('resize', measureItems)
  }, [contents.length])

  const getCenterPosition = (index: number) => {
    if (
      !viewportRef.current ||
      itemMeasurements.length === 0 ||
      !itemMeasurements[index]
    ) {
      return 0
    }
    const viewportWidth = viewportRef.current.offsetWidth
    const selectedItem = itemMeasurements[index]
    const itemCenter = selectedItem.left + selectedItem.width / 2
    const viewportCenter = viewportWidth / 2
    return viewportCenter - itemCenter
  }

  useEffect(() => {
    if (itemMeasurements.length > 0) {
      setXOffset(getCenterPosition(selectedIndex))
    }
  }, [selectedIndex, itemMeasurements])

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (itemMeasurements.length === 0) return
    const { offset } = info

    const finalPosition = xOffset + offset.x

    let closestIndex = 0
    let minDistance = Infinity

    itemMeasurements.forEach((item, index) => {
      const itemCenter =
        -(item.left + item.width / 2) +
        (viewportRef.current?.offsetWidth || 0) / 2
      const distance = Math.abs(finalPosition - itemCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setXOffset(getCenterPosition(closestIndex))
    onItemClick(closestIndex)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...boxStyle,
      }}
    >
      <SliderViewport ref={viewportRef}>
        <SliderTrack
          drag="x"
          onDragEnd={handleDragEnd}
          animate={{ x: xOffset }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          dragConstraints={dragConstraints}
          style={style}
        >
          {contents.map((item, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[index] = el
              }}
              onClick={() => onItemClick(index)}
            >
              {item}
            </div>
          ))}
        </SliderTrack>
      </SliderViewport>
    </Box>
  )
}
`

export const SliderPageExamCodeUsed = `'use client'
import { SnapSlider } from '@/shared/ui/slider'
import { useState } from 'react'

export const SnapSliderExam = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <SnapSlider
      contents={compData.map((item, index) => (
        <h1
          style={{
            width: '250px',
            aspectRatio: '1/1',
            backgroundColor: item.color,
          }}
        >
          {item.label}
        </h1>
      ))}
      selectedIndex={selectedIndex}
      onItemClick={setSelectedIndex}
    />
  )
}
`
