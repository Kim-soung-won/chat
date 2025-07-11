'use client'
import { useSnackbar } from '@/shared/ui/Bar'
import { PreviewCodeInCompPage } from '@/shared/ui/preview'
import { Button, SnackbarOrigin } from '@mui/material'
import { examCode, examCode2 } from './examCode'

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '30px',
        }}
      >
        <PreviewCodeInCompPage examCode={examCode2} title={'호출 코드'} />

        <PreviewCodeInCompPage examCode={examCode} title={'Provider 코드'} />
      </div>
    </div>
  )
}
