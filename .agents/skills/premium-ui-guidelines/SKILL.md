---
name: premium-ui-guidelines
description: "Styling guidelines for the 'million-dollar' Apple/Monday/Netcompany UI style. Use this skill when creating or modifying frontend components to maintain a premium, clean, and vibrant aesthetic."
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
  - Cards: Just intensify the `box-shadow` on hover, do NOT use `translateY`.
  - Buttons: Slight lift (`transform: translateY(-1px)`) and increased shadow.
- **Active States:** Buttons scale down subtly (`transform: scale(0.98)`).

## 6. Loading States (Skeletons)
- **No Disappearing Content:** When loading data (e.g. fetching user details or waiting for a server response), do not use spinning loaders (`mat-spinner`) or completely hide/re-render the container.
- **Always Use Skeletons:** Use a blurred layout skeleton (`<app-skeleton>`) that mirrors the shape of the incoming content. Reference the animation on the `login` page for the expected behavior. This prevents layout shifts and gives a premium, seamless feel.

## 7. Angular Material Integration
When using Angular Material components:
- **Buttons (`mat-mdc-button`):** Must be rounded. The global `styles.scss` forces a `border-radius: 12px`. Do not override this to make them sharp.
- **Form Actions:** Primary action buttons in forms (e.g. "Save", "Cancel", "Send reset link") must be identically sized. Use the `.app-action-button` class to enforce `width: 100%` and a consistent `48px` height.
- **Inputs (`mat-form-field`):** Use the `appearance="outline"` style exclusively. The outlines should be subtle, with soft focus rings.
- **Elevation:** Do not use `mat-elevation-z*` classes. They look outdated. Use our custom soft shadow classes.
