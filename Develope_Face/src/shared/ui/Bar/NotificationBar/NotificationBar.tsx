'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NotificationBar.css'

const notifications = [
  { id: 1, status: '성공', message: '데이터 업로드가 완료되었습니다.' },
  { id: 2, status: '진행중', message: '파일을 처리하는 중입니다...' },
  { id: 3, status: '실패', message: '일부 항목을 불러오지 못했습니다.' },
]

export function NotificationBar() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="notification-bar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="notification-header">
            <span className="notification-title">알림 메시지창</span>
            <button className="hide-button" onClick={() => setVisible(false)}>
              숨기기
            </button>
          </div>
          <ul className="notification-list">
            {notifications.map((note) => (
              <li key={note.id} className={`notification-item ${note.status}`}>
                <span className="status">{note.status}</span>
                <span className="message">{note.message}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
