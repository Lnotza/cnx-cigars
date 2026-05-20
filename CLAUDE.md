# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important**: This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Development Commands

- **Start development server**: `npm run dev` or `pnpm dev`
- **Build for production**: `npm run build` or `pnpm build`
- **Start production server**: `npm run start` or `pnpm start`
- **Lint code**: `npm run lint` or `pnpm lint` (uses Next.js ESLint configuration)
- **Type checking**: `npx tsc --noEmit` (TypeScript is configured with `noEmit: true`)

## Code Architecture & Structure

### Project Organization
- **`src/app/`**: Next.js App Router components (pages, layout, route handlers)
- **`src/components/`**: Reusable UI components (Navbar, Hero, Footer, menu systems)
- **`src/data/`**: JSON data files driving content:
  - `cigars.json`: Premium cigar inventory with name, strength, notes, category, and ID
  - `accessories.json`: Gift and accessory items with name and image paths
- **`public/`**: Static assets (images, favicon)
- **Root-level scripts**: Python utilities for image processing and data management

### Key Patterns
1. **Data-Driven UI**: 
   - `FilterableMenu.tsx` and `AccessoriesMenu.tsx` consume JSON data from `src/data/`
   - Components use `useMemo`/`useState` for filtering and UI state
   - Image paths follow pattern: `/cigars/{id}.jpg` and `/Gifts and Accessories/{filename}.png`

2. **Styling Approach**:
   - CSS Modules (`*.module.css`) for component-scoped styles
   - CSS variables for theme colors (seen in AccessoriesMenu background)
   - Next.js Image Optimization for automatic image handling

3. **Component Types**:
   - Server Components by default (in `src/app/`)
   - Explicit Client Components marked with `'use client'` (menu systems, interactive elements)
   - Layout and template files in `src/app/` for shared UI

4. **Routing**:
   - Main page: `src/app/page.tsx`
   - Route groups: `src/app/contact/` and `src/app/reservation/` (contact and reservation pages)
   - Root layout: `src/app/layout.tsx`

### Important Notes
- **Image Handling**: Cigar images use version parameter (`?v=9`) for cache busting
- **Error Handling**: Image components include fallback to placeholder images via `onError`
- **Accessibility**: Alt text provided for all images, semantic HTML structure
- **Data Maintenance**: Python scripts in `src/data/` appear to be used for processing and updating the JSON data and associated images
- **TypeScript**: Strict mode enabled with path mapping (`@/*` -> `./src/*`)

### Common Tasks
- To add a new cigar: Add entry to `cigars.json` with proper ID, ensure corresponding image exists in `public/cigars/`
- To add accessories: Add entry to `accessories.json` with image in `public/Gifts and Accessories/`
- To modify styling: Edit corresponding `.module.css` file in `src/components/`
- To add new pages: Create route folders in `src/app/` (e.g., `src/app/new-page/page.tsx`)
