# Design

> Visual system for QR Studio. Seeded from the brand palette in the original `design.md` (deep blue → teal), expanded to a full token set. Register: product. Theme: dark default with a light toggle.

## Theme

Dark by default. A maker at a desk, often evening, focused on one QR at a time; the deep-blue gradient canvas makes the generated code pop and reads as premium, not neon. A light mode (paper `#EEEEEE`) is available via toggle for bright rooms and print-matching. Both themes share the same accent ramp.

## Color

OKLCH, tinted toward the brand blue. Never pure `#000` / `#fff`. Hex equivalents kept for reference / asset matching.

### Brand ramp
| Role | OKLCH | Hex ref | Use |
|---|---|---|---|
| Primary (indigo) | `oklch(0.31 0.15 268)` | `#172E7C` | Primary actions, active tab, focus rings |
| Secondary (blue) | `oklch(0.44 0.13 248)` | `#004E8C` | Secondary buttons, links, gradient start |
| Tertiary (teal) | `oklch(0.59 0.11 195)` | `#018989` | Accent, success, gradient end, highlights |

### Dark theme (default)
| Token | OKLCH | Hex ref | Use |
|---|---|---|---|
| `--bg` | gradient `oklch(0.19 0.04 266)` → `oklch(0.24 0.05 262)` | `#0D1529`→`#111F3A` | App canvas (135deg linear) |
| `--surface` | `oklch(0.26 0.04 262)` | ~`#172339` | Panels, cards |
| `--surface-2` | `oklch(0.30 0.04 261)` | ~`#1E2B45` | Inputs, raised controls |
| `--border` | `oklch(0.36 0.04 260)` | ~`#2A3A57` | Hairline borders (1px only) |
| `--text` | `oklch(0.95 0.01 260)` | ~`#ECEFF6` | Primary text |
| `--text-muted` | `oklch(0.72 0.02 258)` | ~`#9AA6BE` | Labels, secondary text |
| `--accent` | `oklch(0.64 0.12 195)` | ~`#1FA9A4` | Teal accent (lifted for dark contrast) |

### Light theme
| Token | OKLCH | Hex ref | Use |
|---|---|---|---|
| `--bg` | `oklch(0.95 0.004 260)` | `#EEEEEE` | App canvas |
| `--surface` | `oklch(0.99 0.003 260)` | ~`#FCFCFD` | Panels |
| `--surface-2` | `oklch(0.97 0.004 260)` | ~`#F4F5F8` | Inputs |
| `--border` | `oklch(0.89 0.006 260)` | ~`#DEE1E8` | Hairline borders |
| `--text` | `oklch(0.27 0.03 264)` | ~`#1B2540` | Primary text |
| `--text-muted` | `oklch(0.50 0.03 262)` | ~`#5C6783` | Secondary text |
| `--accent` | `oklch(0.55 0.11 195)` | `#018989` | Teal accent |

### Strategy
Committed: the deep-blue gradient canvas carries the dark identity; teal is the single lifting accent (gradient end, focus, success). Restrained on light. No gradient text, no neon.

## Typography

- **Logo**: "QR" is custom letterform art (use the SVG asset, not a font). "Studio" wordmark uses **Amiko**.
- **UI font**: **Inter** (variable) for all interface text, body, labels, inputs. Pairs cleanly with the Amiko logo without competing.
- **Mono**: `ui-monospace, "JetBrains Mono"` for encoded content previews (the raw `WIFI:`/vCard strings) so users trust what's being encoded.
- Scale (1.25 ratio): 12 / 14 / 16 / 20 / 25 / 31px. Body 14–16px, line-length cap 70ch. Weight contrast: 400 body, 600 labels/headings, 700 logo.

## Layout

- Two-pane app shell: left = controls (tabs + content form + style panel, scrollable), right = sticky preview stage centered on the gradient. Collapses to stacked single column under ~860px (preview on top).
- 8px spacing base; vary rhythm (24px section gaps, 12px field gaps). Not uniform padding everywhere.
- Header bar with logo (inline lockup, theme-aware asset) + theme toggle on the right.
- Avoid card-grid monotony; the form is grouped sections with hairline dividers, not nested cards.

## Components

- **Logo**: theme-aware. Dark theme → `src/img/svg/qr_studio_logo_dark_inline.svg`; light → `..._light_inline.svg`. Icon-only assets for favicon / collapsed states.
- **Tabs (content type)**: underline/segmented, active = primary indigo, 200ms ease-out.
- **Inputs**: `--surface-2` fill, 1px `--border`, 8px radius, focus ring = primary at 40% + 2px offset. No heavy shadows.
- **Buttons**: primary = indigo→teal subtle fill for export actions; secondary = bordered ghost. 8px radius.
- **Preview stage**: rounded 16px inset panel, soft inner vignette so the QR (usually light) sits on a darker frame; empty state shows a ghosted QR glyph + hint, never an error.
- **Color pickers / sliders**: native-backed, brand-tinted track.

## Motion

- Ease-out only (ease-out-quart/expo), 150–250ms. Theme toggle cross-fades. Tab change slides underline. QR updates fade in after the ~300ms debounce. Respect `prefers-reduced-motion`. Never animate layout props.

## Assets

Brand files live in `src/img/{svg,png}/`:
- `qr_studio_logo_{dark,light}_inline` — header lockup
- `qr_studio_logo_{dark,light}_in_block` — stacked/marketing
- `qr_studio_logo_icon_{dark,light}` — favicon / app icon
- `qr_studio_logo_name_{dark,light}` — wordmark only
