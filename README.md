# Gather · Restaurant Twins

A React and TypeScript prototype for Rule of Thirds. Compare three twins for brunch and three for dinner, inspect each match breakdown, and record a study choice for each meal in the current browser tab.

## Run locally

Use Node.js 24 and pnpm.

```sh
pnpm install
pnpm dev
```

Open the URL Vite prints. Run `pnpm build` to type-check and generate `dist/`, then `pnpm preview` to serve that build locally. For Vercel, use the Vite preset and the `dist` output directory.

## Source

- `src/App.tsx` defines the profile, meal comparisons, and restaurant detail screens.
- `src/restaurants.ts` holds menus, sample orders, scoring weights, NYC database identifiers, sources, and booking links. Dinner availability is a snapshot from Nov. 10, 2026. Brunch links lead to availability checks or the venue’s contact page.
- `src/study-choice.tsx` manages the choice through React Context and `sessionStorage`.
- `src/styles.css` contains Tailwind utilities and the prototype’s custom styles.

## HTML artifacts

`Gather_Restaurant_Twins.html` is the original Atomix prototype. `Gather_Rule_of_Thirds_v1.html` captures the first Rule of Thirds experiment. `Gather_Rule_of_Thirds_v2.html` adds restaurant and dish photography. `Gather_Rule_of_Thirds_v3.html` adds visual score breakdowns to the comparison cards and detail screens. These later snapshots embed JavaScript, CSS and the local photos. External source, menu and reservation links require an internet connection.

After building a later iteration, export it with a new filename.

```sh
pnpm build
pnpm snapshot Gather_Rule_of_Thirds_v4.html
```

The exporter refuses to overwrite an existing artifact.

## Photos

`src/photos.ts` records the original photo URLs, credits and source links. The app serves verified photos from `public/images/rule-of-thirds/`. Captions identify earlier plating, the 2021 breakfast set, and the vegan onigiri photographed in 2023. All five Rule of Thirds brunch highlights and four dinner highlights have photos. A verified photo of its current pork tonkatsu remains unavailable.

## Match scores

Dishes contribute up to 60 points, price up to 25, and atmosphere up to 15. Brunch assigns 20 dish points to the pancake and 10 to each savory dish. Dinner assigns 12 to each dish. Each dish’s percentage scales its contribution. Price points equal 25 times one minus the absolute relative difference from the Rule of Thirds sample order, floored at zero. Dish and price totals round to whole points before adding the atmosphere assessment. These are curated estimates based on reviewed menus and settings.

The six alternatives were matched by name and address to the provided Nov. 10, 2026 NYC inspection CSV. WakuWaku’s menu prices come from the published menu transcription at https://asobiusa.com/en-ny-wakuwaku/ because its official PDF could not be retrieved during research. Brunch sample prices use the restaurant’s published menu or its ordering page.
