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
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.27621 2.09808e-05L8.27621 14.3889L1.66703 7.7797L-4.00543e-05 9.4586L9.45854 18.9172L18.9171 9.4586L17.25 7.79152L10.6409 14.3889L10.6409 2.09808e-05H8.27621Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
