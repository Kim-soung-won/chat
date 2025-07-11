import { Box, CircularProgress, Typography } from "@mui/material"

export const BlogLoadingSuspense = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
      }}
    >
      <CircularProgress size={50} />
      <Typography variant="h6" sx={{ ml: 2 }}>
            게시글을 불러오고 있습니다...
      </Typography>
    </Box>
  )
}