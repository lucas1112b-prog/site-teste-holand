"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./InitialTransition.module.css";
import { useTransition } from "@/context/TransitionContext";

const ROWS = 7;
const COLS = 13;

export default function InitialTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { isTransitioning } = useTransition();
  const cellsRef = useRef<HTMLDivElement[]>([]);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Create cells
    const totalCells = ROWS * COLS;
    overlayRef.current.style.setProperty("--columns", COLS.toString());
    
    overlayRef.current.innerHTML = "";
    cellsRef.current = [];

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = styles.cell;
      overlayRef.current.appendChild(cell);
      cellsRef.current.push(cell);
    }

    // Initial state: fully visible (black screen)
    gsap.set(overlayRef.current, { pointerEvents: "all", visibility: "visible", backgroundColor: "transparent" });
    gsap.set(cellsRef.current, {
      scale: 1.01,
      opacity: 1,
      backgroundColor: "#000000"
    });

    // Animate out (Reveal site) - ALWAYS happens on mount
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        gsap.set(overlayRef.current, { pointerEvents: "none" });
        isFirstMount.current = false;
      }
    });

    tl.to(cellsRef.current, {
      duration: 0.6,
      ease: "power3.inOut",
      scale: 0,
      opacity: 0,
      stagger: {
        grid: [ROWS, COLS],
        from: "center",
        each: 0.035
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Handle the "Closing" animation when navigating away
  useEffect(() => {
    // Only run closing animation if it's NOT the first mount and isTransitioning is true
    if (isTransitioning && !isFirstMount.current && cellsRef.current.length > 0) {
      gsap.set(overlayRef.current, { pointerEvents: "all", visibility: "visible" });
      
      gsap.fromTo(cellsRef.current, 
        { scale: 0, opacity: 0 },
        {
          duration: 0.5,
          ease: "power2.inOut",
          scale: 1.01,
          opacity: 1,
          stagger: {
            grid: [ROWS, COLS],
            from: "center",
            amount: 0.5
          }
        }
      );
    }
  }, [isTransitioning]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
    />
  );
}
