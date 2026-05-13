"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./ServicesAccordion.module.css";

const SEGMENTOS = [
  {
    id: "01",
    title: "Aeroespacial",
    content: "A indústria aeroespacial trabalha com tolerâncias extremamente restritas, materiais especiais e geometrias altamente complexas. Qualquer falha de processo pode comprometer segurança, certificação e desempenho do componente. O desafio está no controle absoluto de cada etapa, do projeto à usinagem final.\n\nA Holand aplica tecnologia avançada em simulação, usinagem multieixos e controle de processo, garantindo confiabilidade total na fabricação de componentes críticos. Isso resulta em máxima precisão, conformidade técnica rigorosa e segurança operacional em aplicações onde erro não é uma opção."
  },
  {
    id: "02",
    title: "Ferramentaria",
    content: "A ferramentaria moderna lida com geometrias complexas, ajustes finos e ciclos de desenvolvimento cada vez mais curtos. O desafio está em garantir precisão absoluta desde o projeto até a usinagem, evitando retrabalho, correções manuais e perda de tempo entre engenharia e produção.\n\nA Holand atua com tecnologia aplicada à engenharia de moldes, matrizes e ferramental complexo, integrando CAD, CAM e processos de fabricação em um fluxo contínuo. Isso permite simulações confiáveis, programação CNC precisa e maior previsibilidade no resultado final, assegurando ferramentas mais duráveis, estáveis e com menor custo de desenvolvimento."
  },
  {
    id: "03",
    title: "Automotivo",
    content: "O setor automotivo exige escala, padronização e repetibilidade, ao mesmo tempo em que lida com prazos agressivos e constante evolução de produtos. Um dos grandes desafios é manter a consistência entre engenharia, ferramental e produção, evitando variações que geram retrabalho e perdas ao longo da cadeia.\n\nA Holand aplica tecnologia para integrar engenharia e chão de fábrica, estruturando processos digitais que garantem controle total do desenvolvimento de peças, dispositivos e ferramental. O resultado é maior produtividade, redução de falhas, previsibilidade nos ciclos produtivos e padronização industrial em ambientes de alta demanda."
  },
  {
    id: "04",
    title: "Equipamentos Industriais",
    content: "A fabricação de equipamentos industriais envolve grandes montagens, múltiplos componentes e a interação entre diversos sistemas mecânicos. Um dos principais desafios do segmento é trabalhar com conjuntos complexos sem perder desempenho, estabilidade do software e controle de versões, especialmente em projetos de grande porte.\n\nA Holand atua com tecnologia aplicada à gestão da engenharia, programação CNC e integração de processos, utilizando cinemáticas de máquina para garantir total aderência entre projeto e fabricação. Isso permite trabalhar com montagens robustas de forma fluida, segura e estável. A aplicação correta do software assegura desempenho consistente, redução de erros de interface entre componentes e total previsibilidade no funcionamento do equipamento como um todo."
  },
  {
    id: "05",
    title: "Metalmecânico",
    content: "O segmento metalmecânico vai além da usinagem de peças individuais, exigindo integração entre conjuntos, estruturas e sistemas mecânicos completos. O principal desafio está em garantir que todas as partes funcionem de forma coordenada, mantendo precisão dimensional, robustez estrutural e eficiência produtiva.\n\nA Holand utiliza tecnologia para conectar engenharia e fabricação de conjuntos mecânicos, assegurando consistência entre projeto, usinagem e montagem. Com processos digitais bem definidos, é possível reduzir ajustes em campo, aumentar a confiabilidade do conjunto e obter maior controle sobre o desempenho do sistema final."
  },
  {
    id: "06",
    title: "Metalúrgica",
    content: "A metalurgia enfrenta desafios constantes relacionados ao aproveitamento de material, precisão de corte e eficiência em processos de chaparia e conformação. Trabalhar com chapas, bobinas e perfis exige controle rigoroso para evitar desperdícios e retrabalhos em grandes volumes.\n\nA Holand atua com tecnologia aplicada à engenharia e programação de processos metalúrgicos, integrando corte, dobra e montagem de estruturas metálicas e conjuntos soldados. O foco está na otimização do uso de material, ganho de produtividade e padronização dos processos industriais."
  },
  {
    id: "07",
    title: "Moveleiro",
    content: "A indústria moveleira precisa equilibrar escala, personalização e qualidade de acabamento, lidando com altos volumes e margens cada vez mais competitivas. Um dos principais desafios é manter eficiência e repetibilidade sem perder flexibilidade produtiva.\n\nA Holand aplica tecnologia de automação e integração CAD/CAM para transformar processos produtivos em fluxos inteligentes e padronizados. Isso permite maior controle da produção, redução de desperdícios, melhor aproveitamento de material e ganho real de escala com qualidade constante."
  }
];

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    SEGMENTOS.forEach((_, index) => {
      const content = contentRefs.current[index];
      const icon = iconRefs.current[index];

      if (content && icon) {
        if (activeIndex === index) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
          gsap.to(icon, {
            rotation: 180,
            duration: 0.3
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          });
          gsap.to(icon, {
            rotation: 0,
            duration: 0.3
          });
        }
      }
    });
  }, [activeIndex]);

  return (
    <section className={styles.servicesAccordion}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Nossa Atuação</span>
          <h2 className={styles.title}>Segmentos de Atuação</h2>
        </div>

        <div className={styles.accordionList}>
          {SEGMENTOS.map((segmento, index) => (
            <div 
              key={segmento.id} 
              className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ""}`}
            >
              <button 
                className={styles.accordionHeader} 
                onClick={() => toggleAccordion(index)}
              >
                <div className={styles.headerLeft}>
                  <span className={styles.number}>{segmento.id}</span>
                  <h3 className={styles.serviceTitle}>{segmento.title}</h3>
                </div>
                <span 
                  ref={(el) => { iconRefs.current[index] = el; }} 
                  className={styles.icon}
                >
                  ↓
                </span>
              </button>
              <div 
                ref={(el) => { contentRefs.current[index] = el; }} 
                className={styles.accordionContent}
              >
                <div className={styles.contentInner}>
                  <p>{segmento.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
