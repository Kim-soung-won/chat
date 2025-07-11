'use client'
import { Font } from '@/shared/constants'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import { highlight, languages } from 'prismjs'
import Editor from 'react-simple-code-editor'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-jsx'
import { CopyTextButton } from '../Button'

interface PreviewCodeCompProps {
  examCode: string
  title?: string
}

export const PreviewCodeInCompPage = ({
  examCode,
  title = '코드',
}: PreviewCodeCompProps) => {
  const isDark: boolean = useTheme().palette.mode === 'dark'

  const editorStyle: React.CSSProperties = {
    fontFamily: Font.JetbrainsMono.style.fontFamily,
    fontSize: 16,
    backgroundColor: isDark ? '#272822' : '#f5f5f5',
    borderRadius: '8px',
    minHeight: '400px',
    overflow: 'auto',
    outline: 'none',
  }
  return (
    <Grid size={12}>
      <style>{isDark ? Font.PrismDarkheme : Font.PrismLightTheme}</style>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <Editor
              value={examCode.trim()}
              onValueChange={() => {}}
              highlight={(code) => highlight(code, languages.jsx, 'jsx')}
              padding={16}
              style={{
                ...editorStyle,
              }}
              readOnly
            />
            {/* 4. 복사 버튼 */}
            <CopyTextButton text={examCode} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
