"use client";

import { useMemo, useState } from "react";
import type { Tool } from "./site-data";
import { toolList } from "./site-data";

function Sparkle({ small = false }: { small?: boolean }) {
  return <span className={small ? "sparkle small" : "sparkle"} aria-hidden="true">✦</span>;
}

function resultFor(tool: Tool, prompt: string, tone: string) {
  const subject = prompt.trim() || "your next big idea";
  if (tool.key === "image") return `ART DIRECTION\n\nA warm, editorial Instagram image focused on ${subject}. Natural side light, tactile details, generous negative space, subtle grain, and one confident accent color. Shot at eye level in a 4:5 composition. Premium but approachable; real rather than over-polished.\n\nPalette: oat, ink, sunlit coral.\nMood: ${tone.toLowerCase()}, modern, quietly optimistic.`;
  if (tool.key === "video" || tool.key === "reels") return `HOOK · 0–2 sec\n“Here’s the part nobody tells you about ${subject}.”\n\nBEAT 1 · Show the familiar problem in one tight visual.\nBEAT 2 · Reveal the simple shift or solution.\nBEAT 3 · Show the payoff with a clear before/after.\n\nON-SCREEN TEXT\nSmall change. Noticeable difference.\n\nCTA\nSave this for the moment you need it—and send it to someone who gets it.`;
  return `A small idea can change the whole rhythm of your day. ✨\n\nHere’s what we’re sharing about ${subject}: thoughtful details, less friction, and more room for what matters. Made for real life, not just the highlight reel.\n\nWhat would you try first? Tell us below.\n\n#SocialMediaIdeas #CreativeBusiness #MadeWithCare #InstagramTips`;
}

export function SitePage({ tool }: { tool: Tool }) {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Warm & human");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => ["Free to try", "No sign-up", "Ready in seconds"], []);

  function generate() {
    setResult(resultFor(tool, prompt, tone));
    setCopied(false);
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
  }

  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="/"><span className="brand-mark"><Sparkle small /></span> Social Post AI</a>
        <div className="nav-links">
          <a href="#examples">Examples</a><a href="#how">How it works</a><a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="#generator">Try it free <span>↗</span></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkle small /> {tool.eyebrow}</div>
          <h1>{tool.title}</h1>
          <p className="hero-description">{tool.description}</p>
          <div className="proof-row">{stats.map((stat) => <span key={stat}>✓ {stat}</span>)}</div>
        </div>

        <div className="generator" id="generator">
          <div className="generator-top"><span className="window-dots">● ● ●</span><span>Social Post AI studio</span><span className="status">Online</span></div>
          <div className="generator-body">
            <label htmlFor="idea">{tool.promptLabel}</label>
            <textarea id="idea" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={tool.placeholder} />
            <div className="field-row">
              <div><label htmlFor="tone">Tone</label><select id="tone" value={tone} onChange={(event) => setTone(event.target.value)}><option>Warm & human</option><option>Bold & playful</option><option>Polished & expert</option><option>Calm & minimal</option></select></div>
              <div><label htmlFor="platform">Platform</label><select id="platform" defaultValue="Instagram"><option>Instagram</option></select></div>
            </div>
            <button className="generate-button" onClick={generate}><Sparkle small /> {tool.button}<span>→</span></button>
          </div>
          {result && <div className="result" aria-live="polite"><div className="result-heading"><strong>{tool.resultLabel}</strong><button onClick={copyResult}>{copied ? "Copied!" : "Copy"}</button></div><pre>{result}</pre></div>}
          {!result && <div className="generator-foot"><span><Sparkle small /> Built for better first drafts</span><span>⌘ Enter</span></div>}
        </div>
      </section>

      <section className="marquee" aria-label="Capabilities"><div>POSTS <Sparkle small /> CAPTIONS <Sparkle small /> IMAGE CONCEPTS <Sparkle small /> REELS <Sparkle small /> SHORT VIDEOS <Sparkle small /> BRAND VOICE</div></section>

      <section className="section shell" id="examples">
        <div className="section-heading"><div><span className="kicker">REAL-WORLD STARTING POINTS</span><h2>From “what do I say?”<br />to “that’s exactly it.”</h2></div><p>Strong examples make strong prompts. Explore six ways Social Post AI turns everyday briefs into content with a point of view.</p></div>
        <div className="example-grid">{tool.examples.map((example, index) => <article className={`example-card card-${index + 1}`} key={example.tag}><div className="example-number">0{index + 1}</div><span>{example.tag}</span><h3>{example.title}</h3><p>{example.copy}</p><button onClick={() => { setPrompt(example.tag + ": " + example.title); document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" }); }}>Try this direction →</button></article>)}</div>
      </section>

      <section className="how" id="how"><div className="shell"><span className="kicker light">A SIMPLER CREATIVE RHYTHM</span><h2>One idea. Three small steps.<br />A post you’re proud to publish.</h2><div className="steps"><article><b>01</b><h3>Share the spark</h3><p>Give us the topic, product or moment. A rough sentence is plenty.</p></article><article><b>02</b><h3>Shape the voice</h3><p>Choose a tone that fits your audience and the feeling you want to leave.</p></article><article><b>03</b><h3>Make it yours</h3><p>Copy the draft, add your details and publish when it sounds just right.</p></article></div></div></section>

      <section className="tool-links shell"><span className="kicker">EXPLORE THE TOOLKIT</span><h2>More ways to make the feed yours.</h2><div>{toolList.map((item) => <a className={item.key === tool.key ? "active" : ""} key={item.slug} href={`/${item.slug}/`}><span>{item.shortTitle}</span><b>↗</b></a>)}</div></section>

      <section className="faq shell" id="faq"><div><span className="kicker">GOOD TO KNOW</span><h2>Questions,<br />answered simply.</h2></div><div>{tool.faq.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></section>

      <footer><div className="shell footer-top"><div><a className="brand light-brand" href="/"><span className="brand-mark"><Sparkle small /></span> Social Post AI</a><p>Better words. Brighter ideas.<br />Less time staring at a blank box.</p></div><div><b>Trust</b><a href="/about/">About</a><a href="/author-team/">Author & Team</a><a href="/editorial-policy/">Editorial Policy</a><a href="/ai-content-policy/">AI Content Policy</a><a href="/security/">Security</a></div><div><b>Company</b><a href="/contact/">Contact</a><a href="/pricing/">Pricing</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-of-service/">Terms of Service</a><a href="/refund-policy/">Refund Policy</a></div></div><div className="shell footer-bottom"><span>© 2026 Social Post AI</span><span>Made for people with something to say.</span></div></footer>
    </main>
  );
}
