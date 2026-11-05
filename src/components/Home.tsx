"use client";

import { Nav } from "@/components/Nav";
import { Rail } from "@/components/Rail";
import { Preloader } from "@/components/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Consultancy } from "@/components/sections/Consultancy";
import { Footer } from "@/components/sections/Footer";
import { useReveal } from "@/hooks/useReveal";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useMagnetic } from "@/hooks/useMagnetic";

export function Home() {
  useReveal();
  useHorizontalScroll();
  useMagnetic();

  return (
    <>
      <Preloader />
      <Nav />

      <main id="htrack" tabIndex={-1}>
        <HeroSection />
        <Work />
        <About />
        <Capabilities />
        <Consultancy />
        <Footer />
      </main>

      <div id="hsizer" />

      <Rail />
    </>
  );
}
