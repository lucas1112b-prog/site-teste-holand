"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./InitialTransition.module.css";

const ROWS = 7;
const COLS = 13;

export default function InitialTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Create cells
    const cells: HTMLDivElement[] = [];
    const totalCells = ROWS * COLS;
    
    // Set columns variable for CSS grid
    overlayRef.current.style.setProperty("--columns", COLS.toString());

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = styles.cell;
      overlayRef.current.appendChild(cell);
      cells.push(cell);
    }

    // Initial state: fully visible (black screen)
    gsap.set(cells, { 
      scale: 1.01, 
      opacity: 1,
      backgroundColor: "#000000" // Cor de fundo da transição
    });

    // Animate out (Reveal site)
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        setIsVisible(false);
      }
    });

    tl.to(cells, {
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

  if (!isVisible) return null;

  return (
    <div 
      ref={overlayRef} 
      className={styles.overlay} 
      aria-hidden="true"
    />
  );
}
