"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin do conteúdo
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom 70%",
        pin: contentRef.current,
        pinSpacing: true,
      });

      // Animação de entrada
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 40%",
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.videoBackground}>
        <div className={styles.videoStickyWrapper}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          >
            <source 
              src="https://tnhsnomywtvafewnhakl.supabase.co/storage/v1/object/public/video%20teste%20site%20holand(nao%20tem%20nada%20a%20ver%20com%20a%20NoBother)/HOLAND-ANIMA.mp4" 
              type="video/mp4" 
            />
          </video>
          <div className={styles.overlay} />
        </div>
      </div>

      <div ref={contentRef} className={styles.content}>
        <h2 className={styles.title}>
          Conectando Tecnologia e <br /> Produção com Precisão.
        </h2>
      </div>
    </section>
  );
}
