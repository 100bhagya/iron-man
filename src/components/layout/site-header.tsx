import Link from "next/link";
import { Cpu } from "lucide-react";

import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_-6px_var(--glow)]">
            <Cpu className="size-4" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors",
                "hover:bg-accent/50 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
