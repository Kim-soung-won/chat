'use client'

import { Box, useTheme } from '@mui/material' // Grid 대신 Box를 주로 사용
import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { handleImageUpload } from '@/shared/utils'
import {
  MarkDownFormUI,
  MarkDownPreviewUI,
  MarkdownSyntaxToolbar,
  MarkdownTitle,
} from './content' // 이 경로는 네 프로젝트 구조에 맞게 확인
import { insertImageMarkdown, markdownHandleWrite } from './Method'

const MIN_PANEL_WIDTH_PX = 150 // 각 패널의 최소 너비 (픽셀)
const DIVIDER_WIDTH_PX = 8 // 구분선의 너비 (픽셀)

export const MarkdownEditor: React.FC = () => {
  const [markdownInput, setMarkdownInput] = useState<string>('')
  const [markdownTitle, setMarkdownTitle] = useState<string>('') // 제목 상태 추가
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const theme = useTheme() // 테마 객체 가져오기
  const router = useRouter()

  // 왼쪽 패널의 너비를 상태로 관리 (픽셀 단위)
  const [leftPanelWidth, setLeftPanelWidth] = useState<number | undefined>(
    undefined,
  )
  const [isDragging, setIsDragging] = useState(false)

  // 드래그 시작 위치와 그때의 왼쪽 패널 너비를 저장할 ref
  const dragStartXRef = useRef(0)
  const initialLeftPanelWidthOnDragStartRef = useRef(0)
  const editorContentRef = useRef<HTMLDivElement>(null) // 패널들을 감싸는 컨테이너 ref

  // 초기 너비 설정 (컴포넌트 마운트 후)
  useEffect(() => {
    if (editorContentRef.current && leftPanelWidth === undefined) {
      // 초기에 왼쪽 패널이 전체 너비의 50%를 차지하도록 설정 (구분선 너비 고려)
      setLeftPanelWidth(
        editorContentRef.current.offsetWidth / 2 - DIVIDER_WIDTH_PX / 2,
      )
    }
  }, [leftPanelWidth]) // leftPanelWidth가 undefined일 때만 실행

  // 구분선에서 마우스 버튼을 눌렀을 때
  const handleDividerMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault() // 기본 동작(텍스트 선택 등) 방지
      dragStartXRef.current = event.clientX // 마우스 시작 X 좌표 저장
      initialLeftPanelWidthOnDragStartRef.current = leftPanelWidth || 0 // 현재 왼쪽 패널 너비 저장
      setIsDragging(true)
    },
    [leftPanelWidth],
  )

  // 마우스 이동 및 버튼 놓기 이벤트 핸들러 (드래그 중일 때만 window에 등록)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !editorContentRef.current) return

      const deltaX = event.clientX - dragStartXRef.current // 마우스 이동 거리 계산
      let newLeftPanelWidth =
        initialLeftPanelWidthOnDragStartRef.current + deltaX

      // 패널 너비 제약 조건 적용
      const containerWidth = editorContentRef.current.offsetWidth
      const maxLeftPanelWidth =
        containerWidth - MIN_PANEL_WIDTH_PX - DIVIDER_WIDTH_PX

      newLeftPanelWidth = Math.max(MIN_PANEL_WIDTH_PX, newLeftPanelWidth)
      newLeftPanelWidth = Math.min(maxLeftPanelWidth, newLeftPanelWidth)

      setLeftPanelWidth(newLeftPanelWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      // 드래그 중이면 window에 이벤트 리스너 추가
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    // 클린업 함수: 드래그가 끝나거나 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(event.target.value)
  }

  const handleWrite = async () => {
    markdownHandleWrite({
      title: markdownTitle,
      content: markdownInput,
      navigateTo: (route: string) => {
        router.push(route)
      },
    })
  }

  const currentLeftPanelWidthStyle =
    leftPanelWidth !== undefined ? `${leftPanelWidth}px` : '50%'

  const insertImageMarkdownHandler = useCallback(
    (imageUrl: string, altText: string) => {
      insertImageMarkdown({
        imageUrl,
        altText,
        textareaRef,
        setMarkdownInput,
      })
    },
    [textareaRef, setMarkdownInput],
  )

  const handleImageUploadMarkdown = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      handleImageUpload({
        event: event,
        insertImage: insertImageMarkdownHandler,
      })
    },
    [insertImageMarkdownHandler],
  )

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items) return

      let pastedFile: File | null = null

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          pastedFile = item.getAsFile()
          if (pastedFile) {
            event.preventDefault()
            break
          }
        }
      }

      if (pastedFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const originalBase64Url = reader.result as string
          const img = new Image()
          img.onload = () => {
            const MAX_WIDTH = 800
            let newWidth = img.width
            let newHeight = img.height
            if (newWidth > MAX_WIDTH) {
              const ratio = MAX_WIDTH / newWidth
              newWidth = MAX_WIDTH
              newHeight = newHeight * ratio
            }
            const canvas = document.createElement('canvas')
            canvas.width = newWidth
            canvas.height = newHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, newWidth, newHeight)
              const quality =
                pastedFile!.type === 'image/jpeg' ||
                pastedFile!.type === 'image/webp'
                  ? 0.9
                  : 1.0
              const resizedBase64Url = canvas.toDataURL(
                pastedFile!.type,
                quality,
              )
              insertImageMarkdownHandler(
                resizedBase64Url,
                pastedFile!.name || 'pasted-image',
              )
            } else {
              insertImageMarkdownHandler(
                originalBase64Url,
                pastedFile!.name || 'pasted-image',
              )
            }
          }
          img.onerror = () => {
            insertImageMarkdownHandler(
              originalBase64Url,
              pastedFile!.name || 'pasted-image',
            )
          }
          img.src = originalBase64Url
        }
        reader.onerror = () => {
          alert('붙여넣은 이미지를 처리하는 중 오류가 발생했습니다.')
        }
        reader.readAsDataURL(pastedFile)
      }
    }

    textarea.addEventListener('paste', handlePaste)

    return () => {
      textarea.removeEventListener('paste', handlePaste)
    }
  }, [textareaRef, insertImageMarkdownHandler])

  return (
    <Box // 전체 에디터 영역을 감싸는 최상위 Box
      sx={{
        flexGrow: 1,
        p: { xs: 1, sm: 2 }, // 전체 에디터 영역의 패딩
        height: 'calc(100vh - 64px)', // 예시: 헤더나 다른 UI 요소 높이(64px)를 제외한 전체 화면 높이
        display: 'flex',
        flexDirection: 'column', // 툴바와 아래 내용 영역을 세로로 배치
      }}
    >
      <MarkdownSyntaxToolbar // 툴바 컴포넌트
        textareaRef={textareaRef}
        markdownInput={markdownInput}
        setMarkdownInput={setMarkdownInput}
        handleWrite={handleWrite} // 예시: 버튼 클릭 시 동작
        onImageUpload={handleImageUploadMarkdown} // 이미지 업로드 핸들러
      />

      {/* 메인 컨텐츠 영역 (왼쪽 폼 + 구분선 + 오른쪽 미리보기) */}
      <Box
        ref={editorContentRef} // 이 Box의 너비를 기준으로 패널 너비 계산
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // md 이상에서 가로 배치
          overflow: 'hidden',
          // gap 대신 구분선을 사용하므로 gap 제거 또는 주석 처리
        }}
      >
        {/* 왼쪽: 마크다운 입력창 패널 */}
        <Box
          sx={{
            width: { xs: '100%', md: currentLeftPanelWidthStyle },
            height: { xs: 'auto', md: '100%' },
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            minWidth: { xs: 'none', md: `${MIN_PANEL_WIDTH_PX}px` },
            minHeight: 0,
            position: 'relative',
          }}
        >
          {/* 제목 영역 */}
          <MarkdownTitle
            title={markdownTitle}
            onTitleChange={setMarkdownTitle} // 제목 변경 핸들러
          />
          <MarkDownFormUI
            textareaRef={textareaRef}
            text={markdownInput}
            onChange={handleInputChange}
          />
        </Box>

        <Box
          onMouseDown={handleDividerMouseDown}
          sx={{
            width: `${DIVIDER_WIDTH_PX}px`,
            backgroundColor: isDragging
              ? theme.palette.primary.main
              : theme.palette.divider,
            cursor: 'col-resize', // 마우스 커서 모양 변경
            flexShrink: 0, // 구분선 너비 고정
            display: { xs: 'none', md: 'flex' }, // md 이상 화면에서만 표시
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            // 드래그 중 부드러운 인터랙션을 위해 userSelect: none 추가 가능
            userSelect: 'none',
          }}
        >
          {/* 필요하다면 여기에 핸들 모양의 아이콘 등을 추가할 수 있음 */}
        </Box>

        {/* 오른쪽: 미리보기 영역 패널 */}
        <Box
          sx={{
            flexGrow: 1, // 남은 공간을 모두 차지 (오른쪽 패널)
            width: { xs: '100%', md: 'auto' }, // xs에서는 100%, md에서는 자동으로 남은 공간
            height: { xs: 'auto', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
            minWidth: { xs: 'none', md: `${MIN_PANEL_WIDTH_PX}px` },
            minHeight: 0,
            overflow: 'hidden', // 이 Box 자체가 스크롤되지 않도록
          }}
        >
          <MarkDownPreviewUI
            title={markdownTitle}
            markdownInput={markdownInput}
          />
        </Box>
      </Box>
    </Box>
  )
}
