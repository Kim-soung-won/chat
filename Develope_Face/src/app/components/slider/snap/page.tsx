import { SnapSliderExam } from '@/components/preview-components/slider'
import { PreviewCodeInCompPage } from '@/shared/ui/preview'
import { SliderPageExamCode, SliderPageExamCodeUsed } from './examCode'

export default function SliderPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SnapSliderExam />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '30px',
        }}
      >
        <PreviewCodeInCompPage
          examCode={SliderPageExamCodeUsed}
          title={'호출'}
        />
        <PreviewCodeInCompPage
          examCode={SliderPageExamCode}
          title={'슬라이더'}
        />
      </div>
    </div>
  )
}
