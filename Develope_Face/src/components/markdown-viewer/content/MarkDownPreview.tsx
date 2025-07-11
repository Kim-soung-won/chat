import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useCallback, useEffect, useState } from 'react'
import { useMDXComponents } from '../../../../mdx-component'

interface MarkDownPreviewUIProps {
  title: string
  markdownInput: string
}

export const MarkDownPreviewUI = ({
  title,
  markdownInput,
}: MarkDownPreviewUIProps) => {
  const [serializedMdx, setSerializedMdx] =
    useState<MDXRemoteSerializeResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 네 커스텀 MDX 컴포넌트들을 가져옴
  const mdxComponents = useMDXComponents({})

  // MDX 파싱 및 렌더링을 위한 API 호출 함수
  const fetchAndSetMdx = useCallback(async (currentTitle: string, mdText: string) => {
    const combinedMarkdown = currentTitle.trim()
      ? `# ${currentTitle.trim()}\n\n${mdText}`
      : mdText;
    
    setIsLoading(true)
    setError(null)

    if (!mdText.trim()) {
      setSerializedMdx(null)
      setError(null)
      setIsLoading(false)
      return
    }
    try {
      const response = await fetch('/api/mdx-preview', {
        // 1번에서 만든 API 라우트
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: combinedMarkdown }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error ||
            `미리보기를 가져오지 못했습니다 (상태: ${response.status})`,
        )
      }

      const { mdxSource } = await response.json()
      setSerializedMdx(mdxSource as MDXRemoteSerializeResult)
    } catch (e: any) {
      setError(e.message || '미리보기를 렌더링하는 데 실패했습니다.')
      setSerializedMdx(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 입력 값 변경 시 디바운싱으로 API 호출
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchAndSetMdx(title,markdownInput)
    }, 500) // 500ms 디바운스
    return () => clearTimeout(handler)
  }, [markdownInput, fetchAndSetMdx, title])

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        flexGrow: 1,
        fontSize: '0.9rem',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        sx={{ fontSize: '0.7rem' }}
      >
        미리보기
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 40px)' /* 헤더/디바이더 높이 제외 */,
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}
      {error && (
        <Typography
          component="h1"
          color="error"
          sx={{ whiteSpace: 'pre-wrap' }}
        >{`오류: ${error}`}</Typography>
      )}
      {!isLoading && !error && serializedMdx && (
        <Box className="mdx-preview-content">
          {' '}
          {/* 스타일링을 위한 클래스 네임 */}
          <MDXRemote {...serializedMdx} components={mdxComponents} />
        </Box>
      )}
      {/* 초기 상태 또는 입력 없을 때 메시지 */}
      {!isLoading && !error && !serializedMdx && !markdownInput.trim() && (
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          마크다운을 입력하면 여기에 미리보기가 표시됩니다.
        </Typography>
      )}
      {!isLoading &&
        !error &&
        !serializedMdx &&
        markdownInput.trim() && ( // 입력은 있지만 아직 결과가 없거나 로드 실패한 경우
          <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            미리보기를 로드 중이거나, 입력 내용에 오류가 있을 수 있습니다.
          </Typography>
        )}
    </Paper>
  )
}
