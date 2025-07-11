// components/Callout.tsx
'use client'

import { Alert, AlertTitle } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'error'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const icons = {
    info: <InfoIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />,
    success: <CheckCircleIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
  }

  return (
    <Alert
      icon={icons[type]}
      severity={type}
      sx={{
        borderRadius: 2,
        mb: 2,
        fontSize: '0.95rem',
        '& .MuiAlert-message': {
          width: '100%',
          whiteSpace: 'pre-line',
        },
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  )
}
