import Link from "next/link";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
  { label: "Email", href: siteConfig.links.email, icon: Mail },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.author}. Built with Next.js & Tailwind.
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-primary"
                aria-label={label}
              >
                <Icon className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
