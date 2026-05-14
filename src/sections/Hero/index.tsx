"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Image from "next/image";
import styles from "./Hero.module.css";

// Lazy load complex canvas animation to improve TBT and LCP
const Waves = dynamic(() => import("@/components/Waves/Waves"), { 
  ssr: false,
  loading: () => <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile for performance optimization
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
      // General Intro Timeline starting after preloader
      const tl = gsap.timeline({ delay: 1.2 });

      // Logo Animation
      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }, 0);

      // Main Title Animation
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        }, 0.2
      );

      // Description Animation
      tl.fromTo(descriptionRef.current, 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }, 0.4
      );

      // Scroll Indicator
      tl.to(scrollRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 0.8);

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div ref={wavesRef} className={styles.wavesContainer}>
        {isMobile ? (
          <div className={styles.videoWrapper}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.mobileVideo}
            >
              <source 
                src="https://tnhsnomywtvafewnhakl.supabase.co/storage/v1/object/public/video%20teste%20site%20holand(nao%20tem%20nada%20a%20ver%20com%20a%20NoBother)/mobile-waves.webm" 
                type="video/webm" 
              />
            </video>
          </div>
        ) : (
          <Waves 
            lineColor="rgba(239, 47, 15, 0.4)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        )}
      </div>

      <div ref={logoRef} className={styles.logo}>
        <Image 
          src="/images/logo-holand.png" 
          alt="Holand Logo" 
          width={180} 
          height={40} 
          priority
          className={styles.logoImg}
        />
      </div>

      <div className={styles.content}>
        <div ref={descriptionRef} className={styles.description}>
          <p className={styles.descTop}>Tecnologia & Consultoria para</p>
          <p className={styles.descBottom}>Engenharia e Manufatura Industrial</p>
        </div>

        <h1 ref={titleRef} className={styles.title}>
          building dreams.
        </h1>
      </div>

      <div ref={scrollRef} className={styles.scrollIndicator}>
        <div className={styles.arrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
