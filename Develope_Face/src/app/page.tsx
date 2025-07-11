import { Typography } from '@mui/material'
import { ScrollAnimation } from '@/shared/ui'

export default async function Home() {
  return (
    <>
      <ScrollAnimation />
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
