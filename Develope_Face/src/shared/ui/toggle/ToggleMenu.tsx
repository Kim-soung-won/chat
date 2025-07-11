'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styles from './ToggleMenu.module.css'
import { Portal } from '../Portal'

type MenuItem = {
  label: string
  url: string
  icon?: ReactNode
}

interface SideMenuProps {
  item: MenuItem
  children?: MenuItem[]
}

/**
 * 마우스를 올리면 하위 메뉴 리스트를 표시하는 사이드 메뉴 컴포넌트입니다.
 * @param title - 메뉴의 제목
 * @param menuItems - 하위 메뉴 아이템 목록
 */
const ToggleMenu: React.FC<SideMenuProps> = ({
  item,
  children,
}: SideMenuProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  )

  const handleMouseEnter = () => {
    // 2. 마우스를 올리면 위치를 계산하고 메뉴를 표시
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.top + window.scrollY, // right 대신 top 사용 (사이드 메뉴이므로)
        left: rect.right + window.scrollX, // left 대신 right 사용 (오른쪽에 표시)
      })
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    // 3. 마우스를 떼면 메뉴를 숨김
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.titleContainer}>{item.label}</div>
      {isHovered && children && children.length > 0 && (
        <Portal>
          <ul
            className={styles.menu}
            style={{
              position: 'absolute',
              top: `${coords?.top}px`,
              left: `${coords?.left}px`,
            }}
          >
            {children?.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <a href={item.url} className={styles.menuLink}>
                  {item.icon && (
                    <span className={styles.icon}>{item.icon}</span>
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Portal>
      )}
    </div>
  )
}

export default ToggleMenu
