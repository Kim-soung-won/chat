export const examCode = `'use client'
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
`

export const examCode2 = `'use client'
import { useSnackbar } from '@/shared/ui/Bar'
import { Button } from '@mui/material'

export default function BottomNotificationPage() {
  const { showSnackbar } = useSnackbar()
  /**
   * SnackbarOrigin: 위, 아래, 왼쪽, 오른쪽, 가운대 위치 지정
   * @param vertical: "bottom" | "top"
   * @param horizontal: "center | left | right"
   */
  const show = (
    vertical: 'bottom' | 'top',
    horizontal: 'center' | 'left' | 'right',
  ) => {
    showSnackbar('보이시나요??', 'warning', {
      vertical: vertical,
      horizontal: horizontal,
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <Button onClick={() => show('top', 'center')}>
        가운데 상단 알림창 보이기
      </Button>
      <Button onClick={() => show('bottom', 'center')}>
        가운데 하단 알림창 보이기
      </Button>
    </div>
  )
}
`
