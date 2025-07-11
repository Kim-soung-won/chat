import { Box, Typography, useTheme } from "@mui/material"

export const BlogErrorSuspense = () => {
  const theme = useTheme()

  return (
  
    <Box
      sx={{
        p: 2,
        backgroundColor: 'error.lighter',
        border: `1px solid ${theme.palette.error.main}`,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" color="error.dark" gutterBottom>
        앗! 문제가 생겼어요 😢
      </Typography>
    </Box>
  )
}