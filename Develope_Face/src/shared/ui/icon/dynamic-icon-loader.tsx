import React, { Suspense, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton, SvgIconProps } from '@mui/material'
import { HelpCircle } from 'lucide-react'

interface DynamicIconProps extends SvgIconProps {
  iconName: string
  source: 'mui' | 'lucide'
}

const FallbackIcon = (props: SvgIconProps) => <HelpCircle {...props} />

export const DynamicIcon = ({
  iconName,
  source,
  ...props
}: DynamicIconProps) => {
  // 2. useMemo를 사용해 iconName이나 source가 바뀔 때만 동적 컴포넌트를 새로 생성
  const IconComponent = useMemo(() => {
    return dynamic(
      () => {
        const importPromise =
          source === 'lucide'
            ? import('lucide-react')
            : import('@mui/icons-material')

        // 3. import가 항상 컴포넌트를 반환하도록 수정
        return importPromise.then((mod: any) => {
          return mod[iconName] || FallbackIcon
        })
      },
      // 4. Suspense를 사용하므로 loading 옵션은 제거
    )
  }, [iconName, source])

  return (
    // 5. Suspense로 로딩 상태를 처리
    <Suspense fallback={<Skeleton variant="circular" width={24} height={24} />}>
      <IconComponent {...props} />
    </Suspense>
  )
}
