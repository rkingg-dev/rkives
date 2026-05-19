"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollInView(
  scrollRef: React.RefObject<HTMLDivElement | null> | null,
  options?: { amount?: number }
) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = scrollRef?.current;
    const item = itemRef.current;
    if (!container || !item) return;

    let animFrame = 0;

    function check() {
      if (!container || !item) return;
      const containerRect = container!.getBoundingClientRect();
      const itemRect = item!.getBoundingClientRect();

      // Item top relative to the scroll container's visible area
      const itemTop = itemRect.top - containerRect.top;
      const itemBottom = itemRect.bottom - containerRect.top;
      const containerHeight = containerRect.height;

      // Consider "in view" when the item's center is within the visible area
      const itemCenter = (itemTop + itemBottom) / 2;
      const threshold = containerHeight * (options?.amount ?? 0.3);

      setIsInView(
        itemCenter > threshold && itemCenter < containerHeight - threshold
      );
    }

    check();
    animFrame = window.requestAnimationFrame(check);
    container.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.cancelAnimationFrame(animFrame);
      container.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [scrollRef, options?.amount]);

  return { ref: itemRef, isInView };
}
