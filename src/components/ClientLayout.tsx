"use client";

import { usePathname } from "next/navigation";
import { TransitionProvider } from "@/context/TransitionContext";
import InitialTransition from "@/components/InitialTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <TransitionProvider>
      <InitialTransition key={pathname} />
      {children}
    </TransitionProvider>
  );
}
