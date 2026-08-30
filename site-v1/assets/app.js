const platformRules = {
  linkedin: { name: "LinkedIn", max: "Professional, insight-led, 150–300 words", hashtags: 3 },
  instagram: { name: "Instagram", max: "Visual, conversational, hook-first", hashtags: 8 },
  twitter: { name: "X / Twitter", max: "Punchy, concise, under 280 characters", hashtags: 2 },
  facebook: { name: "Facebook", max: "Warm, community-focused, easy to scan", hashtags: 3 },
  social: { name: "Social media", max: "Platform-ready and natural", hashtags: 4 }
};

function track(event, properties = {}) {
  const payload = { event, ...properties, page: location.pathname, timestamp: new Date().toISOString() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  try {
    const events = JSON.parse(localStorage.getItem("postcraft_events") || "[]");
    localStorage.setItem("postcraft_events", JSON.stringify([...events.slice(-99), payload]));
  } catch (_) {}
}

function visitorCredits() {
  const today = new Date().toISOString().slice(0, 10);
  let state = { date: today, left: 5 };
  try { state = JSON.parse(localStorage.getItem("postcraft_credits")) || state; } catch (_) {}
  if (state.date !== today) state = { date: today, left: 5 };
  localStorage.setItem("postcraft_credits", JSON.stringify(state));
  return state;
}

function setCredits(left) {
  const state = visitorCredits();
  state.left = Math.max(0, left);
  localStorage.setItem("postcraft_credits", JSON.stringify(state));
  document.querySelectorAll("[data-credits]").forEach(el => el.textContent = `${state.left} free drafts left`);
}

function fallbackDrafts({ platform, topic, tone, goal }) {
  const p = platformRules[platform] || platformRules.social;
  const clean = topic.trim().replace(/\s+/g, " ");
  const hooks = [
    `A better way to think about ${clean}:`,
    `If ${clean} matters to your work, start here.`,
    `Most people overcomplicate ${clean}. Here’s the simpler approach:`
  ];
  const bodies = [
    `${hooks[0]}\n\nFocus on one useful outcome, remove the busywork, and make the next step obvious. Small improvements compound when they are easy to repeat.\n\n${goal === "engagement" ? "What would you add?" : "Try it today and see what changes."}`,
    `${hooks[1]}\n\n1. Start with the audience\n2. Name the real problem\n3. Share one practical takeaway\n4. End with a clear next step\n\nSimple beats clever when clarity is the goal.`,
    `${hooks[2]}\n\nThe strongest results rarely come from doing more. They come from choosing the right message, making it specific, and giving people a reason to act.\n\nSave this for your next campaign.`
  ];
  const tag = clean.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).slice(0, 2).map(x => `#${x}`).join(" ");
  return bodies.map((body, i) => ({ label: ["Clear & useful", "Structured", "Bold angle"][i], text: `${body}\n\n${tag} #${platform === "twitter" ? "buildinpublic" : "contentmarketing"}`.trim() }));
}

async function requestDrafts(payload) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Generation failed");
  return response.json();
}

function renderResults(drafts) {
  const target = document.querySelector("[data-results]");
  target.className = "result-list";
  target.innerHTML = drafts.map((draft, index) => `
    <article class="result">
      <div class="result-head"><span>${draft.label || `Draft ${index + 1}`}</span><button class="copy" type="button" data-copy="${index}">Copy</button></div>
      <textarea aria-label="Editable generated post ${index + 1}">${draft.text}</textarea>
    </article>`).join("");
  target.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
    const text = button.closest(".result").querySelector("textarea").value;
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
    track("output_copied", { variant: Number(button.dataset.copy) + 1 });
    setTimeout(() => button.textContent = "Copy", 1400);
  }));
}

function initGenerator() {
  const form = document.querySelector("[data-generator]");
  if (!form) return;
  const platform = form.dataset.platform || "social";
  setCredits(visitorCredits().left);
  track("landing_view", { platform });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const state = visitorCredits();
    const status = document.querySelector("[data-status]");
    if (state.left < 1) {
      status.textContent = "You’ve used today’s free drafts. Choose a plan to keep creating.";
      document.querySelector("[data-pricing-link]")?.focus();
      return;
    }
    const payload = {
      platform,
      topic: form.topic.value.trim(),
      tone: form.tone.value,
      goal: form.goal.value,
      audience: form.audience?.value.trim() || ""
    };
    if (payload.topic.length < 8) {
      status.textContent = "Add a little more context so the drafts can be specific.";
      return;
    }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Writing drafts…";
    status.textContent = "Adapting the message to the platform…";
    track("generate_started", { platform, tone: payload.tone, goal: payload.goal });
    try {
      let data;
      try { data = await requestDrafts(payload); }
      catch (_) { data = { drafts: fallbackDrafts(payload), demo: true }; }
      renderResults(data.drafts);
      setCredits(state.left - 1);
      status.textContent = data.demo ? "Preview mode: connect the AI provider to enable model-generated drafts." : "Three drafts ready. Edit or copy your favorite.";
      track("generate_succeeded", { platform, demo: Boolean(data.demo) });
    } catch (error) {
      status.textContent = error.message || "Something went wrong. Please try again.";
      track("generate_failed", { platform });
    } finally {
      button.disabled = false;
      button.textContent = "Generate 3 posts";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGenerator();
  document.querySelectorAll("a[href*='pricing']").forEach(link => link.addEventListener("click", () => track("pricing_viewed")));
  document.querySelectorAll("[data-checkout]").forEach(link => link.addEventListener("click", () => track("checkout_started", { plan: link.dataset.checkout })));
});
