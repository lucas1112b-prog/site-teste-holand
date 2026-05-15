"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import { TransitionLink } from "@/components/PageTransition";
import { usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { startTransition } = useTransition();

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (pathname !== '/') {
      startTransition('/');
      return;
    }

    gsap.to(window, {
      duration: 1.5,
      scrollTo: id,
      ease: "power4.inOut"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(circleRef.current, 
        { 
          scale: 0.5, 
          y: 100,
          opacity: 0 
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.2,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className={styles.footer}>
      {/* Decorative Circle Background */}
      <div ref={circleRef} className={styles.footerCircle} />

      {/* Giant Logo Watermark */}
      <div className={styles.giantLogoContainer}>
        <h2 className={styles.giantLogo}>MORGAN</h2>
      </div>

      {/* Navigation and Info Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          ©{currentYear} MORGAN & CO. TODOS OS DIREITOS RESERVADOS.
        </div>

        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink} onClick={(e) => handleScroll(e, '#about')}>Sobre</a>
          <a href="#services" className={styles.navLink} onClick={(e) => handleScroll(e, '#services')}>Serviços</a>
          <a href="#cases" className={styles.navLink} onClick={(e) => handleScroll(e, '#cases')}>Cases</a>
          <TransitionLink href="/blog" className={styles.navLink}>Blog</TransitionLink>
          <a href="#top" className={styles.navLink} onClick={(e) => handleScroll(e, '#top')}>Contato</a>
        </nav>

        <div className={styles.legal}>
          <a href="#" className={styles.legalLink}>Políticas de Privacidade</a>
          <a href="#" className={styles.legalLink}>Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
