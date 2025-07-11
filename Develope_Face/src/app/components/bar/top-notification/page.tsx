import { ExamTopNotificationBanner } from '@/shared/ui/Bar'
import { PreviewCodeInCompPage } from '@/shared/ui/preview'
import { StyleExamCode, TopNotificationExamCode } from './examCode'

export default function TopNotificationBarPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ExamTopNotificationBanner />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '30px',
          marginTop: '100px',
        }}
      >
        <PreviewCodeInCompPage
          examCode={TopNotificationExamCode}
          title={'코드'}
        />
        <PreviewCodeInCompPage examCode={StyleExamCode} title={'CSS'} />
      </div>
    </div>
  )
}
