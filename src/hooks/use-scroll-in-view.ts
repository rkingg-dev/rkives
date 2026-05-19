"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollInView(
  scrollRef: React.RefObject<HTMLDivElement | null> | null,
  options?: { amount?: number }
) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [distToCenter, setDistToCenter] = useState(Infinity);

  useEffect(() => {
    const container = scrollRef?.current;
    const item = itemRef.current;
    if (!container || !item) return;

    let animFrame = 0;

    function check() {
      if (!container || !item) return;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const containerCenter = containerRect.top + containerRect.height / 2;
      const itemCenter = itemRect.top + itemRect.height / 2;

      setDistToCenter(Math.abs(itemCenter - containerCenter));
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
  }, [scrollRef]);

  return { ref: itemRef, distToCenter };
}
