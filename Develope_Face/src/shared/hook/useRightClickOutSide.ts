"use client";
import { useEffect } from "react";

/**
 * Ref요소 외부 마우스 우클릭 감지 훅
 * @param ref - 감지할 DOM 요소의 Ref
 * @param handler - 우클릭 시 실행할 핸들러 함수
 */
export const useRightClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      // 오른쪽 버튼(우클릭)만 감지
      if (event.button !== 2) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, handler]);
};
