'use client'
import ToggleMenu from '@/shared/ui/toggle/ToggleMenu'

const ToggleMenuPage = () => {
  const menu = {
    label: '내 메뉴',
    url: '/components/toggle/menu',
  }
  const child = [
    {
      label: '하위 메뉴 1',
      url: '/components/toggle/menu',
    },
    {
      label: '하위 메뉴 2',
      url: '/components/toggle/menu',
    },
    {
      label: '하위 메뉴 3',
      url: '/components/toggle/menu',
    },
  ]

  return (
    <div style={{ padding: '50px' }}>
      <h1>Hover Event 토글 메뉴 테스트 페이지</h1>
      <div style={{ marginTop: '30px' }}>
        <ToggleMenu item={menu} children={child} />
      </div>
    </div>
  )
}

export default ToggleMenuPage
