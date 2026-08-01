import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SitePage } from "../site-page";
import { toolBySlug, toolList } from "../site-data";
import { companyPages, companyPageList } from "../company-pages";

const legacyRoutes: Record<string, string> = { terms: "/terms-of-service/", refund: "/refund-policy/" };

export function generateStaticParams() {
  return [
    ...toolList.map((tool) => ({ slug: tool.slug })),
    ...companyPageList.map((page) => ({ slug: page.slug })),
    ...Object.keys(legacyRoutes).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (tool) return { title: `Free ${tool.shortTitle}`, description: tool.description, alternates: { canonical: `/${slug}/` } };
  const page = companyPages[slug];
  return page ? { title: page.title, description: page.description, alternates: { canonical: `/${slug}/` } } : {};
}

function CompanyNav() {
  return <nav className="nav shell"><a className="brand" href="/"><span className="brand-mark">✦</span> Social Post AI</a><a className="nav-cta" href="/">Back home <span>↗</span></a></nav>;
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (legacyRoutes[slug]) permanentRedirect(legacyRoutes[slug]);
  const tool = toolBySlug[slug];
  if (tool) return <SitePage tool={tool} />;
  const page = companyPages[slug];
  if (!page) notFound();

  return <main className="legal">
    <CompanyNav />
    <header className="legal-hero shell">
      <div><span className="kicker">{page.eyebrow}</span><h1>{page.title}</h1><p className="legal-intro">{page.description}</p><p className="updated">Last updated: {page.updated} · By the Social Post AI Editorial Team</p></div>
      <aside aria-label="On this page"><b>On this page</b>{page.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}</aside>
    </header>
    <article className="legal-content shell">
      <div className="legal-main">{page.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span className="section-index">0{index + 1}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div>
      <aside className="policy-links"><b>Trust & company</b>{companyPageList.map((item) => <a className={item.slug === slug ? "active" : ""} key={item.slug} href={`/${item.slug}/`}>{item.title}<span>↗</span></a>)}</aside>
    </article>
    <footer className="legal-footer"><div className="shell"><p>Still have a question?</p><a href="mailto:hi@aisocialmediapostgenerators.com">hi@aisocialmediapostgenerators.com ↗</a></div></footer>
  </main>;
}
