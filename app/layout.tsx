import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aisocialmediapostgenerators.com"),
  title: { default: "Social Post AI", template: "%s | Social Post AI" },
  description: "Create scroll-stopping social media content with AI.",
  openGraph: {
    siteName: "Social Post AI",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Social Post AI — Turn one idea into a post people stop for." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
