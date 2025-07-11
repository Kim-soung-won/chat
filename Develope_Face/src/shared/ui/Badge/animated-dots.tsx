import React from 'react'
import { motion } from 'framer-motion'

/**
 * isPending 노란색 점 애니메이션
 */
export const AnimatedDots = () => {
  const [dotCount, setDotCount] = React.useState(1)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])
  return (
    <motion.span
      style={{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fbc02d', // 노란색
        display: 'inline-block',
        width: 20,
        textAlign: 'center',
      }}
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
    >
      {'.'.repeat(dotCount)}
    </motion.span>
  )
}
