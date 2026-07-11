# VibeSync AI Design System

## 1. Brand Foundation

### Product
VibeSync AI

### Tagline
Your mood. Your time. Your universe.

### Brand Promise
VibeSync transforms a user's mood, activity, available time, energy, preferences, and feedback into one personalized entertainment experience.

### Brand Personality
* Emotionally aware
* Immersive
* Intelligent
* Premium
* Playful
* Calm when appropriate
* Energetic when appropriate
* Trustworthy
* Personal without feeling intrusive

### Visual Keywords
* Cinematic
* Atmospheric
* Layered
* Softly luminous
* Expressive
* Focused
* Premium entertainment
* Adaptive

## 2. Design Principles

### Mood First
The interface should visually respond to the user's selected mood without changing the product's identity.

### Content Is the Hero
Album artwork, video thumbnails, visual imagery, movie posters, and book covers should receive strong visual emphasis.

### Premium, Not Noisy
Use depth, gradients, glow, blur, and motion intentionally rather than everywhere.

### Emotion Without Losing Usability
Adaptive themes must preserve readability, hierarchy, accessibility, and predictable interactions.

### One Product, Many Moods
Every mood theme must feel like VibeSync rather than a separate application.

### Clear Before Clever
Navigation, forms, actions, recommendation controls, and status messages must remain understandable.

### Responsive by Default
The system must work intentionally on mobile, tablet, laptop, and desktop.

### Accessible Motion
Animations must support reduced-motion preferences.

## 3. Core Brand Color Direction

The default VibeSync theme uses semantic roles based on a deep midnight background, rich violet identity, electric purple accent, soft magenta emotional highlight, cool cyan secondary signal, warm off-white primary text, and muted lavender-gray secondary text.

Initial token palette proposal (final contrast will be validated during implementation):

* `--background`: `#09090b` (Base midnight app background)
* `--background-elevated`: `#121216` (Raised surface for separation)
* `--surface`: `#18181b` (Default container/card background)
* `--surface-hover`: `#27272a` (Interactive surface hover state)
* `--surface-active`: `#3f3f46` (Active surface or pressed state)
* `--border`: `#27272a` (Subtle dividers)
* `--border-strong`: `#3f3f46` (High-contrast borders)
* `--foreground`: `#fafafa` (Primary warm off-white text)
* `--foreground-muted`: `#a1a1aa` (Lavender-gray secondary text)
* `--foreground-subtle`: `#71717a` (Tertiary text or placeholders)
* `--primary`: `#8b5cf6` (Rich violet identity color)
* `--primary-hover`: `#7c3aed` (Primary action hover state)
* `--primary-foreground`: `#ffffff` (Text on primary surfaces)
* `--secondary`: `#2dd4bf` (Cool cyan secondary accent)
* `--secondary-foreground`: `#042f2e` (Text on secondary surfaces)
* `--accent`: `#d946ef` (Soft magenta emotional highlight)
* `--accent-soft`: `rgba(217, 70, 239, 0.1)` (Faded accent for backgrounds)
* `--focus-ring`: `rgba(139, 92, 246, 0.5)` (Accessible focus indicator)
* `--success`: `#22c55e` (Positive status)
* `--warning`: `#eab308` (Cautionary status)
* `--danger`: `#ef4444` (Destructive status)

## 4. Gradient System

### Brand Gradient
Used for primary visual identity, selected states, important CTA emphasis, and small premium highlights.

### Ambient Background Gradient
Used for hero atmosphere, dashboard atmosphere, and vibe-result atmosphere.

### Mood Gradient
Generated dynamically from the active mood theme.

### Content Overlay Gradient
Used over imagery to ensure readable text.

**Rules:**
* No rainbow gradients.
* Do not place strong gradients on every card.
* Preserve readable contrast.
* Avoid gradient text for long text.
* Use gradient text only for short, high-emphasis phrases.

## 5. Surface and Depth System

* Level 0 — Base: Main app background. Flat, zero shadow.
* Level 1 — Card: Standard surface. Subtle border, soft shadow.
* Level 2 — Interactive or floating: Dropdowns or active cards. Medium shadow, slight elevation.
* Level 3 — Modal or command surface: Highest z-index. Strong shadow, optional backdrop blur.

Avoid placing blur on every element.

## 6. Typography System

**Display Typeface Direction:** Space Grotesk is the official display font for cinematic startup headings, Vibe titles, and high-emphasis elements.
**Interface Typeface Direction:** Inter is the highly readable official interface font used for navigation, forms, cards, dashboard content, body text, and metadata.

Fonts are optimized and loaded exclusively via `next/font/google`. No third-party font packages or `@import` URLs are used. Responsive display and heading roles use controlled `clamp()` functions to prevent overflow. Body text remains stable and readable on all viewports.

* Display XL: Hero headers (Desktop ~7rem, Mobile ~3.5rem). Bold.
* Display Large: Main page titles (Desktop ~5.75rem, Mobile ~3rem). Bold.
* Heading 1: Section headers (Desktop ~4.5rem, Mobile ~2.5rem). Semi-bold.
* Heading 2: Subsection headers (Desktop ~3.5rem, Mobile ~2rem). Semi-bold.
* Heading 3: Card headers (Desktop ~2.25rem, Mobile ~1.5rem). Semi-bold.
* Title Large: Large component titles. Medium.
* Title Medium: Standard component titles. Medium.
* Body Large: Leading paragraphs. Regular, loose line-height.
* Body: Standard readable text. Regular.
* Body Small: Secondary text. Regular.
* Label: Form labels or table headers. Medium, slightly tracked.
* Caption: Small metadata. Regular.
* Overline: Subtitles above headings. Uppercase, bold, wide tracking.

## 7. Spacing System

Based on a 4px foundation:
* 0: 0px
* 1: 4px
* 2: 8px
* 3: 12px
* 4: 16px
* 5: 20px
* 6: 24px
* 8: 32px
* 10: 40px
* 12: 48px
* 16: 64px
* 20: 80px
* 24: 96px
* 32: 128px

Used consistently for inline gaps, form spacing, card padding, section spacing, page gutters, dashboard spacing, and mobile spacing. Avoid arbitrary spacing values unless required by layout.

## 8. Layout System

### Maximum Content Width
Premium desktop content width suitable for landing pages and dashboards.

### Page Gutters
Responsive gutters for Mobile, Tablet, Laptop, and Large desktop.

### Section Spacing
Responsive vertical section spacing.

### Grid
Landing-page grid, dashboard grid, recommendation-card grid, and visual-moodboard behavior.

### Breakpoint Strategy
Use existing Tailwind breakpoint approach unless an approved design requires an extension. Do not add custom breakpoints yet.

## 9. Border-Radius System

* Small: Inputs, tags, badges
* Medium: Standard buttons, small cards
* Large: Recommendation cards, standard panels
* Extra Large: Modals, large featured panels
* Pill: Full-rounded buttons or tags
* Round: Avatars, icon buttons

Avoid making every element extremely rounded.

## 10. Border System

* Subtle border: Standard dividers
* Standard border: Card outlines
* Strong border: High-contrast separation
* Selected border: Active item outlines
* Focus border: Accessibility rings
* Error border: Validation failures

Borders support hierarchy. Do not outline every nested surface. Selected states may use accent borders plus subtle glow. Focus states must remain clearly visible.

## 11. Shadow and Glow System

* Shadow Small: Subtle elevation for cards
* Shadow Medium: Floating dropdowns
* Shadow Large: Modals and critical overlays
* Glow Primary: Highlight primary buttons or selected states
* Glow Mood: Ambient atmospheric lighting based on active mood
* Glow Focus: Keyboard accessibility

Glow is an accent, not a default. Avoid strong neon edges around all cards. Content artwork should not be obscured. Focus glow must support accessibility.

## 12. Iconography Direction

* One consistent outline icon family
* Rounded but professional geometry
* Consistent stroke weight
* Filled icons only for selected or high-emphasis states

Do not install an icon package yet. Do not mix multiple icon families.

## 13. Imagery Direction

Rules for album artwork, YouTube thumbnails, visual moodboards, movie posters, book covers, hero imagery, and empty-state artwork:

* Preserve image aspect ratios. Avoid stretching.
* Use consistent crop behavior.
* Use readable overlays.
* Use fallbacks for missing images.
* Do not permanently download provider artwork into the repository unless licensing permits it.
* Do not use copyrighted entertainment artwork as bundled project assets without permission.

## 14. Motion Direction

The motion system should feel smooth, atmospheric, responsive, intentional, and calm by default (more energetic only when the selected mood supports it).

Future motion categories:
* Instant feedback (button clicks)
* Micro transition (hover states)
* Component transition (dropdowns)
* Page transition (routing)
* Ambient motion (background atmosphere)
* Celebration motion (match success)

Avoid constant bouncing, excessive parallax, long blocking animations, large motion on every hover, and motion that causes layout shift. Animations must support reduced-motion fallback.

## 15. Adaptive Mood Theme Architecture

Moods: Default, Calm, Energetic, Motivated, Lonely, Nostalgic, Sad, Happy, Stressed, Surprise Me.

For every mood, define conceptual values for:
* Primary accent
* Secondary accent
* Ambient background
* Surface tint
* Glow color
* Motion intensity
* Visual atmosphere
* Emotional goal

Do not fully implement mood tokens yet. Do not make sad or lonely themes unreadably dark. Do not make energetic or happy themes visually overwhelming. Stressed should become calmer and clearer, not more chaotic. Surprise Me may select from approved theme combinations but must remain visually coherent. All moods must preserve the same component structure.

## 16. Semantic State Colors

Accessible roles for Success, Warning, Error, Information, Offline, Loading, and Disabled states. State colors must not depend only on color; future components should also use text, icons, labels, and shape/border changes.

## 17. Interaction States

Define expected states for interactive elements (Default, Hover, Active, Focus visible, Selected, Disabled, Loading, Success, Error). Ensure consistent behavior across buttons, inputs, cards, navigation, mood options, and recommendation actions.

## 18. Accessibility Foundation

Baseline requirements:
* WCAG AA contrast target
* Keyboard navigation
* Visible focus
* Semantic HTML
* Accessible labels
* Alt text
* Form-error association
* Reduced motion
* Touch-target sizing (minimum interactive target near 44 × 44 CSS pixels)
* No color-only communication
* Readable text over imagery
* Logical heading hierarchy

## 19. Responsive Foundation

* Mobile: Single-column priority, touch-friendly controls. No clipped cards.
* Tablet: Flexible two-column layouts, adaptive navigation, larger content previews.
* Laptop: Full dashboard navigation, multi-column recommendation sections.
* Large Desktop: Controlled maximum width, no excessive empty stretching, larger atmosphere.

## 20. Core Component Categories

(Future shared components to be built later)

* Primitives: Button, Icon button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Divider
* Feedback: Toast, Alert, Skeleton, Spinner, Progress, Empty state, Error state
* Overlay: Dialog, Drawer, Dropdown, Tooltip, Popover
* Navigation: Navbar, Sidebar, Mobile navigation, Breadcrumb, Tabs
* Content: Standard card, Recommendation card, Media card, Mood card, Metric card, Section header
* Vibe-Specific: Mood selector, Activity selector, Time selector, Energy selector, Vibe Match, Recommendation section, Save/Like/Dislike/Replace/External actions

## 21. Recommendation Card Principles

Shared behavior for Music, YouTube, Movie, Book cards, and Visual moodboard items:
* Support only relevant information (Artwork, Title, Creator/Artist, Match score, Explanation, Duration, Actions).
* Do not overload every card with all metadata.
* External actions should be clear.
* Artwork should remain visually dominant.
* Actions must remain accessible on touch devices.
* Missing metadata must degrade gracefully.

## 22. Content Voice

Product copy must be warm, concise, emotionally aware, encouraging, clear, not overly robotic, not overly casual, and not intrusive.

Avoid pretending to diagnose emotions, manipulative emotional claims, excessive slang, excessive exclamation marks, fake certainty, and generic AI buzzwords.

## 23. Design Anti-Patterns

Explicitly reject:
* Generic blue SaaS design
* Pure-black surfaces everywhere
* White cards on a dark background without integration
* Neon outlines around every element
* Gradient on every button
* Glass effect on every panel
* Tiny low-contrast gray text
* Excessively rounded everything
* Excessive animations
* Random page-specific colors
* Multiple icon libraries
* Multiple unrelated font families
* Mood themes that change layout structure
* Hidden actions that work only on hover
* Desktop-only design
* Fake provider branding
* Copied streaming-service layouts

## 24. Implementation Order

1. Core design tokens
2. Default theme
3. Typography
4. Global background and body styles
5. Shared primitive components
6. Feedback components
7. Navigation components
8. Content cards
9. Responsive validation
10. Accessibility validation
11. Adaptive mood tokens
12. Motion system

## Implementation Status

### Phase 3, Step 3.2 — Core Tokens and Default Theme

Status: Implemented

Implemented:

- Semantic default color tokens
- Gradient tokens
- Spacing scale
- Radius scale
- Shadow and glow tokens
- Layout tokens
- Motion-duration tokens
- Global body foundation
- Accessible focus-visible foundation
- Reduced-motion foundation
- Minimal shared layout utilities

### Phase 3, Step 3.3 — Typography System

Status: Implemented

Implemented:

- Space Grotesk display font
- Inter interface font
- Next.js optimized font loading
- Semantic font-family tokens
- Responsive display and heading sizes
- Body, label, caption, and overline roles
- Line-height tokens
- Letter-spacing tokens
- Reusable typography utility classes
- Readability utilities

Not implemented yet:

### Phase 3, Step 3.4 — Button and Interactive Action Foundation

Status: Implemented

Implemented:

- Shared Button component
- Shared IconButton component
- Primary, secondary, outline, ghost, and danger Button variants
- Secondary, outline, ghost, and danger IconButton variants
- Small, medium, and large sizes
- Loading states
- Disabled states
- Optional Button icons
- Full-width Button support
- Native button attribute forwarding
- Ref forwarding
- Visible keyboard focus
- Accessible IconButton labels
- Touch-friendly interaction targets
- Internal button preview route

Not implemented yet:

- Link-style button behavior
- Provider-branded actions
- Tooltip component
### Phase 3, Step 3.5 — Form-Control Foundation

Status: Implemented

Implemented:

- Shared Input component
- Shared Textarea component
- Shared native Select component
- Shared native Checkbox component
- Shared native Radio component
- Shared native-checkbox Switch component
- Label support
- Helper-text support
- Error-message support
- Required indicators
- Disabled states
- Native form-attribute forwarding
- Ref forwarding
- Accessible label association
- Accessible helper and error descriptions
- Visible keyboard focus
- Touch-friendly interaction
- Internal form-control preview route

Not implemented yet:

- Public FormField abstraction
- Password visibility control
- Search input
- Input prefixes and suffixes
- Custom combobox
- Multi-select
- Form-validation library integration
- Product forms

### Phase 3, Step 3.10 — Adaptive Mood Theme and Motion Foundation

Status: Implemented

Implemented:

- Shared MoodTheme type
- Supported default, happy, chill, energetic, romantic, focus, sad, and angry themes
- Human-readable mood-theme metadata
- Shared MoodThemeProvider
- Shared useMoodTheme hook
- Shared MoodThemeScope
- Scoped data-attribute theme application
- Mood-aware semantic CSS-token overrides
- Optional validated localStorage persistence
- Default non-persistent behavior
- Smooth semantic theme transitions
- Reusable fade-in motion
- Reusable slide-up motion
- Reusable scale-in motion
- Reusable soft-float motion
- Reusable ambient motion
- Reduced-motion-safe behavior
- Theme-isolation support
- Internal interactive theme preview
- Internal multi-theme gallery
- Internal motion preview

Not implemented yet:

- Real onboarding mood selection
- Real Generate Vibe mood selection
- Real dashboard mood state
- User-account theme preferences
- Database theme persistence
- Mood history
- AI mood detection
- Recommendation integration
- Product-specific theme choreography

### Phase 3 Final Verification

Status: Verified

Verified:

- Design tokens
- Default VibeSync theme
- Typography system
- Shared Button and IconButton foundations
- Shared form-control foundations
- Shared feedback and status foundations
- Shared content-card and media-card foundations
- Shared navigation and application-shell foundations
- Shared overlay and contextual-interface foundations
- Adaptive mood-theme foundations
- Motion foundations
- Reduced-motion behavior
- Internal design-system preview routes
- Responsive behavior
- Keyboard interaction
- Accessibility foundations
- Lint
- Production build

Phase 3 result:

The reusable VibeSync design-system and shared-interface foundation is complete and ready for product-interface implementation.
