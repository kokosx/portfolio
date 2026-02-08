# Portfolio

Minimalist brutalist portfolio built with Next.js and Tailwind. Big type,
hard borders, sharp contrast, zero fluff.

## What this is

- Single-page portfolio layout with sections for hero, projects, toolbox, and footer.
- Componentized UI under `src/app/components`.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `src/app/page.tsx` composition root
- `src/app/components/Header.tsx`
- `src/app/components/DevHero.tsx`
- `src/app/components/ProjectShowcase.tsx`
- `src/app/components/Toolbox.tsx`
- `src/app/components/Footer.tsx`

## Customize

- Replace text in the components above.
- Swap the hero image at `public/image_dev.png`.

## Notes

- Tailwind v4 is in use.
- Dark mode is class-based.

## TODO

- Improve heading sequence
