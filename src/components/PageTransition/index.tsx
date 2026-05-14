"use client";

import Link from "next/link";
import { useTransition } from "@/context/TransitionContext";

export function TransitionLink({ 
  href, 
  children, 
  className, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { startTransition } = useTransition();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an internal anchor link, don't trigger page transition
    if (href.startsWith("#")) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    
    // Trigger the global exit transition
    startTransition(href);
  };

  return (
    <Link href={href} className={className} onClick={handleTransition}>
      {children}
    </Link>
  );
}
