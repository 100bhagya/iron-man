export const siteConfig = {
  name: "Saubhagya Gaurav",
  tagline: "Software Entrepreneur",
  description:
    "Portfolio of my software endeavours",
  introduction: "Well, hello there! Welcome to my archive of software endeavours. Make yourselves at home and enjoy the interactive engineering playground.",
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
