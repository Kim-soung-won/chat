'use client'

import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy' // 복사 아이콘
import CheckIcon from '@mui/icons-material/Check' // 완료 아이콘
import { IconButton } from '@mui/material'

export const CopyTextButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = async () => {
    if (isCopied) return
    try {
      await navigator.clipboard.writeText(text.trim())
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('클립보드 복사 실패:', err)
    }
  }

  return (
    <IconButton
      onClick={handleCopy}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: isCopied ? 'success.main' : 'grey.500', // 상태에 따라 색상 변경
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      aria-label="copy code to clipboard"
    >
      {isCopied ? (
        <CheckIcon fontSize="small" />
      ) : (
        <ContentCopyIcon fontSize="small" />
      )}
    </IconButton>
  )
}
