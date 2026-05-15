"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Image from "next/image";
import styles from "@/sections/Hero/Hero.module.css";
import Menu from "@/components/Menu";
import BlogPosts from "@/sections/BlogPosts";
import Footer from "@/sections/Footer";

const Waves = dynamic(() => import("@/components/Waves/Waves"), {
  ssr: false,
  loading: () => <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
});

export default function BlogPage() {
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1 });

      tl.to(logoRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
      tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, 0.2);
      tl.fromTo(descriptionRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.4);
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#0a0a0a' }}>
      <Menu />
      
      {/* Blog Hero */}
      <section ref={containerRef} className={styles.hero}>
        <div ref={wavesRef} className={styles.wavesContainer}>
          {isMobile ? (
            <div className={styles.videoWrapper}>
              <video autoPlay loop muted playsInline className={styles.mobileVideo}>
                <source src="https://tnhsnomywtvafewnhakl.supabase.co/storage/v1/object/public/video%20teste%20site%20holand(nao%20tem%20nada%20a%20ver%20com%20a%20NoBother)/mobile-waves.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <Waves
              lineColor="rgba(255, 255, 255, 0.4)" // White waves for blog
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
          <a href="/">
            <Image src="/images/logo-morgan.png" alt="Morgan Logo" width={180} height={40} priority className={styles.logoImg} />
          </a>
        </div>

        <div className={styles.content}>
          <div ref={descriptionRef} className={styles.description}>
            <p className={styles.descTop}>Insights & Conhecimento</p>
            <p className={styles.descBottom}>Onde a tecnologia encontra a engenharia.</p>
          </div>

          <h1 ref={titleRef} className={styles.title}>
            Blog
          </h1>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <BlogPosts />

      <Footer />
    </main>
  );
}
