"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./ScrollArrow.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ScrollArrow() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress bar animation
      gsap.to(overlayRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          onUpdate: (self) => {
            // Check if we are at the bottom (99% for safety)
            const progress = self.progress;
            if (progress > 0.98) {
              setIsAtBottom(true);
            } else {
              setIsAtBottom(false);
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: 0,
      ease: "power4.inOut"
    });
  };

  return (
    <div 
      ref={containerRef} 
      className={`${styles.scrollIndicator} ${isVisible ? styles.visible : ""} ${isAtBottom ? styles.atBottom : ""}`}
      onClick={handleClick}
    >
      <div className={styles.arrow}>
        <div ref={overlayRef} className={styles.progressOverlay} />
        <div 
          ref={iconRef} 
          className={styles.arrowIcon}
          style={{ transform: isAtBottom ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <span>↓</span>
        </div>
      </div>
    </div>
  );
}
