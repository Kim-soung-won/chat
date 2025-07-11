'use client'
import { motion, useScroll } from 'framer-motion'

/**
 * 상단 스크롤 애니메이션 컴포넌트
 */
export function ScrollAnimation() {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  })

  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        originX: 0,
        marginTop: 60,
        backgroundColor: '#ff0088',
      }}
    />
  )
}
