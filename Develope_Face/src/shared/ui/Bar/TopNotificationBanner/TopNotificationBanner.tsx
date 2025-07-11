'use client'
import { motion, AnimatePresence } from 'framer-motion'
import './TopNotificationBanner.css'
import { useTopNotificationStore } from '@/shared/store/notification'

export const TopNotificationBanner = () => {
  const { notification, close } = useTopNotificationStore()

  return (
    <>
      <AnimatePresence>
        {notification.active && (
          <motion.div
            className="top-notification-banner"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="banner-content">
              <span className="banner-title">{notification.message}</span>
              <button className="hide-btn" onClick={close}>
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const ExamTopNotificationBanner = () => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="top-notification-banner"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="banner-content">
            <span className="banner-title">상단 알림바 예제</span>
            <button className="hide-btn" onClick={close}>
              닫기
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
