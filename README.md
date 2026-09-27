# OC Decider

A CS2-case-opening-style roulette for randomly deciding original character
traits: accessories, clothing, skin color, age, gender, poses. Every pick is
uniform random — no odds table, no pity, no weighting of any kind.

## Stack

- **Backend:** Rust, via Tauri v2. The Rust side owns the randomness — the
  `generate_reel` command (in `src-tauri/src/lib.rs`) draws every slot in the
  reel, including the winner, from a uniform distribution with `rand`.
- **Frontend:** React + TypeScript (Vite). Purely presentational — it asks
  Rust for a result and animates a reel to land on it.

## Getting started

Prerequisites: [Node.js](https://nodejs.org) 18+, [Rust](https://www.rust-lang.org/tools/install),
and the [Tauri v2 system dependencies](https://v2.tauri.app/start/prerequisites/)
for your OS (e.g. `webkit2gtk` on Linux).

```bash
npm install
npm run tauri dev      # launches the desktop app in dev mode
```

To build a production installer:

```bash
npm run tauri build
```

You can also preview just the UI in an ordinary browser tab with `npm run dev`
— it falls back to a JS-side random picker when there's no Tauri host to talk
to, so the interface still works while you're iterating on styling.

## Adding your sound effects

Drop your three sfx files into `public/sounds/`:

| File               | Plays when...                                  |
|---------------------|-------------------------------------------------|
| `frame-pass.mp3`    | the reel scrolls past each item                 |
| `selected.mp3`      | the reel lands on the final item                |
| `unboxing.mp3`      | the "Open Case" button is pressed               |

See `public/sounds/README.md` for details.

## Editing the cases

Every case, its category, and its items live in one place:
`src/data/cases.ts`. Each item is just a label, an emoji, and a cosmetic
accent color (purely visual — it carries no weight in the roll). Add, remove,
or rename items and cases there; the UI, the reel, and the OC summary page
all read from that file automatically.

## Project layout

```
src/
  components/     CaseList, CaseCard, CaseOpener (the reel), OCProfile
  data/cases.ts   all case + item content
  hooks/useSound.ts   sfx playback
  lib/reel.ts     talks to the Rust `generate_reel` command
  App.tsx         navigation + result persistence (localStorage)
src-tauri/
  src/lib.rs      the Rust random-reel command
  tauri.conf.json app + window config
```

## Notes on the icons

`src-tauri/icons/` currently holds a simple placeholder icon. Before shipping
a real build, swap in your own artwork and regenerate the full icon set with:

```bash
npx tauri icon path/to/your-1024x1024-icon.png
```
