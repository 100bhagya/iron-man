# Iron Man

Personal professional portfolio and interactive engineering playground.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI** + **Lucide React**

## Project structure

```
iron-man/
├── content/              # MDX articles & case studies
├── data/
│   └── projects.json     # Portfolio project entries
└── src/
    ├── app/              # Routes & global styles
    ├── components/
    │   ├── layout/       # Header, footer, shell
    │   ├── portfolio/    # Landing page sections
    │   └── ui/           # Shadcn primitives
    ├── config/           # Site metadata & navigation
    ├── lib/              # Data access & utilities
    └── types/            # Shared TypeScript types
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding projects

Edit `data/projects.json`. Each entry supports: `id`, `title`, `description`, `tags`, `href`, `featured`, and `status` (`shipped` | `in-progress` | `experiment`).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | Run ESLint               |

## Next steps

- Wire MDX rendering for `/content` (e.g. `next-mdx-remote` or `@next/mdx`)
- Add interactive tools under `src/features/`
- Replace placeholder links in `src/config/site.ts`
