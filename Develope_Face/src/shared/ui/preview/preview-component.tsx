import { Box, Card, CardContent, Typography } from '@mui/material'

interface PreviewCompProps {
  PreviewComp: React.ReactElement
}

export const PreviewComponentBlock = ({ PreviewComp }: PreviewCompProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          미리보기
        </Typography>
        <Box
          sx={{
            p: 4,
            border: '1px dashed grey',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {PreviewComp}
        </Box>
      </CardContent>
    </Card>
  )
}
