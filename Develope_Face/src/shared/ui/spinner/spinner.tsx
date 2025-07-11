"use client";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

interface LoadingCircleSpinnerProps {
  size?: number
  isLoading?: boolean
}

export function LoadingCircleSpinner({
  size = 40,
  isLoading = true
}: LoadingCircleSpinnerProps) {
  // MUI 테마 가져오기
  const theme = useTheme();
  
  // 테마 모드에 따라 기본 색상 설정 (color prop이 없을 경우)
  const defaultColor = theme.palette.mode === 'dark' ? '#fff' : '#1976d2'; // MUI 기본 파란색
  const borderColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

  if (!isLoading) return null;

  const borderWidth = Math.max(2, size / 10);

  return (
    <div className="container">
      <motion.div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
          borderColor: borderColor,
          borderTopColor: defaultColor,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          gap: 10px;
        }
        .spinner {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

export default LoadingCircleSpinner;
