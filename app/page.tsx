import type { Metadata } from "next";
import { SitePage } from "./site-page";
import { tools } from "./site-data";

export const metadata: Metadata = {
  title: "Free AI Social Media Post Generator | Social Post AI",
  description:
    "Create polished Instagram posts, captions, image concepts, videos and Reels in seconds with Social Post AI.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <SitePage tool={tools.home} />;
}
