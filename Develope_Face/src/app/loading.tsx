import { Grid } from '@mui/material'
import { LoadingCircleSpinner } from '@/shared/ui'

export default function Loading() {
  return (
    <Grid
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LoadingCircleSpinner />
    </Grid>
  )
}
