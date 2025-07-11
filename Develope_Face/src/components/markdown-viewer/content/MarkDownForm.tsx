import { TextField } from '@mui/material'
import React from 'react' // React import 추가 (JSX 사용 및 RefObject 타입 등을 위해)

interface MarkDownFormUIProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null> // HTMLTextAreaElement | null로 좀 더 명확하게
  text: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const MarkDownFormUI = ({
  textareaRef,
  text,
  onChange,
}: MarkDownFormUIProps) => {
  return (
    <TextField
      inputRef={textareaRef}
      id="markdown-textarea"
      multiline
      fullWidth
      variant="outlined"
      value={text}
      onChange={onChange}
      placeholder="여기에 마크다운을 입력하세요..."
      inputProps={{ spellCheck: 'false' }}
      maxRows={30}
      sx={{
        flexGrow: 1, 
        minHeight: 0,
        '& .MuiInputBase-root': {
          height: '100%',
          display: 'flex',    
          flexDirection: 'column',
          alignItems: 'stretch',   
          p: '12px', 
        },
        '& .MuiInputBase-input': { 
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          overflow: 'auto',  
          whiteSpace: 'pre',
          lineHeight: 1.5,
          height: '100%',     
          padding: '0px',     
          boxSizing: 'border-box', 
        },
      }}
    />
  );
};