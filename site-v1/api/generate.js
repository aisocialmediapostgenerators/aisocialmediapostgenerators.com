const allowedPlatforms = new Set(["linkedin", "instagram", "twitter", "facebook", "social"]);
const allowedTones = new Set(["professional", "friendly", "bold", "educational", "witty"]);
const allowedGoals = new Set(["engagement", "awareness", "traffic", "leads"]);

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  const { platform, topic, tone, goal, audience = "" } = req.body || {};
  if (!allowedPlatforms.has(platform) || !allowedTones.has(tone) || !allowedGoals.has(goal)) return send(res, 400, { error: "Invalid options" });
  if (typeof topic !== "string" || topic.trim().length < 8 || topic.length > 1500) return send(res, 400, { error: "Topic must be between 8 and 1,500 characters" });
  if (typeof audience !== "string" || audience.length > 200) return send(res, 400, { error: "Audience is too long" });

  const apiUrl = process.env.AI_API_URL;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;
  if (!apiUrl || !apiKey || !model) return send(res, 503, { error: "AI provider is not configured" });

  const instructions = `You are a senior social media copywriter. Create exactly three distinct ${platform} posts. Tone: ${tone}. Goal: ${goal}. Audience: ${audience || "a relevant general audience"}. Make every draft native to the platform, specific, natural, and immediately publishable. Do not invent facts. Return JSON only in this shape: {"drafts":[{"label":"short angle name","text":"post"}]}.`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: [{ role: "system", content: instructions }, { role: "user", content: topic.trim() }], response_format: { type: "json_object" }, temperature: 0.8 }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Provider error ${response.status}`);
    const raw = await response.json();
    const content = raw.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    if (!Array.isArray(parsed?.drafts) || parsed.drafts.length !== 3) throw new Error("Invalid provider response");
    const drafts = parsed.drafts.map((x, i) => ({ label: String(x.label || `Draft ${i + 1}`).slice(0, 60), text: String(x.text || "").slice(0, 4000) }));
    if (drafts.some(x => !x.text)) throw new Error("Empty provider response");
    return send(res, 200, { drafts });
  } catch (error) {
    return send(res, error.name === "AbortError" ? 504 : 502, { error: "The writing service is temporarily unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}
