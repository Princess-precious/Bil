/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 07/09/2026 - 08:11:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useEffect, useRef } from "react";

type Direction = "left" | "right" | "top" | "bottom";

export function useScrollAnimation<T extends HTMLElement>(
  direction: Direction
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const animationClass = `animate-slide-${direction}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove(animationClass);

          // Force the browser to restart the animation
          void element.offsetWidth;

          element.classList.add(animationClass);
        } else {
          // Reset so it can animate again when scrolling back
          element.classList.remove(animationClass);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [direction]);

  return elementRef;
}