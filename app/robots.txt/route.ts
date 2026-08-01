export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /result/",
    "Disallow: /*?*",
    "",
    "Sitemap: https://aisocialmediapostgenerators.com/sitemap.xml",
    "LLMs-Txt: https://aisocialmediapostgenerators.com/llms.txt",
    "Host: https://aisocialmediapostgenerators.com",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
