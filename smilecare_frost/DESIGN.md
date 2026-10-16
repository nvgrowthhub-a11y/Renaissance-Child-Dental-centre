---
name: SmileCare Frost
colors:
  surface: '#f7f9ff'
  surface-dim: '#c3ddf6'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e1efff'
  surface-container-high: '#d6ebff'
  surface-container-highest: '#cce6ff'
  on-surface: '#011e30'
  on-surface-variant: '#3d4948'
  inverse-surface: '#193346'
  inverse-on-surface: '#e7f2ff'
  outline: '#6d7a78'
  outline-variant: '#bcc9c7'
  surface-tint: '#006a65'
  primary: '#006a65'
  on-primary: '#ffffff'
  primary-container: '#1fa8a0'
  on-primary-container: '#003633'
  inverse-primary: '#61d9d0'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#78f4e7'
  on-secondary-container: '#006f67'
  tertiary: '#3e646d'
  on-tertiary: '#ffffff'
  tertiary-container: '#779da7'
  on-tertiary-container: '#08343c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#80f6ec'
  primary-fixed-dim: '#61d9d0'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504c'
  secondary-fixed: '#7bf6ea'
  secondary-fixed-dim: '#5cdace'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#c1e9f4'
  tertiary-fixed-dim: '#a6cdd7'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#254c55'
  background: '#f7f9ff'
  on-background: '#011e30'
  surface-variant: '#cce6ff'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a clinical yet serene health-tech aesthetic tailored for modern dental and orthodontic care. Built around clean, hygienic, and calming sensory cues, the interface eliminates clinical anxiety through frosted glass layers, luminous aqua gradients, and tactile soft-glow depth.

### Design Movement: Soft Clinical Glassmorphism
The visual architecture blends modern glassmorphism with high-end mobile ergonomic principles:
- **Atmospheric Translucency:** Frosted glass panels layered over fresh mint and aqua radiant fields, producing a bright, pristine medical atmosphere.
- **Micro-Reflections:** Subtle white gradient borders simulate ambient overhead studio lighting glancing off clear clinical resin and sterile glass surfaces.
- **Luminescent Highlights:** Tactile feedback, active states, and focal 3D tooth motifs glow with soft cyan light, creating an inviting, tech-forward experience.
- **Friendly Authority:** Clean geometric sans-serif typography combined with deep navy tones guarantees medical clarity, high legibility, and uncompromising trust.

## Colors

The palette balances refreshing coastal mint tones with clinical teal and deep oceanic navy to project cleanliness, clinical precision, and patient reassurance.

### Functional Roles & Gradients
- **Primary Teal (`#1FA8A0` to `#2BB5AA`):** Used for focal action points, active indicators, and prominent pill buttons. Often rendered as a linear gradient running from top-left to bottom-right (`linear-gradient(135deg, #2BB5AA 0%, #1FA8A0 100%)`).
- **Deep Navy Base (`#0F2A3D`):** Applied to primary typography, prominent headers, critical figures, and active icon representations to maintain WCAG AAA contrast against light backgrounds.
- **Teal Muted Subdued (`#4A7079`):** Used for secondary details, metadata, subheadings, and inactive navigational states.
- **Luminescent Mint Canvas (`#E6F7F6` to `#CFEFEC`):** The ambient full-viewport canvas background gradient, creating an airy, light-refracting base for frosted components.
- **Glass Panel Surface (`rgba(255, 255, 255, 0.72)`):** Semi-opaque milk glass base delivering contrast over saturated teal/mint elements while preserving depth.
- **Glass Accent Borders (`rgba(255, 255, 255, 0.65)` to `rgba(255, 255, 255, 0.2)`):** Top-to-bottom translucent border sheen creating delicate rim-lighting around cards and interactive inputs.

## Typography

Typographic scale is structured through **Plus Jakarta Sans**, offering geometric clarity, contemporary round apertures, and friendly letterforms that remain crisp across varying mobile resolutions.

### Hierarchy & Treatment
- **Headlines & Titles:** Set with heavy weights (`700` or `800`) in `#0F2A3D` to ground translucent containers and establish effortless scanning.
- **Body & Information:** Uses weights `400` and `500` with open line-heights for effortless reading of appointment notes, dental treatment steps, and pricing disclosures.
- **Labels & Microcopy:** Crisp uppercase or title-case labels in weights `600` facilitate quick cognitive processing across calendar chips, treatment pills, and bottom navigation.

## Layout & Spacing

The system is engineered for modern mobile viewports (375px–430px) with graceful responsiveness for tablet cards.

### Layout Mechanics
- **Grid Architecture:** 4-column fluid mobile grid with `1.25rem` (20px) outer canvas margins and `1rem` (16px) gutters between internal cards.
- **Section Stack Rhythm:** Vertical sections are spaced using `space-lg` (24px) for distinct content grouping, while nested content within cards adheres to `space-sm` (8px) and `space-md` (16px) increments.
- **Float & Floating Bottom Anchors:** Sticky bottom bars (e.g., checkout and booking actions) float above navigation bars with `1.25rem` side margins and `1rem` bottom padding, maintaining backdrop filters over underlying lists.

## Elevation & Depth

Visual depth is achieved through optical refraction, multi-layered translucency, and soft ambient drop shadows rather than heavy elevation tiers.

### Frosted Surface Formula
- **Backdrop Blur:** Primary panels use `backdrop-filter: blur(16px) saturate(180%)`.
- **Card Background:** Multi-stop fill using `linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.55) 100%)`.
- **Light Sheen Borders:** A 1px continuous hairline outline using `linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 100%)`.
- **Cast Shadows:** Soft diffuse shadows tinted with deep teal: `0px 10px 30px rgba(31, 168, 160, 0.08), 0px 1px 3px rgba(15, 42, 61, 0.04)`.
- **Active Interactive Glow:** Active buttons and active date selector chips cast an energetic aqua glow: `0px 8px 20px rgba(31, 168, 160, 0.35)`.

## Shapes

The shape hierarchy is organic, soft, and approachable, avoiding harsh edges to instill comfort and dental wellness.

### Geometry Hierarchy
- **Standard Cards & Modal Sheets:** Sculpted with generous `1.25rem` to `1.5rem` (20px - 24px) border radii (`rounded-xl` equivalent).
- **Service Action Tiles & Category Cubes:** Symmetrical `1.25rem` (20px) rounded squircle blocks.
- **Interactive Buttons & Filter Chips:** Pure pill geometry (`rounded-full` / 9999px) for search bars, action buttons, date selectors, and time badges.
- **Checkmarks & Mini Chips:** `0.5rem` to `0.75rem` (8px - 12px) soft curves for micro elements.

## Components

### Buttons
- **Primary Action Buttons:** Full pill geometry (`border-radius: 9999px`) powered by a vibrant teal gradient (`#2BB5AA` to `#1FA8A0`). Typography is `label-lg` in white (`#FFFFFF`) accompanied by an aligned trailing arrow icon. Includes glowing shadow `0 8px 22px rgba(31, 168, 160, 0.35)`.
- **Ghost/Tertiary Actions:** Glass pill buttons (`rgba(255, 255, 255, 0.6)`) with 1px border highlight and `#0F2A3D` text.

### Frosted Cards
- **Dental Service & Doctor Cards:** Translucent white background with `16px` backdrop-blur, `20px` border-radius, and crisp white gradient rim. Doctor avatar is encapsulated in an inner circle or soft rounded square with subtle inset shadow.
- **Stats & Mini Insight Cards:** Clean frosted tiles containing a teal or cyan icon, bold headline, and muted `#4A7079` sub-label.

### Chips & Selectors (Date & Time)
- **Inactive State:** Semi-transparent frosted glass (`rgba(255, 255, 255, 0.6)`), 1px stroke, `#0F2A3D` day/time labels.
- **Active State:** Vibrant teal fill (`#1FA8A0`), white typography, with an aqua ambient drop shadow (`0 6px 16px rgba(31, 168, 160, 0.3)`).

### Input Fields & Search
- Frosted translucent capsules (`rgba(255, 255, 255, 0.75)`), height `48px`, `9999px` corner radius, integrated trailing filter icon button, and placeholder text in `#4A7079`.

### Selection Controls (Checkboxes & Radios)
- **Checkmarks:** Circular pill checkmarks with a teal fill (`#1FA8A0`) and white check icon upon selection; inactive states display a soft `1.5px` border in `rgba(74, 112, 121, 0.3)`.

### Bottom Navigation Bar
- Continuous floating glass dock with `24px` top border-radius, full backdrop blur (`24px`), top white rim highlight, active icon with glowing indicator dot, and labels in `label-sm`.