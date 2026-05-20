export const siteConfig = {
  name: "Iron Man",
  tagline: "Portfolio & Engineering Playground",
  description:
    "Personal professional portfolio and interactive engineering playground.",
  author: "Your Name",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hello@example.com",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
] as const;
