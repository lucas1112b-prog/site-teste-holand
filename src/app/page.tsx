import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Methodologies from "@/sections/Methodologies";
import ServicesAccordion from "@/sections/ServicesAccordion";
import Diferenciais from "@/sections/Diferenciais";
import Cases from "@/sections/Cases";
import Footer from "@/sections/Footer";
import Menu from "@/components/Menu";
import WhatsAppButton from "@/components/WhatsAppButton";
export default function Home() {
  return (
    <main>
      <Menu />
      <Hero />
      <About />
      <Methodologies />
      <ServicesAccordion />
      <Diferenciais />
      <Cases />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
