---
name: Terra Modern
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414844'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#342300'
  on-tertiary: '#ffffff'
  tertiary-container: '#503700'
  on-tertiary-container: '#d89b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffdea9'
  tertiary-fixed-dim: '#ffba27'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4100'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  sage: '#D8E2DC'
  beige: '#F1E3D3'
  charcoal: '#212529'
  leaf: '#40916C'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is a premium agricultural framework designed to bridge the gap between high-end digital SaaS and the grounded reality of modern farming. It targets a diverse demographic of farmers, agronomists, and stakeholders who require high information density paired with exceptional readability. 

The visual style is **Modern Minimalist with Tactile Warmth**. It eschews generic high-tech tropes in favor of an "Agritech-Industrial" aesthetic: clean lines, generous whitespace, and a color palette rooted in the earth. The emotional response should be one of reliability, growth, and quiet sophistication. Layouts prioritize clarity and accessibility, particularly for multilingual support across English, Hindi, and Marathi.

## Colors

The palette is designed to feel organic yet professional. **Warm Cream (#F8F9FA)** serves as the primary canvas for all interfaces to reduce eye strain and provide a "paper-like" warmth. **Deep Green (#1B4332)** is reserved for primary branding, high-level navigation, and key interactive elements.

**Leaf Green (#2D6A4F)** and **Subtle Amber (#FFB703)** act as functional accents—amber specifically denotes urgency or seasonal alerts, while leaf green signifies healthy growth or "active" statuses. **Earthy Beige (#F1E3D3)** is used for secondary surface containers to create a subtle layered effect without relying on heavy shadows. **Charcoal (#212529)** is the exclusive color for body text to ensure maximum contrast and legibility.

## Typography

The design system utilizes **Inter** for its exceptional clarity and comprehensive support for Devanagari scripts (Hindi and Marathi). The typographic scale is generous to accommodate varied reading environments, including direct sunlight common in agricultural settings.

- **Headlines:** Use Bold (700) weights with slightly tighter letter spacing to create a strong visual anchor.
- **Body Text:** Use Regular (400) weight. Avoid weights lighter than 400 to maintain legibility for users with varying visual acuity.
- **Hindi/Marathi Optimization:** When rendering Devanagari scripts, increase the base `line-height` by approximately 10-15% compared to English to prevent vowel marks from clipping.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a strong focus on mobile-first responsiveness. 

- **Mobile (Primary):** 4-column grid with 16px margins and 16px gutters.
- **Tablet/Desktop:** 12-column grid with a maximum content width of 1200px.
- **Rhythm:** Spacing follows a 4px base unit. Component internal padding should default to `sm` (16px), while section vertical spacing should utilize `lg` (40px) to maintain the airy, premium feel. Use `md` (24px) for margins between stacked cards.

## Elevation & Depth

This design system avoids heavy shadows and skeuomorphism. Depth is communicated through **Tonal Layering** and **Low-Contrast Outlines**:

- **Tier 1 (Surface):** The background layer is always Warm Cream (#F8F9FA).
- **Tier 2 (Containers):** Cards use a white (#FFFFFF) background with a 1px solid border in Muted Sage (#D8E2DC).
- **Tier 3 (Active Elements):** For interaction or high importance, a very soft, diffused shadow (0px 4px 12px, 5% opacity Charcoal) may be applied to the primary card to indicate "lift."
- **Overlays:** Modals and bottom sheets use a 40% opacity Charcoal backdrop blur to maintain focus without losing environmental context.

## Shapes

The shape language is **Rounded**, reflecting the organic nature of agriculture. All standard containers, buttons, and input fields utilize a 0.5rem (8px) corner radius. 

Larger containers like profile cards or image galleries should use `rounded-lg` (16px) to emphasize the modern, friendly aesthetic. Functional elements like "Listen" action buttons and status chips are fully pill-shaped (rounded-full) to distinguish them as highly interactive or informational snippets.

## Components

### Listen Actions
As a core accessibility feature, "Listen" icons (Speaker/Volume) must be paired with primary headlines. They should be styled as 40px circular buttons using the Sage background with a Deep Green icon, ensuring they are easily tappable.

### Buttons
- **Primary:** Deep Green background, White text. High-contrast, no shadow.
- **Secondary:** Transparent background, Deep Green 2px border.
- **Tertiary/Ghost:** Leaf Green text, no border.

### Cards
Cards are the primary content vehicle. They must feature a 1px Sage border, 16px internal padding, and 16px external margins. Headlines within cards should be MD (24px) to ensure hierarchy.

### Input Fields
Inputs use White backgrounds with a Sage border. Labels must always be visible (above the field) using the Label-MD style in Charcoal. Use Amber (#FFB703) for error states rather than standard red to stay within the natural palette.

### Status Chips
Small, pill-shaped indicators for crop health or weather. Use the Subtle Amber background for "Warning" and Leaf Green for "Optimal," always with high-contrast Charcoal or Deep Green text.