# Gather · Restaurant Twins

A React and TypeScript port of the Gather prototype. Start at Atomix, compare three restaurant twins, and record a study choice for the current browser tab.

## Run locally

Use Node.js 24 and pnpm.

```sh
pnpm install
pnpm dev
```

Open the URL Vite prints. Run `pnpm build` to type-check and generate `dist/`, then `pnpm preview` to serve that build locally. For Vercel, use the Vite preset and the `dist` output directory.

## Source

- `src/App.tsx` defines the Atomix, comparison overview, and restaurant detail screens.
- `src/restaurants.ts` holds the original menu data, match estimates, availability snapshot, and external photo links.
- `src/study-choice.tsx` manages the choice through React Context and `sessionStorage`.
- `src/styles.css` contains Tailwind utilities and the prototype’s custom styles.

`Gather_Restaurant_Twins.html` is the original standalone prototype.
