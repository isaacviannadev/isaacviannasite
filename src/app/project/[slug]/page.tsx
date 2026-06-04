import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/content/portfolio";
import { ProjectView } from "@/components/ProjectView";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} · Isaac Vianna` : "Project · Isaac Vianna" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = PROJECTS.indexOf(p);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <ProjectView
      project={p}
      next={next}
      index={index + 1}
      total={PROJECTS.length}
    />
  );
}
