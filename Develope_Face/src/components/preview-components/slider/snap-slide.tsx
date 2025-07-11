'use client'
import { SnapSlider } from '@/shared/ui/slider'
import { useState } from 'react'

const compData = [
  {
    label: 'Red',
    color: 'red',
  },
  {
    label: 'Blue',
    color: 'blue',
  },
  {
    label: 'Green',
    color: 'green',
  },
  {
    label: 'Red',
    color: 'red',
  },
  {
    label: 'Blue',
    color: 'blue',
  },
  {
    label: 'Green',
    color: 'green',
  },
  {
    label: 'Red',
    color: 'red',
  },
  {
    label: 'Blue',
    color: 'blue',
  },
  {
    label: 'Green',
    color: 'green',
  },
]

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
