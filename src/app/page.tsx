import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Methodologies from "@/sections/Methodologies";
import ServicesAccordion from "@/sections/ServicesAccordion";
import Menu from "@/components/Menu";
import WhatsAppButton from "@/components/WhatsAppButton";
import InitialTransition from "@/components/InitialTransition";

export default function Home() {
  return (
    <main>
      <InitialTransition />
      <Menu />
      <Hero />
      <About />
      <Methodologies />
      <ServicesAccordion />
      <WhatsAppButton />
    </main>
  );
}
