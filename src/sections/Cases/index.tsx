"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Cases.module.css";

gsap.registerPlugin(ScrollTrigger);

const CASES_DATA = [
  {
    id: "01",
    name: "Polimold",
    tags: ["TopSolid CAD", "CAM"],
    logo: "/images/logo-holand.png" // Placeholder as requested
  },
  {
    id: "02",
    name: "Nidec",
    tags: ["TopSolid CAD", "CAM"],
    logo: "/images/logo-holand.png" // Placeholder as requested
  },
  {
    id: "03",
    name: "Vama Ferramentaria",
    tags: ["TopSolid CAD", "CAM"],
    logo: "/images/logo-holand.png" // Placeholder as requested
  }
];

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning and Blur effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          // Apply progressive blur based on progress after start point
          const blurAmount = self.progress * 15;
          if (contentRef.current) {
            contentRef.current.style.filter = `blur(${blurAmount}px)`;
            contentRef.current.style.opacity = `${1 - self.progress * 0.5}`;
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cases" ref={sectionRef} className={styles.cases}>
      <div ref={contentRef} className={styles.contentWrapper}>
        {/* Decorative Corner SVG (Section Level) */}
        <div className={styles.cornerDecoration}>
          <svg width="60" height="60" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H110.427V110.427L0 0Z" fill="#000" />
          </svg>
        </div>

        <div className={styles.container}>
          {/* Decorative Corner SVG (Container Level) */}
          <div className={styles.cornerDecoration} style={{ zIndex: 5, pointerEvents: 'none' }}>
            <svg width="40" height="40" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H110.427V110.427L0 0Z" fill="#f8f8f8" />
            </svg>
          </div>

          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <span className={styles.label}>Nossos Resultados</span>
              <h2 className={styles.title}>Cases<br /> de Sucesso</h2>
            </div>
          </div>

          <div className={styles.casesGrid}>
            {CASES_DATA.map((item) => (
              <div key={item.id} className={styles.caseCard}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={160}
                    height={60}
                    className={styles.logoImg}
                  />
                </div>
                <div className={styles.caseInfo}>
                  <h3 className={styles.caseName}>{item.name}</h3>
                  <div className={styles.tags}>
                    {item.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
