import { Typography } from '@mui/material'
import { ScrollAnimation } from '@/shared/ui'
import CanvasExam from '@/components/canvas/canvas'

export default async function Home() {
  return (
    <>
      <ScrollAnimation />
      <CanvasExam />
      <Typography
        variant="h1"
        sx={{
          height: '10000px',
        }}
      >
        hello
      </Typography>
    </>
  )
}
