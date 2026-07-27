# Style Guide — Dan's Personal Website

## Color Palette

| Swatch | Hex       | RGB             | Usage                                      |
|--------|-----------|-----------------|--------------------------------------------|
| ██████ | `#8d7b68` | (141, 123, 104) | Dark brown — accents, active states, icons  |
| ██████ | `#a4907c` | (164, 144, 124) | Mid brown — secondary text, muted labels    |
| ██████ | `#c8b6a6` | (200, 182, 166) | Light brown — borders, dividers, tags       |
| ██████ | `#f1dec9` | (241, 222, 201) | Cream — secondary backgrounds, highlights   |
| ██████ | `#faf5ef` | (250, 245, 239) | Off-white — primary background              |

### Derived Colors

| Hex       | Usage                           |
|-----------|---------------------------------|
| `#4a3f35` | Primary text (darkened brown)   |
| `#6b5b4e` | Text accent / emphasis          |

### Transparency Variants (used in CSS)

| Value                          | Usage                    |
|--------------------------------|--------------------------|
| `rgba(255, 255, 255, 0.6)`    | Card background          |
| `rgba(255, 255, 255, 0.85)`   | Card background (hover)  |
| `rgba(141, 123, 104, 0.12)`   | Card border              |
| `rgba(141, 123, 104, 0.25)`   | Card border (hover)      |
| `rgba(200, 182, 166, 0.2)`    | ToC hover background     |
| `rgba(200, 182, 166, 0.3)`    | Tag backgrounds          |

---

## Typography

| Element   | Font              | Weight | Size       |
|-----------|-------------------|--------|------------|
| Headings  | DM Serif Display  | 400    | 1.25–4.5rem |
| Body      | Inter             | 300–600| 0.875–1.125rem |
| Labels    | Inter             | 600    | 0.75rem    |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&display=swap
```

---

## Design Aesthetic

- **Homey & cozy**: warm earthy tones, soft rounded corners, gentle shadows
- **Clean**: generous whitespace, clear hierarchy, minimal clutter
- **Subtle depth**: glassmorphism cards with backdrop blur, soft ambient glow orbs
- **Micro-animations**: fade-in on scroll, hover lift, arrow slide

---

## CSS Custom Properties Reference

All design tokens are defined as CSS custom properties in `styles.css` under `:root`.
To change the palette site-wide, update these values:

```css
:root {
  --brown-dark:   #8d7b68;
  --brown-mid:    #a4907c;
  --brown-light:  #c8b6a6;
  --cream:        #f1dec9;
  --cream-light:  #faf5ef;
}
```
