import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Space_Mono } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isaac Vianna · Software Engineer & Creative Developer",
  description:
    "Isaac Vianna. Software engineer & creative developer building memorable digital experiences.",
  authors: [{ name: "Isaac Vianna" }],
  icons: { icon: "/fav.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

// Set the language attribute before hydration so bilingual content doesn't
// flash the wrong language on first paint.
const langBootstrap = `(function(){try{var l=localStorage.getItem('iv-lang');if(l!=='pt'&&l!=='en')l='en';document.documentElement.setAttribute('data-lang',l);document.documentElement.setAttribute('lang',l==='pt'?'pt-BR':'en');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${spaceMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: langBootstrap }} />
        <LangProvider>
          <Cursor />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
