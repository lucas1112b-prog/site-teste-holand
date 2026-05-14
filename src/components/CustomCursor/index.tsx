"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorState = useRef({
    tx: { prev: 0, curr: 0, amt: 0.2 },
    ty: { prev: 0, curr: 0, amt: 0.2 },
    scale: { prev: 1, curr: 1, amt: 0.15 },
    opacity: { prev: 0, curr: 0, amt: 0.1 }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      cursorState.current.scale.curr = 1.5;
      cursorState.current.opacity.curr = 0.5;
    };

    const handleMouseLeave = () => {
      cursorState.current.scale.curr = 1;
      cursorState.current.opacity.curr = 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial positioning on first move
    const onFirstMove = () => {
      if (cursorRef.current) {
        const bounds = cursorRef.current.getBoundingClientRect();
        cursorState.current.tx.prev = cursorState.current.tx.curr = mousePos.current.x - bounds.width / 2;
        cursorState.current.ty.prev = cursorState.current.ty.curr = mousePos.current.y - bounds.height / 2;
        cursorState.current.opacity.curr = 1;
      }
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    // Add listeners to all interactive elements
    const updateLinks = () => {
      const links = document.querySelectorAll("a, button, [role='button']");
      links.forEach(link => {
        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial update and MutationObserver to handle dynamic content
    updateLinks();
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    let animationFrame: number;
    const render = () => {
      if (cursorRef.current) {
        const bounds = cursorRef.current.getBoundingClientRect();
        
        // Update targets
        cursorState.current.tx.curr = mousePos.current.x - bounds.width / 2;
        cursorState.current.ty.curr = mousePos.current.y - bounds.height / 2;

        // Lerp values
        cursorState.current.tx.prev = lerp(cursorState.current.tx.prev, cursorState.current.tx.curr, cursorState.current.tx.amt);
        cursorState.current.ty.prev = lerp(cursorState.current.ty.prev, cursorState.current.ty.curr, cursorState.current.ty.amt);
        cursorState.current.scale.prev = lerp(cursorState.current.scale.prev, cursorState.current.scale.curr, cursorState.current.scale.amt);
        cursorState.current.opacity.prev = lerp(cursorState.current.opacity.prev, cursorState.current.opacity.curr, cursorState.current.opacity.amt);

        // Apply styles
        cursorRef.current.style.transform = `translate3d(${cursorState.current.tx.prev}px, ${cursorState.current.ty.prev}px, 0) scale(${cursorState.current.scale.prev})`;
        cursorRef.current.style.opacity = cursorState.current.opacity.prev.toString();
      }
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", onFirstMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.inner} />
    </div>
  );
}
