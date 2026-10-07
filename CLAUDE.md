# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (`next/core-web-vitals` + `plugin:jest/recommended`)
- `npm run test` — Jest in **watch mode** (`--watchAll`). For a single non-interactive run use `npx jest`, and for one file `npx jest path/to/file.test.js` (or `-t "test name"`).

Jest is set up via `next/jest` with jsdom and `@testing-library/jest-dom`, but there are currently no test files.

Requires `MONGODB_URI` in `.env.local`; `db/connect.js` throws at import time without it.

## Architecture

Flipwise is a flashcard app: Next.js 13 **Pages Router**, plain JavaScript (no TypeScript), styled-components (SWC transform enabled in `next.config.js`), MongoDB via Mongoose, SWR for data fetching. Imports use the `@/` alias for the repo root. SVGs can be imported as React components via `@svgr/webpack`.

### Data model (`db/models/`)
- `FlashcardCollection`: `collectionTitle`, `colorDark`, `colorLight` (user-picked hex colors used for card/tag styling).
- `Flashcard`: `collection_id` (a **string** reference to a collection `_id`, not an ObjectId ref — join it on the client with `collections.find(...)`), `question`, `answer`, plus SM-2 scheduling fields `interval`, `repetitions`, `easeFactor`, `dueDate`.
- Deleting a collection (`pages/api/collections/[id].js`) also deletes its flashcards.

### API routes (`pages/api/`)
Each handler calls `dbConnect()` first (cached global Mongoose connection) and branches on `request.method`, returning 405 otherwise.
- `flashcards/index.js` — GET all (newest first) or `?due=true` for cards with `dueDate <= now`; POST create.
- `flashcards/[id]/index.js` — PUT update / DELETE a single card.
- `flashcards/[id]/review.js` — POST `{ evaluation }` (quality 0–5) runs `calculateNextReview` from `lib/sm2.js` (SM-2 spaced repetition) and saves the new schedule.
- `flashcards/import/index.js` — POST an array of cards for bulk `insertMany` (used by CSV import; parsing/validation happens client-side with papaparse in `components/CsvImport`).
- `collections/` — GET/POST on `index.js`, PUT/DELETE on `[id].js`.

### Client data flow
- `pages/_app.js` fetches `/api/flashcards` and `/api/collections` with SWR once and passes `flashcards`, `collections` and their loading/error flags **as props to every page**. Pages don't refetch these themselves.
- The global `fetcher` is provided via `SWRConfig`, so other `useSWR(key)` calls (e.g. `/api/flashcards?due=true` in the repeat page) need no fetcher argument.
- After a mutation, components call SWR `mutate` on the affected keys (`/api/flashcards`, `/api/flashcards?due=true`, `/api/collections`) — keep these in sync when adding new mutations.

### Pages
- `/` — flashcard list with collection filter, create/edit forms, CSV import, collection management.
- `/quiz` — pick collections, shuffle (`utils/fisherYatesShuffle`), flip through cards and self-score. Screens are switched via a `currentScreen` state (`setup` → `quizmode` → result).
- `/repeat` — spaced-repetition session over due cards; each answer POSTs to the review endpoint. Daily stats persist in localStorage via `use-local-storage-state` (`dayStats` key).

`components/Flashcard` is shared by all three pages; in quiz/repeat mode (`quizModeActive`) it hides edit/delete and reports flips via `onFlip`. Card colors go through `utils/getCardColors.js`, which picks black/white text and adjusts the collection color so the text/background luminance difference stays above 0.75.

## Conventions
- One component per folder: `components/Name/Name.jsx`, with styled-components defined in the same file below the component, named `Styled*`, using transient `$props`.
- Prettier: double quotes, semicolons, 2 spaces, trailing commas `es5`.
