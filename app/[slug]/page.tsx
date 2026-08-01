import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "../site-page";
import { toolBySlug, toolList } from "../site-data";

const legalPages: Record<string, { title: string; intro: string; body: string[] }> = {
  about: { title: "About Social Post AI", intro: "A smaller blank page and a stronger starting point.", body: ["Social Post AI is a focused creative toolkit for people who want to communicate clearly without spending their day wrestling with captions.", "We believe useful AI should speed up the first draft while leaving the judgment, personality and final word with you.", "Questions, ideas or feedback? Email us at hi@aisocialmediapostgenerators.com."] },
  terms: { title: "Terms of Use", intro: "The simple rules for using Social Post AI.", body: ["Use the service lawfully and review generated content before publishing. You remain responsible for the content you choose to use.", "The service is provided as available and may change as we improve it. Do not use it to create deceptive, harmful or infringing material."] },
  refund: { title: "Refund Policy", intro: "A clear, fair approach to purchases.", body: ["The current version of Social Post AI is free to try. If paid plans are introduced, their refund terms will be shown clearly before purchase.", "For billing questions, contact support with your account email and transaction details so we can help."] },
};

export function generateStaticParams() {
  return [...toolList.map((tool) => ({ slug: tool.slug })), ...Object.keys(legalPages).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (tool) return { title: `Free ${tool.shortTitle}`, description: tool.description, alternates: { canonical: `/${slug}/` } };
  const page = legalPages[slug];
  return page ? { title: page.title, description: page.intro, alternates: { canonical: `/${slug}/` } } : {};
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (tool) return <SitePage tool={tool} />;
  const page = legalPages[slug];
  if (!page) notFound();
  return <main className="legal"><nav className="nav shell"><a className="brand" href="/"><span className="brand-mark">✦</span> Social Post AI</a><a className="nav-cta" href="/">Back home <span>↗</span></a></nav><article><span className="kicker">SOCIAL POST AI</span><h1>{page.title}</h1><p className="legal-intro">{page.intro}</p>{page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article></main>;
}
