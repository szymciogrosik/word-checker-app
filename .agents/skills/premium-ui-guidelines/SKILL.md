---
name: premium-ui-guidelines
description: "Use this skill ALWAYS when creating or modifying ANY visual element, component, or layout on the page."
---

# Premium UI Design System Guidelines

This document serves as the single source of truth for the frontend styling of this application. The application follows a premium "million-dollar" aesthetic inspired by Apple's clean minimalism and Netcompany/Monday.com's vibrant, professional color palettes.

## 1. Core Principles
- **Extreme Cleanliness:** Whitespace is your best friend. Do not clutter interfaces. Use generous padding (e.g., `24px` or `32px` inside cards).
- **Soft Geometry:** Hard edges are forbidden. Everything uses a generous `border-radius`.
- **Soft Shadows, No Hard Borders:** We do not use thick solid borders for layout separation. We use soft, diffused drop-shadows (elevation) or very subtle 1px borders (`rgba(0,0,0,0.05)`).
- **Vibrant Call-to-Actions (CTAs):** Primary actions should pop against the clean white/dark background.
- **Calm Motion:** We avoid jerky layout shifts or jumping elements (e.g., no `translateY` on hover for cards). We prefer subtle shadow highlights instead.

## 2. Typography
- **Primary Font:** `Inter` (Google Fonts). Never use Roboto.
- **Hierarchy:** 
  - Main titles (h1, h2) should be bold (weight 700 or 800) and large.
  - Body text should be readable, often with a slightly muted color (e.g., `#64748b` in light mode) rather than pure black `#000000`.

## 3. The "Bento" Card System
All content must live inside premium cards. When creating new components, structure them as "Bento boxes".
- **Border Radius:** `20px` for standard cards.
- **Shadow (Light Mode):** `box-shadow: 0 10px 40px -10px rgba(0,0,0,0.06);`
- **Background (Light Mode):** Pure white `#ffffff`.
- **Background (Dark Mode):** `#1a2727` (Netcompany Dark Surface).
- **Nested Card Background (Dark Mode):** `#233535` (For cards inside cards, like `.highlight-tab-content`).

*Use the global SCSS classes defined in `styles.scss` rather than hardcoding these values.*

## 4. Color Palette
- **Light Mode (Default):**
  - Background: `#f8fafc` (Very light slate/off-white)
  - Surface/Cards: `#ffffff`
  - Text Primary: `#0f172a`
  - Text Secondary: `#64748b`
  - Primary Accent (Netcompany): Deep Teal/Green `#123836`.
  - Action Accent (Monday style): Vibrant Indigo `#4f46e5`.
  - Secondary Accent (Warnings/Alerts): Vibrant Orange `#f59e0b` or Coral `#f43f5e`.
- **Dark Mode (Netcompany Dark):**
  - Background: `#141e1e` (Netcompany very dark background)
  - Surface/Cards: `#1a2727`
  - Nested Cards: `#233535`
  - Text Primary: `#f8fafc`
  - Text Secondary: `#94a3b8`

## 5. Micro-interactions
- **Hover States:** Buttons and interactive cards must have a transition.
  - Cards: Just intensify the `box-shadow` or border color on hover. **ABSOLUTELY NO BOUNCING**: do NOT use `translateY` or any position-shifting transforms on hover for cards.
- **Active States:** Buttons scale down subtly (`transform: scale(0.98)`).

## 6. Loading States (Skeletons)
- **No Disappearing Content:** When loading data (e.g. fetching user details or waiting for a server response), do not use spinning loaders (`mat-spinner`) or completely hide/re-render the container.
- **Always Use Skeletons:** Use a blurred layout skeleton (`<app-skeleton>`) that mirrors the shape of the incoming content. Reference the animation on the `login` page for the expected behavior. This prevents layout shifts and gives a premium, seamless feel.

## 7. Theming and Colors (CSS Variables)
- **No Hardcoded Colors in Components:** Never hardcode colors (HEX, RGB, etc.) in component SCSS files (e.g. `login.component.scss`).
- **Use Global Variables:** All colors must be defined as CSS custom properties (`var(--name)`) in `styles.scss` (inside `:root` and `.dark-theme`). Components should only consume these variables.
- **Bind CSS Variables to SCSS Variables:** Do not hardcode HEX values directly into CSS variables (e.g. `--color: #ffffff;`). Instead, define them as SCSS variables at the top of the file (e.g. `$app-surface-color: #ffffff;`) and bind them using interpolation: `--app-surface-color: #{$app-surface-color};`. This ensures a single source of truth for the entire application palette.

## 8. Responsiveness and Overflow (Mobile First)
- **Prevent Text Overflow:** ALWAYS assume that text (especially warning notes, banners, or long user-generated content) might be too long for mobile screens.
- **Flexbox & Wraps:** When placing text inside a `display: flex;` container, always ensure it can wrap. Apply `word-break: break-word;` and `white-space: normal;` to `<span>` or text elements inside flex containers to prevent horizontal scrolling or cut-off text on phones.
- **Card Width Overflow (100% vs Margins):** `mat-card` components have a global responsive margin (`margin: clamp(...)` in `styles.scss`). If you set `width: 100%` on a `mat-card`, it will exceed the viewport and get cut off on mobile devices. To fix this, always add `margin: 0 !important;` to the `mat-card` when forcing `width: 100%`, and use `padding` on the parent container instead.

## 9. Angular Material Integration
When using Angular Material components:
- **Buttons (`mat-mdc-button`):** Must be rounded. The global `styles.scss` forces a `border-radius: 12px`. Do not override this to make them sharp.
- **Form Actions:** Primary action buttons in forms (e.g. "Save", "Cancel", "Send reset link") must be identically sized. Use the `.app-action-button` class to enforce `width: 100%` and a consistent `48px` height.
- **Inputs (`mat-form-field`):** Use the `appearance="outline"` style exclusively. The outlines should be subtle, with soft focus rings.
- **Elevation:** Do not use `mat-elevation-z*` classes. They look outdated. Use our custom soft shadow classes.

## 8. Internationalization (i18n)
- **No Hardcoded Texts:** Never hardcode user-facing texts (like "Continue with Google" or "Premium Accelerator") directly into HTML templates.
- **Always Use Translation Pipes:** Always define keys in `src/assets/i18n/pl.json` and `en.json`, and use the `translate` pipe (e.g., `{{ 'login.promo.title' | translate }}`).
