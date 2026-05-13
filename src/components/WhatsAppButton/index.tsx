"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./WhatsAppButton.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Initial state: hidden below the screen
    gsap.set(buttonRef.current, { y: 100, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: "section:nth-of-type(2)", // Target the second section (About)
      start: "top 80%",
      onEnter: () => {
        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(buttonRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          pointerEvents: "none",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <a 
      ref={buttonRef}
      href="https://wa.me/5547991312378" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.whatsappBtn}
    >
      <span className={styles.text}>FALE COM UM ESPECIALISTA</span>
      <div className={styles.iconWrapper}>
        <Image 
          src="/images/logo-holand-icon.png" 
          alt="WhatsApp" 
          width={24} 
          height={24}
          className={styles.icon}
        />
      </div>
    </a>
  );
}
