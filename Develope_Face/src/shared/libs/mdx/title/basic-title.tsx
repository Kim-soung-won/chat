import { Typography } from '@mui/material'

export const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h3"
      component="h1"
      gutterBottom
      sx={{ fontWeight: 'bold' }}
    >
      {children}
    </Typography>
  )
}

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h4"
      component="h2"
      gutterBottom
      sx={{ fontWeight: 600 }}
    >
      {children}
    </Typography>
  )
}

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ fontWeight: 500 }}
    >
      {children}
    </Typography>
  )
}
