import CampaignIcon from '@mui/icons-material/Campaign'
import CodeIcon from '@mui/icons-material/Code' // 코드블록용 아이콘 예시
import CreateIcon from '@mui/icons-material/Create'; // 쓰기 아이콘 예시 (원하는 아이콘으로 변경 가능)
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ImageIcon from '@mui/icons-material/Image'; 
import LinkIcon from '@mui/icons-material/Link'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import { Button, Divider, IconButton, Paper, Stack } from '@mui/material'
import { useRef } from 'react'
import { insertMarkdownSyntax, MarkdownInput } from '../Method'


/**
 * textareaRef: 입력 필드 Ref
 * markdownInput: 마크다운 입력값
 * setMarkdownInput: 입력 필드 값 상태 업데이트
 * handleWrite: 우측 끝 쓰기 버튼 클릭시 호출 함수수
 */
interface MarkdownSyntaxProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  markdownInput: string
  setMarkdownInput: React.Dispatch<React.SetStateAction<string>>
  handleWrite: () => void
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const MarkdownSyntaxToolbar = ({
  textareaRef,
  markdownInput,
  setMarkdownInput,
  handleWrite,
  onImageUpload, 
}: MarkdownSyntaxProps) => {
  const clickToolbarType = (type: MarkdownInput) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdownInput.substring(start, end)

    const textToInsert = insertMarkdownSyntax({ type, selectedText })


    const newText =
      markdownInput.substring(0, start) +
      textToInsert +
      markdownInput.substring(end)
    setMarkdownInput(newText)

    // 입력 후 커서 위치 조정 (선택적 개선 사항)
    textarea.focus()
    // 정확한 커서 위치 계산은 textToInsert의 실제 길이에 따라 달라짐
    // setTimeout(() => textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText ? selectedText.length : placeholder.length)), 0);
  }

  // ⭐ 숨겨진 file input을 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ⭐ 이미지 아이콘 클릭 시 숨겨진 file input 클릭
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper elevation={1} sx={{ p: 1, mb: 1, flexShrink: 0 }}>
      <Stack
        direction="row"
        justifyContent="space-between" // ⭐ 양쪽 정렬
        alignItems="center"
        width="100%" // ⭐ Stack이 Paper 전체 너비를 차지하도록
      >
        <Stack
          direction="row"
          spacing={{ xs: 0.2, sm: 0.5 }}
          alignItems="center"
          flexWrap="wrap"
        >
          <IconButton
            size="small"
            onClick={() => clickToolbarType('bold')}
            title="굵게"
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => clickToolbarType('italic')}
            title="기울임꼴"
          >
            <FormatItalicIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { xs: 0.2, sm: 0.5 } }}
          />
          <IconButton
            size="small"
            onClick={() => clickToolbarType('h3')}
            title="제목"
          >
            <LooksOneIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { xs: 0.2, sm: 0.5 } }}
          />
          <IconButton
            size="small"
            onClick={() => clickToolbarType('link')}
            title="링크"
          >
            <LinkIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => clickToolbarType('quote')}
            title="인용"
          >
            <FormatQuoteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => clickToolbarType('codeblock')}
            title="코드블록"
          >
            <CodeIcon />
          </IconButton>

          {/* ⭐ 이미지 첨부 버튼 추가 */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { xs: 0.2, sm: 0.5 } }}
          />
          <IconButton
            size="small"
            onClick={handleImageButtonClick} // ⭐ 이미지 버튼 클릭 핸들러
            title="이미지 첨부"
          >
            <ImageIcon />
          </IconButton>
          {/* ⭐ 숨겨진 파일 입력 필드 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload} // ⭐ 파일 선택 시 업로드 함수 호출
            accept="image/*"
            style={{ display: 'none' }}
          />
          {/* ⭐ 여기까지 이미지 첨부 버튼 */}

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { xs: 0.2, sm: 0.5 } }}
          />
          <Button
            size="small"
            startIcon={<CampaignIcon />}
            onClick={() => clickToolbarType('callout')} // 'callout'은 네 커스텀 컴포넌트에 맞게
            sx={{
              textTransform: 'none',
              fontSize: '0.8rem',
              p: { xs: '2px 4px', sm: '4px 8px' },
            }}
          >
          Callout
          </Button>
        </Stack>
        {/* 여기까지 툴바 버튼의 우측에 배치될 Stack */}
        <Button
          variant="contained" // 눈에 띄게 contained 스타일 적용
          color="primary"     // primary 색상 사용
          size="small"
          startIcon={<CreateIcon />} // 쓰기 아이콘 추가
          onClick={handleWrite}      // 위에서 만든 핸들러 연결
          sx={{
            marginLeft: 'auto',    // 이 부분이 핵심! 오른쪽 끝으로 밀어낸다.
            textTransform: 'none',
            fontSize: '0.8rem',
            p: { xs: '2px 8px', sm: '4px 12px' }, // 패딩 살짝 조정
          }}
        >
            쓰기
        </Button>
      </Stack>
    </Paper>
  )
}
// 툴바 버튼 클릭 시 마크다운 구문 삽입 (커서 위치 고려)
