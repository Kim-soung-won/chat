import { Box, TextField } from '@mui/material'; // TextField 추가


interface MarkdownTitleProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

export const MarkdownTitle = ({
  title, onTitleChange
}: MarkdownTitleProps) => {
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    onTitleChange(event.target.value);
  };
  return (
    <Box sx={{
      marginBottom: 2,
      marginTop: 2,
    }}> 
      <TextField
        fullWidth
        label="글 제목"
        variant="outlined"
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요..."
        sx={{
          '& .MuiOutlinedInput-root': {
          },
        }}
      />
    </Box>
  );
}