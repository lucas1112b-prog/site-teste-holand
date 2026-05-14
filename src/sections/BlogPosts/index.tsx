"use client";

import styles from "./BlogPosts.module.css";

const POSTS = [
  {
    id: 1,
    date: "12 MAI 2026",
    title: "O Futuro da Indústria 4.0 na Engenharia",
    excerpt: "Como a integração de sistemas nativos está transformando a produtividade nas grandes manufaturas.",
    category: "TECNOLOGIA"
  },
  {
    id: 2,
    date: "08 MAI 2026",
    title: "Otimização de Processos com TopSolid",
    excerpt: "Descubra como reduzir o tempo de usinagem em até 30% utilizando automações inteligentes.",
    category: "TREINAMENTOS"
  },
  {
    id: 3,
    date: "02 MAI 2026",
    title: "Consultoria: O Elo entre Projeto e Produção",
    excerpt: "A importância da padronização industrial para garantir a qualidade em projetos complexos.",
    category: "CONSULTORIA"
  },
  {
    id: 4,
    date: "25 ABR 2026",
    title: "Novas Tendências em Manufatura Aditiva",
    excerpt: "Como a impressão 3D industrial está sendo integrada aos fluxos de trabalho tradicionais.",
    category: "INOVAÇÃO"
  }
];

export default function BlogPosts() {
  return (
    <section className={styles.blogPosts}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {POSTS.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <span className={styles.date}>{post.date}</span>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              <div className={styles.footer}>
                <span className={styles.category}>{post.category}</span>
                <div className={styles.readMore}>
                  LEIA MAIS
                  <div className={styles.arrow} style={{ transform: 'rotate(-90deg)' }}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.27621 2.09808e-05L8.27621 14.3889L1.66703 7.7797L-4.00543e-05 9.4586L9.45854 18.9172L18.9171 9.4586L17.25 7.79152L10.6409 14.3889L10.6409 2.09808e-05H8.27621Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
