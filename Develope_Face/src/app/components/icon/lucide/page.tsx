import { Container, Typography } from '@mui/material'
import {
  lucideIconNames,
  lucideIconTags,
} from '@/shared/constants/icon/lucide-icon-data'
import { IconFinderPage } from '@/components/icon'

export default function lucideIconPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Lucide-React 아이콘 찾기
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        약 1000개의 아이콘이 있습니다. 아이콘을 클릭하여 import 구문을
        복사하세요.
      </Typography>
      <IconFinderPage
        iconNames={lucideIconNames}
        iconTags={lucideIconTags}
        source="lucide"
      />
    </Container>
  )
}
