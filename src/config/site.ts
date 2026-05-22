export const siteConfig = {
  name: "Saubhagya Gaurav",
  tagline: "Sofware Entrepreneur",
  description:
    "Personal professional portfolio and interactive engineering playground.",
  author: "Saubhagya",
  links: {
    github: "https://github.com/100bhagya",
    linkedin: "https://linkedin.com/in/saubhagya-gaurav",
    email: "mailto:gauravsaubhagya3@gmail.com",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
] as const;
