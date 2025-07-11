export const TopNotificationExamCode = `'use client'
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
`

export const StyleExamCode = `.top-notification-banner {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 80px;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;

  background: rgba(220, 240, 255, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(150, 200, 255, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 16px 20px;
  z-index: 1000;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-title {
  font-size: 15px;
  font-weight: 500;
  color: #1a3f87;
  letter-spacing: 0.2px;
}

.hide-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #2c6ef2;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.hide-btn:hover {
  background: rgba(100, 150, 255, 0.1);
  color: #1e4ecc;
}

.reopen-btn {
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2c6ef2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: background 0.3s ease;
}

.reopen-btn:hover {
  background-color: #1d4fdc;
}
`
