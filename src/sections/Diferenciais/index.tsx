"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Diferenciais.module.css";

import Logo3D from "@/components/Logo3D";


gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "15+", label: "Anos de experiência" },
  { value: "750+", label: "Projetos entregues" },
  { value: "30+", label: "Empresas parceiras" },
  { value: "30+", label: "Soluções" },
];

function Counter({ value, label }: { value: string; label: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const target = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!numberRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(obj.val).toString();
        }
      },
    });
  }, [target]);

  return (
    <div className={styles.statCard}>
      <div className={styles.statContent}>
        <span className={styles.statValue}>
          <span ref={numberRef}>0</span>
          {suffix}
        </span>
        <span className={styles.statLabel}>{label}</span>
      </div>
    </div>
  );
}

export default function Diferenciais() {
  return (
    <section className={styles.diferenciais}>
      <div className={styles.container}>
        {/* Header Centralizado */}
        <div className={styles.header}>
          <h2 className={styles.title}>Por que nos escolher?</h2>
          <p className={styles.text}>
            Somos especializados na representação comercial de soluções tecnológicas para a indústria.
            Nossa expertise se concentra na implementação de tecnologias de ponta,
            auxiliando como <strong>representante oficial da TopSolidBrasil</strong>.
          </p>
        </div>

        {/* Área Visual Central */}
        <div className={styles.visualArea}>
          <div className={styles.backCircle}></div>

          {/* Texto Circular */}
          <div className={styles.circularTextWrapper}>
            <svg viewBox="0 0 500 500" className={styles.circularTextSvg}>
              <path
                id="circlePath"
                d="M 250, 250 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0"
                fill="transparent"
              />
              <text className={styles.circularText}>
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  EFICIÊNCIA EM TRANSFORMAR COMPLEXIDADE • EFICIÊNCIA EM TRANSFORMAR COMPLEXIDADE •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Logo 3D */}
          <div className={styles.logoContainer}>
            <Logo3D scale={0.42} cameraZ={400} />
          </div>
        </div>

        {/* Stats Inferiores */}
        <div className={styles.footer}>
          <div className={styles.statsGrid}>
            {STATS.map((stat, index) => (
              <Counter key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Corner SVG - Top Right */}
        <div className={styles.topRightCorner}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_24_236_diff)">
              <path d="M0 0H110.427V110.427L0 0Z" fill="#0A0A0A" />
            </g>
            <defs>
              <clipPath id="clip0_24_236_diff">
                <rect width="110.427" height="110.427" fill="white" transform="matrix(-1 0 0 1 110.427 0)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
