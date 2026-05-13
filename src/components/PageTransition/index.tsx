"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function TransitionLink({ 
  href, 
  children, 
  className, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    
    // For now, just navigate. You can add GSAP transitions here later.
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleTransition}>
      {children}
    </Link>
  );
}
