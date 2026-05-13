"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Services.module.css"; // Keep using same styles for consistency

gsap.registerPlugin(ScrollTrigger);

const METHODOLOGIES_DATA = [
  {
    id: "01",
    subtitle: "building dreams.",
    title: "Tecnologia",
    desc: "Soluções nativamente integradas, com rastreabilidade e foco na melhoria contínua dos processos.",
    image: "/images/method-tech.png",
    cta: "VER DETALHES"
  },
  {
    id: "02",
    subtitle: "building dreams.",
    title: "Treinamentos",
    desc: "Capacitação técnica conduzida pela Holand, com metodologia prática e aprendizado real.",
    image: "/images/method-training.png",
    cta: "SOLICITAR TREINAMENTO"
  },
  {
    id: "03",
    subtitle: "building dreams.",
    title: "Automações",
    desc: "Automações inteligentes que transformam rotinas repetitivas em processos eficientes dentro do software.",
    image: "/images/method-auto.png",
    cta: "EXPLORAR AUTOMAÇÕES"
  },
  {
    id: "04",
    subtitle: "building dreams.",
    title: "Consultoria",
    desc: "Consultoria contínua para evolução, padronização e melhoria constante dos processos.",
    image: "/images/method-consult.png",
    cta: "FALE COM UM CONSULTOR"
  }
];

export default function Methodologies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter((c) => c !== null);

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        // Stacking Pinning
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          endTrigger: containerRef.current,
          end: "bottom bottom",
          invalidateOnRefresh: true,
        });

        // Scale reduction animation for cards behind
        if (!isLast) {
          gsap.to(card.querySelector(`[class*="card"]`), {
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.services}>
      {/* Introduction Header for Methodologies */}
      <div className={styles.methodologiesHeader}>
        <h2 className={styles.headerTitle}>Metodologias de aplicação Holand</h2>
        <p className={styles.headerSubtitle}>
          Soluções tecnológicas completas e integradas para diferentes segmentos industriais, sempre com foco na eficiência e inovação.
        </p>
      </div>

      {METHODOLOGIES_DATA.map((method, index) => (
        <div
          key={method.id}
          ref={(el) => { cardsRef.current[index] = el; }}
          className={styles.cardWrapper}
          style={{ zIndex: index + 1 }}
        >
          <div className={styles.card}>
            {/* Left Column: Number and Arrow */}
            <div className={styles.leftCol}>
              <span className={styles.number}>{method.id} /</span>
              <div className={styles.redBox}>
                <span className={styles.arrowIcon}>↓</span>
              </div>
            </div>

            {/* Middle Column: Image */}
            <div className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                <Image
                  src={method.image}
                  alt={method.title}
                  fill
                  className={styles.img}
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className={styles.contentCol}>
              <div className={styles.content}>
                <span className={styles.subtitle}>{method.subtitle}</span>
                <h2 className={styles.title}>{method.title}</h2>
                <p className={styles.desc}>{method.desc}</p>

                <button className={styles.cta}>
                  <span>{method.cta}</span>
                  <div className={styles.ctaArrow}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4113 18.3491L15.456 9.30439H7.70339L7.63694 8.26333H17.2354V17.8618L16.1943 17.7953V10.0427L7.14964 19.0874L6.4113 18.3491Z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
