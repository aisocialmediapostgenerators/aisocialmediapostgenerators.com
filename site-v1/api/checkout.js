const plans = { creator: "CHECKOUT_CREATOR_URL", studio: "CHECKOUT_STUDIO_URL" };

export default function handler(req, res) {
  const plan = String(req.query?.plan || "");
  const variable = plans[plan];
  const destination = variable && process.env[variable];
  if (!destination || !/^https:\/\//.test(destination)) {
    res.statusCode = 302;
    res.setHeader("Location", `/contact/?plan=${encodeURIComponent(plan || "paid")}`);
    return res.end();
  }
  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Location", destination);
  res.end();
}
