export type ToolKey = "home" | "post" | "image" | "video" | "reels" | "caption";

export type Tool = {
  key: ToolKey;
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  promptLabel: string;
  placeholder: string;
  button: string;
  resultLabel: string;
  examples: { tag: string; title: string; copy: string }[];
  faq: { q: string; a: string }[];
};

const sharedFaq = [
  { q: "Is Social Post AI free?", a: "Yes. You can try the generator without creating an account or adding a credit card." },
  { q: "Can I edit the result?", a: "Absolutely. Treat every result as a strong first draft, then adjust the details to match your brand voice." },
  { q: "Will my content be unique?", a: "Each result is shaped by your brief, audience and tone. Add specific context for the most distinctive output." },
];

const examples = [
  { tag: "Product launch", title: "A launch that feels human", copy: "Something new just landed ✨ Built for slower mornings, brighter ideas, and everything in between. Meet your new everyday essential." },
  { tag: "Coffee shop", title: "An invitation, not an ad", copy: "Your 3 PM reset is waiting. Fresh espresso, a quiet corner, and exactly zero rushed meetings. ☕" },
  { tag: "Fitness", title: "Motivation without clichés", copy: "You don’t need a perfect week. You need one small promise you’ll keep today. Ten minutes. Let’s move." },
  { tag: "Travel", title: "Make the viewer feel there", copy: "Salt in the air, no plans after sunset, and a road we almost didn’t take. Save this coast for your next escape." },
  { tag: "Skincare", title: "Clear, credible product copy", copy: "A calmer routine starts with less. Three barrier-loving ingredients, one weightless layer, and skin that feels like itself again." },
  { tag: "Creator", title: "A hook made for comments", copy: "Unpopular opinion: consistency gets easier when you stop trying to sound like everyone else. What changed your content game?" },
];

export const tools: Record<ToolKey, Tool> = {
  home: {
    key: "home", slug: "", eyebrow: "Free AI social media post generator",
    title: "AI Social Media Post Generator for Faster First Drafts", shortTitle: "AI Social Media Post Generator",
    description: "Use our free AI social media post generator to create editable captions, post ideas, hooks and hashtags for Instagram from a simple brief.",
    promptLabel: "What do you want to share?", placeholder: "e.g. Launching a sustainable travel mug for busy commuters…",
    button: "Generate a free post", resultLabel: "Your post is ready", examples,
    faq: [
      { q: "What is an AI social media post generator?", a: "It is a writing tool that turns a short brief into a social post draft. Social Post AI creates an editable caption, hook, call to action and suggested hashtags in your browser." },
      { q: "Is this AI social media post generator free?", a: "Yes. You can generate a first draft without creating an account or entering a credit card." },
      { q: "Which social media platforms does it support?", a: "The current homepage generator is designed for Instagram-style posts. Our related tools also help plan Instagram captions, images, videos and Reels." },
      { q: "Can I use the generated post without editing it?", a: "You can, but reviewing the draft is recommended. Add accurate product details, check claims, and adjust the wording so it matches your brand voice and audience." },
      { q: "Does the tool publish posts to my account?", a: "No. It creates copy you can review and copy; it does not connect to or publish on your social accounts." },
      { q: "How do I get a better social media post?", a: "Include the audience, offer, desired tone and one specific detail in your brief. The more concrete the input, the more useful the first draft will be." },
    ],
  },
  post: {
    key: "post", slug: "ai-instagram-post-generator", eyebrow: "AI Instagram Post Generator",
    title: "Instagram posts that sound like you—on your best day.", shortTitle: "Instagram Post Generator",
    description: "Turn a rough idea into a polished Instagram post with a strong hook, natural caption and relevant hashtags.",
    promptLabel: "Describe your Instagram post", placeholder: "e.g. Announce our bakery’s new Saturday brunch menu…",
    button: "Generate Instagram post", resultLabel: "Your Instagram post", examples, faq: sharedFaq,
  },
  image: {
    key: "image", slug: "ai-instagram-image-generator", eyebrow: "AI Instagram Image Generator",
    title: "Build an image concept worth saving.", shortTitle: "Instagram Image Generator",
    description: "Transform your product, campaign or mood into a detailed, art-directed Instagram image prompt.",
    promptLabel: "Describe the image you need", placeholder: "e.g. Minimal product shot of a coral running shoe at sunrise…",
    button: "Create image concept", resultLabel: "Your image direction", examples, faq: sharedFaq,
  },
  video: {
    key: "video", slug: "ai-instagram-video-generator", eyebrow: "AI Instagram Video Generator",
    title: "From loose idea to shoot-ready video.", shortTitle: "Instagram Video Generator",
    description: "Create a concise Instagram video treatment with scenes, pacing, on-screen text and a clear call to action.",
    promptLabel: "What should your video communicate?", placeholder: "e.g. Show how our meal planner saves time on weeknights…",
    button: "Plan my video", resultLabel: "Your video treatment", examples, faq: sharedFaq,
  },
  reels: {
    key: "reels", slug: "ai-instagram-reels-generator", eyebrow: "AI Instagram Reels Generator",
    title: "Reel ideas with the hook built in.", shortTitle: "Instagram Reels Generator",
    description: "Get a punchy Reel concept, beat-by-beat structure, screen text and caption designed for retention.",
    promptLabel: "What is your Reel about?", placeholder: "e.g. Three styling tricks for a small apartment…",
    button: "Generate Reel idea", resultLabel: "Your Reel plan", examples, faq: sharedFaq,
  },
  caption: {
    key: "caption", slug: "instagram-caption-generator", eyebrow: "Instagram Caption Generator",
    title: "Captions that earn the second look.", shortTitle: "Instagram Caption Generator",
    description: "Write clear, conversational Instagram captions with the right tone, length and call to action.",
    promptLabel: "What is your post about?", placeholder: "e.g. Behind the scenes from our first community workshop…",
    button: "Write my caption", resultLabel: "Your caption", examples, faq: sharedFaq,
  },
};

export const toolList = Object.values(tools).filter((tool) => tool.key !== "home");

export const toolBySlug = Object.fromEntries(toolList.map((tool) => [tool.slug, tool]));
