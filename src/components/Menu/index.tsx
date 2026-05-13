'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Menu.module.css';
import { TransitionLink } from '../PageTransition';


export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Initial setup
    gsap.set(dropdownRef.current, { autoAlpha: 0, filter: 'blur(8px)' });
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    
    // Entry Animation
    gsap.fromTo(menuRef.current, 
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Show Dropdown
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power3.out'
      });
      // Show Overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
    } else {
      // Hide Dropdown
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 0.3,
        ease: 'power2.in'
      });
      // Hide Overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className={styles.overlay} 
        ref={overlayRef} 
        onClick={() => setIsOpen(false)} 
      />
      <div ref={menuRef} className={styles.menuContainer}>
        <div className={styles.rightControls}>
          <button className={styles.menuBtn} onClick={toggleMenu}>
            {isOpen ? 'FECHAR' : 'MENU'}
          </button>
          
          <div className={styles.langSelector}>
            <button className={styles.langBtn}>PT</button>
            <div className={styles.langOptions}>
              <button className={styles.langOption}>EN</button>
              <button className={styles.langOption}>ES</button>
            </div>
          </div>
        </div>

        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownList}>
            <TransitionLink href="/" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>HOME</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>SOBRE</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>SERVIÇOS</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>MANIFESTO</TransitionLink>
            <TransitionLink href="/contato" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>CONTATO</TransitionLink>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeContent}>
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
              {/* Duplicated for infinite loop */}
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
