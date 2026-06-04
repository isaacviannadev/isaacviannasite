"use client";

import { Nav } from "@/components/Nav";
import { Rail } from "@/components/Rail";
import { Preloader } from "@/components/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { Manifesto } from "@/components/sections/Manifesto";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
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

      <div id="htrack">
        <HeroSection />
        <Manifesto />
        <About />
        <Work />
        <Capabilities />
        <Footer />
      </div>

      <div id="hsizer" />

      <Rail />
    </>
  );
}
