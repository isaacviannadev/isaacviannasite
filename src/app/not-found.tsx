"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <main className="wrap not-found">
      <p>Isaac Vianna · 404</p>
      <h1>{lang === "pt" ? "Página não encontrada." : "Page not found."}</h1>
      <p>{lang === "pt" ? "Este endereço não está disponível. Você pode voltar ao portfólio e explorar os projetos." : "This address isn’t available. Head back to the portfolio and explore the projects."}</p>
      <Link className="action-primary" href="/#work">{lang === "pt" ? "Ver projetos" : "View projects"}</Link>
    </main>
  );
}
