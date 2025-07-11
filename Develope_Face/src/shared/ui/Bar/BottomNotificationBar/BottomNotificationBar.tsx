'use client'
import type { ReactNode } from 'react'
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
import type { SnackbarOrigin } from '@mui/material'
import { Snackbar, Alert, Typography } from '@mui/material'

interface SnackbarProviderProps {
  children: ReactNode
}

/**
 * @param message: Toast에 표출될 메세지
 * @param severity: Toast에 표출될 아이콘
 * @param anchorOrigin: Toast 발생 위치
 */
type SnackbarData = {
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  anchorOrigin?: SnackbarOrigin
}

type SnackbarContextType = {
  showSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info',
    anchorOrigin?: SnackbarOrigin,
  ) => void
  hideSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}: SnackbarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null)

  const showSnackbar = useCallback(
    (
      message: string,
      severity: 'success' | 'error' | 'warning' | 'info',
      anchorOrigin?: SnackbarOrigin,
    ) => {
      setSnackbarData({ message, severity, anchorOrigin })
      setIsOpen(true)
    },
    [],
  )

  const hideSnackbar = useCallback(() => {
    setIsOpen(false)
    setSnackbarData(null)
  }, [])

  const handleClose = useCallback(
    (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      hideSnackbar()
    },
    [hideSnackbar],
  )

  const value = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
    }),
    [showSnackbar, hideSnackbar],
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbarData && (
        <Snackbar
          open={isOpen}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={
            snackbarData.anchorOrigin
              ? snackbarData.anchorOrigin
              : { vertical: 'top', horizontal: 'center' }
          }
        >
          <Alert
            onClose={handleClose}
            severity={snackbarData.severity}
            sx={{
              width: '100%',
              padding: '18px 68px 18px 68px',
              borderRadius: '60px',
              boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.1)',
              background: 'rgba(26, 28, 30, 0.85)',
              color: '#fff',
              marginTop: '40px',
              marginBottom: '40px',
            }}
            variant="filled"
          >
            <Typography>{snackbarData.message}</Typography>
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext)
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
