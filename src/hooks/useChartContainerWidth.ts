import { useState, useEffect, useCallback, type RefObject } from 'react';

/**
 * Hook sử dụng ResizeObserver để theo dõi width của container element.
 * Dùng cho MUI X Charts vì chúng cần giá trị width cụ thể (px), không hỗ trợ "100%".
 *
 * Sử dụng Math.floor và threshold để tránh infinite resize loop.
 *
 * @param containerRef - ref trỏ đến container element
 * @param defaultWidth - width mặc định khi chưa đo được (default: 400)
 * @returns width hiện tại của container (px)
 */
export const useChartContainerWidth = (
  containerRef: RefObject<HTMLElement | null>,
  defaultWidth = 400,
): number => {
  const [width, setWidth] = useState(defaultWidth);

  const updateWidth = useCallback((newWidth: number) => {
    const floored = Math.floor(newWidth);
    if (floored > 0) {
      setWidth((prev) => {
        // Chỉ cập nhật nếu chênh lệch > 2px — tránh vòng lặp sub-pixel
        if (Math.abs(prev - floored) > 2) {
          return floored;
        }
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      // Sử dụng requestAnimationFrame để tránh "ResizeObserver loop" warning
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          updateWidth(entry.contentRect.width);
        }
      });
    });

    observer.observe(element);

    // Đo ngay lần đầu
    updateWidth(element.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, [containerRef, updateWidth]);

  return width;
};
